// pages/login/index.js
let app = getApp()
let sno = null;
let academic = null;
let major = null;
let openid = null;
let avatorurl = null;
let wechat = require('./wechat.js');

const db = wx.cloud.database();
const userDB = db.collection('user');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [
      [
        '计算机科学与技术学院',
        '机械动力工程学院',
        '材料科学与工程学院',
        '电气与电子工程学院',
        '自动化学院',
        '测控技术与通信工程学院',
        '化学与环境工程学院',
        '软件与微电子学院',
        '建筑工程学院',
        '理学院',
        '经济与管理学院',
        '外国语学院',
        '法学院',
        '艺术学院',
        '马克思主义学院',
        '国际文化教育学院',
        '其它',

      ],
      [
        '计算机科学与技术', '网络工程'

      ]
    ],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ], [
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ], [
        {
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0],

  },
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var academicindex = e.detail.value[0]
    var majorindex = e.detail.value[1]
    academic = this.data.multiArray[0][academicindex]
    major = this.data.multiArray[1][majorindex]
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['计算机科学与技术', '网络工程'];
            break;
          case 1:
            data.multiArray[1] = ['机械设计制造及其自动化', '机械电子工程', '能源与动力工程', '车辆工程',];
            break;
          case 2:
            data.multiArray[1] = ['材料成型及控制工程(焊接方向)', '材料成型及控制工程(模具方向)', '金属材料工程', '无机非金属材料工程', '高分子材料与工程',];
            break;
          case 3:
            data.multiArray[1] = ['电气工程及其自动化', '电子信息工程', '新能源材料与器件'];
            break;
          case 4:
            data.multiArray[1] = ['自动化', '电子信息科学与技术'];
            break;
          case 5:
            data.multiArray[1] = ['测控技术与仪器', '通信工程', '安全工程'];
            break;
          case 6:
            data.multiArray[1] = ['材料化学', '环境工程', '化学工程与工艺', '制药工程', '食品科学与工程'];
            break;
          case 7:
            data.multiArray[1] = ['软件工程', '集成电路设计与集成系统', '物联网工程', '电子科学与技术'];
            break;
          case 8:
            data.multiArray[1] = ['工程力学', '土木工程', '建筑学'];
            break;
          case 9:
            data.multiArray[1] = ['信息与计算科学', '应用物理学', '光电信息科学与工程', '材料物理'];
            break;
          case 10:
            data.multiArray[1] = ['信息管理与信息系统', '工商管理', '市场营销', '人力资源管理', '金融学', '会计学', '国际经济与贸易'];
            break;
          case 11:
            data.multiArray[1] = ['英语', '日语', '俄语', '朝鲜语'];
            break;
          case 12:
            data.multiArray[1] = ['法学'];
            break;
          case 13:
            data.multiArray[1] = ['视觉传达设计', '环境设计', '绘画', '动画',];
            break;
          case 14:
            data.multiArray[1] = ['哲学',
            ];
            break;
          case 15:
            data.multiArray[1] = ['汉语国际教育',
            ];
            break;
          case 16:
            data.multiArray[1] = ['其他'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登陆',
    })
    wx.showToast({
      title: "loadig...",
      image: "../../images/loading.png",
      mask: true
    })
  },
  inputSno: function (event) {
    sno = event.detail.value
  },
  bindgetuserinfo(e) {
    // console.log(e.detail.userInfo)
    var userInfo = e.detail.userInfo
    let that = this;
    if (major && academic && sno) {
      wechat.login()
        .then(data => {
          return wechat.wxcloudcallfunction()
        })
        .then(data => {
          app.globalData.openid = data.openid
          openid=app.globalData.openid
          app.globalData.userInfo=userInfo
          wx.setStorage({
            key: 'openid',
            data: openid,
          })
          wx.setStorage({
            key: 'userinfo',
            data: userInfo
          })
          app.globalData.userInfo = userInfo
          // console.log(app.globalData)
          return wechat.updateUserInfo(app, major, sno, academic)
        }).then(data => {
          wx.navigateBack({
            delta: 2
          })
        })
        .catch(e => {
          console.log(e);
        })
    } else {
      wx.showToast({
        title: `请补充完整您的信息`,
        icon: 'none',
        duration: 2000
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
    wx.hideToast()
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