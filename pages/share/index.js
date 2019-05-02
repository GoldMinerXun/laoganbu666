//index.js
//获取应用实例
const app = getApp()

var getColor = function () {
  var i = 0;
  var str = "#";
  var random = 0;
  var aryNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

  for (i = 0; i < 6; i++) {
    random = parseInt(Math.random() * 16);

    str += aryNum[random];
  }
  return str
}

Page({
  search : function(e){
    var val = e.detail.value.content;
    console.log(val)
  },
  data: {
    inputValue: '',
    hot: [{
      title: "什么是软件工程？",
      tag: ["计算机科学与技术", "软件工程"],
      content: "求问软件工程的定义？考试重点在哪？",
      color: `linear-gradient(to right,${getColor()},${getColor()})`
    },
    {
      title: "什么是软件工程？",
      tag: ["计算机科学与技术", "软件工程", "C语言程序设计"],
      content: "求问软件工程的定义？考试重点在哪？",
      color: `linear-gradient(to right,${getColor()},${getColor()})`
    },
    {
      title: "什么是软件工程？",
      tag: ["计算机科学与技术", "软件工程", "C语言程序设计"],
      content: "求问软件工程的定义？考试重点在哪？",
      color: `linear-gradient(to right,${getColor()},${getColor()})`
    },
    {
      title: "什么是软件工程？",
      tag: ["计算机科学与技术", "软件工程", "C语言程序设计"],
      content: "求问软件工程的定义？考试重点在哪？",
      color: `linear-gradient(to right,${getColor()},${getColor()})`
    },
    {
      title: "什么是软件工程？",
      tag: ["计算机科学与技术", "软件工程", "C语言程序设计"],
      content: "求问软件工程的定义？考试重点在哪？",
      color: `linear-gradient(to right,${getColor()},${getColor()})`
    },
    {
      title: "什么是软件工程？",
      tag: ["计算机科学与技术", "软件工程", "C语言程序设计"],
      content: "求问软件工程的定义？考试重点在哪？",
      color: `linear-gradient(to right,${getColor()},${getColor()})`
    },
    {
      title: "什么是软件工程？",
      tag: ["计算机科学与技术", "软件工程", "C语言程序设计"],
      content: "求问软件工程的定义？考试重点在哪？",
      color: `linear-gradient(to right,${getColor()},${getColor()})`
    }
    ]
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
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
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      // wx.getUserInfo({
      //   success: res => {
      //     app.globalData.userInfo = res.userInfo
      //     this.setData({
      //       userInfo: res.userInfo,
      //       hasUserInfo: true
      //     })
      //   }
      // })
    }
  },
  handleChange: function ({
    detail
  }) {
    // console.log(detail)
    wx.redirectTo({
      url: '../' + detail.key + '/index',
    })
  },

  getUserInfo: function (e) {

  },
  onReady: function () {
    wx.hideLoading()
  }
})