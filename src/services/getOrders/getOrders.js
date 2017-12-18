//引入基础请求服务  
import BaseService from '../base/baseService'
//获取我的订单
let uri = {
  debug: '../../../static/mock/getOrders.json',
  online: 'user/getOrders'
}

const ORDERS_INFO = BaseService.debug ? uri.debug : uri.online

export default {
  //请求数据
  getOrders(callback, params) {
    BaseService.getData(ORDERS_INFO, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  }

}
