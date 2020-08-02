//index.js
const app = getApp()

//连接云数据库
const cloud_db = wx.cloud.database({
  //指定云数据库环境，填写环境ID而非环境名称
  env:"test-6hxur"    
  //env:"produce"
});

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',

    message: "XXX, 你好！",
    images:[], // 存储下回来的图片
  },

  ClickLeft: function() {
    this.setData ({
      message: "达瓦里氏，你好！"
    })
  },

  ClickRight: function() {
    this.setData({
      message: "肮脏的资本家，你爬！"
    })
  },

    /*
  从数据库test获取已有信息，并存储在cloud_data里
  */
 showInfo: function(){
  cloud_db.collection('test').get({
    success: res =>{
      this.setData({
        cloud_data: res.data
      })
    }
  })
},

  formsubmit:function(e){
    const that = this;
    //上传数据
    cloud_db.collection('test').add({  // 集合名称
      data:{
        name: e.detail.value.cloud_user_name,
        age: e.detail.value.cloud_user_age
      }
    }).then(res=>{
      that.showInfo();
    }).catch(err=>{
    })
    //延迟100m更新数据，不延迟的话会遇到插入数据有时可能过慢，不能实时刷新的问题
    //setTimeout(function(){
    //  that.showInfo();
    //}, 100)
  },

  //云存储实现图片上传
  ImageUpload:function(){
    const that = this;
    //从本地相册或者手机相册选择图片
    wx.chooseImage({
      count:1,
      sizeType:['original', 'compressed'],
      sourceType:['album', 'camera'],
      success(res){
        //获取图片之后上传
        const tempFilesPaths = res.tempFilePaths;
        wx.cloud.uploadFile({
          cloudPath:new Date().getTime() + '.png',  // 以时间命名
          filePath:tempFilesPaths[0], //1张图片的临时文件路径
          success:res=>{
            //存储到云数据库中
            cloud_db.collection('image').add({
              data:{
                fileID:res.fileID
              }
            }).then(res=>{
              that.getImages();
            }).catch(err=>{
            })
          },
          fail:console.error
        })
      }
    })
  },

  //从数据库下载图片并存储到images中
  getImages: function() {
    cloud_db.collection('image').get().then(res=>{
      this.setData({
        images: res.data
      })
    })
  },

  onLoad: function() {
    var _this = this;
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    //展示数据库信息
    this.showInfo();
    this.getImages();

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
