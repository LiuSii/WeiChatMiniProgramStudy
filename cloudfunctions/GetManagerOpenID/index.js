// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
//连接云数据库
const cloud_db = wx.cloud.database({
  //指定云数据库环境，填写环境ID而非环境名称
  env:"test-6hxur"    
  //env:"produce"
});

// 云函数入口函数
exports.main = async (event, context) => {
  var managerOpenID = '';
  // cloud_db.collection('ManagerOpenID').get().then(res=>{
  //   // managerOpenID = data[0].ManagerOpenID
  //   managerOpenID = '3535';
  // })

  return {
    manageropenid: 'managerOpenID',
  }
}