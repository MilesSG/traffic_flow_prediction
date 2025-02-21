import React, { useEffect, useState, useCallback } from 'react';
import { Layout, Card, Row, Col, Statistic, Button, Space, Alert, Badge, Tooltip, Divider, Tag } from 'antd';
import ReactECharts from 'echarts-for-react';
import { ArrowUpOutlined, ArrowDownOutlined, ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { generateTrafficData, predictNextHour, calculateStats, calculateAnalysis } from './utils/trafficUtils';

const { Header, Content } = Layout;

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

const REFRESH_INTERVAL = 1000; // 1秒刷新一次

const App: React.FC = () => {
  const [trafficData, setTrafficData] = useState<TrafficData>({ timestamps: [], values: [] });
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [chartInstance, setChartInstance] = useState<any>(null);

  const fetchData = useCallback(() => {
    try {
      // 生成模拟数据
      const data = generateTrafficData(100);
      
      // 平滑更新数据
      if (chartInstance) {
        const series = chartInstance.getOption().series;
        series[0].data = data.values;
        chartInstance.setOption({
          xAxis: {
            data: data.timestamps
          },
          series: series
        }, {
          animation: true,
          animationDuration: 1000,
          animationEasing: 'quadraticInOut'
        });
      }
      
      setTrafficData(data);
      
      // 计算统计信息
      const statsData = calculateStats(data);
      setStats(statsData);
      
      // 计算分析信息
      const analysisData = calculateAnalysis(data);
      setAnalysis(analysisData);
      
      setLastUpdateTime(new Date());
      setError('');
    } catch (error) {
      console.error('Error generating data:', error);
      setError('生成数据时发生错误');
    }
  }, [chartInstance]);

  const getPrediction = () => {
    setLoading(true);
    try {
      const predictionResult = predictNextHour(trafficData);
      setPrediction(predictionResult);
      
      // 更新图表数据
      const newData = {
        timestamps: [...trafficData.timestamps, predictionResult.timestamp],
        values: [...trafficData.values, predictionResult.predicted_value]
      };
      setTrafficData(newData);
      
      // 更新统计信息
      const statsData = calculateStats(newData);
      setStats(statsData);
      
      // 更新分析信息
      const analysisData = calculateAnalysis(newData);
      setAnalysis(analysisData);
      
      setError('');
    } catch (error) {
      setError('预测失败，请稍后重试');
      console.error('Error getting prediction:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  const getChartOption = () => ({
    title: {
      text: '实时交通流量数据',
      left: 'center',
      subtext: `上次更新: ${lastUpdateTime.toLocaleTimeString()}`
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const time = new Date(params[0].axisValue).toLocaleString();
        const value = params[0].data;
        return `时间：${time}<br/>流量：${value} 辆/小时`;
      }
    },
    xAxis: {
      type: 'category',
      data: trafficData.timestamps,
      axisLabel: {
        formatter: (value: string) => {
          return new Date(value).toLocaleTimeString();
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '交通流量（辆/小时）',
      animation: true
    },
    series: [
      {
        name: '实际流量',
        type: 'line',
        data: trafficData.values,
        smooth: true,
        lineStyle: {
          color: '#1890ff',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(24,144,255,0.3)'
            }, {
              offset: 1,
              color: 'rgba(24,144,255,0.1)'
            }]
          }
        },
        animation: true,
        animationDuration: 1000,
        animationEasing: 'quadraticInOut'
      },
      prediction ? {
        name: '预测流量',
        type: 'line',
        data: [...Array(trafficData.values.length - 1).fill(null), prediction.predicted_value],
        lineStyle: {
          type: 'dashed',
          color: '#52c41a'
        },
        symbol: 'circle',
        symbolSize: 8
      } : {}
    ]
  });

  const getHourlyTrendOption = () => {
    if (!stats?.hourly_trend) return {};
    
    const hours = Object.keys(stats.hourly_trend);
    const values = Object.values(stats.hourly_trend);
    
    return {
      title: {
        text: '24小时流量趋势',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: hours.map(h => `${h}:00`),
        name: '小时'
      },
      yAxis: {
        type: 'value',
        name: '平均流量'
      },
      series: [{
        data: values,
        type: 'bar',
        name: '平均流量',
        itemStyle: {
          color: '#1890ff'
        }
      }]
    };
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ color: '#1890ff', margin: 0 }}>交通流量预测系统</h1>
        <Space>
          <Tooltip title={`每${REFRESH_INTERVAL/1000}秒自动更新`}>
            <Badge status="processing" text={
              <Space>
                <SyncOutlined spin />
                实时更新中
              </Space>
            } />
          </Tooltip>
        </Space>
      </Header>
      <Content style={{ padding: '20px' }}>
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}
        
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="平均流量"
                  value={stats?.mean.toFixed(2)}
                  precision={2}
                  suffix="辆/小时"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="最大流量"
                  value={stats?.max}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="辆/小时"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="最小流量"
                  value={stats?.min}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="辆/小时"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="24小时变化率"
                  value={stats?.last_24h_change}
                  precision={2}
                  valueStyle={{ color: (stats?.last_24h_change ?? 0) >= 0 ? '#3f8600' : '#cf1322' }}
                  prefix={(stats?.last_24h_change ?? 0) >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={16}>
              <Card
                title="交通流量实时监测"
                extra={
                  <Space>
                    <span style={{ fontSize: '12px', color: '#999' }}>
                      上次更新: {lastUpdateTime.toLocaleTimeString()}
                    </span>
                    <Button type="primary" onClick={getPrediction} loading={loading}>
                      预测下一小时
                    </Button>
                  </Space>
                }
              >
                <ReactECharts
                  option={getChartOption()}
                  style={{ height: '400px' }}
                  onChartReady={(chart) => setChartInstance(chart)}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="交通流量分析">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Statistic
                    title="工作日平均流量"
                    value={analysis?.weekday_avg.toFixed(2)}
                    suffix="辆/小时"
                  />
                  <Statistic
                    title="周末平均流量"
                    value={analysis?.weekend_avg.toFixed(2)}
                    suffix="辆/小时"
                  />
                  <Divider />
                  <Statistic
                    title="早高峰流量 (7:00-9:00)"
                    value={analysis?.morning_peak_avg.toFixed(2)}
                    suffix="辆/小时"
                  />
                  <Statistic
                    title="晚高峰流量 (17:00-19:00)"
                    value={analysis?.evening_peak_avg.toFixed(2)}
                    suffix="辆/小时"
                  />
                  <Tag color="blue" style={{ marginTop: 16 }}>
                    日流量模式: {analysis?.daily_pattern}
                  </Tag>
                </Space>
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Card title="24小时流量趋势">
                <ReactECharts
                  option={getHourlyTrendOption()}
                  style={{ height: '300px' }}
                />
              </Card>
            </Col>
          </Row>

          {prediction && (
            <Card title="预测结果">
              <Row gutter={16}>
                <Col span={8}>
                  <Statistic
                    title="预测时间"
                    value={prediction.timestamp}
                    prefix={<ClockCircleOutlined />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="预测流量"
                    value={prediction.predicted_value}
                    precision={2}
                    suffix="辆/小时"
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="相对当前变化"
                    value={((prediction.predicted_value - trafficData.values[trafficData.values.length - 1]) / trafficData.values[trafficData.values.length - 1] * 100).toFixed(2)}
                    precision={2}
                    prefix={prediction.predicted_value >= trafficData.values[trafficData.values.length - 1] ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    valueStyle={{ color: prediction.predicted_value >= trafficData.values[trafficData.values.length - 1] ? '#3f8600' : '#cf1322' }}
                    suffix="%"
                  />
                </Col>
              </Row>
            </Card>
          )}
        </Space>
      </Content>
    </Layout>
  );
};

export default App; 