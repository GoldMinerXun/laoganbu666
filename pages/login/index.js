// pages/login/index.js
let app = getApp()
let sno = null;
let academic = null;
let major = null;
let openid = null;
let avatorurl = null;
let wechat = require('./wechat.js');

const db = wx.cloud.database();
const userDB = db.collection('user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */

  // 先检查登陆信息已过期，如果过期，就重新授权登陆，反之跳转到首页
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登陆',
    })
    wx.showToast({
      title: "loadig...",
      image: "../../images/loading.png",
      mask: true
    })
  },
  inputSno: function (event) {
    sno = event.detail.value
  },
  inputAcademic: function (event) {
    academic = event.detail.value
  },
  inputMajor: function (event) {
    major = event.detail.value
  },
  bindgetuserinfo(e) {
    // console.log(e.detail.userInfo)
    var userInfo = e.detail.userInfo
    let that = this;
    if(major&&academic&&sno){
      wechat.login()
        .then(data => {
          return wechat.wxcloudcallfunction()
        })
        .then(data => {
          app.globalData.openid = data.openid
          return wechat.getUserInfo();
        }).then(data=>{
          app.globalData.userInfo = data.userInfo
          console.log(app.globalData)
          userDB.doc(app.globalData.openid).update({
                data: {
                  avatorurl: app.globalData.userInfo.avatarUrl,
                  uname: app.globalData.userInfo.nickname,
                  sno: sno,
                  academic: academic,
                  major: major
                },
                success: function () {
                  wx.reLaunch({
                    url: '../me/index',
                  })
                },
                fail: function () {
                  console.log(111)
                }
              })
        })
        .catch(e => {
          console.log(e);
        })
    }else{
      wx.showToast({
        title: `请补充完整您的信息`,
        icon:'none',
        duration:2000
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideToast()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideToast()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})