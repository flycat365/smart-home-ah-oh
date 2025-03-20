<template>
  <div class="monitor-device">
    <h2>实时监控 - {{ device?.name }}</h2>
    <div class="monitor-data">
      <p>状态: {{ device?.status }}</p>
      <p>信号强度: {{ device?.signalStrength }}</p>
      <!-- 根据设备类型显示不同监控数据 -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['deviceId'],
  computed: {
    device() {
      return this.$parent.demoDevices.find(d => d.id === this.deviceId);
    }
  }
}
</script>