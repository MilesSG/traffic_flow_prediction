import torch
import torch.nn as nn
import torch.nn.functional as F

class TrafficCNN(nn.Module):
    def __init__(self, input_channels=3, num_classes=1):
        super(TrafficCNN, self).__init__()
        
        # 图像特征提取
        self.conv1 = nn.Conv2d(input_channels, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.dropout = nn.Dropout(0.5)
        
        # 时序特征提取
        self.lstm = nn.LSTM(input_size=128, hidden_size=64, num_layers=2, batch_first=True)
        
        # 全连接层
        self.fc1 = nn.Linear(128 * 8 * 8, 512)
        self.fc2 = nn.Linear(512, 128)
        self.fc3 = nn.Linear(128, num_classes)
        
        # 注意力机制
        self.attention = nn.MultiheadAttention(embed_dim=64, num_heads=4)
        
    def forward(self, x_img, x_flow):
        # 图像特征提取
        x_img = F.relu(self.conv1(x_img))
        x_img = self.pool(x_img)
        x_img = F.relu(self.conv2(x_img))
        x_img = self.pool(x_img)
        x_img = F.relu(self.conv3(x_img))
        x_img = self.pool(x_img)
        
        # 展平图像特征
        x_img = x_img.view(-1, 128 * 8 * 8)
        x_img = self.dropout(x_img)
        x_img = F.relu(self.fc1(x_img))
        
        # 时序特征提取
        x_flow, _ = self.lstm(x_flow)
        
        # 注意力机制
        x_flow, _ = self.attention(x_flow, x_flow, x_flow)
        
        # 特征融合
        x_combined = torch.cat((x_img, x_flow[:, -1, :]), dim=1)
        x_combined = self.dropout(x_combined)
        x_combined = F.relu(self.fc2(x_combined))
        
        # 输出预测
        out = self.fc3(x_combined)
        return out

class TrafficDataset(torch.utils.data.Dataset):
    def __init__(self, images, flow_data, labels):
        self.images = images
        self.flow_data = flow_data
        self.labels = labels
        
    def __len__(self):
        return len(self.images)
    
    def __getitem__(self, idx):
        image = self.images[idx]
        flow = self.flow_data[idx]
        label = self.labels[idx]
        return image, flow, label

def train_model(model, train_loader, val_loader, criterion, optimizer, num_epochs=10):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    
    best_val_loss = float('inf')
    
    for epoch in range(num_epochs):
        # 训练阶段
        model.train()
        train_loss = 0.0
        for images, flows, labels in train_loader:
            images = images.to(device)
            flows = flows.to(device)
            labels = labels.to(device)
            
            optimizer.zero_grad()
            outputs = model(images, flows)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            
        # 验证阶段
        model.eval()
        val_loss = 0.0
        with torch.no_grad():
            for images, flows, labels in val_loader:
                images = images.to(device)
                flows = flows.to(device)
                labels = labels.to(device)
                
                outputs = model(images, flows)
                loss = criterion(outputs, labels)
                val_loss += loss.item()
        
        # 打印训练进度
        print(f'Epoch [{epoch+1}/{num_epochs}]')
        print(f'Train Loss: {train_loss/len(train_loader):.4f}')
        print(f'Val Loss: {val_loss/len(val_loader):.4f}')
        
        # 保存最佳模型
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save(model.state_dict(), 'best_model.pth')
            
def evaluate_model(model, test_loader):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    model.eval()
    
    predictions = []
    actual = []
    
    with torch.no_grad():
        for images, flows, labels in test_loader:
            images = images.to(device)
            flows = flows.to(device)
            
            outputs = model(images, flows)
            predictions.extend(outputs.cpu().numpy())
            actual.extend(labels.numpy())
            
    return predictions, actual 