// pages/q_second/index.js
const db = wx.cloud.database()
var util = require('../../utils/util.js')
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
    wx.showToast({
      title: "loadig...",
      image: "../../images/loading.png",
      mask: true
    })

    this.setData({
      qid: options.id,
      ansLength: this.data.ansList.length
    })

    var that = this
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          admireAvatarUrl: res.userInfo.avatarUrl,
          admireNickName: res.userInfo.nickName
        })
      }
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
            qAvatarUrl : qAvatarUrl,
            qNickName : qNickName
          })
        })
      })

    db.collection("comments").where({
      qid: options.id
    }).get().then(
      res => {
       res.data.map(item => {
        const fileList = item.compic ? item.compic : false
          if (fileList) {
            wx.cloud.getTempFileURL({
              fileList
            }).then(res=>{
              item.compic=res.fileList
            })
          }
        })
        console.log(res.data)
        this.setData({
          ansList: res.data
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

  },
  handleInput: function(e) {
    console.log(this.data)
    var len = e.detail.value.length
    if (len > 150) {
      return
    } else {
      this.setData({
        reviewData: e.detail.value
      })
    }
  },
  handlePreview(e) {
    const index = e.target.dataset.idx
    const fileList = new Array()
    fileList.push(index)
    wx.cloud.getTempFileURL({
      fileList
    }).then(result =>{
      const temp = new Array()
      const temps = result.fileList[0].tempFileURL
      temp.push(temps)
      wx.previewImage({
        urls: temp,
      })
    })
  },
  handleImagePreview(e) {
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
  addpic() {
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
  submitReview() {
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
              admireNickName: this.data.admireNickName,
              admireAvatarUrl: this.data.admireAvatarUrl
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
            admireNickName: this.data.admireNickName,
            admireAvatarUrl : this.data.admireAvatarUrl
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
  }
})