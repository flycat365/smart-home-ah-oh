import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../views/MainPage.vue';
import MapEditor from '../views/MapEditor.vue';
import SettingsView from '../views/SettingsView.vue';
import DeviceDetails from '../views/DeviceDetails.vue';

// 注册 Vue Router
Vue.use(VueRouter);

// 定义路由
const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/map-editor',
    name: 'MapEditor',
    component: MapEditor
  },
  {
    path: '/settings',
    name: 'SettingsView',
    component: SettingsView
  },
  {
    path: '/device/:deviceId',
    name: 'DeviceDetails',
    component: DeviceDetails
  }
];

// 创建路由器实例
const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;