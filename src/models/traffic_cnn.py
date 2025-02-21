import torch
import torch.nn as nn
import torch.nn.functional as F

class TrafficCNN(nn.Module):
    def __init__(self, input_channels=1, sequence_length=12):
        super(TrafficCNN, self).__init__()
        
        # 第一个卷积层块
        self.conv1 = nn.Sequential(
            nn.Conv1d(input_channels, 64, kernel_size=3, padding=1),
            nn.BatchNorm1d(64),
            nn.ReLU(),
            nn.Dropout(0.2)
        )
        
        # 第二个卷积层块
        self.conv2 = nn.Sequential(
            nn.Conv1d(64, 128, kernel_size=3, padding=1),
            nn.BatchNorm1d(128),
            nn.ReLU(),
            nn.Dropout(0.2)
        )
        
        # 第三个卷积层块
        self.conv3 = nn.Sequential(
            nn.Conv1d(128, 256, kernel_size=3, padding=1),
            nn.BatchNorm1d(256),
            nn.ReLU(),
            nn.Dropout(0.2)
        )
        
        # 注意力机制
        self.attention = nn.Sequential(
            nn.Linear(256, 64),
            nn.Tanh(),
            nn.Linear(64, 1),
            nn.Softmax(dim=1)
        )
        
        # 全连接层
        self.fc1 = nn.Linear(256 * sequence_length, 512)
        self.fc2 = nn.Linear(512, 128)
        self.fc3 = nn.Linear(128, 1)
        
        self.dropout = nn.Dropout(0.5)
        
    def forward(self, x):
        # 输入形状: (batch_size, input_channels, sequence_length)
        
        # 卷积特征提取
        x = self.conv1(x)  # (batch_size, 64, sequence_length)
        x = self.conv2(x)  # (batch_size, 128, sequence_length)
        x = self.conv3(x)  # (batch_size, 256, sequence_length)
        
        # 注意力机制
        attention_weights = self.attention(x.transpose(1, 2))  # (batch_size, sequence_length, 1)
        attended = torch.mul(x.transpose(1, 2), attention_weights)  # (batch_size, sequence_length, 256)
        
        # 展平
        x = attended.reshape(attended.size(0), -1)  # (batch_size, 256 * sequence_length)
        
        # 全连接层
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = F.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        
        return x

class TrafficPredictor:
    def __init__(self, model_path=None):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = TrafficCNN().to(self.device)
        if model_path:
            self.model.load_state_dict(torch.load(model_path))
        self.model.eval()
        
    def predict(self, sequence):
        """
        预测下一个时间点的交通流量
        
        Args:
            sequence: numpy array, 形状为 (sequence_length,)
            
        Returns:
            float: 预测的交通流量值
        """
        with torch.no_grad():
            # 准备输入数据
            x = torch.FloatTensor(sequence).view(1, 1, -1).to(self.device)
            
            # 进行预测
            prediction = self.model(x)
            
            return prediction.item()
    
    def train_step(self, x_batch, y_batch, optimizer, criterion):
        """
        训练一个批次
        
        Args:
            x_batch: 输入数据批次
            y_batch: 目标值批次
            optimizer: 优化器
            criterion: 损失函数
            
        Returns:
            float: 批次损失值
        """
        self.model.train()
        optimizer.zero_grad()
        
        # 前向传播
        predictions = self.model(x_batch)
        loss = criterion(predictions, y_batch)
        
        # 反向传播
        loss.backward()
        optimizer.step()
        
        return loss.item()

def create_sequences(data, sequence_length):
    """
    创建用于训练的序列数据
    
    Args:
        data: numpy array, 原始时间序列数据
        sequence_length: int, 序列长度
        
    Returns:
        tuple: (X, y) 其中X是输入序列，y是目标值
    """
    X, y = [], []
    for i in range(len(data) - sequence_length):
        X.append(data[i:(i + sequence_length)])
        y.append(data[i + sequence_length])
    return torch.FloatTensor(X), torch.FloatTensor(y) 