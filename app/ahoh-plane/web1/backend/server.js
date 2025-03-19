const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomInt, randomFloat } = require('./utils');

class VirtualDevice {
  // ... 保持原有VirtualDevice类定义不变 ...
}

// 服务初始化
const app = express();
app.use(cors());
app.use(bodyParser.json());
const devices = new Map();

// 添加测试设备（开发模式）
if (process.env.NODE_ENV === 'development') {
  // 初始化测试设备
  ['aircon', 'tv', 'light'].forEach((type, index) => {
    const device = new VirtualDevice(type);
    device.status = index % 2 === 0 ? 'online' : 'offline';
    devices.set(`TEST-${type}-${index}`, device);
  });
}

// 状态监控模块增强
const statusMonitor = {
  checkStatus: () => {
    devices.forEach(device => {
      const timeout = device.meta.heartbeat_interval * 2000;
      device.status = (Date.now() - device.lastHeartbeat) < timeout ? 'online' : 'offline';
    });
  },
  simulateFailure: (deviceId) => {
    const device = devices.get(deviceId);
    if (device) {
      device.lastHeartbeat = Date.now() - 1000 * 60 * 5; // 模拟5分钟未更新
    }
  }
};

// 新增测试端点
app.post('/testing/reset', (req, res) => {
  devices.clear();
  res.json({ status: '所有设备已重置' });
});

app.post('/testing/generate-devices', (req, res) => {
  // 添加请求体验证
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: '请求体不能为空' });
  }

  const { type = 'random', count = 5 } = req.body;
  
  // 增强参数校验
  const validTypes = ['aircon', 'tv', 'light'];
  const generateType = type === 'random' 
    ? validTypes[Math.floor(Math.random() * 3)]
    : type;

  if (!validTypes.includes(generateType)) {
    return res.status(400).json({ 
      error: '无效的设备类型',
      allowed_types: validTypes
    });
  }

  // 限制生成数量范围
  const safeCount = Math.min(Math.max(parseInt(count), 1), 100);
  
  try {
    const newDevices = Array.from({ length: safeCount }, () => {
      const device = new VirtualDevice(generateType);
      devices.set(device.device_id, device);
      return device;
    });

    res.json({
      generated: newDevices.length,
      devices: newDevices,
      success: true
    });
  } catch (error) {
    console.error('设备生成失败:', error);
    res.status(500).json({ 
      error: '内部服务器错误',
      details: error.message 
    });
  }
});

// 修改设备状态检查间隔为可配置
const MONITOR_INTERVAL = process.env.NODE_ENV === 'test' ? 1000 : 5000;
setInterval(statusMonitor.checkStatus, MONITOR_INTERVAL);

// 在现有测试端点后添加设备操作端点
app.get('/devices', (req, res) => {
  res.json([...devices.values()]);
});

app.post('/devices', (req, res) => {
  const device = new VirtualDevice(req.body.type);
  devices.set(device.device_id, device);
  res.json(device);
});

// 添加DELETE端点
app.delete('/devices/:deviceId', (req, res) => {
  const { deviceId } = req.params;
  if (devices.has(deviceId)) {
    devices.delete(deviceId);
    res.json({ status: 'success' });
  } else {
    res.status(404).json({ error: 'Device not found' });
  }
});

// 保持原有设备API端点不变 ...

// 启动服务
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`设备服务运行中：http://localhost:${PORT}`);
  if (process.env.NODE_ENV === 'development') {
    console.log('测试端点已启用：');
    console.log(`POST /testing/reset       重置所有设备`);
    console.log(`POST /testing/devices     批量创建设备`);
  }
});