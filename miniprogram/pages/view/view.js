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
    images: [],  // 存储下回来的照片

    fileID:"",  // 存储云存储中的照片地址
    description:""  // 存储描述信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const that = this;
    // //从本地相册或者手机相册选择图片
    // wx.chooseImage({
    //   count:1,
    //   sizeType:['original', 'compressed'],
    //   sourceType:['album', 'camera'],
    //   success(res){
    //     //获取图片之后上传
    //     const tempFilesPaths = res.tempFilePaths;
    //     const tempFilesName = res.tempFilesName;
    //     wx.cloud.uploadFile({
    //       cloudPath: new Date().getTime() + '.png',  // 以时间命名
    //       filePath:tempFilesPaths[0], //1张图片的临时文件路径
    //       success:res=>{
    //         //存储到云数据库中
    //         cloud_db.collection('image').add({
    //           data:{
    //             fileID:res.fileID,  // 存储云存储中的照片地址
    //             description:e.detail.value.description   // 存储描述信息
    //           }
    //         }).then(res=>{
    //           that.InfoGet();   // 上传成功后显示
    //         }).catch(err=>{
    //         })
    //       },
    //       fail:console.error
    //     })
    //   }
    // })
  },

  /**
   * 选择图片
   * @param {*} e 
   */
  chooseImage(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res){
        //获取图片之后上传
        const tempFilesPaths = res.tempFilePaths;
        const tempFilesName = res.tempFilesName;
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png',  // 以时间命名
          filePath:tempFilesPaths[0], //1张图片的临时文件路径
          success:res=>{
            console.log("123");
            //存储到云数据库中
            cloud_db.collection('image').add({
              data:{
                fileID:res.fileID,  // 存储云存储中的照片地址
                //description:e.detail.value.description   // 存储描述信息
              }
            })
            // cloud_db.collection('image').add({
            //   data:{
            //     fileID:"ewer",  // 存储云存储中的照片地址
            //     description:e.detail.value.description   // 存储描述信息
            //   }
            // }).then(res=>{
            //   console.log("1233");
            //   wx.redirectTo({
            //     url: '../glance/glance',  // 上传成功后显示
            //   })
            // }).catch(err=>{
            //   console.log("45");
            // })
            console.log("45");
          },
          fail:console.error
        })
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
