// client/pages/editor-anwser/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    max: 300,
    now: 0,
    title: '',
    content: '',
    userInfo: {},
    imagesList: new Array(),
    tempFilePaths: new Array(),
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '开始输入...',
    _focus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
  showIcon: function() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  format: function(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },
  removeFormat: function() {
    this.editorCtx.removeFormat()
  },
  insertDate: function() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  undo: function() {
    this.editorCtx.undo()
  },
  redo: function() {
    this.editorCtx.redo()
  },
  insertDivider: function() {
    this.editorCtx.insertDivider({
      success: function() {
        console.log('insert divider success')
      }
    })
  },
  clear: function() {
    this.editorCtx.clear({
      success: function(res) {
        console.log("clear success")
      }
    })
  },
  onStatusChange: function(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  onEditorReady: function () {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  uploadpic: function () {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
        // console.log(res.tempFilePaths)
      },
    })
  },
  handleDelete: function (e) {
    // console.log(e.currentTarget.dataset.index)
    const index = e.currentTarget.dataset.index
    var temp = this.data.tempFilePaths
    temp.splice(index, 1)
    this.setData({
      tempFilePaths: temp
    })
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.tempFilePaths
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  handleInput : function(e) {
    console.log(e.detail.text)
  }
})