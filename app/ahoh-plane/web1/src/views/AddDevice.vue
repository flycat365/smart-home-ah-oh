<template>
  <div class="add-device">
    <h2>添加新设备</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>设备类型：</label>
        <select v-model="newDevice.type">
          <option value="aircon">空调</option>
          <option value="tv">电视</option>
          <option value="light">灯泡</option>
        </select>
      </div>
      <div class="form-group">
        <label>设备名称：</label>
        <input type="text" v-model="newDevice.name" required>
      </div>
      <button type="submit">提交</button>
      <button type="button" @click="cancel">取消</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDevice: {
        type: 'aircon',
        name: '',
        status: 'online'
      }
    }
  },
  methods: {
    submitForm() {
      this.$eventBus.$emit('device-added', {
        id: Date.now(),
        type: this.newDevice.type,
        name: this.newDevice.name || '新设备',
        status: 'online'
      })
      this.$router.go(-1)
    },
    cancel() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.add-device {
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
}
.form-group {
  margin: 15px 0;
}
</style>