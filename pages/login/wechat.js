/**
 * Promise化小程序接口
 */
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

};

module.exports = Wechat;