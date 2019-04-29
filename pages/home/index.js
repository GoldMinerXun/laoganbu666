// pages/home/index.js
const db = wx.cloud.database()
Page({
  data: {
    hotList: [],
    imageUrl: [],
    detailList: []
  },
  jumpTo: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../q_second/index?id=' + e.currentTarget.dataset.id,
    })
  },
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
    db.collection('questions').where({})
      .limit(3)
      .get().then(res => {
        console.log(res)
        var tempContent = []
        res.data.map(item => {
          tempContent.push(item.content.slice(0, 20))
        })
        var temp = []
        res.data.forEach(item => {
          if (item.images.length != 0) {
            temp.push(item.images[0])
          } else {
            const defaultFileId = 'cloud://laobanbu666-aeacf2.6c61-laobanbu666-aeacf2/default/default.png'
            temp.push(defaultFileId)
          }
        })
        const fileList = temp
        wx.cloud.getTempFileURL({
          fileList
        }).then(result => {
          console.log(result.fileList)
          this.setData({
            hotList: res.data,
            imageUrl: result.fileList,
            detailList: tempContent
          })
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideToast()
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