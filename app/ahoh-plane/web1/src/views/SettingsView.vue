<template>
  <div class="settings">
    <h2>系统设置</h2>
    <div class="setting-group">
      <div class="setting-item">
        <label>主题颜色</label>
        <input type="color">
      </div>
      <div class="setting-item">
        <label>消息通知</label>
        <input type="checkbox">
      </div>
      <div class="placeholder">
        <p>⚙️ 系统设置功能开发中...</p>
      </div>
    </div>
  </div>
</template>

<style>
.placeholder {
  padding: 30px;
  text-align: center;
  color: #95a5a6;
}
.setting-item {
  margin: 15px 0;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>

<script>
export default {
  name: 'SettingsView', // 修复组件命名规则
}
</script>
