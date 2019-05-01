//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init({
      env: 'laobanbu666-aeacf2',
      traceUser: true
    });
   
  },
  globalData: {
    userInfo: null,
    openid:null
  }
})