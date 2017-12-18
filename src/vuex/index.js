import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//调用vuex
Vue.use(Vuex)


//公布store对象
export default new Vuex.Store({
    //数据状态
    state,
    //提交变化
    mutations,
    //事件处理中心
    actions,
    //纯净的计算属性
    getters

})