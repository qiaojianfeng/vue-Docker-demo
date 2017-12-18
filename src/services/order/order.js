//引入基础请求服务  
import BaseService from '../base/baseService'

let uri = {
  debug: '',
  online: 'weixin/createOrder'
}

const CREAT = BaseService.debug ? uri.debug : uri.online
let uri2 = {
  debug: '',
  online: 'weixin/payOrder'
}

const PAY = BaseService.debug ? uri2.debug : uri2.online
let uri3 = {
  debug: '../../../static/mock/getState.json',
  online: 'user/getOrderInfo'
}

const DETAIL = BaseService.debug ? uri3.debug : uri3.online

export default {
  //生成订单及微信支付
  createOrder(callback, params) {
    BaseService.getData(CREAT, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  },
  //支付已有订单
  payOrder(callback, params) {
    BaseService.getData(PAY, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  },
  //获取订单详情
  getOrderInfo(callback, params) {
    BaseService.getData(DETAIL, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  },

}
