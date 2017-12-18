//导出需要维护的数据状态
export default {
  isAlertBox: false,
  alertMsg: {
    Title: '确定此操作？',
    CancelTxt: '取消',
    OKTxt: '确定',
    OkFunc: function () {
      //点击确认回调
      console.log('点击确认了。。。。。')
    }
  },
  isShareShow: false
}
