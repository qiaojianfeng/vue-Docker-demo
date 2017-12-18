//引入基础请求服务  
import BaseService from '../base/baseService'

let uri = {
  debug: '../../../static/mock/getWorks.json',
  online: 'vote/getWorks'
}
const GET_API = BaseService.debug ? uri.debug : uri.online

let uri2 = {
  debug: '../../../static/mock/getWorks.json',
  online: 'vote/addWork'
}
const ADD_API = BaseService.debug ? uri2.debug : uri2.online

let uri3 = {
  debug: '../../../static/mock/addVote.json',
  online: 'vote/addVote'
}
const VOTE_API = BaseService.debug ? uri3.debug : uri3.online

export default {
  //获取投票作品列表
  getWorks(callback, params) {
    BaseService.getData(GET_API, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  },
  //上传参赛作品
  addWork(callback, params, query) {
    query === undefined ? '' : query;
    BaseService.saveData(ADD_API + query, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  },
  //投票
  addVote(callback, params) {
    BaseService.getData(VOTE_API, params).then((response) => {
      callback(response.data || response);
    }).catch((error) => {
      console.log('数据请求失败啦');
      throw new Error(error);
    })
  }

}
