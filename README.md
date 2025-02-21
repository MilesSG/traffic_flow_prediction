# 🚗 交通流量预测系统 (Traffic Flow Prediction System)

> 一个基于深度学习的实时交通流量预测和分析系统 | A real-time traffic flow prediction and analysis system based on deep learning

![React](https://img.shields.io/badge/React-17.0.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-4.4.2-blue) ![Ant Design](https://img.shields.io/badge/Ant%20Design-4.16.13-blue) ![ECharts](https://img.shields.io/badge/ECharts-5.2.2-blue)

## ✨ 功能特点 (Features)

* 📊 实时交通流量监测和可视化
* 🔮 基于深度学习的交通流量预测
* 📈 交通数据统计分析
* 📅 工作日/周末流量对比
* 🌅 早晚高峰特征分析
* ⚡ 实时数据更新（1秒/次）
* 📱 响应式界面设计
* 🎯 多模型预测支持
* 🔍 历史数据查询
* 📋 自定义报表导出

## 🛠️ 技术栈 (Tech Stack)

### 前端 (Frontend)
* ⚛️ React + TypeScript
* 🎨 Ant Design UI 框架
* 📊 ECharts 数据可视化
* ⚡ WebSocket 实时数据更新
* 📱 响应式设计

### 后端 (Backend)
* 🐍 Python FastAPI
* 🧠 深度学习框架 (PyTorch)
* 📦 MongoDB 数据库
* 🔄 Redis 缓存
* 🔐 JWT 认证

### 部署 (Deployment)
* 🐳 Docker 容器化
* 🚀 Nginx 反向代理
* 🔄 CI/CD 自动化部署
* 📊 Prometheus 监控
* 📈 Grafana 可视化

## 📊 模型性能对比 (Model Performance)

| 模型(Model) | MAE | RMSE | MAPE |
|------------|-----|------|------|
| ARIMA | 245.3 | 312.5 | 15.2% |
| SVR | 198.6 | 256.4 | 12.8% |
| CNN | 156.2 | 198.7 | 9.6% |
| LSTM | 142.8 | 185.3 | 8.9% |
| 本文模型(Ours) | **128.5** | **169.4** | **7.8%** |

> 注: 性能指标越低越好 (Lower values indicate better performance)
- MAE: 平均绝对误差 (Mean Absolute Error)
- RMSE: 均方根误差 (Root Mean Square Error)
- MAPE: 平均绝对百分比误差 (Mean Absolute Percentage Error)

## 🚀 快速开始 (Quick Start)

### 环境要求 (Prerequisites)
* 🐍 Python >= 3.8
* ⚛️ Node.js >= 16.x
* 📦 npm >= 7.x
* 🗄️ MongoDB >= 4.4
* 📦 Redis >= 6.0

### 安装步骤 (Installation)

1. 克隆项目 (Clone the repository)
```bash
git clone https://github.com/MilesSG/traffic_flow_prediction.git
cd traffic_flow_prediction
```

2. 安装后端依赖 (Install backend dependencies)
```bash
cd backend
pip install -r requirements.txt
```

3. 安装前端依赖 (Install frontend dependencies)
```bash
cd frontend
npm install
```

4. 启动开发服务器 (Start development servers)
```bash
# 启动后端服务
python main.py

# 启动前端服务
npm start
```

5. 在浏览器中打开 (Open in browser)
```
http://localhost:3000
```

## 📊 主要功能展示 (Main Features)

### 🔄 实时监测 (Real-time Monitoring)
* 交通流量实时数据展示
* 自动数据更新（1秒/次）
* 平滑数据过渡动画
* 异常流量警报

### 📈 数据分析 (Data Analysis)
* 24小时流量趋势分析
* 工作日/周末流量对比
* 高峰时段特征分析
* 节假日流量预测

### 🔮 预测功能 (Prediction)
* 多时间尺度预测
  - 短期（15分钟）
  - 中期（1小时）
  - 长期（24小时）
* 多模型融合预测
* 预测结果可视化
* 预测精度评估

## 📱 系统界面 (Interface)

### 主要组件 (Main Components)
* 📊 实时交通流量图表
* 📈 多维度统计图表
* 🎛️ 预测模型控制面板
* 📋 数据导出功能

## 🔧 配置说明 (Configuration)

### 环境变量 (Environment Variables)
```bash
# 后端服务配置
PORT=8000
MONGODB_URI=mongodb://localhost:27017/traffic
REDIS_URI=redis://localhost:6379

# 前端配置
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8000/ws
```

## 🤝 贡献指南 (Contributing)

欢迎提交问题和改进建议！ Feel free to submit issues and enhancement requests!

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📜 许可证 (License)

MIT © [MilesSG](https://github.com/MilesSG)

## 👨‍💻 作者 (Author)

MilesSG

---

⭐️ 如果这个项目对你有帮助，请给它一个星标！ ⭐️ If you find this project helpful, please give it a star! 