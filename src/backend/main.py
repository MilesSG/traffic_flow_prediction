from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import torch
from datetime import datetime, timedelta
import pandas as pd
from models.traffic_cnn import TrafficCNN
from utils.data_processor import DataProcessor

app = FastAPI(title="Traffic Flow Prediction API")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 初始化全局变量
current_data = None
model = None
data_processor = None

def init_app():
    """初始化应用程序"""
    global current_data, model, data_processor
    
    if current_data is None:
        current_data = generate_traffic_data()
    
    if model is None:
        model = TrafficCNN()
        # 如果有预训练模型，加载它
        # model.load_state_dict(torch.load('best_model.pth'))
        model.eval()
    
    if data_processor is None:
        data_processor = DataProcessor()

def generate_traffic_data(n_samples: int = 1000) -> pd.DataFrame:
    """生成模拟交通数据"""
    dates = [datetime.now() - timedelta(hours=i) for i in range(n_samples)]
    dates.reverse()
    
    # 生成基础流量
    hours = np.array([t.hour for t in dates])
    weekdays = np.array([t.weekday() for t in dates])
    
    # 基础日变化模式（双峰模式：早晚高峰）
    morning_peak = np.exp(-((hours - 8) ** 2) / 8)  # 早高峰约在8点
    evening_peak = np.exp(-((hours - 18) ** 2) / 8)  # 晚高峰约在18点
    daily_pattern = 1000 + 1500 * (morning_peak + evening_peak)
    
    # 工作日/周末模式
    weekday_factor = np.where(weekdays < 5, 1.2, 0.8)  # 工作日流量较大
    
    # 随机波动
    base_noise = np.random.normal(0, 0.1, n_samples)
    trend_noise = np.random.normal(0, 0.05, n_samples).cumsum() / 100
    
    # 组合所有因素
    traffic_flow = (daily_pattern * weekday_factor * (1 + base_noise + trend_noise))
    traffic_flow = np.maximum(traffic_flow, 0)  # 确保流量非负
    
    return pd.DataFrame({
        'timestamp': dates,
        'traffic_flow': traffic_flow.astype(int)
    })

@app.on_event("startup")
async def startup_event():
    """启动时初始化应用"""
    init_app()

@app.get("/")
async def root():
    return {"message": "Traffic Flow Prediction API"}

@app.get("/data/current")
async def get_current_data():
    """获取当前交通数据"""
    global current_data
    if current_data is None:
        init_app()
    
    data = current_data.tail(100).copy()
    return {
        "timestamps": data['timestamp'].dt.strftime('%Y-%m-%d %H:%M:%S').tolist(),
        "values": data['traffic_flow'].tolist()
    }

@app.get("/predict")
async def predict_traffic():
    """预测交通流量"""
    global current_data, model, data_processor
    if current_data is None or model is None or data_processor is None:
        init_app()
    
    # 准备输入数据
    recent_data = current_data.tail(24)['traffic_flow'].values
    normalized_data = data_processor.scaler.fit_transform(recent_data.reshape(-1, 1))
    
    # 转换为PyTorch张量
    x = torch.FloatTensor(normalized_data).view(1, 1, -1)
    
    # 预测
    with torch.no_grad():
        prediction = model(x)
        prediction = data_processor.scaler.inverse_transform(prediction.numpy().reshape(-1, 1))[0][0]
    
    # 生成预测时间点
    next_time = current_data['timestamp'].iloc[-1] + timedelta(hours=1)
    
    return {
        "timestamp": next_time.strftime('%Y-%m-%d %H:%M:%S'),
        "predicted_value": float(prediction)
    }

@app.get("/stats")
async def get_statistics():
    """获取统计信息"""
    global current_data
    if current_data is None:
        init_app()
    
    recent_data = current_data.tail(24)
    hourly_stats = recent_data.groupby(recent_data['timestamp'].dt.hour)['traffic_flow'].mean()
    
    return {
        "mean": float(current_data['traffic_flow'].mean()),
        "max": float(current_data['traffic_flow'].max()),
        "min": float(current_data['traffic_flow'].min()),
        "std": float(current_data['traffic_flow'].std()),
        "peak_hour": int(hourly_stats.idxmax()),
        "off_peak_hour": int(hourly_stats.idxmin()),
        "hourly_trend": hourly_stats.to_dict(),
        "last_24h_change": float(
            (recent_data['traffic_flow'].iloc[-1] - recent_data['traffic_flow'].iloc[0]) 
            / recent_data['traffic_flow'].iloc[0] * 100
        )
    }

@app.get("/analysis")
async def get_analysis():
    """获取分析数据"""
    global current_data
    if current_data is None:
        init_app()
    
    weekday_avg = current_data[current_data['timestamp'].dt.weekday < 5]['traffic_flow'].mean()
    weekend_avg = current_data[current_data['timestamp'].dt.weekday >= 5]['traffic_flow'].mean()
    
    morning_peak = current_data[current_data['timestamp'].dt.hour.between(7, 9)]['traffic_flow'].mean()
    evening_peak = current_data[current_data['timestamp'].dt.hour.between(17, 19)]['traffic_flow'].mean()
    
    return {
        "weekday_avg": float(weekday_avg),
        "weekend_avg": float(weekend_avg),
        "morning_peak_avg": float(morning_peak),
        "evening_peak_avg": float(evening_peak),
        "peak_ratio": float(max(morning_peak, evening_peak) / current_data['traffic_flow'].mean()),
        "daily_pattern": "双峰" if abs(morning_peak - evening_peak) < 0.2 * max(morning_peak, evening_peak) else "单峰"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 