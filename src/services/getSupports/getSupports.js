//引入基础请求服务  
import BaseService from '../base/baseService'
//获取我的应援
let uri = {
  debug: 'http://result.eolinker.com/SDpsIVa5ad7b86a767007828f42fb9cce330c95b20587a3?uri=http://tianyinculture.com/api/getFinance',
  online: 'http://api.onent.tianyinculture.com/user/getSupports'
}

const SUPPORTS_INFO = BaseService.debug ? uri.debug : uri.online

export default {
  //请求数据
  getSupports(callback, params) {
    BaseService.getData(SUPPORTS_INFO, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  }

}
