import Vue from 'vue'
import AjaxAddress from '../services/address/address'
import AjaxSigan from '../services/config/config'
import AjaxShare from '../services/addShare/addShare'

export default {
  addShare() {
    AjaxShare.addShare(res => {
      if (res.code == 0) {
        Vue.toast('分享成功')
      } else {
        Vue.toast(res.msg)
      }
    })
  },

  //微信分享通用配置
  _initShareConfig(title, desc) {
    var _this = this;
    let shareFlag = (window.location.hash.indexOf('?') === -1 ? '?' : '&') + 'Share=yes'
    AjaxSigan.getSignature(res => {
      if (res.code == 0) {
        //config
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名，见附录1
          jsApiList: [
            'chooseWXPay',
            'onMenuShareAppMessage',
            'onMenuShareTimeline'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(() => {
          console.log('config 配置成功');
          let shareFlag = (window.location.hash.indexOf('?') === -1 ? '?' : '&') + 'Share=yes'
          wx.onMenuShareTimeline({
            title: title ? title : '', // 分享到朋友圈标题
            link: window.location.href + shareFlag, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              _this.addShare();
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          wx.onMenuShareAppMessage({
            title: title ? title : document.title, // 分享到朋友标题
            desc: desc ? desc : document.title, // 分享描述
            link: window.location.href + shareFlag, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
              _this.addShare();
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });

        });
        wx.error(function (res) {
          console.log(res);
        });
      } else {
        Vue.toast(res.msg);
      }

    })
  },
  formatDate(value) {
    /* * 月-日 时:分，月和日不补零。
     *不是今年的显示年份后两位.
     *如当天  14:32
     *当年：8-3 18:31
     * 往年：2017-6-23 17:41*/
    //获取时间戳 
    var curDate = new Date(parseInt(value) * 1000);
    var year = curDate.getFullYear();
    var mouth = curDate.getMonth() + 1;
    var day = curDate.getDate();
    var hours = curDate.getHours() >= 10 ? curDate.getHours() : "0" + curDate.getHours();
    var minutes = curDate.getMinutes() >= 10 ? curDate.getMinutes() : "0" + curDate.getMinutes();
    //当下时间戳

    var nowData = new Date()
    var nowyear = nowData.getFullYear();
    var nowmouth = nowData.getMonth() + 1;
    var nowday = nowData.getDate();
    if (nowyear == year) {
      //当年
      if (nowday == day) {
        return (hours + ":" + minutes)
      } else {
        return (mouth + '-' + day + " " + hours + ":" + minutes)
      }

    } else {
      return (year + '-' + mouth + '-' + day + " " + hours + ":" + minutes)
    }

  },
  //获取地址
  getAddress() {
    AjaxAddress.getAddress(res => {
      if (res.code == 0) {
        this.addressNum = res.data.address_list.length;
        for (var i = 0; i < res.data.address_list.length; i++) {
          var element = res.data.address_list[i];
          if (element.isdefault === 'Y') {
            this.defaultAddress = element;
            break;
          }
        }
      } else {
        Vue.toast(res.msg);
      }
    })
  }

}
