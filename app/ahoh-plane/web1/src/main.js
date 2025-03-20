// 在文件顶部添加
import '@/assets/css/global.css'

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)  // Add this line



// 在Vue实例创建前添加事件总线
Vue.prototype.$eventBus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
