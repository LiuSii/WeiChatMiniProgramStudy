// pages/glance/glance.js

//连接云数据库
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
    images:[], // 存储下回来的图片
    openid: '',  // 存储openid
    managerOpenID:''  // 存储管理员Openid
  },

  //云存储实现图片上传
  InfoUpload:function(e){
    wx.redirectTo({
      url: '../view/view',
    })
  },

  //从数据库下载图片并存储到images中
  InfoGet: function() {
    cloud_db.collection('image').get().then(res=>{
      this.setData({
        images: res.data
      })
    })
  },

  //删除文件
  DeleteInfo: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index;  // 获取该图片的images数据索引
    var images = that.data.images;  // images数据

    wx.showModal({
      title: '警告',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          cloud_db.collection('image').doc(images[index]._id).remove({  // 删除云数据库中记录
            success: function(res) {
              that.InfoGet()  // 删除后更新images
            }
          })

          wx.cloud.deleteFile({ // 删除云存储中文件
            fileList: [images[index].fileID]
          })
        }
      },
      fail: console.error
    })
  },
  
  GetOpenID: function(){
    var that = this;
    wx.cloud.callFunction({
      name: 'GetOpenID',
      complete: res=>{
        that.setData({
          openid: res.result.openid
        })
      }
    })
  },
  
  GetManagerOpenID: function(e){
    var that = this;

    cloud_db.collection('mopenid').get().then(res=>{
      that.setData({
        managerOpenID: res.data[0].openid
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.InfoGet();

    this.GetOpenID();  // 获取用户OpenID
    this.GetManagerOpenID();  // 获取管理员OpenID
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