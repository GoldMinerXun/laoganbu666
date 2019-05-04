// pages/notice-secondary/index.js
// 消息通知需要倒序显示（tips）
var util = require('../../utils/util.js')
const app = getApp()
const db = wx.cloud.database()
const userDB = db.collection('user')
const comments = db.collection('comments')
const questions = db.collection('questions')
const admires = db.collection('admires')
const _ = db.command
let pageOption = null
// 每个用户看过自己评论和点赞消息的最后一次时间都要记录下来
var contentobj = [[], [], [], []]
let promise = require('./promise.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 页面标题
    title: "",
    // 页面对应模板名
    tempname: "",
    // 页面对应的渲染内容
    content: [],
    refresh: false,
    defaultImgArr:[

    ]
  },
  deletemycomment: function (id) {
    comments.doc(id).remove()
      .then()
      .catch(console.error)
  },
  confirmdeletemycomment: function (e) {
    var openid = app.globalData.openid
    var that = this
    promise.showmodal()
      .then(res => {
        console.log(res)
        if (res.confirm) {
          that.deletemycomment(e.currentTarget.dataset.id)
          return promise.showtoast()
        }
      })
      .then(res => {
        comments.where({
          _openid: openid
        })
          .field({
            _id: true,
            title: true,
            ccontent: true,
            time: true
          })
          .get()
          .then(res => {
            // console.log(res.data)
            // contentobj[0] = res.data
            that.setData({
              content: res.data
            })
          })
      })

  },
  deletemyproblem: function (id) {
    questions.doc(id).remove()
      .then()
      .catch(console.error)
  },
  confirmdeletemyproblem: function (e) {
    var openid = app.globalData.openid
    var that = this
    promise.showmodal()
      .then(res => {
        console.log(res)
        if (res.confirm) {
          that.deletemyproblem(e.currentTarget.dataset.id)
          return promise.showtoast()
        }
      })
      .then(res => {
        console.log(2)
        questions.where({
          _openid: openid
        })
          .field({
            _id: true,
            title: true,
            time: true,
            content: true
          })
          .get()
          .then(res => {
            that.setData({
              content: res.data
            })
          })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //获取页面传递的参数
  getcontent: function (tempname, that, contentobj) {

    var comment = contentobj[0]
    var likemycomment = contentobj[1]
    var myproblem = contentobj[2]
    var mycomment = contentobj[3]

    if (tempname == "tempcomment") {
      that.setData({
        content: comment
      })
      wx.setStorage({
        key: 'hasSeenComment',
        data: 'true',
      })
      // 更新最后一次看评论的时间
      userDB.doc(app.globalData.openid).update({
        data: {
          lastSeenCommentTime: util.formatTime(new Date())
        }
      })
    }
    else if (tempname == "templikes") {
      that.setData({
        content: likemycomment
      })
      wx.setStorage({
        key: 'hasSeenLike',
        data: 'true',
      })
      userDB.doc(app.globalData.openid).update({
        data: {
          lastSeenLikesTime: util.formatTime(new Date())
        }
      })
    }
    else if (tempname == "tempmycomment") {
      that.setData({
        content: mycomment
      })
      
    }
    else if (tempname == "tempmyproblem") {
      that.setData({
        content: myproblem
      })
    }
    else {
      this.setData({
        content: []
      })
    }
  },
  onLoad: function (options) {
    // 判断是否登陆，
    // 没有登陆就跳到登录页，
    // 登陆了就获取对应的评论，点赞和发布问题，评论内容。
    pageOption = options
    var openid = app.globalData.openid


    // 获取我收到的评论
    comments.where({
      qUserId: openid
    })
      .field({
        commentAvatarUrl: true,//评论者的头像
        commentNickName: true,//评论者名字
        ccontent: true,//评论内容
        time: true,//评论时间
        title: true,//评论标题
        qid: true//问题id
      })
      .get()
      .then(res => {
        // console.log(res.data)
        contentobj[0] = res.data.reverse()
        var that = this
        this.getcontent(options.name, that, contentobj)
      })
    // 获取点赞我的???有问题哦
    admires.where({
      // 评论者id字段
      cuserid: openid
    })
      .field({
        _id: true,
        admireAvatarUrl: true,
        admireNickName: true,
        ccontent: true,
        qid: true,
        time: true
      })
      .get()
      .then(res => {
        // console.log(res.data)
        contentobj[1] = res.data.reverse()
        var that = this
        this.getcontent(options.name, that, contentobj)
      })
    // 获取我的问题
    questions.where({
      _openid: openid
    })
      .field({
        _id: true,
        title: true,
        time: true,
        content: true
      })
      .get()
      .then(res => {
        // console.log(res.data)
        contentobj[2] = res.data.reverse()
        var that = this
        this.getcontent(options.name, that, contentobj)
      })

    // 获取我的评论
    comments.where({
      _openid: openid
    })
      .field({
        _id: true,
        title: true,
        ccontent: true,
        time: true,
        qid: true
      })
      .get()
      .then(res => {
        // console.log(res.data)
        contentobj[3] = res.data.reverse()
        var that = this
        this.getcontent(options.name, that, contentobj)
      })

    wx.setNavigationBarTitle({
      title: options.title,
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
  onReady: function () {
    wx.hideToast()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    const defaultArr = ['cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/otherscomment.png',
      'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/right.png',
      'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/likes.png',
  'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/myproblem.png',
      'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/comment.png'
    ]
    var deal = function () {
      var fileList = defaultArr
      wx.cloud.getTempFileURL({
        fileList,
      }).then(res => {
        that.setData({
          defaultImgArr: res.fileList[0].tempFileURL
        })
      })
    }
    if (app.globalData.openid) {
      this.setData({
        title: pageOption.title,
        tempname: pageOption.name,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      wx.showModal({
        title: '注意一下',
        content: '你还没有登陆叭？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/index',
            })
          } else if (res.cancel) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })

    }
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