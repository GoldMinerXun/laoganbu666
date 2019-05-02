// pages/aboutme/index.js
const app = getApp()
let sig = ''
let openid = ''
const db = wx.cloud.database();
const userDB = db.collection('user');
let wechat = require('../login/wechat.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tag: ["信用满分", "好评如潮"],
    level: "11.lev",
    signature: "",
    userInfo: {},
    hasUserInfo: false,
    hiddenmodalput: true,
  },
  inputsig: function (event) {
    sig = event.detail.value
  },
  modalinput: function (e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    console.log(this.data.hasUserInfo)
    this.setData({
      hiddenmodalput: true
    })
    if (this.data.hasUserInfo) {
      userDB.doc(app.globalData.openid).update({
        data: {
          signature: sig
        },
        success: function () {
          wx.reLaunch({
            url: '../me/index',
          })
        },
        fail: function () {
          wx.showModal({
            title: '注意',
            content: '修改失败，请重试',
          })
        }
      })
    }
    else {
      wx.showModal({
        title: '注意',
        content: '请先登陆',
        success(res) {
          wx.navigateTo({
            url: '../login/index',
          })
        },
        fail() {

        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  handleChange: function () {
    // console.log(detail)
    wx.navigateTo({
      url: '../lab/index',
    })
  },
  onLoad: function () {
    wx.showToast({
      title: "loadig...",
      image: "../../images/loading.png",
      mask: true
    })
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
    // 判断之前是否登陆
    wechat.getstorageopenid().then(res=>{
      openid=res.data
      return wechat.getstorageuserinfo()
    }).then(res=>{
      this.setData({
        userInfo:res.data,
        openid:openid,
        hasUserInfo:true
      })
    })
  },
  isLogin: function (e) {
    // console.log(e.currentTarget.dataset.login)
    var islogin = e.currentTarget.dataset.login
    // 已经登陆&&未登陆
    if (islogin) {
      wx.removeStorage({
        key: 'openid',
        success: function(res) {},
      })
      wx.removeStorage({
        key: 'userinfo',
        success: function(res) {},
      })
      this.setData({
        hasUserInfo: false,
        userInfo: null,
        signature: null
      })
    } else {
      wx.navigateTo({
        url: '../login/index',
      })
    }
    // 
  },
  onReady: function () {
    wx.hideToast()
  },
  onShow: function () {
   
  }
})