<template>
  <div class="delete-device">
    <h2>设备删除操作</h2>
    <div class="input-group">
      <label>请输入设备ID：</label>
      <input type="number" v-model.number="inputId" placeholder="输入设备ID">
    </div>
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
    <div class="button-group">
      <button @click="confirmDelete" :disabled="!isValid">确认删除</button>
      <button @click="cancel">取消操作</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputId: null,
      errorMessage: ''
    }
  },
  computed: {
    isValid() {
      return Number.isInteger(this.inputId) && this.inputId > 0
    }
  },
  methods: {
    confirmDelete() {
      if (!this.inputId) {
        this.errorMessage = '请输入有效的设备ID'
        return
      }
      
      const targetDevice = this.$parent.demoDevices.find(d => d.id === this.inputId)
      if (!targetDevice) {
        this.errorMessage = '未找到对应设备'
        return
      }

      this.$eventBus.$emit('device-deleted', this.inputId)
      this.$router.go(-1)
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.input-group {
  margin: 20px 0;
}

input[type="number"] {
  padding: 8px;
  margin-left: 10px;
  width: 200px;
}

.error-message {
  color: #ff4757;
  margin: 10px 0;
}

.button-group {
  margin-top: 30px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>