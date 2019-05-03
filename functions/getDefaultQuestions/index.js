// 云函数入口文件
const cloud = require('wx-server-sdk')

// 先实现获取默认的问题列表，根据时间获得对应数据
cloud.init()
const db= cloud.database()
const questions=db.collection('questions')
// 云函数入口函数

exports.main = async (event, context) => new Promise((resolve, reject) => {
  questions.get().then(res => {
    resolve(res)
  })
})