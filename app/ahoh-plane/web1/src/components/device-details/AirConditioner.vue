<template>
  <div class="air-conditioner-details">
    <h2>{{ localDevice.name }}</h2>
    <p>状态: {{ localDevice.status === 'online' ? '在线' : '离线' }}</p>
    <p>温度: {{ localDevice.temperature }}℃</p>
    <p>模式: {{ localDevice.mode }}</p>
    <p>风速: {{ localDevice.fan_speed }}</p>
    <button @click="togglePower">开关</button>
    <button @click="increaseTemperature">升温</button>
    <button @click="decreaseTemperature">降温</button>
  </div>
</template>

<script>
export default {
  props: {
    device: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localDevice: { ...this.device }
    };
  },
  watch: {
    device(newVal) {
      this.localDevice = { ...newVal };
    }
  },
  methods: {
    togglePower() {
      this.localDevice.power = !this.localDevice.power;
      this.emitUpdate();
    },
    increaseTemperature() {
      if (this.localDevice.temperature < 30) {
        this.localDevice.temperature += 1;
        this.emitUpdate();
      }
    },
    decreaseTemperature() {
      if (this.localDevice.temperature > 16) {
        this.localDevice.temperature -= 1;
        this.emitUpdate();
      }
    },
    emitUpdate() {
      this.$emit('update-device', this.localDevice);
    },
    updateMode(mode) {
      this.$emit('update:modelValue', { 
        ...this.modelValue,
        mode 
      });
    },
    updateTemperature(change) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        temperature: this.modelValue.temperature + change
      });
    }
  }
};
</script>

<style scoped>
.air-conditioner-details {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px;
}
</style>



