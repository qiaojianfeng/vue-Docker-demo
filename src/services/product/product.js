//引入基础请求服务  
import BaseService from '../base/baseService'
//商品页	
let uri = {
  debug: '../../../static/mock/productInfo.json',
  online: 'product/getProductInfo'
}

const INFO = BaseService.debug ? uri.debug : uri.online

export default {
  //请求数据
  getProductInfo(callback, params) {
    BaseService.getData(INFO, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  }

}
