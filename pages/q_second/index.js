// pages/q_second/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sign: false,
    addAll: 'nowrap',
    detail_author: '莫永超',
    tittle: '新手求大神指导',
    tagsList: ['相机', '免押金', '光线'],
    question: '在这部电影里，俞飞鸿饰演的是38岁的服装设计师袁元。这个角色气质出众、事业有成，但在光鲜亮丽之下却掩藏着一段不为人知的秘密。电影有爱情的色彩，但更多的是关于女性的选择、内心成长和自我救赎，是一部女性色彩非常浓烈的电影，让俞飞鸿来出演显得很合适。被问及这个角色最打动她的地方时，俞飞鸿简短地回答道：“它是我这个年龄才能出演的。”在片中，她用原声日本台词，还有一场在北海道冰水中的戏。但说到这场戏时，俞飞鸿表现得很平静：“其实严寒是可以克服的，但在到达生命临界点的情况下还要保持演员的状态，这对于我来说是一次新奇的体验和挑战。”她也谈到了自己的衣服：“只有在电影里才能尝试穿全黑的，电视剧总是需要鲜艳的色彩。我喜欢《在乎你》里面的色调，简单、纯粹，也冷，也温暖。',
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

    const db = wx.cloud.database();

    db.collection("questions").where({
      _id: 'XLr2xnkPDdDCJ9ei'
    }).get().then(
      res => {
        console.log(res.data)
      })

    // // this.setData({
    // //   ansLength: this.data.ansList.length
    // // })
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
  handleInput: function() {
    console.log(this.data.dataList)
  }
})