//引入基础请求服务  
import BaseService from '../base/baseService'

let uri = {
  debug: '../../../static/mock/buyBenefit.json',
  online: 'share/addShare'
}

const SHARE = BaseService.debug ? uri.debug : uri.online

export default {
  addShare(callback, params) {
    BaseService.getData(SHARE, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  }

}
