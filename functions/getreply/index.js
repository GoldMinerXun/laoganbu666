// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const comments = db.collection('comments')
const _=db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    return comments.doc(event.id).update({
      data: {
        reply: _.push([event.replyobj])
      }
    })
  }
 catch(e){
   reject(err)
 }

}