// pages/adentrance/adentrance.js
const app = getApp();
Page({
  data: {
    showMode: false,
    showMode1: false,
    maskTitle: {
      name: '',
      describe: ''
    },
    maskTitle1: {
      name: '查看数据',
      describe: ''
    },
    classValue: '12级3班',
    focus: false
  },
  hideMode() {
    this.setData({ showMode: false, focus: false });
  },
  hideMode1(){
    this.setData({ showMode1: false });
  },
  setClassValue(e) {
    this.setData({ classValue: e.detail.value });
  },
  chooseDataType(){
    this.setData({ showMode1: true });
  },
  readMsg() {
    let url = '';
    let self = this;
    setTimeout(function () {
      if (!self.data.classValue) {
        wx.showToast({
          title: '不能为空'
        });
        return;
      }
      // if (!/^[0-9]*$/.test(self.data.classValue)) {
      //   wx.showToast({
      //     title: '输入正确的班级号'
      //   });
      //   return;
      // }
      if (self.data.maskTitle.name == '查看留言') {
        url = '/pages/leaveMsg/leaveMsg?classId='
      } else if (self.data.maskTitle.name == '进入教室') {
        url = '/pages/classForSt/classForSt?classId='
      } else {
        url = '/pages/viewData/viewData?classId='
      }
      app.api.useCookie('/index/user/getClass', { 'class_name': self.data.classValue }).then(res => {
        let li = res.data.Result;
        let hasId = false;
        if(li){
          hasId = true;
          url+=li.id;
        }
        if (hasId) {
          wx.navigateTo({
            url: url
          })
        } else {
          wx.showToast({
            title: '不存在此教室',
            icon: 'loading',
            duration: 1000
          })
        }
      })
    }, 500)
  },
  viewMessage() {
    this.setData({
      maskTitle: {
        name: '查看留言',
        describe: ''
      }
    })
    this.setData({ showMode: true })
  },
  enterClassroom() {
    this.setData({
      maskTitle: {
        name: '进入教室',
        describe: ''
      }
    })
    this.setData({ showMode: true })
  },
  enterViewData() {
    this.setData({ showMode1: false })
    this.setData({
      maskTitle: {
        name: '查看数据',
        describe: ''
      }
    })
    this.setData({ showMode: true, focus: true })
  },
  readAll(){
    wx.navigateTo({
      url: '/pages/viewData/viewData?classId=all'
    })
  }
})