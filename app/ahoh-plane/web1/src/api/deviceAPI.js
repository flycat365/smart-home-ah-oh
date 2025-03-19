// 设备模拟器开关（开发模式自动启用）
const useMockAPI = process.env.NODE_ENV !== 'production';

// 虚拟服务响应时间（开发模式使用）
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// 设备类型枚举
const DeviceType = {
  AIRCON: 'aircon',
  TV: 'tv',
  LIGHT: 'light'
};

// 生成随机设备数据
const generateMockDevice = (type) => {
  const randomHex = () => Math.floor(Math.random()*256).toString(16).padStart(2,'0');
  
  const baseDevice = {
    id: `${type}-${Math.random().toString(36).slice(2, 7)}`,
    status: 'online',
    lastUpdated: new Date().toISOString(),
    meta: {
      type: type,
      firmware: 'v2.1.0'
    }
  };

  switch(type) {
    case DeviceType.AIRCON:
      return {
        ...baseDevice,
        temperature: 24 + Math.floor(Math.random() * 6),
        mode: ['cool', 'heat', 'dry'][Math.floor(Math.random()*3)],
        fanSpeed: ['low', 'medium', 'high'][Math.floor(Math.random()*3)]
      };
    case DeviceType.TV:
      return {
        ...baseDevice,
        channel: Math.floor(Math.random()*100),
        volume: 30 + Math.floor(Math.random()*40),
        inputSource: ['HDMI1', 'HDMI2', 'AV'][Math.floor(Math.random()*3)]
      };
    case DeviceType.LIGHT:
      return {
        ...baseDevice,
        brightness: Math.floor(Math.random()*100),
        color: `#${randomHex()}${randomHex()}${randomHex()}`,
        isDimmable: Math.random() > 0.5
      };
    default:
      return baseDevice;
  }
};

// API请求封装器
// 在apiClient之后添加测试模块
const testModule = {
  _mockData: [],
  _errorRate: 0,
  
  // 重置模拟数据
  reset() {
    this._mockData = [];
    this._errorRate = 0;
    console.log('[测试模式] 已重置模拟数据');
  },

  // 设置错误率（0-1）
  setErrorRate(rate) {
    this._errorRate = Math.min(1, Math.max(0, rate));
    console.log(`[测试模式] 错误率设置为 ${this._errorRate * 100}%`);
  },

  // 批量生成测试设备
  generateDevices(count = 5) {
    this._mockData = Array.from({ length: count }, () => {
      const type = [DeviceType.AIRCON, DeviceType.TV, DeviceType.LIGHT][
        Math.floor(Math.random() * 3)
      ];
      return generateMockDevice(type);
    });
    console.log(`[测试模式] 已生成 ${count} 台测试设备`);
  }
};

// 修改apiClient以支持测试模式
const apiClient = {
  get: async (url) => {
    if(useMockAPI) {
      await mockDelay();
      
      // 模拟随机错误
      if(Math.random() < testModule._errorRate) {
        throw new Error('模拟API请求失败');
      }

      return { 
        data: testModule._mockData.length > 0 
          ? testModule._mockData 
          : Array.from({length: 5}, () => generateMockDevice(
            [DeviceType.AIRCON, DeviceType.TV, DeviceType.LIGHT][Math.floor(Math.random()*3)]
          )) 
      };
    }
    
    const response = await fetch(`http://localhost:3000${url}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },

  post: async (url, data) => {
    if(useMockAPI) {
      await mockDelay();
      return { data: { ...data, id: `mock-${Date.now()}` } };
    }

    const response = await fetch(`http://localhost:3000${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  }
};

// 设备操作接口
export const deviceAPI = {
  // 获取设备列表
  fetchDevices: async () => {
    const response = await apiClient.get('/devices');
    return response.data;
  },

  // 创建设备
  createDevice: async (deviceType) => {
    const response = await apiClient.post('/devices', { type: deviceType });
    return response.data;
  },

  // 更新设备属性
  updateDevice: async (deviceId, attributes) => {
    if(useMockAPI) {
      await mockDelay();
      return { ...attributes, lastUpdated: new Date().toISOString() };
    }
    
    const response = await apiClient.post(`/devices/${deviceId}`, attributes);
    return response.data;
  },

  // 删除设备
  deleteDevice: async (deviceId) => {
    if(useMockAPI) {
      await mockDelay();
      return { status: 'success' };
    }

    const response = await fetch(`http://localhost:3000/devices/${deviceId}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};