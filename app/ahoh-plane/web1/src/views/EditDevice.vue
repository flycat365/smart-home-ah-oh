<template>
  <div class="edit-device">
    <h2>编辑设备</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>设备名称：</label>
        <input type="text" v-model="editingDevice.name" required>
      </div>
      <!-- 根据设备类型显示不同属性 -->
      <template v-if="editingDevice.type === 'aircon'">
        <div class="form-group">
          <label>温度：</label>
          <input type="number" v-model="editingDevice.temperature">
        </div>
        <div class="form-group">
          <label>模式：</label>
          <select v-model="editingDevice.mode">
            <option>冷风</option>
            <option>暖风</option>
            <option>除湿</option>
          </select>
        </div>
      </template>
      <!-- 其他设备类型字段 -->
      <button type="submit">保存</button>
      <button type="button" @click="cancel">取消</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['deviceId'],
  data() {
    return {
      editingDevice: null
    }
  },
  mounted() {
    // 从父组件获取设备数据
    this.editingDevice = {...this.$parent.demoDevices.find(d => d.id === this.deviceId)};
  },
  methods: {
    submitForm() {
      this.$eventBus.$emit('device-updated', this.editingDevice);
      this.$router.go(-1);
    },
    cancel() {
      this.$router.go(-1);
    }
  }
}
</script>