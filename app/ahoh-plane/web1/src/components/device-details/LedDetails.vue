<template>
  <div class="led-details">
    <h2>{{ localDevice.name }}</h2>
    <p>状态: {{ localDevice.status === 'online' ? '在线' : '离线' }}</p>
    <p>亮度: {{ localDevice.brightness }}%</p>
    <p>颜色: {{ localDevice.color }}</p>
    <p>电源: {{ localDevice.power ? '开' : '关' }}</p>
    <button @click="togglePower">开关</button>
    <button @click="increaseBrightness">增加亮度</button>
    <button @click="decreaseBrightness">减少亮度</button>
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
    increaseBrightness() {
      if (this.localDevice.brightness < 100) {
        this.localDevice.brightness += 10;
        this.emitUpdate();
      }
    },
    decreaseBrightness() {
      if (this.localDevice.brightness > 0) {
        this.localDevice.brightness -= 10;
        this.emitUpdate();
      }
    },
    emitUpdate() {
      this.$emit('update-device', this.localDevice);
    }
  }
};
</script>

<style scoped>
.led-details {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px;
}
</style>



