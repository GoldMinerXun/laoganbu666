// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const questions = db.collection('questions')
// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) => {
  console.log(JSON.stringify(event))
  questions.where({
    // title: '嘻嘻嘻'
    title:db.RegExp({
      regexp: event.value,
      options: 'i',
    })
  }).get().then(res => {
    resolve(res)
    reject(res)
  })
})