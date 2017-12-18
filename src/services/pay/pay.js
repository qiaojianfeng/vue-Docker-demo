//引入基础请求服务  
import BaseService from '../base/baseService'
//直接虚拟币购买商品
let uri = {
  debug: '../../../static/mock/getOrders.json',
  online: 'product/buyProduct'
}

const PAY_INFO = BaseService.debug ? uri.debug : uri.online

export default {
  //请求数据
  buyProduct(callback, params) {
    BaseService.getData(PAY_INFO, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  }

}
