// pages/notice-secondary/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面标题
    title: "",
    // 页面对应模板名
    tempname: "",
    content: [

    ],

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  //获取页面传递的参数
  onLoad: function (options) {
    var that=this
    var getcontent=function(tempname,that) {
      var comment = [
        {
          name: "可爱多",
          avator: "./test-avator.png",
          showcontent: "这里应该使用链表",
          mycontent: "线性表就可以解决",
          time: "2019年4月16日 20:07"
        },
        {
          name: "可爱多",
          avator: "./test-avator.png",
          showcontent: "这里应该使用链表",
          mycontent: "线性表就可以解决",
          time: "2019年4月16日 20:07"
        },
        {
          name: "可爱多",
          avator: "./test-avator.png",
          showcontent: "这里应该使用链表",
          mycontent: "线性表就可以解决",
          time: "2019年4月16日 20:07"
        },
        {
          name: "可爱多",
          avator: "./test-avator.png",
          showcontent: "这里应该使用链表",
          mycontent: "线性表就可以解决",
          time: "2019/4/16 20:07"
        },
        {
          name: "可爱多",
          avator: "./test-avator.png",
          showcontent: "这里应该使用链表",
          mycontent: "线性表就可以解决",
          time: "2019/4/16 20:07"
        },
        {
          name: "可爱多",
          avator: "./test-avator.png",
          showcontent: "这里应该使用链表",
          mycontent: "线性表就可以解决",
          time: "2019/4/16 20:07"
        },
        {
          name: "可爱多",
          avator: "./test-avator.png",
          showcontent: "这里应该使用链表",
          mycontent: "线性表就可以解决",
          time: "2019/4/16 20:07"
        }
        
      ];
      var myproblem = [
        {
          myproblemtitle: "用汇编语言如何写出二进制乘法程序？",
          mycontent: "用汇编语言如何写出二进制乘法程序？具体如何实现移位？".slice(0, 20) + "...",
          time: "2019年4月15日 10:11",
          url: ""
        }, {
          myproblemtitle: "用汇编语言如何写出二进制乘法程序？",
          mycontent: "用汇编语言如何写出二进制乘法程序？具体如何实现移位？".slice(0, 20) + "...",
          time: "2019年4月15日 10:11",
          url: ""
        }, {
          myproblemtitle: "用汇编语言如何写出二进制乘法程序？",
          mycontent: "用汇编语言如何写出二进制乘法程序？具体如何实现移位？".slice(0, 20) + "...",
          time: "2019年4月15日 10:11",
          url: ""
        }, {
          myproblemtitle: "用汇编语言如何写出二进制乘法程序？",
          mycontent: "用汇编语言如何写出二进制乘法程序？具体如何实现移位？".slice(0, 20) + "...",
          time: "2019年4月15日 10:11",
          url: ""
        }, {
          myproblemtitle: "用汇编语言如何写出二进制乘法程序？",
          mycontent: "用汇编语言如何写出二进制乘法程序？具体如何实现移位？".slice(0, 20) + "...",
          time: "2019年4月15日 10:11",
          url: ""
        }, {
          myproblemtitle: "用汇编语言如何写出二进制乘法程序？",
          mycontent: "用汇编语言如何写出二进制乘法程序？具体如何实现移位？".slice(0, 20) + "...",
          time: "2019年4月15日 10:11",
          url: ""
        }, {
          myproblemtitle: "用汇编语言如何写出二进制乘法程序？",
          mycontent: "用汇编语言如何写出二进制乘法程序？具体如何实现移位？".slice(0, 20) + "...",
          time: "2019年4月15日 10:11",
          url: ""
        }
      ];
      var mycomment = [
        {
          title: "软件工程的重点是什么？",
          mycomment: "全是重点，好好复习叭",
          time: "2019/4/16 20:33",
          url:""
        }
      ];
      var likemycomment=[
        {
          name:"不吃香菜",
          avator:"./test-avator.png",
          mycomment:"全是重点，好好复习叭",
          time:"2019年4月17日 20:10"
        },
        {
          name: "不吃香菜",
          avator: "./test-avator.png",
          mycomment: "全是重点，好好复习叭",
          time: "2019年4月17日 20:10"
        },
        {
          name: "不吃香菜",
          avator: "./test-avator.png",
          mycomment: "全是重点，好好复习叭",
          time: "2019年4月17日 20:10"
        },
        {
          name: "不吃香菜",
          avator: "./test-avator.png",
          mycomment: "全是重点，好好复习叭",
          time: "2019年4月17日 20:10"
        },
        {
          name: "不吃香菜",
          avator: "./test-avator.png",
          mycomment: "全是重点，好好复习叭",
          time: "2019年4月17日 20:10"
        },
        {
          name: "不吃香菜",
          avator: "./test-avator.png",
          mycomment: "全是重点，好好复习叭",
          time: "2019年4月17日 20:10"
        }
      ]
      if (tempname == "tempcomment") {
        that.setData({
          content: comment
        })
      }
      else if (tempname == "templikes") {
        that.setData({
          content: likemycomment
        })

      }
      else if (tempname == "tempmycomment") {
        that.setData({
          content: mycomment
        })

      }
      else if (tempname == "tempmyproblem") {
        that.setData({
          content: myproblem
        })

      }
      else {
        this.setData({
          content: []
        })
      }
    }
    this.setData({
      title: options.title,
      tempname: options.name,
    })
    wx.setNavigationBarTitle({
      title: options.title,
    })
    wx.showToast({
      title: "loadig...",
      image: "../../images/loading.png",
      mask: true
    })
    getcontent(options.name,that)
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