// pages/aboutme/index.js
const app = getApp()
let sig = ''
let openid = ''
var userinfo = {}
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
  inputsig: function(event) {
    sig = event.detail.value
  },
  modalinput: function(e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function() {
    // console.log(this.data.hasUserInfo)
    this.setData({
      hiddenmodalput: true
    })
    if (this.data.hasUserInfo) {
      userDB.doc(app.globalData.openid).update({
        data: {
          signature: sig
        },
        success: function() {
          wx.reLaunch({
            url: '../me/index',
          })
        },
        fail: function() {
          wx.showModal({
            title: '注意',
            content: '修改失败，请重试',
          })
        }
      })
    } else {
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
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  handleChange: function() {
    // console.log(detail)
    wx.navigateTo({
      url: '../lab/index',
    })
  },
  onLoad: function() {
    var that = this
    const defaultArr = ['cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/pen.png', 'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/time.png', 'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/right.png', 'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/i1.png', 'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/right.png', 'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/i2.png', 'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/right.png']
    var tempArr = new Array()
    var deal = function() {
      var fileList = defaultArr
      wx.cloud.getTempFileURL({
        fileList,
      }).then(res => {
        // console.log(res.fileList)
        res.fileList.forEach(item => {
          tempArr.push(item.tempFileURL)
        })
        that.setData({
          defaultArr: tempArr
        })
      })
    }
    deal()

    wx.showToast({
      title: "loadig...",
      image: "../../images/loading.png",
      mask: true
    })
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
  },
  isLogin: function(e) {
    // console.log(e.currentTarget.dataset.login)
    var islogin = e.currentTarget.dataset.login
    // 已经登陆&&未登陆
    if (islogin) {
      wx.removeStorage({
        key: 'openid',
        success: function(res) {
          // console.log(1)
        },
      })
      wx.removeStorage({
        key: 'userinfo',
        success: function(res) {
          // console.log(2)
        },
      })
      this.setData({
        hasUserInfo: false,
        userInfo: null,
        signature: null
      })
      app.globalData.userInfo = null
      app.globalData.openid = null
    } else {
      wx.navigateTo({
        url: '../login/index',
      })
    }
    // 
  },
  onReady: function() {
    wx.hideToast()

  },
  onShow: function() {

    // 判断之前是否登陆
    wechat.getstorageopenid().then(res => {
      // 如果本地存储过登陆过的openid
      // 则直接获取本地信息的openid
      openid = res.data
      app.globalData.openid = res.data
      // console.log(res.data)
      if (openid) {
        return wechat.getUserInfo()
      }
    }).then(res => {
      // console.log(res.userInfo)
      app.globalData.userInfo = res.userInfo

      this.setData({
        userInfo: res.userInfo,
        openid: openid,
        hasUserInfo: true
      })
      return userDB.doc(openid).get()
    }).then(res => {

      this.setData({
        signature: res.data.signature
      })
    })
  }
})