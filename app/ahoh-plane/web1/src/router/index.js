import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../views/MainPage.vue';
import MapEditor from '../views/MapEditor.vue';
import SettingsView from '../views/SettingsView.vue';
import DeviceDetails from '../views/DeviceDetails.vue';
import AddDevice from '../views/AddDevice.vue';
import DeleteDevice from '../views/DeleteDevice.vue';
import MonitorDevice from '../views/MonitorDevice.vue';
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
    path: '/device/',
    name: 'DeviceDetails',
    component:DeviceDetails ,
    props: true // Add this line
  },
  {
    path: '/add-device',
    name: 'AddDevice',
    component: AddDevice
  },
  // 在routes数组中添加
  {
    path: '/delete-device/',
    name: 'DeleteDevice',
    component: DeleteDevice,
    props: true
  },
  {
    path: '/monitor-device/',
    name: 'MonitorDevice',
    component: MonitorDevice,
    props: true
  },
  {
    path: '/device/aircon/:deviceId',
    name: 'AirConditionerDetails',
    component: () => import('@/components/device-details/AirConditioner.vue'),
    props: true
  },
  {
    path: '/device/tv/:deviceId',
    name: 'TvDetails',
    component: () => import('@/components/device-details/TvDetails.vue'),
    props: true  
  },
  {
    path: '/device/light/:deviceId', 
    name: 'LedDetails',
    component: () => import('@/components/device-details/LedDetails.vue'),
    props: true
  }
];

// 创建路由器实例
const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;