//引入基础请求服务  
import BaseService from '../base/baseService'

let uri = {
  debug: '../../../static/mock/commentsList.json',
  online: 'comment/getComments'
}
//获取评论
const LIST = BaseService.debug ? uri.debug : uri.online

let uri2 = {
  debug: '../../../static/mock/commentsList.json',
  online: 'comment/addComment'
}
//添加评论
const ADD = BaseService.debug ? uri2.debug : uri2.online

export default {
  //请求数据
  getComments(callback, params) {
    BaseService.getData(LIST, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  },
  //请求数据
  addComments(callback, params) {
    BaseService.getData(ADD, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  }

}
