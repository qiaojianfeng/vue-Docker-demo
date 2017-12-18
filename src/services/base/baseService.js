/*基础axios请求服务器
 **引入axios文件 
 **/
import axios from 'axios'

var isDev = process.env.NODE_ENV === 'development';
//设置基础配置
const config = {

  //配置默认请求地址
  baseURL: isDev ? '' : 'http://api.fanyin.tianyinculture.com/',
  // baseURL: false ? '' : 'http://172.16.1.214:8031/',
  //`headers`选项是需要被发送的自定义请求头信息
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest'
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: true
};

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.data.code != undefined && response.data.code == 106) {
    if (response.data.data.url) {
      window.location.href = response.data.data.url + '?redirect=' + encodeURIComponent(window.location.href);
      return
    } else {
      console.log(response);
      alert('无效授权地址');
    }

  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
//设置增删改查基础方法
export default {
  //调试接口切换
  // debug: false,
  debug: isDev,

  //请求数据 
  //`params`选项是要随请求一起发送的请求参数----一般链接在URL后面
  //他的类型必须是一个纯对象或者是URLSearchParams对象
  getData(url, params) {
    return axios({
      method: 'get',
      url: url,
      params: params,
      //解构基础配置
      ...config
    })
  },
  //保存数据请求
  saveData(url, data) {
    return axios({
      method: 'post',
      url: url,
      data: data,
      ...config
    })
  },

  //修改数据请求
  updataData(url, data) {
    return axios({
      method: 'put',
      url: url,
      data: JSON.stringify(data),
      ...config
    })
  },

  //删除数据请求
  deleteData(url, id) {
    return axios({
      method: 'delete',
      url: url + id,
      ...config

    })
  }

}
