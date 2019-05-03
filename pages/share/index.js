//index.js
//获取应用实例
const app = getApp()
Page({
  search : function(e){
    var val = e.detail.value.content;
    console.log(val)
  },
  data: {
    inputValue: '',
    hot: []
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    var that=this
    wx.showToast({
      title: "loadig...",
      image: "../../images/loading.png",
      mask: true
    })
    wx.setNavigationBarTitle({
      title: '问叭',
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getDefaultQuestions',
      // 传给云函数的参数
      data: {
      },
     complete:res=>{
       console.log(res.result.data)
       that.setData({
         hot: res.result.data
       })
     }
    })
  },
  handleChange: function (
    detail
  ) {
    // console.log(detail)
    wx.redirectTo({
      url: '../' + detail.key + '/index',
    })
  },

  onReady: function () {
    wx.hideLoading()
  }
})