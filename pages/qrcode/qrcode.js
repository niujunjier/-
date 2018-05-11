// pages/qrcode/qrcode.js
const app = getApp()
Page({
  data: {
    classId: '',
    qrCodeSrc: ''
  },
  onLoad(op) {
    console.log(op.classId)
    app.api.request('/index/wechat/getQrcode?classId=' + op.classId, {}).then(data => {
      console.log(data)
      if (data.data.Status = 'success') {
        const qrcode = ' https://juplus.cn/live/' + data.data.qrcode
        this.setData({ classId: op.classId, qrCodeSrc: qrcode})
      }
    }).catch(err => {
      console.log(err)
    })
  },
  begin() {
    wx.navigateTo({
      url: '/pages/classForTe/classForTe?classId='+this.data.classId
    })
  }
})