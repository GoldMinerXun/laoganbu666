// pages/notice-secondary/index.js
const app = getApp()
const db = wx.cloud.database()
const comments = db.collection('comments')
const questions = db.collection('questions')
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
    refresh:false
  },
  deletemycomment: function (id) {
    comments.doc(id).remove()
      .then(console.log('删除成功'))
      .catch(console.error)
  },
  confirmdeletemycomment: function (e) {
    var openid=app.globalData.openid
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
              content:res.data
            })
          })
      })

  },
  deletemyproblem:function(id){
    questions.doc(id).remove()
      .then(console.log('删除成功'))
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
              content:res.data
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
    }
    else if (tempname == "templikes") {
      that.setData({
        content: likemycomment
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
    if (app.globalData.openid) {
      this.setData({
        title: options.title,
        tempname: options.name,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      var openid = app.globalData.openid


      // 获取我收到的评论
      comments.where({
        qUserId: openid
      })
        .field({

          comAvatarUrl: true,//评论者的头像
          comNickName: true,//评论者名字
          ccontent: true,//评论内容
          time: true,//评论时间
          title: true,//评论标题
          qid: true//问题id
        })
        .get()
        .then(res => {
          // console.log(res.data)
          contentobj[0] = res.data
          var that = this
          this.getcontent(options.name, that, contentobj)
        })
      // 获取点赞我的???有问题哦
      comments.where({
        _openid: openid
      })
        .field({
          admire: true,
          ccontent: true,
          qid: true
        })
        .get()
        .then(res => {
          console.log(res.data)
          contentobj[1] = res.data
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
          console.log(res.data)
          contentobj[2] = res.data
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
          time: true
        })
        .get()
        .then(res => {
          // console.log(res.data)
          contentobj[3] = res.data
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