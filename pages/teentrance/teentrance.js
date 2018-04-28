const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classNo: '',
    showMode: false,
    maskTitle: {
      name: '进入教室',
      describe: '上次创建班级为701'
    },
    classValue: '',
    focus: false
  },
  onLoad(op){
    app.api.request('/index/user/searchLastClass/Id/' + '1', {}).then(data => {
      console.log(data)
      if (data.data.Status = 'success') {
        this.setData({ classNo: data.data.Result.classNo })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  toUserCenter(){
    wx.navigateTo({ url: "/pages/user/user"})
  },
  toClassCenter(){
    this.setData({ showMode: false, focus: false});
    wx.navigateTo({
      url: '/pages/qrcode/qrcode'
    })
  },
  setClassValue(e){
    this.setData({classValue: e.detail.value});
  },
  inputClassNum(){
    this.setData({ showMode: true, focus: true});
  },
  hideMode(){
    this.setData({ showMode: false, focus: false});
  },
  readMsg(){
    wx.navigateTo({
      url: '/pages/leaveMsg/leaveMsg',
    })
  }
})