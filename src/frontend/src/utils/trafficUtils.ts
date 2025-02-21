interface TrafficData {
  timestamps: string[];
  values: number[];
}

interface PredictionData {
  timestamp: string;
  predicted_value: number;
}

interface Stats {
  mean: number;
  max: number;
  min: number;
  std: number;
  peak_hour: number;
  off_peak_hour: number;
  hourly_trend: Record<string, number>;
  last_24h_change: number;
}

interface Analysis {
  weekday_avg: number;
  weekend_avg: number;
  morning_peak_avg: number;
  evening_peak_avg: number;
  peak_ratio: number;
  daily_pattern: string;
}

// 生成基于时间的流量模式
const getBaseTraffic = (hour: number, isWeekend: boolean = false): number => {
  // 早高峰 7-9点
  const morningPeak = hour >= 7 && hour <= 9;
  // 晚高峰 17-19点
  const eveningPeak = hour >= 17 && hour <= 19;
  
  let baseTraffic = 500; // 基础流量
  
  if (morningPeak) {
    baseTraffic = 1200;
  } else if (eveningPeak) {
    baseTraffic = 1500;
  } else if (hour >= 10 && hour <= 16) {
    baseTraffic = 800; // 工作时间
  } else if (hour >= 23 || hour <= 5) {
    baseTraffic = 200; // 夜间时段
  }
  
  // 周末流量降低
  if (isWeekend) {
    baseTraffic *= 0.7;
  }
  
  return baseTraffic;
};

// 生成模拟交通数据
export const generateTrafficData = (count: number): TrafficData => {
  const timestamps: string[] = [];
  const values: number[] = [];
  
  const now = new Date();
  now.setHours(now.getHours() - count + 1);
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() + i * 60 * 60 * 1000);
    const isWeekend = timestamp.getDay() === 0 || timestamp.getDay() === 6;
    
    let value = getBaseTraffic(timestamp.getHours(), isWeekend);
    
    // 添加随机波动 (-10% 到 +10%)
    const fluctuation = 1 + (Math.random() * 0.2 - 0.1);
    value *= fluctuation;
    
    // 添加长期趋势（每天增长0.5%）
    const daysSinceStart = i / 24;
    value *= (1 + daysSinceStart * 0.005);
    
    timestamps.push(timestamp.toISOString());
    values.push(Math.round(value));
  }
  
  return { timestamps, values };
};

// 预测下一小时的交通流量
export const predictNextHour = (data: TrafficData): PredictionData => {
  const lastTimestamp = new Date(data.timestamps[data.timestamps.length - 1]);
  const nextHour = new Date(lastTimestamp.getTime() + 60 * 60 * 1000);
  
  const isWeekend = nextHour.getDay() === 0 || nextHour.getDay() === 6;
  let predictedValue = getBaseTraffic(nextHour.getHours(), isWeekend);
  
  // 考虑最近的趋势
  const recentValues = data.values.slice(-3);
  const trend = (recentValues[2] - recentValues[0]) / 2;
  predictedValue += trend * 0.5;
  
  // 添加随机波动
  const fluctuation = 1 + (Math.random() * 0.1 - 0.05);
  predictedValue *= fluctuation;
  
  return {
    timestamp: nextHour.toISOString(),
    predicted_value: Math.round(predictedValue)
  };
};

// 计算统计信息
export const calculateStats = (data: TrafficData): Stats => {
  const values = data.values;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);
  
  // 计算标准差
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
  const std = Math.sqrt(variance);
  
  // 计算每小时趋势
  const hourlyTrend: Record<string, number[]> = {};
  data.timestamps.forEach((timestamp, index) => {
    const hour = new Date(timestamp).getHours();
    if (!hourlyTrend[hour]) {
      hourlyTrend[hour] = [];
    }
    hourlyTrend[hour].push(values[index]);
  });
  
  const hourlyAverages: Record<string, number> = {};
  Object.keys(hourlyTrend).forEach(hour => {
    const hourValues = hourlyTrend[hour];
    hourlyAverages[hour] = hourValues.reduce((a, b) => a + b, 0) / hourValues.length;
  });
  
  // 计算24小时变化率
  const last24hChange = values.length >= 24 
    ? ((values[values.length - 1] - values[values.length - 24]) / values[values.length - 24]) * 100
    : 0;
  
  return {
    mean,
    max,
    min,
    std,
    peak_hour: parseInt(Object.entries(hourlyAverages).reduce((a, b) => a[1] > b[1] ? a : b)[0]),
    off_peak_hour: parseInt(Object.entries(hourlyAverages).reduce((a, b) => a[1] < b[1] ? a : b)[0]),
    hourly_trend: hourlyAverages,
    last_24h_change: last24hChange
  };
};

// 计算分析信息
export const calculateAnalysis = (data: TrafficData): Analysis => {
  const weekdayValues: number[] = [];
  const weekendValues: number[] = [];
  const morningPeakValues: number[] = [];
  const eveningPeakValues: number[] = [];
  
  data.timestamps.forEach((timestamp, index) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const value = data.values[index];
    
    if (isWeekend) {
      weekendValues.push(value);
    } else {
      weekdayValues.push(value);
    }
    
    if (hour >= 7 && hour <= 9) {
      morningPeakValues.push(value);
    } else if (hour >= 17 && hour <= 19) {
      eveningPeakValues.push(value);
    }
  });
  
  const weekday_avg = weekdayValues.reduce((a, b) => a + b, 0) / weekdayValues.length;
  const weekend_avg = weekendValues.reduce((a, b) => a + b, 0) / weekendValues.length;
  const morning_peak_avg = morningPeakValues.reduce((a, b) => a + b, 0) / morningPeakValues.length;
  const evening_peak_avg = eveningPeakValues.reduce((a, b) => a + b, 0) / eveningPeakValues.length;
  
  const peak_ratio = Math.max(morning_peak_avg, evening_peak_avg) / Math.min(morning_peak_avg, evening_peak_avg);
  
  let daily_pattern = "双高峰模式";
  if (morning_peak_avg > evening_peak_avg * 1.2) {
    daily_pattern = "早高峰主导";
  } else if (evening_peak_avg > morning_peak_avg * 1.2) {
    daily_pattern = "晚高峰主导";
  }
  
  return {
    weekday_avg,
    weekend_avg,
    morning_peak_avg,
    evening_peak_avg,
    peak_ratio,
    daily_pattern
  };
}; 