import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import Tuple, List, Optional
import cv2

class TrafficDataGenerator:
    def __init__(self, start_date: datetime = None, noise_level: float = 0.1):
        self.start_date = start_date or datetime.now()
        self.noise_level = noise_level
        
    def generate_time_series(self, n_samples: int) -> pd.DataFrame:
        """
        生成模拟的交通流量时间序列数据
        
        Args:
            n_samples: 要生成的样本数量
            
        Returns:
            DataFrame: 包含时间戳和交通流量的数据框
        """
        timestamps = [self.start_date - timedelta(hours=i) for i in range(n_samples)]
        timestamps.reverse()
        
        # 生成基础流量
        hours = np.array([t.hour for t in timestamps])
        weekdays = np.array([t.weekday() for t in timestamps])
        
        # 日变化模式
        daily_pattern = 100 + 50 * np.sin(2 * np.pi * hours / 24)
        
        # 工作日模式
        weekday_factor = np.where(weekdays < 5, 1.2, 0.8)
        
        # 添加随机噪声
        noise = np.random.normal(0, self.noise_level, n_samples)
        
        # 组合所有因素
        traffic_flow = (daily_pattern * weekday_factor + noise) * 100
        traffic_flow = np.maximum(traffic_flow, 0)  # 确保流量非负
        
        return pd.DataFrame({
            'timestamp': timestamps,
            'traffic_flow': traffic_flow.astype(int)
        })

class TrafficDataPreprocessor:
    def __init__(self, sequence_length: int = 12):
        self.sequence_length = sequence_length
        self.scaler = None
        
    def remove_outliers(self, df: pd.DataFrame, column: str,
                       lower_quantile: float = 0.001,
                       upper_quantile: float = 0.999) -> pd.DataFrame:
        """
        移除异常值
        """
        lower_bound = df[column].quantile(lower_quantile)
        upper_bound = df[column].quantile(upper_quantile)
        return df[(df[column] >= lower_bound) & (df[column] <= upper_bound)]
    
    def interpolate_missing(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        插值处理缺失值
        """
        return df.interpolate(method='time')
    
    def normalize_data(self, data: np.ndarray) -> np.ndarray:
        """
        归一化数据
        """
        mean = np.mean(data)
        std = np.std(data)
        return (data - mean) / std
    
    def create_sequences(self, data: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """
        创建时序序列
        """
        X, y = [], []
        for i in range(len(data) - self.sequence_length):
            X.append(data[i:(i + self.sequence_length)])
            y.append(data[i + self.sequence_length])
        return np.array(X), np.array(y)
    
    def process_image_data(self, image_path: str, target_size: Tuple[int, int] = (224, 224)) -> np.ndarray:
        """
        处理交通图像数据
        """
        # 读取图像
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError(f"无法读取图像: {image_path}")
            
        # 调整大小
        img = cv2.resize(img, target_size)
        
        # 转换为RGB
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # 归一化
        img = img / 255.0
        
        return img
    
    def prepare_batch_data(self, images: List[str], flow_data: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """
        准备批量训练数据
        """
        processed_images = []
        for img_path in images:
            processed_images.append(self.process_image_data(img_path))
        
        return np.array(processed_images), flow_data

class TrafficDataAugmentation:
    @staticmethod
    def add_gaussian_noise(data: np.ndarray, mean: float = 0, std: float = 0.1) -> np.ndarray:
        """
        添加高斯噪声
        """
        noise = np.random.normal(mean, std, data.shape)
        return data + noise
    
    @staticmethod
    def random_scaling(data: np.ndarray, scale_range: Tuple[float, float] = (0.9, 1.1)) -> np.ndarray:
        """
        随机缩放
        """
        scale_factor = np.random.uniform(scale_range[0], scale_range[1])
        return data * scale_factor
    
    @staticmethod
    def random_shift(data: np.ndarray, shift_range: int = 2) -> np.ndarray:
        """
        随机移位
        """
        shift = np.random.randint(-shift_range, shift_range + 1)
        return np.roll(data, shift) 