//index.js
//获取应用实例
const app = getApp()
Page({
  search : function(e){
    var val = e.detail.value.content;
    // console.log(typeof(val))
    var that=this
    if(val){
      // console.log(val)
      wx.cloud.callFunction({
        name:'searchQuestions',
        data:{
          value:val
        },
        complete:res=>{
          // console.log(res)
          if(res.result.data.length!=0){
            that.setData({
              hot: res.result.data.reverse()
            })
          }else{
            wx.showToast({
              title: '没有你想搜索的内容哦，换个关键词吧',
              icon:'none'
            })
          }
         
        }
      })
      
    }else{
      wx.cloud.callFunction({
        // 云函数名称
        name: 'getDefaultQuestions',
        // 传给云函数的参数
        data: {
          isLogin: app.globalData.openid,
        },
        complete: res => {
          // console.log(res.result.data)
          that.setData({
            hot: res.result.data.reverse()
          })
        }
      })
    }
    
  },
  data: {
    inputValue: '',
    hot: [],
    searchResult:[],
    defaultArr:[],
    searchHasResult:0
    //未搜索：0，搜索了有结果：1，搜索了没结果：2
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    var that=this
    wx.showToast({
      title: "loadig...",
      image: "../../images/loading.png",
      mask: true
    })
    wx.setNavigationBarTitle({
      title: '问叭',
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } 
    
  },
  handleChange: function (
    detail
  ) {
    // console.log(detail)
    wx.redirectTo({
      url: '../' + detail.key + '/index',
    })
  },
  onReady: function () {
    wx.hideLoading()
  },
  onShow:function(){
    var that=this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getDefaultQuestions',
      // 传给云函数的参数
      data: {
        isLogin:app.globalData.openid,
      },
      complete: res => {
        // console.log(res.result.data)
        that.setData({
          hot: res.result.data.reverse()
        })
      }
    })
  }
})