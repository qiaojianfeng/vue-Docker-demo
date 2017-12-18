import Vue from 'vue'
import Router from 'vue-router'
//路由按需加载
const index = resolve => require(['@/pages/index/index.vue'], resolve);
const find = resolve => require(['@/pages/find/find.vue'], resolve);
const message = resolve => require(['@/pages/message/message.vue'], resolve);
const my = resolve => require(['@/pages/my/my.vue'], resolve);
const release = resolve => require(['@/pages/release/release.vue'], resolve);

Vue.use(Router)

//路由后退
Router.prototype.Back = function () {
  window.history.go(-1)
}
//路由前进
Router.prototype.Go = function () {
  window.history.go(1)
}

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    meta: {
      title: '炫舞秘密',
    },
    component: index
  }, {
    path: '*',
    redirect: "/"
  }, {
    path: '/',
    name: 'index',
    meta: {
      title: '炫舞秘密',
    },
    component: index
  }, {
    path: '/find',
    name: 'find',
    meta: {
      title: '发现',
    },
    component: find
  }, {
    path: '/message',
    name: 'message',
    meta: {
      title: '消息中心',
    },
    component: message
  }, {
    path: '/release',
    name: 'release',
    meta: {
      title: '发布',
    },
    component: release
  }, {
    path: '/my',
    name: 'my',
    meta: {
      title: '我的',
    },
    component: my
  }]
})
