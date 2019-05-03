// pages/q_post/index.js
var util = require('../../utils/util.js')
const db = wx.cloud.database()
const app = getApp()
let promise = require('./Promise.js')
let  academic=null
let major=null
let subject=null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    max: 300,
    now: 0,
    title: '',
    content: '',
    userInfo:{},
    imagesList: new Array(),
    tempFilePaths: new Array(),
    multiArray: [
      [
        '外国语学院', '计算机学院','理学院'
      ],
      [
        '朝鲜语', '日语', '俄语', '英语'
      ],
      [
        '朝语精读', '视听', '会话', '泛读', '写作', '朝汉翻译', '报刊选读', '文学作品选读', '韩国文学史', '韩国社会文化', '韩国影视作品欣赏'
      ]
    ],
    multiIndex: [0, 0, 0],
    tags:[]
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var academicindex = e.detail.value[0]
    var majorindex = e.detail.value[1]
    var subjectindex=e.detail.value[2]
    academic = this.data.multiArray[0][academicindex]
    major = this.data.multiArray[1][majorindex]
    subject= this.data.multiArray[2][subjectindex]
    console.log(academic,major,subject)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
   
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['朝鲜语', '日语', '俄语', '英语'];
            data.multiArray[2] = ['朝语精读','视听', '会话', '泛读', '写作', '朝汉翻译', '报刊选读', '文学作品选读', '韩国文学史', '韩国社会文化', '韩国影视作品欣赏'];
            break;
          case 1:
            data.multiArray[1] = ['计算机科学与技术'];
            data.multiArray[2] = ['C++程序设计', 'Java语言', 'UML建模基础', '离散数学', '数字逻辑', '数据结构', '计算机组成原理', '汇编语言程序设计', '操作系统', '计算机网络', 'Linux系统应用', '计算机系统结构', '算法设计与分析', '数据库系统基础', '软件工程', 'Oracle数据库', '嵌入式系统设计', '数字图像处理'];
            break;
          case 2:
            data.multiArray[1] = ['材料物理','光电信息科学与工程','信息与计算科学','应用物理学'];
            data.multiArray[2] = ['数学物理方法', '力学与理论力学', '热力学与统计物理', '电磁学与电动力学', '原子物理与量子力学', '固体物理', '材料性能测试', '物理化学', '电介质物理', '材料科学基础', '材料物理性能', '功能材料', '复合材料', '薄膜材料', '电子技术', '计算机原理'];
            break;
            // 综合性学科分类，例如高数，大英等,一级名称为综合性学科，二级名称为高数，大学英语，三级对应高数一，高数二，考研数学，大学英语1，大学英语二，考研英语
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['朝语精读', '视听', '会话', '泛读', '写作', '朝汉翻译', '报刊选读', '文学作品选读', '韩国文学史', '韩国社会文化', '韩国影视作品欣赏'];
                break;
              case 1:
                data.multiArray[2] = ['基础俄语', '高级俄语', '语音', '语法', '视听', '会话', '阅读', '应用文写作', '俄苏文学史及作品选读', '俄罗斯概况', '笔译', '口译', '报刊选读', '经贸俄语', '国际贸易实务', '商务俄语口译', '科技俄语笔译', '科技俄语口译', '科技俄语阅读', '俄罗斯影视作品欣赏', '俄罗斯国情专题'];
                break;
              case 2:
                data.multiArray[2] = ['基础日语', '日语精读', '日语视听', '日语会话', '日文写作', '日本文学作品选读', '日语语法', '日语概说', '日本文学史', '科技日语阅读', '科技日语翻译', '日本贸易实务', '商务日语'];
                break;
              case 3:
                data.multiArray[2] = ['基础英语', '高级英语', '阅读', '听力', '口语', '写作', '语言学', '英国文学', '美国文学', '科技英语阅读', '科技英语翻译', '外贸英语'];
                break;
             
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['C++程序设计', 'Java语言', 'UML建模基础', '离散数学', '数字逻辑', '数据结构', '计算机组成原理', '汇编语言程序设计', '操作系统', '计算机网络', 'Linux系统应用', '计算机系统结构', '算法设计与分析', '数据库系统基础', '软件工程', 'Oracle数据库', '嵌入式系统设计', '数字图像处理'];
                break;
            }
            break;
          case 2:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['数学物理方法', '力学与理论力学', '热力学与统计物理', '电磁学与电动力学', '原子物理与量子力学', '固体物理', '材料性能测试', '物理化学', '电介质物理', '材料科学基础', '材料物理性能', '功能材料', '复合材料', '薄膜材料', '电子技术', '计算机原理'];
                break;
                case 1:
                data.multiArray[2] = ['近代物理基础', '数学物理方法', '物理光学与应用光学', '电路', '电子技术', '固体物理', '激光原理与技术', '光学系统设计', '光通信原理与技术', '光电检测技术', '光电信息工程实验'];
                break;
              case 2:
                data.multiArray[2] = ['数学分析', '几何与高代', '概率论与数理统计', '信息科学基础', '信息与编码', '数值分析', '数学建模', '优化与运筹', '计算机图形学', 'VC++程序设计', '图像处理', '软件工程'];
                break;
              case 3:
                data.multiArray[2] = ['子物理与量子力学', '电磁学与电动力学', '力学与理论力学', '热学与热力学统计物理', '固体物理', '光学', '传感器原理', '半导体物理', '计算物理', '现代测试技术', '信息材料以及现代物理专业实验'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  charChange: function (e) {
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
  titleChange: function (e) {
    var title = e.detail.value
    if (title.length > 15) {
      return
    } else {
      this.setData({
        title: title
      })
    }
  },
  uploadpic: function () {
    var that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
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
  onLoad: function (options) {
    

  },
  submitForm(e) {
    if(app.globalData.openid){
      const title = this.data.title
      const content = this.data.content
      if (content && title&&academic&&major&&subject) {
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
            console.log(academic,major,subject)
            db.collection('questions').add({
              data: {
                title: this.data.title,
                content: this.data.content,
                tags: [academic, major, subject],
                time: util.formatTime(new Date()),
                type: false,
                images: this.data.imagesList,
                qAvatarUrl: this.data.userInfo.avatarUrl,
                qNickName: this.data.userInfo.nickName
              },
              success: function () {
                wx.showToast({
                  title: '发布成功',
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 2
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
              title: this.data.title,
              content: this.data.content,
              tags: [academic,major,subject],
              time: util.formatTime(new Date()),
              type: false,
              images: this.data.imagesList,
              qAvatarUrl: this.data.userInfo.avatarUrl,
              qNickName: this.data.userInfo.nickName
            },
            success: function () {
              wx.showToast({
                title: '发布成功',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta:2
                })
              }, 1000)
            },
            fail: function () {
              wx.showToast({
                title: '发布失败',
                icon: 'none',
                duration: 1500,
                mask: true
              })
            }
          })
        }
      } else {
        promise.showtoast()
      }
    }else{
      promise.showmodal().then(res => {
        console.log(res.confirm)
        if (res.confirm) {
          return wx.navigateTo({
            url: '../login/index',
          })
        }
      })
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!app.globalData.openid) {
      promise.showmodal().then(res => {
        console.log(res.confirm)
        if (res.confirm) {
          return wx.navigateTo({
            url: '../login/index',
          })
        }
      })
    }else{
      // console.log(app.globalData.userInfo)
      this.setData({
        userInfo:app.globalData.userInfo
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