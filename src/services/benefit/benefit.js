//引入基础请求服务  
import BaseService from '../base/baseService'
//福利列表
let uri = {
  debug: '../../../static/mock/buyBenefit.json',
  online: 'benefit/getBenefits'
}

const LIST = BaseService.debug ? uri.debug : uri.online
//购买福利
let uri2 = {
  debug: '../../../static/mock/buyBenefit.json',
  online: 'benefit/buyBenefit'
}

const BUY = BaseService.debug ? uri2.debug : uri2.online

export default {
  getBenefits(callback, params) {
    BaseService.getData(LIST, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  },
  buyBenefits(callback, params) {
    BaseService.getData(BUY, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  }

}
