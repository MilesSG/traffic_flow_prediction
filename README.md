# 🚗 基于深度学习的交通流量预测系统 (Traffic Flow Prediction System Based on Deep Learning)

> 基于深度学习的多源数据融合交通流量预测与分析系统 | A Multi-source Data Fusion Traffic Flow Prediction and Analysis System Based on Deep Learning

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue?logo=python)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-1.9.1-red?logo=pytorch)](https://pytorch.org/)
[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.4.4-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-4.24.16-blue?logo=ant-design)](https://ant.design/)
[![ECharts](https://img.shields.io/badge/ECharts-5.6.0-red?logo=apache-echarts)](https://echarts.apache.org/)

## 📝 项目概述 (Project Overview)

本项目旨在通过深度学习技术，结合交通流量数据和图像数据，实现高精度的交通流量预测。系统采用多源数据融合方法，通过卷积神经网络(CNN)提取图像空间特征，并与历史流量数据相结合，构建端到端的预测模型。

### 🎯 研究目标 (Research Objectives)

1. 多源数据融合的交通流量预测
2. 深度学习模型的优化与评估
3. 预测模型的对比分析与验证

## 🔬 研究方法 (Methodology)

### 数据处理 (Data Processing)
- 交通流量数据预处理
  - 异常值检测与处理
  - 缺失值插补
  - 数据标准化
- 图像数据处理
  - 图像预处理与增强
  - 特征提取
  - 数据标准化

### 模型架构 (Model Architecture)
1. **CNN模型**
   - 用于图像特征提取
   - 空间特征学习
   - 多层卷积结构

2. **时序预测模型**
   - LSTM层
   - 注意力机制
   - 全连接层

3. **融合模块**
   - 特征融合
   - 多任务学习
   - 预测输出

### 对比实验 (Comparative Experiments)
- 基准模型
  - ARIMA
  - SVR
  - 传统神经网络
- 深度学习模型
  - CNN
  - LSTM
  - GRU
  - 混合模型

## 🛠️ 技术栈 (Tech Stack)

### 深度学习框架 (Deep Learning Framework)
- PyTorch
- NumPy
- Pandas
- OpenCV
- Scikit-learn

### 前端技术 (Frontend)
- React + TypeScript
- Ant Design
- ECharts

### 后端技术 (Backend)
- FastAPI
- Python

## 📊 系统功能 (System Features)

1. **数据管理**
   - 数据采集与存储
   - 数据预处理
   - 数据可视化

2. **模型训练**
   - 模型参数配置
   - 训练过程监控
   - 模型评估

3. **预测分析**
   - 实时流量预测
   - 预测结果可视化
   - 模型性能对比

4. **系统监控**
   - 实时数据监测
   - 系统状态监控
   - 预警机制

## 📈 实验结果 (Experimental Results)

### 模型性能对比
| 模型 | MAE | RMSE | MAPE |
|-----|-----|------|------|
| ARIMA | - | - | - |
| SVR | - | - | - |
| CNN | - | - | - |
| LSTM | - | - | - |
| 本文模型 | - | - | - |

### 预测效果分析
- 峰值预测准确率
- 时间延迟分析
- 预测稳定性评估

## 🚀 快速开始 (Quick Start)

### 环境要求 (Prerequisites)
- Python >= 3.8
- PyTorch >= 1.9.1
- Node.js >= 16.x
- npm >= 7.x

### 安装和运行 (Installation and Running)

#### 方法一：使用自动脚本（推荐）

1. 克隆项目
```bash
git clone https://github.com/MilesSG/traffic_flow_prediction.git
cd traffic_flow_prediction
```

2. 运行启动脚本
```bash
# Windows PowerShell
.\start-all.ps1
```

#### 方法二：手动启动

1. 克隆项目
```bash
git clone https://github.com/MilesSG/traffic_flow_prediction.git
cd traffic_flow_prediction
```

2. 安装Python依赖
```bash
pip install -r requirements.txt
```

3. 安装前端依赖
```bash
cd src/frontend
npm install
cd ../..
```

4. 启动后端服务
```bash
cd src/backend
python -m uvicorn main:app --reload
```

5. 启动前端服务（新终端）
```bash
cd src/frontend
set NODE_OPTIONS=--openssl-legacy-provider  # Windows
npm start
```

### 访问系统

启动成功后，可以通过以下地址访问系统：

- 前端界面：http://localhost:3000
- API文档：http://localhost:8000/docs

### 常见问题

1. 如果遇到 OpenSSL 相关错误，请设置环境变量：
```bash
set NODE_OPTIONS=--openssl-legacy-provider  # Windows
export NODE_OPTIONS=--openssl-legacy-provider  # Linux/Mac
```

2. 如果端口 3000 被占用，系统会自动询问是否使用其他端口。

3. 如果需要停止服务：
   - Windows: 按 Ctrl+C
   - 或关闭终端窗口

## 📊 实验过程 (Experimental Process)

### 数据集 (Dataset)
- 交通流量数据
- 交通图像数据
- 数据划分比例

### 评估指标 (Evaluation Metrics)
- MAE (平均绝对误差)
- RMSE (均方根误差)
- MAPE (平均绝对百分比误差)

### 实验设置 (Experimental Settings)
- 模型参数配置
- 训练策略
- 优化方法

## 🤝 贡献指南 (Contributing)

欢迎提交问题和改进建议！
Feel free to submit issues and enhancement requests!

## 📜 许可证 (License)

[MIT](LICENSE)

## 👨‍💻 作者 (Author)

MilesSG

---

⭐️ 如果这个项目对你有帮助，请给它一个星标！
⭐️ If you find this project helpful, please give it a star! 