import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import clipboard from 'clipboard'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL: 'http://console.mcloudhub.com/',
  timeout: 1000,
  headers: {}
});

Vue.prototype.$clipboard = clipboard
// use
Vue.use(ElementUI)
Vue.use(mavonEditor)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
