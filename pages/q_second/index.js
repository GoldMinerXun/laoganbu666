// pages/q_second/index.js
const db = wx.cloud.database()
var util = require('../../utils/util.js')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionData: {},
    qid: '',
    reviewData: '',
    tempFilePaths: new Array(),
    imagesList: new Array(),
    ansPicture: new Array(),
    ansList: new Array()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this

    wx.showToast({
      title: "loadig...",
      image: "../../images/loading.png",
      mask: true
    })

    this.setData({
      qid: options.id,
      ansLength: this.data.ansList.length
    })

    db.collection("questions").where({
      _id: options.id
    }).get().then(
      res => {
        console.log(res)
        const questionData = res.data[0]
        const fileList = res.data[0].images
        const qAvatarUrl = res.data[0].qAvatarUrl
        const qNickName = res.data[0].qNickName
        wx.cloud.getTempFileURL({
          fileList
        }).then(result => {
          this.setData({
            qUserId: res.data[0]._openid,
            questionData: res.data[0],
            questionTempImage: result.fileList,
            qid: options.id,
            qAvatarUrl: qAvatarUrl,
            qNickName: qNickName
          })
        })
      })

    db.collection("comments").where({
      qid: options.id
    }).get().then(
      res => {
        console.log(res.data)
        wx.getStorage({
          key: 'openid',
          success: function(res1) {
            console.log(res1.data)
            that.setData({
              localOpenid: res1.data
            })
          },
        })
        res.data.map(item => {
          const fileList = item.compic ? item.compic : false
          if (fileList) {
            wx.cloud.getTempFileURL({
              fileList
            }).then(res => {
              item.compic = res.fileList

            })
          }
        })
        console.log(res.data)
        this.setData({
          ansList: res.data
        })
        var arr = new Array()
        db.collection('admires').where({
          qid: options.id
        }).get().then(result => {
          console.log(result.data)
          this.setData({
            admireList: result.data
          })
          res.data.forEach(item => {
            var index = 0
            var flag = false
            result.data.forEach(items => {
              if (item._id == items.cid && this.data.localOpenid == items._openid) {
                flag = true
              }
            })
            if (flag) {
              arr.push(1)
            } else {
              arr.push(0)
            }
            console.log(arr)
            that.setData({
              admireArr : arr
            })
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
    var app = getApp()
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
  handleInput: function(e) {
    var len = e.detail.value.length
    if (len > 150) {
      return
    } else {
      this.setData({
        reviewData: e.detail.value
      })
    }
  },
  handlePreview: function(e) {
    const index = e.target.dataset.idx
    const fileList = new Array()
    fileList.push(index)
    wx.cloud.getTempFileURL({
      fileList
    }).then(result => {
      const temp = new Array()
      const temps = result.fileList[0].tempFileURL
      temp.push(temps)
      wx.previewImage({
        urls: temp,
      })
    })
  },
  handleImagePreview: function(e) {
    const images = []
    this.data.questionTempImage.map(item => {
      images.push(item.tempFileURL)
    })
    const idx = e.target.dataset.idx
    console.log(e.target.dataset.idx)
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  handleAdmire: function(e) {
    var that = this
    if (app.globalData.openid) {
      db.collection('admires').add({
        data: {
          admireNickName: app.globalData.userInfo.nickName,
          admireAvatarUrl: app.globalData.userInfo.avatarUrl,
          time: util.formatTime(new Date()),
          cid: e.currentTarget.dataset.qid,
          qid: this.data.qid,
          ccontent: e.currentTarget.dataset.ccontent
        },
        success: function() {
          wx.showToast({
            title: '',
            image: './thanks.png',
            duration: 500
          })
        }
      })
    } else {
      wx.showModal({
        title: '需要登陆后才可以点赞哦',
        confirmText: '去登录',
        cancelText: '不赞了',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/index',
            })
          }
        }
      })
    }
  },
  addpic: function() {
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
  submitReview: function() {
    if (app.globalData.openid) {
      console.log(app.globalData.openid, app.globalData.userInfo)
      var reviewdata = this.data.reviewData
      var id = this.data.qid
      if (reviewdata) {
        wx.showToast({
          title: '正在发送',
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
            db.collection('comments').add({
              data: {
                qid: this.data.qid,
                time: util.formatTime(new Date),
                ccontent: this.data.reviewData,
                admire: new Array(),
                compic: this.data.imagesList,
                title: this.data.questionData.title,
                qUserId: this.data.qUserId,
                commentNickName: app.globalData.userInfo.nickName,
                commentAvatarUrl: app.globalData.userInfo.avatarUrl
              },
              success: function() {
                wx.showToast({
                  title: '发布成功',
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                })
              }
            })
          })
        } else {
          db.collection('comments').add({
            data: {
              qid: this.data.qid,
              time: util.formatTime(new Date),
              ccontent: this.data.reviewData,
              admire: new Array(),
              title: this.data.questionData.title,
              qUserId: this.data.qUserId,
              commentNickName: app.globalData.userInfo.nickName,
              commentAvatarUrl: app.globalData.userInfo.avatarUrl
            },
            success: function() {
              wx.showToast({
                title: '发布成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
            },
            fail: function() {
              wx.showToast({
                title: '发送失败',
              })
            }
          })
        }
      }
    } else {
      wx.showToast({
        title: '亲，请登录后再重试哦',
        image: './tip.png',
        duration: 1000,
        mask: true,
        success: function() {
          setTimeout(function() {
            wx.navigateTo({
              url: '../login/index'　　
            })
          }, 1000)
        }
      })
    }
  }
})