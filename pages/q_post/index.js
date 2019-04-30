// pages/q_post/index.js
var util = require('../../utils/util.js')
const db = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    max: 500,
    now: 0,
    title: '',
    content: '',
    user: '',
    imagesList: new Array(),
    tempFilePaths: new Array()
  },
  charChange: function(e) {
    var value = e.detail.value
    var len = value.length
    if (len > 500) {
      return
    } else {
      this.setData({
        content: value,
        now: len
      })
    }
  },
  titleChange: function(e) {
    var title = e.detail.value
    if (title.length > 15) {
      return
    } else {
      this.setData({
        title: title
      })
    }
  },
  uploadpic: function() {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
        console.log(res.tempFilePaths)
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!app.globalData) {
      wx.switchTab({
        url: '../me/index',
      })
    }
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          qAvatarUrl: res.userInfo.avatarUrl,
          qNickName: res.userInfo.nickName
        })
      }
    })
  },
  submitForm(e) {

    const title = this.data.title
    const content = this.data.content
    if (content && title) {
      wx.showLoading({
        title: '正在发布...',
        mask: true
      })

      const arr = this.data.tempFilePaths.map(path => {
        const name = Math.random() * 1000000;
        const time = util.formatTime(new Date)
        const cloudPath = name + path.match(/\.[^.]+?$/)[0]
        return wx.cloud.uploadFile({
          cloudPath: time.replace(/\s+/g, '').replace(new RegExp(/(:)/g), '').replace(/\\|\//g, '') + cloudPath,
          filePath: path
        }).then(res => {
          console.log(res.fileID)
          this.data.imagesList.push(res.fileID)
        }).catch(error => {
          console.log(error)
        })
      })

      if (this.data.tempFilePaths.length != 0) {
        Promise.all(arr).then(res => {
          db.collection('questions').add({
            data: {
              uid: 'myc',
              title: this.data.title,
              content: this.data.content,
              tags: [],
              time: util.formatTime(new Date()),
              type: false,
              images: this.data.imagesList,
              qAvatarUrl: this.data.qAvatarUrl,
              qNickName: this.data.qNickName

            },
            success: function() {
              wx.showToast({
                title: '发布成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
              setTimeout(function() {
                wx.switchTab({
                  url: '../share/index',
                })
              }, 1000)
            }
          })
        }).catch(err => {
          wx.hideLoading()
          wx.showToast({
            title: '发布失败',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        })
      } else {
        db.collection('questions').add({
          data: {
            uid: 'myc',
            title: this.data.title,
            content: this.data.content,
            tags: [],
            time: util.formatTime(new Date()),
            type: false,
            images: this.data.imagesList,
            qAvatarUrl: this.data.qAvatarUrl,
            qNickName: this.data.qNickName
          },
          success: function() {
            wx.showToast({
              title: '发布成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            setTimeout(function(){
              wx.switchTab({
                url: '../share/index',
              })
            },1000)
          },
          fail: function() {
            wx.showToast({
              title: '发布失败',
              icon: 'none',
              duration: 1500,
              mask: true
            })
          }
        })
      }
    }
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.tempFilePaths
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
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

  }
})