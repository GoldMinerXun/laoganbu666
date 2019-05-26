// pages/notice/index.js
const app = getApp()
const promise = require('./Promise.js')
const db = wx.cloud.database()
const userDB = db.collection('user')
const comment = db.collection('comments')
const admires = db.collection('admires')
const _ = db.command
Page({
  // 如果已经查看过消息提示，则全局变量中的消息提示参数为0，反之为1
  /**
   * 页面的初始数据
   */
  data: {
    noticeCommentNum: 0,
    noticeLikeNum: 0,
    noticeReplyNum:0,
  },
  handleChange: function({
    detail
  }) {
    wx.redirectTo({
      url: '../' + detail.key + '/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(app.globalData)
    wx.setNavigationBarTitle({
      title: '与我相关',
    })
    wx.showToast({
      title: "loadig...",
      image: "../../images/loading.png",
      mask: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideToast()
    var that = this
    var openid = app.globalData.openid
    var lastTimeStep, newTimeStep

    if (openid) {
      // 得到最后一次看评论的时间，截取比最后一次看评论时间晚的评论，收集数据
      userDB.doc(openid).get().then(res => {
        var timetmp = res.data.lastSeenCommentTime
        return comment.where({
          qUserId: openid,
          time: _.gt(timetmp) //时间大于最近一次查看时间
        }).get()
      }).then(res => {
        if (res.data.length > 0) {
          that.setData({
            noticeCommentNum: res.data.length
          })
          return wx.setStorage({
            key: 'hasSeenComment',
            data: 'false',
          })
        }
      }).then(res => {
        return promise.getstoragehasSeenComment()
      }).then(res => {
        if (res.data == 'true') {
          that.setData({
            noticeCommentNum: 0
          })
        }
      })

      // 得到最后一次看点赞的时间，截取比最后一次看点赞时间晚的点赞，收集数据
      userDB.doc(openid).get().then(res => {
        var timetmp = res.data.lastSeenLikesTime
        return admires.where({
          cuserid: openid,
          time: _.gt(timetmp) //时间大于最近一次查看时间
        }).get()
      }).then(res => {
        // console.log(res.data)
        if (res.data.length > 0) {
          that.setData({
            noticeLikeNum: res.data.length
          })
          return wx.setStorage({
            key: 'hasSeenLike',
            data: 'false',
          })
        }
      }).then(res => {
        return promise.getstoragehasSeenLike()
      }).then(res => {
        if (res.data == 'true') {
          that.setData({
            noticeLikeNum: 0
          })
        }
      })

      // 得到最后一次看短评的时间。。。
      userDB.doc(openid).get().then(res => {
        var timetmp = res.data.lastSeenReplyTime
        console.log(openid,timetmp)
        return wx.cloud.callFunction({
          name:'getNoticeNum',
          data:{
            openid:openid,
            timetmp:timetmp
          }
        })
      }).then(res => {
        console.log(res.result.data)
        if (res.result.data.length > 0) {
          that.setData({
            noticeReplyNum: res.result.data.length
          })
          return wx.setStorage({
            key: 'hasSeenReply',
            data: 'false',
          })
        }
      }).then(res => {
        return promise.getstoragehasSeenReply()
      }).then(res => {
        if (res.data == 'true') {
          that.setData({
            noticeReplyNum: 0
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onReady()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onPullDownRefresh: function() {
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 1000)
    this.onReady()
  }
})