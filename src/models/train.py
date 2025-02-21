import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
import numpy as np
from tqdm import tqdm
import matplotlib.pyplot as plt
from datetime import datetime

from models.traffic_cnn import TrafficCNN, create_sequences
from utils.data_utils import TrafficDataGenerator, TrafficDataPreprocessor, TrafficDataAugmentation

def train_model(
    model,
    train_loader,
    val_loader,
    criterion,
    optimizer,
    num_epochs,
    device,
    save_path,
    early_stopping_patience=5
):
    """
    训练模型
    """
    best_val_loss = float('inf')
    patience_counter = 0
    train_losses = []
    val_losses = []
    
    for epoch in range(num_epochs):
        # 训练阶段
        model.train()
        train_loss = 0.0
        train_steps = 0
        
        for batch_x, batch_y in tqdm(train_loader, desc=f'Epoch {epoch + 1}/{num_epochs}'):
            batch_x = batch_x.to(device)
            batch_y = batch_y.to(device)
            
            optimizer.zero_grad()
            outputs = model(batch_x)
            loss = criterion(outputs, batch_y)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            train_steps += 1
        
        avg_train_loss = train_loss / train_steps
        train_losses.append(avg_train_loss)
        
        # 验证阶段
        model.eval()
        val_loss = 0.0
        val_steps = 0
        
        with torch.no_grad():
            for batch_x, batch_y in val_loader:
                batch_x = batch_x.to(device)
                batch_y = batch_y.to(device)
                
                outputs = model(batch_x)
                loss = criterion(outputs, batch_y)
                
                val_loss += loss.item()
                val_steps += 1
        
        avg_val_loss = val_loss / val_steps
        val_losses.append(avg_val_loss)
        
        print(f'Epoch {epoch + 1}/{num_epochs}:')
        print(f'Average Training Loss: {avg_train_loss:.4f}')
        print(f'Average Validation Loss: {avg_val_loss:.4f}')
        
        # 早停检查
        if avg_val_loss < best_val_loss:
            best_val_loss = avg_val_loss
            patience_counter = 0
            # 保存最佳模型
            torch.save(model.state_dict(), save_path)
        else:
            patience_counter += 1
            if patience_counter >= early_stopping_patience:
                print(f'Early stopping triggered after {epoch + 1} epochs')
                break
    
    return train_losses, val_losses

def plot_training_history(train_losses, val_losses, save_dir):
    """
    绘制训练历史
    """
    plt.figure(figsize=(10, 6))
    plt.plot(train_losses, label='Training Loss')
    plt.plot(val_losses, label='Validation Loss')
    plt.title('Model Training History')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    plt.grid(True)
    
    # 保存图表
    plt.savefig(os.path.join(save_dir, 'training_history.png'))
    plt.close()

def main():
    # 设置随机种子
    torch.manual_seed(42)
    np.random.seed(42)
    
    # 设置设备
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")
    
    # 生成训练数据
    data_generator = TrafficDataGenerator()
    data = data_generator.generate_time_series(n_samples=1000)
    
    # 数据预处理
    preprocessor = TrafficDataPreprocessor(sequence_length=12)
    data = preprocessor.remove_outliers(data, 'traffic_flow')
    data = preprocessor.interpolate_missing(data)
    
    # 准备序列数据
    flow_data = data['traffic_flow'].values
    flow_data = preprocessor.normalize_data(flow_data)
    X, y = preprocessor.create_sequences(flow_data)
    
    # 数据增强
    augmentation = TrafficDataAugmentation()
    X_aug = np.concatenate([
        X,
        augmentation.add_gaussian_noise(X),
        augmentation.random_scaling(X)
    ])
    y_aug = np.concatenate([y, y, y])
    
    # 划分训练集和验证集
    train_size = int(0.8 * len(X_aug))
    X_train, X_val = X_aug[:train_size], X_aug[train_size:]
    y_train, y_val = y_aug[:train_size], y_aug[train_size:]
    
    # 创建数据加载器
    train_dataset = TensorDataset(
        torch.FloatTensor(X_train).view(-1, 1, 12),
        torch.FloatTensor(y_train).view(-1, 1)
    )
    val_dataset = TensorDataset(
        torch.FloatTensor(X_val).view(-1, 1, 12),
        torch.FloatTensor(y_val).view(-1, 1)
    )
    
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32)
    
    # 初始化模型
    model = TrafficCNN().to(device)
    
    # 定义损失函数和优化器
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    # 创建保存目录
    save_dir = os.path.join(os.path.dirname(__file__), 'checkpoints')
    os.makedirs(save_dir, exist_ok=True)
    
    # 训练模型
    save_path = os.path.join(save_dir, f'model_{datetime.now().strftime("%Y%m%d_%H%M%S")}.pth')
    train_losses, val_losses = train_model(
        model=model,
        train_loader=train_loader,
        val_loader=val_loader,
        criterion=criterion,
        optimizer=optimizer,
        num_epochs=50,
        device=device,
        save_path=save_path,
        early_stopping_patience=5
    )
    
    # 绘制训练历史
    plot_training_history(train_losses, val_losses, save_dir)
    
    print("Training completed!")
    print(f"Model saved to: {save_path}")

if __name__ == "__main__":
    main() 