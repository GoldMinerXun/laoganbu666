// pages/login/index.js
let app = getApp()
let sno = null;
let academic = null;
let major = null;
let openid = null;
let avatorurl = null;

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
    console.log(e.detail.userInfo)
    var userInfo = e.detail.userInfo
    app.globalData.userInfo = userInfo
    let that = this;
    wx.login({
      success(result) {
        wx.cloud.callFunction({
          name: 'index',
          complete: res => {
            openid = res.result.openId;
          }
        })
        wx.getUserInfo({
          success(res) {
            userDB.add({
              data: {
                avatorurl: userInfo.avatarUrl,
                uname: userInfo.nickname,
                sno: sno,
                academic: academic,
                major: major
              },
              success: function () {
                wx.navigateBack()
              },
              fail:function(){
                console.log(111)
              }
            })
          },
          error: function (err) {
            console.log(err)
          }
        })
      }

    })



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