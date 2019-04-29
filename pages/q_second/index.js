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
    ansPicture: [
      'https://i.loli.net/2017/08/21/599a521472424.jpg',
      'https://i.loli.net/2017/08/21/599a521472424.jpg',
      'https://i.loli.net/2017/08/21/599a521472424.jpg'
    ],
    ansList: [{
        name: 'wsx',
        ans: '但说到这场戏时，俞飞鸿表现得很平静：',
        riqi: '1 day ago',
        image: ['https://i.loli.net/2017/08/21/599a521472424.jpg',
          'https://i.loli.net/2017/08/21/599a521472424.jpg',
          'https://i.loli.net/2017/08/21/599a521472424.jpg'
        ]
      },
      {
        name: 'zcq',
        ans: '但说到这场戏时，俞飞鸿表现得很平静：她也谈到了自己的衣服：“只有在电影里才能尝试穿全黑的',
        riqi: '1 day ago'
      }, {
        name: 'myc',
        ans: '简单、纯粹，也冷，也温暖。但说到这场戏时，俞飞鸿表现得很平静：',
        riqi: '1 day ago'
      },
      {
        name: 'mgj',
        ans: '被问及这个角色最打动她的地方时，但说到这场戏时，俞飞鸿表现得很平静：',
        riqi: '1 day ago'
      },
      {
        name: 'wsx',
        ans: '她也谈到了自己的衣服,但说到这场戏时，俞飞鸿表现得很平静：',
        riqi: '1 day ago'
      }
    ]
  },
  addAll: function() {
    if (!this.data.sign) {
      this.setData({
        sign: !this.data.sign,
        addAll: 'normal',
        changeshou: '点击收起'
      })
    } else {
      this.setData({
        sign: !this.data.sign,
        addAll: 'nowrap',
        changeshou: '点击查看全部'
      })
    }
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

    db.collection("questions").where({
      _id: options.id
    }).get().then(
      res => {
        questionData: res.data[0]
        const fileList = res.data[0].images
        wx.cloud.getTempFileURL({
          fileList
        }).then(result => {
          db.collection('comments').where({
            qid: options.id
          }).get().then(resultTwo => {
            this.setData({
              questionData: res.data[0],
              questionTempImage: result.fileList,
              qid: options.id
            })
          })
        })
      })

    // db.collection("comments").where({
    //   _id: options.id
    // }).get().then(
    //   res => {
    //     questionData: res.data[0]
    //     const fileList = res.data[0].images
    //     wx.cloud.getTempFileURL({
    //       fileList
    //     }).then(result => {
    //       db.collection('comments').where({
    //         qid: options.id
    //       }).get().then(resultTwo => {
    //         this.setData({
    //           questionData: res.data[0],
    //           questionTempImage: result.fileList,
    //           qid: options.id
    //         })
    //       })
    //     })
    //   })
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
  handleImagePreview(e) {
    const images = []
    this.data.questionTempImage.map(item => {
      images.push(item.tempFileURL)
    })
    const idx = e.target.dataset.idx
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
              qid: this.data.id,
              time: util.formatTime(new Date),
              ccontent: this.data.reviewData,
              admire: new Array(),
              compic: this.data.imagesList
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
            qid: this.data.id,
            time: util.formatTime(new Date),
            ccontent: this.data.reviewData,
            admire: new Array(),
            compic: new Array()
          },
          success: function() {
            wx.showToast({
              title: '发布成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
          },
          fail : function(){
            wx.showToast({
              title: '发送失败',
            })
          }
        })
      }
    }
  }
})