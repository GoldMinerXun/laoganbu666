const db = wx.cloud.database();
const userDB = db.collection('user');
class Wechat {
  
  // 登陆本地登陆是否看过最新评论情况
  static getstoragehasSeenComment() {
    return new Promise((resolve, reject) => wx.getStorage({
      key: 'hasSeenComment',
      success: function (res) {
        resolve(res);
        reject
      }
    }))
  }
// 登陆本地登陆时否看过最新点赞
  static getstoragehasSeenLike() {
    return new Promise((resolve, reject) => wx.getStorage({
      key: 'hasSeenLike',
      success: function (res) {
        resolve(res);
        reject
      }
    }))
  }
};

module.exports = Wechat;