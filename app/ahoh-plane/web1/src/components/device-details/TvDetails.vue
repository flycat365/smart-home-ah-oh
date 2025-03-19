<template>
  <div class="tv-details">
    <h3>电视控制中心</h3>
    <div class="channel-control">
      <button @click="changeChannel(-1)">◄</button>
      <span>频道: {{ device.channel }}</span>
      <button @click="changeChannel(1)">►</button>
    </div>
    <div class="volume-control">
      <input type="range" min="0" max="100" v-model="device.volume">
      <span>音量: {{ device.volume }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modelValue'],
  mounted() {
    // 添加服务测试代码
    this.testBackendConnection();
  },
  methods: {
    async testBackendConnection() {
      try {
        const response = await fetch('http://localhost:3000/devices');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const devices = await response.json();
        console.log('后端服务响应正常，当前设备数:', devices.length);
      } catch (error) {
        console.error('后端连接测试失败:', error);
        alert('后端服务不可用，请检查服务是否启动');
      }
    },
    changeChannel(step) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        channel: Math.max(1, this.modelValue.channel + step)
      })
    }
  }
}
</script>