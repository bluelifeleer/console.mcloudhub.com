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
import md5 from 'md5'
import VueCookie from 'vue-cookie';


Vue.config.productionTip = false
Vue.prototype.$md5 = md5;
Vue.prototype.$axios = axios.create({
  baseURL: 'http://console.mcloudhub.com/',
  timeout: 3600,
  headers: {},
  transformResponse: function(data) {
    return JSON.parse(data);
  }
});
Vue.prototype.$axios.interceptors.request.use(function(config) {
  // Do something before request is sent
  return config;
}, function(error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
Vue.prototype.$axios.interceptors.response.use(function(response) {
  // Do something with response data
  console.log(this)
  return response;
}, function(error) {
  // Do something with response error
  return Promise.reject(error);
});

Vue.prototype.$clipboard = clipboard
// use
Vue.use(ElementUI)
Vue.use(mavonEditor)
// Tell Vue to use the plugin
Vue.use(VueCookie);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
