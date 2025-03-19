<template>
  <div class="map-editor">
    <h2>地图编辑器</h2>
    <div class="canvas-container">
      <!-- 地图画布区域 -->
      <div class="toolbar">
        <button class="tool-btn" v-for="tool in tools" :key="tool">
          {{ tool }}
        </button>
      </div>
      <div class="canvas-placeholder">
        <p>🖌️ 地图编辑功能开发中...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tools: ['墙壁', '门窗', '家具', '设备']
    }
  }
}
</script>

<style>
.canvas-placeholder {
  border: 2px dashed #ccc;
  padding: 40px;
  text-align: center;
  color: #7f8c8d;
}
.tool-btn {
  margin: 5px;
  padding: 8px 15px;
  background: #3498db;
  color: white;
  border-radius: 4px;
}
</style>