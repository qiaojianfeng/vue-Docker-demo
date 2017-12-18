 import * as types from './mutations.js'


 export default {
   //全局方法

   //打开弹窗 ,设置信息
   openAlertBox(context, msg) {
     context.commit('SET_ALEART_MSG', msg);
     context.commit('TOGGLE_ALERT', true);
   },
   closeAlertBox(context) {
     context.commit('TOGGLE_ALERT', false);
   }

 }
