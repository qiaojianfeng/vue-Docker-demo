// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入vuex状态管理工具
import Vuex from 'vuex'
import store from './vuex/index'
import VueLazyload from 'vue-lazyload'
import vueTap from 'v-tap'; //修改click为tap事件
Vue.use(vueTap)

Vue.config.productionTip = false
Vue.use(require('vue-wechat-title'))
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: location.origin + '/static/loading_img/750-300.jpg',
  error: location.origin + '/static/loading_img/750-300.jpg',
  attempt: 1,
  filter: {
    progressive(listener, options) {
      if (listener.el.dataset.size !== undefined) {
        listener.loading = location.origin + '/static/loading_img/' + listener.el.dataset.size + '.jpg'
        listener.error = location.origin + '/static/loading_img/' + listener.el.dataset.size + '.jpg'
      }
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
