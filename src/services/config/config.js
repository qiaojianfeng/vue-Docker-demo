//引入基础请求服务  
import BaseService from '../base/baseService'

let uri = {
  debug: '../../../static/mock/Signature.json',
  online: 'weixin/getSignature'
}

const SIGNA = BaseService.debug ? uri.debug : uri.online

export default {
  //请求数据
  getSignature(callback, params) {
    BaseService.getData(SIGNA, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  }


}
