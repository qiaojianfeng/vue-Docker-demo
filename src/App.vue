<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" />

    <Base-tools v-if="$route.meta.isShowTool" :isShowToHome="!!$route.query.Share" />

  </div>
</template>

<script>
import Vue from 'vue'
//加载适配
import "./lib/adapter";
import BaseTools from './components/BaseTools.vue'

export default {
  name: 'app',
  created() {
    var oldUrl = location.href;
    if (oldUrl.indexOf('?') == -1) {
      location.href = oldUrl.replace('#', '?#');
    }
  },
  components: {
    BaseTools
  }
}


// a simple toast
Vue.toast = function(txt) {
  var GToast = document.createElement('span');
  GToast.className = 'g-toast';
  GToast.innerHTML = txt;
  document.getElementById('app').appendChild(GToast);
  setTimeout(() => {
    document.getElementById('app').removeChild(GToast);
  }, 1500);
};
Vue.isAndroid = function() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isAndroid;
}
</script>

<style lang="scss">
@import './style/Base.scss';
@import './style/css/mixin.scss';
#app {
  min-height: 100%;
  max-height: none;
  height: auto;
}

.g-toast {
  max-width: 60%;
  background: rgba(0, 0, 0, .8);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 99999;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: rem(10) rem(20);
  border-radius: rem(20);
  font-size: rem(30);
  text-align: center;
}
</style>
