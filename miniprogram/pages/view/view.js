// pages/view/view.js

const cloud_db = wx.cloud.database({
  //指定云数据库环境，填写环境ID而非环境名称
  env:"test-6hxur"    
  //env:"produce"
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: []  // 照片数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 选择图片
   * @param {*} e 
   */
  chooseImage(e) {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res){
        //获取图片上传云存储，显示缩略图，用内存数组存储
        const tempFilesPaths = res.tempFilePaths;
             // 一次选择的图片新加到数组中


        //确定好的图片上传云数据库

        // wx.cloud.uploadFile({
        //   cloudPath: new Date().getTime() + '.png',  // 以时间命名
        //   filePath:tempFilesPaths[0], //1张图片的临时文件路径

        //   success:res=>{
        //     console.log("123");
        //     //存储到云数据库中
        //     //显示缩略图，多个图片存储到一个数组
        //     cloud_db.collection('image').add({
        //       data: {
        //         fileID: tempFilesPaths
        //       }
        //     })
        //   },
        //   fail:console.error
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
