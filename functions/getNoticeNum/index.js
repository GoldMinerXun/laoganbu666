// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const comments = db.collection('comments')
const _=db.command

// 云函数入口函数
exports.main = async (event, context)  => new Promise((resolve, reject) => {
  // console.log(event.openid)
  comments.where({
    'reply.replytime':_.gt(event.timetmp),
    'reply.bereplyid':'oQozX5Q0QQ4WbTgo0BN910larXbU'
    }).field({
      reply:true
    }).get().then(res => {
    resolve(res),
      reject
  })
})