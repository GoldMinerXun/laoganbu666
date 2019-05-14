/**
 * Promise化小程序接口
 */
class Wechat {

  /**
   * 对话框
   * @return {Promise} 
   */
  static showmodal() {
    return new Promise((resolve, reject) => wx.showModal({
      title: '提示',
      content: '你还没登陆叭！',
      confirmText: '登陆',
      cancelText: '取消发布',
      cancelColor: "#191970",
      confirmColor: "#12cc94",
      complete: res => {
        resolve(res)
      }
    }));
  };

  /**
    * 模态框
    * @return {Promise} 
    */
  static showtoast() {
    return new Promise((resolve, reject) => wx.showToast({
      title: '请补充完整标题,内容以及标签哦',
      icon: 'none',
      duration: 2000,
      complete: res => {
        resolve(res.result)
      }
    }));
  };
};

module.exports = Wechat;