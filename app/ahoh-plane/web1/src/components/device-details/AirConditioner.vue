<template>
  <div class="ac-details">
    <h3>空调控制器</h3>
    <div class="mode-selector">
      <button 
        v-for="mode in modes" 
        :key="mode"
        :class="{active: modelValue.mode === mode}"
        @click="updateMode(mode)"
      >
        {{ modeMap[mode] }}
      </button>
    </div>
    <div class="temperature-control">
      <button @click="updateTemperature(-1)">-</button>
      <span>{{ modelValue.temperature }}℃</span>
      <button @click="updateTemperature(1)">+</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modes: ['cool', 'heat', 'fan', 'dry'],
      modeMap: {
        cool: '制冷',
        heat: '制热',
        fan: '送风',
        dry: '除湿'
      }
    }
  },
  methods: {
    updateMode(mode) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        mode
      })
    },
    updateTemperature(step) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        temperature: this.modelValue.temperature + step
      })
    }
  }
}
</script>