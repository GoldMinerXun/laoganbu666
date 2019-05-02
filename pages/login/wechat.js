/**
 * Promise化小程序接口
 */
const db = wx.cloud.database();
const userDB = db.collection('user');
class Wechat {
  /**
   * 登陆
   * @return {Promise} 
   */
  static login() {
    return new Promise((resolve, reject) => wx.login({
      success: resolve,
      fail: reject
    }));
  };

  // 获取用户openid
  static wxcloudcallfunction() {
    return new Promise((resolve, reject) => wx.cloud.callFunction({
      name: 'index',
      complete: res => {
        console.log(res.result)
          resolve(res.result)
      }
    }));
  };
  /**
   * 获取用户信息
   * @return {Promise} 
   */
  static getUserInfo() {
    return new Promise((resolve, reject) => wx.getUserInfo({
      success: resolve,
      fail: reject
    }));
  };
  // 登陆查数据库
  static updateUserInfo(app,major,sno,academic){
    return new Promise((resolve, reject) => userDB.doc(app.globalData.openid).update({
      data: {
        avatorurl: app.globalData.userInfo.avatarUrl,
        uname: app.globalData.userInfo.nickname,
        sno: sno,
        academic: academic,
        major: major
      }, complete: res => {
        resolve(res.result)
      }
    }))
  }

  // 登陆本地登陆openid情况
  static getstorageopenid(){
    return new Promise((resolve,reject)=>wx.getStorage({
      key: 'openid',
      success:function(res){
        resolve(res);
        reject
      } 
    }))
  }
  // 登陆本地登陆userinfo情况
  static getstorageuserinfo(){
    return new Promise((resolve, reject) => wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        resolve(res);
        reject
      }
    }))
  }
};

module.exports = Wechat;