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
      title: '删除我的评论',
      content: '确定要删除吗，恢复不了了哦',
      confirmText: '确认删除',
      cancelText: '手滑了',
      cancelColor: "#191970",
      confirmColor: "#DC143C",
      complete: res => {
        // console.log(res)
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
      title: '删除成功',
      icon: 'success',
      duration: 2000,
      complete: res => {
        resolve(res.result)
      }
    }));
  };
};

module.exports = Wechat;