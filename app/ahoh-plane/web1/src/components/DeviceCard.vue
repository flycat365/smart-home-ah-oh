<template>
  <div class="device-card" :class="deviceTypeClass">
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
  computed: {
    deviceTypeClass() {
      return this.device.meta?.types[0]?.replace(/-/g, '') || this.device.type;
    },
    deviceStatusText() {
      return this.device.status === 'online' ? '在线' : '离线'
    },
    deviceStatus() {
      return this.device.status === 'online' ? 'active' : 'inactive'
    },
    deviceName() {
      const names = {
        aircon: '空调',
        tv: '智能电视',
        light: '智能灯泡'
      }
      return names[this.device.type] || '未知设备'
    }
  }
}
</script>