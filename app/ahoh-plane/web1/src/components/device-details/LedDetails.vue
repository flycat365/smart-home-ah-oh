<template>
  <div class="led-details">
    <h3>LED控制面板</h3>
    <div class="status-row">
      <span>当前亮度: {{ device.brightness }}%</span>
      <button @click="adjustBrightness(-10)">-</button>
      <button @click="adjustBrightness(10)">+</button>
    </div>
    <div class="time-display">
      <p>已工作时间: {{ formattedTime }}</p>
      <input type="time" v-model="workTime">
    </div>
  </div>
</template>

<script>
export default {
  props: ['modelValue'],
  methods: {
    adjustBrightness(amount) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        brightness: Math.min(100, Math.max(0, this.modelValue.brightness + amount))
      })
    }
  }
}
</script>