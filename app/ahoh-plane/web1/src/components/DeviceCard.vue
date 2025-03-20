<template>
  <div class="device-card" :class="deviceTypeClass" @click="selectDevice">
    <div class="card-header">
      <h3>{{ deviceName }}</h3>
      <span class="status-dot" :class="deviceStatus"></span>
    </div>
    
    <!-- 通用属性显示 -->
    <div class="device-properties">
      <p v-if="device.status">状态: {{ deviceStatusText }}</p>
      
      <!-- 空调属性 -->
      <template v-if="deviceTypeClass === 'aircon'">
        <p>温度: {{ device.temperature }}℃</p>
        <p>模式: {{ device.mode }}</p>
        <p>风速: {{ device.fan_speed }}</p>
      </template>

      <!-- 电视属性 -->
      <template v-if="deviceTypeClass === 'tv'">
        <p>频道: {{ device.channel }}</p>
        <p>音量: {{ device.volume }}</p>
        <p>电源: {{ device.power ? '开' : '关' }}</p>
      </template>

      <!-- 灯光属性 -->
      <template v-if="deviceTypeClass === 'light'">
        <p>亮度: {{ device.brightness }}%</p>
        <p>颜色: {{ device.color }}</p>
        <p>电源: {{ device.power ? '开' : '关' }}</p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    device: {
      type: Object,
      required: true
    },
    networkStatus: {
      type: String,
      required: true
    }
  },
  computed: {
    deviceTypeClass() {
      return this.device.meta?.types[0]?.replace(/-/g, '') || this.device.type;
    },
    deviceStatusText() {
      return this.device.status === 'online' ? '在线' : '离线';
    },
    deviceStatus() {
      return this.device.status === 'online' ? 'active' : 'inactive';
    },
    deviceName() {
      const names = {
        aircon: '空调',
        tv: '智能电视',
        light: '智能灯泡'
      };
      return names[this.device.type] || '未知设备';
    }
  },
  methods: {
    selectDevice() {
      const detailRoutes = {
        aircon: 'AirConditionerDetails',
        tv: 'TvDetails',
        light: 'LedDetails'
      };
      
      this.$router.push({
        name: detailRoutes[this.device.type],
        params: { 
          deviceId: this.device.id,
          deviceType: this.device.type 
        }
      });
    }
  }
};
</script>

<style scoped>
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
</style>



