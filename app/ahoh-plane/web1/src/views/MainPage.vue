

<template>
  <div class="device-dashboard">
    <!-- 合并重复的template标签 -->
    <!-- 添加设备弹窗 -->
    <div v-if="showAddDevice" class="add-dialog">
      <div class="dialog-content">
        <h3>选择设备类型</h3>
        <button 
          v-for="type in deviceTypes" 
          :key="type"
          @click="addDevice(type)"
          class="device-type-btn"
        >
          {{ generateDeviceName(type) }}
        </button>
        <button @click="showAddDevice = false" class="cancel-btn">取消</button>
      </div>
    </div>

    <!-- 控制栏 -->
    <div class="control-bar">
      <button class="action-btn" @click="showAddDevice = true">
        ＋ 添加设备
      </button>
      <div class="action-group">
        <button class="action-btn secondary" @click="showDeleteDialog">
          🗑️ 删除设备
        </button>
        <button class="action-btn secondary" @click="showEditDialog">
          ✏️ 修改配置
        </button>
        <button class="action-btn secondary" @click="showMonitorPanel">
          📶 实时监控
        </button>
      </div>
    </div>

    <!-- 设备列表 -->
    <div v-if="demoDevices.length === 0" class="empty-state">
      <div class="empty-icon">📭</div>
      <p>暂无设备，点击上方按钮添加设备</p>
    </div>

    <div v-else class="device-grid">
      <DeviceCard 
        v-for="device in demoDevices"
        :key="device.id"
        :device="device"
        @select="showDetails"
      />
    </div>
  </div>
</template>

<style>
/* 新增弹窗样式 */
.add-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.device-type-btn {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  background: #3498db;
  color: white;
}

.cancel-btn {
  margin-top: 15px;
  background: #e74c3c;
}
.device-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px;
}

.action-group {
  display: flex;
  gap: 12px;
  margin-left: auto;
}

.action-btn.secondary {
  background: #95a5a6;
  padding: 8px 16px;
}

.action-btn.secondary:hover {
  background: #7f8c8d;
}

.action-btn {
  background: #3498db;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  margin: 20px;
  transition: transform 0.2s;
}

.action-btn:hover {
  transform: scale(1.05);
}
</style>
<script>
import DeviceCard from '../components/DeviceCard.vue'
import { fetchDevices, createDevice } from '../api/deviceAPI' // 添加createDevice导入

export default {
  components: { DeviceCard },
  data() {
    return {
      showAddDevice: false,
      deviceTypes: ['led', 'tv', 'air-conditioner'],
      demoDevices: [] // 初始化空数组
    }
  },
  async created() {
    try {
      this.demoDevices = await fetchDevices()
      // 添加数据加载后的日志
      console.log('设备加载完成:', this.demoDevices) 
    } catch (error) {
      console.error('加载设备失败:', error)
      // 添加错误提示
      alert('设备加载失败，请检查后端服务是否运行')
    }
  },
  methods: {
    // 删除未使用的getDevices方法
    // 添加async关键字
    async addDevice(deviceType) {
      try {
        const newDevice = await createDevice(deviceType);
        this.demoDevices.unshift({
          id: newDevice.device_id,
          type: newDevice.meta.types[0],
          name: newDevice.meta.desc || newDevice.meta.meta_desc,
          status: 'online',
          ...newDevice.attrib
        });
        this.showAddDevice = false;
      } catch (error) {
        console.error('添加设备失败:', error);
      }
    },
    showDeviceDetails(device) {
      this.$parent.selectedDevice = device
    }, // 添加缺失的逗号
    showDeleteDialog() {
      console.log('打开删除对话框')
    },
    showEditDialog() {
      console.log('打开修改面板')
    },
    showMonitorPanel() {
      console.log('显示监控界面')
    },
    
    showDetails(device) {  // 添加缺失的事件处理方法
      console.log('显示设备详情', device)
    },
    
    // 修复设备名称生成逻辑
    generateDeviceName(type) {
      const nameMap = {
        aircon: '空调',
        tv: '电视',
        light: '灯光'
      }
      const count = this.demoDevices.filter(d => d.type === type).length + 1
      return `${nameMap[type]} ${count}号`
    }
  }
}
</script>
