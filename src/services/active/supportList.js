//引入基础请求服务  
import BaseService from '../base/baseService'

let uri = {
  debug: '../../../static/mock/supportList.json',
  online: 'activity/getSupports'
}

const INFO = BaseService.debug ? uri.debug : uri.online
let uri2 = {
  debug: '../../../static/mock/supportList.json',
  online: 'user/getSupports'
}

const INFO2 = BaseService.debug ? uri2.debug : uri2.online

export default {
  //请求数据
  getSupportList(callback, params) {
    BaseService.getData(INFO, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  },
  //获取用户应援订单
  getSupports(callback, params) {
    BaseService.getData(INFO2, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  }

}
