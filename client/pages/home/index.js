// pages/home/index.js
const db = wx.cloud.database()
var wxParse = require('../../wxParse/wxParse.js')
Page({
  data: {
    hotList: [],
    imageUrl: [],
    detailList: [],
    newArr: new Array(),
    modalarr: new Array()
  },
  jumpTo: function(e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../q_second/index?id=' + e.currentTarget.dataset.id,
    })
  },
  // 评论的评论：存入评论表，对应的结构是A对B的评论，存入A-B
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '首页',
    })
    wx.showToast({
      title: "loadig...",
      image: "../../images/loading.png",
      mask: true
    })

    var that = this
    const defaultArr = ['cloud://laoganbu-02d4d0.6c61-laoganbu-02d4d0/QQ图片20190506220228.png', 'cloud://laoganbu-02d4d0.6c61-laoganbu-02d4d0/home1.jpg', 'cloud://laoganbu-02d4d0.6c61-laoganbu-02d4d0/home2.jpg', 'cloud://laoganbu-02d4d0.6c61-laoganbu-02d4d0/home3.jpg']
    var deal = function() {
      var fileList = defaultArr
      wx.cloud.getTempFileURL({
        fileList,
      }).then(res => {
        that.setData({
          defaultAd: res.fileList
        })
      })
    }
    deal()

    // db.collection('questions').where({})
    //   .limit(3)
    //   .get().then(res => {
    //     var tempContent = []
    //     res.data.map(item => {
    //       tempContent.push(item.content.slice(0, 20))
    //     })
    //     var temp = []
    //     res.data.forEach(item => {
    //       if (item.images.length != 0) {
    //         temp.push(item.images[0])
    //       } else {
    //         const defaultFileId = 'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/defaultPicture/default.png'
    //         temp.push(defaultFileId)
    //       }
    //     })
    //     const fileList = temp
    //     wx.cloud.getTempFileURL({
    //       fileList
    //     }).then(result => {
    //       // console.log(result.fileList)
    //       this.setData({
    //         hotList: res.data,
    //         imageUrl: result.fileList,
    //         detailList: tempContent
    //       })
    //     })
    //   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideToast()
    // wx.cloud.callFunction({
    //   name: "getNewlyData",
    //   data: {},
    //   success: function(res) {
    //     console.log(res.result.data)
    //   },
    //   fail: function(err) {
    //     console.log(err)
    //   }
    // })
    const that = this
    wx.cloud.callFunction({
      name: "getNewlyData",
      data: {},
      success: function(res) {
        // console.log(res.result)
        var len = res.result.data.length
        var arr = new Array()
        if (len < 3) {
          arr = res.result.data
        } else {
          arr = res.result.data.slice(len - 3, len)
        }
        // for (var i = 0; i < arr.length; i++) {
        //   that.data.modalarr.push(arr[i]._id)
        //   console.log(that.data.modalarr[i])
        //   wxParse.wxParse(arr[i]._id, 'html', arr[i].content, that, 0);
        // }
        // var temparr = new Array()
        // for (var i = 0; i < that.data.modalarr.length; ++i) {
        //   var temp = that.data.modalarr[i]
        //   temparr.push(that.data[temp])
        //   console.log(temparr)
        // }
        var tempContent = []
        arr.map(item => {
          tempContent.push(item.content.slice(0, 25) + '...')
        })
        // var temp = []
        // arr.forEach(items => {
        //   if (items.images.length != 0) {
        //     temp.push(items.images[0])
        //   } else {
        //     const defaultFileId = 'cloud://laoganbu-02d4d0.6c61-laoganbu-02d4d0/loading.png'
        //     temp.push(defaultFileId)
        //   }
        // })
        // const fileList = temp
        // wx.cloud.getTempFileURL({
        //   fileList
        // }).then(result => {
        // that.setData({
        //   hotList: arr.reverse(),
        //   imageUrl: result.fileList.reverse(),
        //   detailList: tempContent.reverse()
        // newArr: temparr
        // })
        // })
        that.setData({
          hotList: arr.reverse(),
          // imageUrl: result.fileList.reverse(),
          detailList: tempContent.reverse(),
          // newArr: temparr
        })
      },
      fail: function(err) {
        // console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
    var that = this
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 1000)
    that.onReady()
  }
})
wx.setNavigationBarColor({
  frontColor: '#ffffff',
  backgroundColor: '#17ADFE',
  animation: {
    duration: 400,
    timingFunc: 'easeIn'
  }
})