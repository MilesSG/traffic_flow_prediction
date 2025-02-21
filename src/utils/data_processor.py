import numpy as np
import pandas as pd
import cv2
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

class DataProcessor:
    def __init__(self):
        self.scaler = StandardScaler()
        
    def preprocess_flow_data(self, data):
        """预处理交通流量数据"""
        # 检测并处理异常值
        Q1 = data['flow'].quantile(0.25)
        Q3 = data['flow'].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        
        # 将异常值替换为边界值
        data.loc[data['flow'] < lower_bound, 'flow'] = lower_bound
        data.loc[data['flow'] > upper_bound, 'flow'] = upper_bound
        
        # 处理缺失值
        data['flow'].fillna(method='ffill', inplace=True)
        
        # 标准化
        data['flow_normalized'] = self.scaler.fit_transform(data['flow'].values.reshape(-1, 1))
        
        return data
    
    def preprocess_image(self, image_path, target_size=(64, 64)):
        """预处理交通图像数据"""
        # 读取图像
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError(f"无法读取图像: {image_path}")
            
        # 调整图像大小
        img = cv2.resize(img, target_size)
        
        # 标准化
        img = img / 255.0
        
        return img
    
    def prepare_sequence_data(self, data, sequence_length=24):
        """准备序列数据"""
        sequences = []
        targets = []
        
        for i in range(len(data) - sequence_length):
            sequence = data[i:(i + sequence_length)]
            target = data[i + sequence_length]
            sequences.append(sequence)
            targets.append(target)
            
        return np.array(sequences), np.array(targets)
    
    def split_data(self, X, y, test_size=0.2, val_size=0.2):
        """划分训练、验证和测试集"""
        # 首先划分训练集和测试集
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42
        )
        
        # 从训练集中划分出验证集
        X_train, X_val, y_train, y_val = train_test_split(
            X_train, y_train, test_size=val_size, random_state=42
        )
        
        return X_train, X_val, X_test, y_train, y_val, y_test
    
class ModelEvaluator:
    @staticmethod
    def calculate_metrics(y_true, y_pred):
        """计算评估指标"""
        # 平均绝对误差
        mae = np.mean(np.abs(y_true - y_pred))
        
        # 均方根误差
        rmse = np.sqrt(np.mean((y_true - y_pred) ** 2))
        
        # 平均绝对百分比误差
        mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100
        
        return {
            'MAE': mae,
            'RMSE': rmse,
            'MAPE': mape
        }
    
    @staticmethod
    def analyze_peak_hours(y_true, y_pred, peak_hours_mask):
        """分析高峰时段预测性能"""
        peak_mae = np.mean(np.abs(y_true[peak_hours_mask] - y_pred[peak_hours_mask]))
        peak_rmse = np.sqrt(np.mean((y_true[peak_hours_mask] - y_pred[peak_hours_mask]) ** 2))
        peak_mape = np.mean(np.abs((y_true[peak_hours_mask] - y_pred[peak_hours_mask]) / y_true[peak_hours_mask])) * 100
        
        return {
            'Peak_MAE': peak_mae,
            'Peak_RMSE': peak_rmse,
            'Peak_MAPE': peak_mape
        }
    
    @staticmethod
    def analyze_prediction_delay(y_true, y_pred, threshold=0.1):
        """分析预测时间延迟"""
        delays = []
        for i in range(len(y_true)-1):
            if abs(y_true[i+1] - y_true[i]) > threshold:
                true_change_point = i + 1
                # 在预测序列中寻找相应的变化点
                for j in range(max(0, i-5), min(len(y_pred), i+6)):
                    if abs(y_pred[j] - y_pred[max(0, j-1)]) > threshold:
                        pred_change_point = j
                        delays.append(pred_change_point - true_change_point)
                        break
        
        return {
            'Mean_Delay': np.mean(delays) if delays else 0,
            'Std_Delay': np.std(delays) if delays else 0
        }
    
    @staticmethod
    def compare_models(models_results):
        """比较不同模型的性能"""
        comparison = pd.DataFrame(models_results)
        comparison = comparison.round(4)
        return comparison 