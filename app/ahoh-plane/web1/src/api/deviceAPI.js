import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api' 
    : '/api',
  timeout: 5000
})

export default {
  // 获取设备列表
  getDevices() {
    return apiClient.get('/devices')
  },

  // 创建设备（对接MQTT设备注册）
  createDevice(deviceData) {
    return apiClient.post('/devices', {
      ...deviceData,
      meta: {
        types: [`smart-${deviceData.type}`],
        attrib_schema: 'v1'
      }
    })
  },

  // 更新设备属性
  updateDeviceAttributes(deviceId, attributes) {
    return apiClient.put(`/devices/${deviceId}/attributes`, attributes)
  },

  // 删除设备
  deleteDevice(deviceId) {
    return apiClient.delete(`/devices/${deviceId}`)
  },

  // 实时监控接口
  subscribeDevice(deviceId) {
    return apiClient.get(`/devices/${deviceId}/subscribe`)
  },

  // 测试用设备生成接口
  generateTestDevices(type, count = 5) {
    return apiClient.post('/testing/generate-devices', {
      type,
      count
    })
  },

  // 重置测试环境
  resetTestEnvironment() {
    return apiClient.post('/testing/reset')
  }
}