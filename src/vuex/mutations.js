import * as types from './mutation_type'
import Vue from 'vue'
export default {
  [types.SET_ALEART_MSG](state, obj) {
    state.alertMsg.Title = obj.Title;
    state.alertMsg.CancelTxt = obj.CancelTxt;
    state.alertMsg.OKTxt = obj.OKTxt;
    state.alertMsg.OkFunc = obj.OkFunc;
  },
  [types.TOGGLE_ALERT](state, flag) {
    state.isAlertBox = flag;
  },
  [types.TOGGLE_SHARE](state) {
    state.isShareShow = !state.isShareShow
  }

}
