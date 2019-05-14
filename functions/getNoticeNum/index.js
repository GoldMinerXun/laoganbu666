// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const comments = db.collection('comments')


// 云函数入口函数
exports.main = async (event, context) => {
  comments.get().then(res => {
    resolve(res)
  })
}