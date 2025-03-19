<template>
  <div class="device-dashboard">
    <header class="header">
      <!-- 在原有时间天气基础上添加系统状态 -->
      <div class="system-status">
        <div class="status-item">
          <span class="icon">📶</span>
          <span>在线设备：{{ statusOverview.onlineDevices }}/{{ demoDevices.length }}</span>
        </div>
        <div class="status-item">
          <span class="icon">💻</span>
          <span>终端状态：{{ statusOverview.terminalStatus }}</span>
        </div>
        <div class="status-item">
          <span class="icon">🌐</span>
          <span>网络质量：{{ statusOverview.networkQuality }}</span>
        </div>
      </div>
      <div class="time">{{ currentTime }}</div>
      <div class="weather">{{ weatherInfo }}</div>
    </header>

    <!-- 进度条显示控制终端状态 -->
    <div class="progress-bar-container">
      <label>控制终端运行内存:</label>
      <div class="progress-bar">
        <div class="progress" :style="{ width: memoryUsage + '%' }"></div>
      </div>
      <span>{{ memoryUsage }}%</span>
    </div>

    <!-- 设备管理按钮 -->
    <div class="button-group">
      <button @click="addDevice">增加</button>
      <button @click="editDevice">修改</button>
      <button @click="deleteDevice">删除</button>
      <button @click="monitorDevice">监控</button>
    </div>

    <!-- 在控制栏后添加运行状态指示 -->
    <div class="runtime-status">
      <div class="status-light" :class="statusOverview.terminalStatus"></div>
      <span>智能中枢运行中（{{ operationTime }}）</span>
    </div>

    <!-- 修改设备卡片部分增加状态显示 -->
    <!-- 修复设备列表结构 -->
    <div v-if="demoDevices.length === 0" class="empty-state">
      <div class="empty-icon">📭</div>
      <p>暂无设备，点击上方按钮添加设备</p>
    </div>

    <div v-else class="device-grid">
      <DeviceCard 
        v-for="device in demoDevices"
        :key="device.id"
        :device="device"
        :network-status="getNetworkStatus(device)"
        @select="showDetails"
      />
    </div>
  </div>
</template>

<script>
import DeviceCard from '../components/DeviceCard.vue'

export default {
  components: {
    DeviceCard
  },
  data() {
    return {
      // 新增状态数据
      statusOverview: {
        onlineDevices: 0,
        terminalStatus: '正常',
        networkQuality: '优秀'
      },
      operationTime: '0天0小时',
      currentTime: new Date().toLocaleTimeString(),
      weatherInfo: '晴朗', // 假设默认天气信息
      demoDevices: [
        { id: 1, type: 'aircon', meta: { types: ['air-con'] }, name: '空调A', status: 'online', temperature: 25, mode: '冷风', fan_speed: '高', signalStrength: 85 },
        { id: 2, type: 'tv', meta: { types: ['smart-tv'] }, name: '电视B', status: 'offline', channel: 10, volume: 30, power: true, signalStrength: 40 },
        { id: 3, type: 'light', meta: { types: ['smart-light'] }, name: '灯泡C', status: 'online', brightness: 70, color: '白色', power: false, signalStrength: 60 }
      ],
      selectedDevice: null,
      memoryUsage: 50 // 假设初始内存使用率为50%
    };
  },
  mounted() {
    this.updateSystemStatus();
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
      // 模拟内存使用率变化
      this.memoryUsage = Math.floor(Math.random() * 100);
    }, 1000);
  },
  methods: {
    // 新增状态计算方法
    updateSystemStatus() {
      this.statusOverview.onlineDevices = this.demoDevices.filter(d => d.status === 'online').length;
      this.operationTime = this.calculateRuntime();
    },
    getNetworkStatus(device) {
      return device.signalStrength > 75 ? 'strong' : 
             device.signalStrength > 50 ? 'medium' : 'weak';
    },
    calculateRuntime() {
      const start = new Date(2023, 7, 1);
      const diff = Date.now() - start;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      return `${days}天${hours}小时`;
    },
    showDetails(device) {
      this.selectedDevice = device;
      this.$router.push({ name: 'DeviceDetails', params: { deviceId: device.id } });
    },
    addDevice() {
      console.log('Adding a new device');
      // 实现添加设备逻辑
    },
    editDevice() {
      if (!this.selectedDevice) {
        alert('请选择一个设备进行修改');
        return;
      }
      console.log('Editing device:', this.selectedDevice);
      // 实现修改设备逻辑
    },
    deleteDevice() {
      if (!this.selectedDevice) {
        alert('请选择一个设备进行删除');
        return;
      }
      this.demoDevices = this.demoDevices.filter(d => d.id !== this.selectedDevice.id);
      this.selectedDevice = null;
      console.log('Deleting device:', this.selectedDevice);
      // 实现删除设备逻辑
    },
    monitorDevice() {
      if (!this.selectedDevice) {
        alert('请选择一个设备进行监控');
        return;
      }
      console.log('Monitoring device:', this.selectedDevice);
      // 实现监控设备逻辑
    },
    updateDevice(updatedDevice) {
      const index = this.demoDevices.findIndex(d => d.id === updatedDevice.id);
      if (index !== -1) {
        this.demoDevices[index] = updatedDevice;
      }
    }
  }
};
</script>

<style scoped>
/* 新增状态样式 */
.system-status {
  display: flex;
  gap: 20px;
  background: #2c3e50;
  padding: 12px;
  border-radius: 8px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9em;
}

.runtime-status {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: #34495e;
  margin: 15px 0;
}

.status-light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #2ecc71;
}

.status-light.warning {
  background: #f1c40f;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}

/* 设备卡片样式 */
.device-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.device-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: red;
}

.status-dot.active {
  background-color: green;
}

.device-properties p {
  margin: 5px 0;
}

.device-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.empty-state {
  text-align: center;
  color: #7f8c8d;
}

.header {
  margin-bottom: 20px;
}

.time, .weather {
  margin-top: 10px;
  font-size: 1.2em;
}

.device-dashboard {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.button-group {
  margin: 20px 0;
}

.progress-bar-container {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  width: 100%;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
  flex-grow: 1;
}

.progress {
  height: 20px;
  background-color: #4caf50;
  width: 0;
  transition: width 0.5s ease-in-out;
}
</style>



