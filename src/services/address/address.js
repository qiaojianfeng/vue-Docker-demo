//引入基础请求服务  
import BaseService from '../base/baseService'
//获取收获地址
let uri = {
  debug: '../../../static/mock/address.json',
  online: 'user/getAddress'
}
const GET_API = BaseService.debug ? uri.debug : uri.online

//添加收货地址
let uri2 = {
  debug: '../../../static/mock/address.json',
  online: 'user/addAddress'
}
const ADD_API = BaseService.debug ? uri2.debug : uri2.online
//修改收获地址
let uri3 = {
  debug: '../../../static/mock/address.json',
  online: 'user/modAddress'
}
const MOD_API = BaseService.debug ? uri3.debug : uri3.online
//删除收获地址
let uri4 = {
  debug: '../../../static/mock/address.json',
  online: 'user/delAddress'
}
const DEL_API = BaseService.debug ? uri4.debug : uri4.online
export default {
  //请求数据
  getAddress(callback, params) {
    BaseService.getData(GET_API, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  },
  addAddress(callback, params) {
    BaseService.getData(ADD_API, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  },
  modAddress(callback, params) {
    BaseService.getData(MOD_API, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  },
  delAddress(callback, params) {
    BaseService.getData(DEL_API, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  }

}
