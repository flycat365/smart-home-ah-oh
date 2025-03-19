import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)  // Add this line



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
