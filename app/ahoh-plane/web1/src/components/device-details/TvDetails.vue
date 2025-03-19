<template>
  <div class="tv-details">
    <h2>{{ localDevice.name }}</h2>
    <p>状态: {{ localDevice.status === 'online' ? '在线' : '离线' }}</p>
    <p>频道: {{ localDevice.channel }}</p>
    <p>音量: {{ localDevice.volume }}</p>
    <p>电源: {{ localDevice.power ? '开' : '关' }}</p>
    <button @click="togglePower">开关</button>
    <button @click="increaseVolume">增大音量</button>
    <button @click="decreaseVolume">减小音量</button>
    <button @click="nextChannel">下一频道</button>
    <button @click="previousChannel">上一频道</button>
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
    increaseVolume() {
      if (this.localDevice.volume < 100) {
        this.localDevice.volume += 1;
        this.emitUpdate();
      }
    },
    decreaseVolume() {
      if (this.localDevice.volume > 0) {
        this.localDevice.volume -= 1;
        this.emitUpdate();
      }
    },
    nextChannel() {
      this.localDevice.channel += 1;
      this.emitUpdate();
    },
    previousChannel() {
      if (this.localDevice.channel > 1) {
        this.localDevice.channel -= 1;
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
.tv-details {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px;
}
</style>



