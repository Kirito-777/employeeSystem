import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
// Vue.prototype.axios = axios
// Vue.use(axios)

// import './assets/scss/reset.scss' //全局样式
import 'element-ui/lib/theme-chalk/index.css' //element-ui样式
import ElementUI from 'element-ui'
Vue.use(ElementUI)

// import http from '@/api/config'  //axios
// Vue.prototype.$http = http
// Vue.prototype.$ajsx=axios

Vue.config.productionTip = false

import VueParticles from 'vue-particles'  
Vue.use(VueParticles)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
