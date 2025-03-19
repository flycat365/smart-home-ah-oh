<template>
  <div id="app">
    <nav class="sidebar">
      <router-link 
        to="/" 
        class="nav-link"
        active-class="active"
        exact
      >
        设备列表
      </router-link>
      <router-link 
        to="/map-editor" 
        class="nav-link"
        active-class="active"
      >
        地图编辑
      </router-link>
      <router-link 
        to="/settings" 
        class="nav-link"
        active-class="active"
      >
        系统设置
      </router-link>
    </nav>
    
    <div class="main-content">
      <router-view/>
    </div>

    <!-- 设备详情弹窗 -->
    <div v-if="selectedDevice" class="device-modal">
      <!-- 根据设备类型渲染不同内容 -->
      <!-- 修改第16行 -->
      <component :is="selectedDevice.type + 'Details'" v-model="selectedDevice"/>
      <button @click="selectedDevice = null">关闭</button>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  data() {
    return {
      selectedDevice: null
    }
  },
  components: {
    // 异步加载设备详情组件
    LedDetails: defineAsyncComponent(() => import('./components/device-details/LedDetails.vue')),
    TvDetails: defineAsyncComponent(() => import('./components/device-details/TvDetails.vue')),
    AirConditionerDetails: defineAsyncComponent(() => import('./components/device-details/AirConditioner.vue'))
  }
}
</script>

<style>
/* 新增布局样式 */
#app {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.sidebar {
  background: #2c3e50;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-link {
  color: #bdc3c7;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: #34495e;
  color: #ecf0f1;
}

.nav-link.active {
  background: #3498db;
  color: white;
  font-weight: 500;
}

.main-content {
  padding: 20px;
}

/* 设备卡片基础样式 */
.device-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.device-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* 不同设备类型的颜色标识 */
.device-card.led {
  border-left: 4px solid #f1c40f;
}

.device-card.tv {
  border-left: 4px solid #e74c3c;
}

.device-card.air-conditioner {
  border-left: 4px solid #2ecc71;
}
</style>
