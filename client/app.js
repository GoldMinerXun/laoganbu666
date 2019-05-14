//app.js
App({
  onLaunch: function () {
    var that =this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init({
      env: 'laoganbu-02d4d0',
      traceUser: true
    });
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.globalData.openid=res.data
      },
    })
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        that.globalData.userInfo = res.data
      },
    })
  },
  globalData: {
    userInfo: null,
    openid:null
  }
})