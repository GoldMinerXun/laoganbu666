// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const comments = db.collection('comments')
const _=db.command

// 云函数入口函数
exports.main = async (event, context) => {
  comments.where({_openid:cloud.getWXContext.OPENID}).update({
    data:{
      reply: _.push([event.replyobj])
    }
  }).then(res=>{
    resolve(res)
  }).catch(rer=>{
    reject(err)
  })

}