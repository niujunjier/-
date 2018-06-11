const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMode: false,
    maskTitle: {
      name: '进入教室',
      describe: '上次创建班级为701'
    },
    classValue: 'test1',
    lastClassValue: '',
    focus: false
  },
  onLoad(op) {
    this.setData({ lastClassValue: app.globalData.classId })
  },
  toUserCenter() {
    wx.navigateTo({ url: "/pages/user/user" })
  },
  toClassCenter() {
    let self = this;
    if (self.data.lastClassValue) {
      self.setData({ showMode: true })
    } else {
      wx.showLoading({
        title: '您还没有班级',
        duration: 1000
      })
    }
  },
  setClassName() {
    let self = this;
    setTimeout(function () {
      if (self.data.classValue){
        app.api.useCookie('/index/Course/createCourse', { CourseName: self.data.classValue }).then(function (res) {
          if (res.data.Status == 'error'){
            wx.showLoading({
              title: '已存在',
              duration: 1000
            })
          }else{
            app.globalData.courseId = res.data.result.CourseId;
            app.globalData.courseName = self.data.classValue;
            wx.navigateTo({
              url: '/pages/classForTe/classForTe?classId=' + self.data.lastClassValue
            })
          }
        })
      }else{
        wx.showLoading({
          title: '不能为空',
          duration: 1000
        })
      }
    }, 500)
  },
  setClassValue(e) {
    this.setData({ classValue: e.detail.value });
  },
  inputClassNum() {
    this.setData({ showMode: true, focus: true });
  },
  hideMode() {
    console.log(this.data.classValue)
    this.setData({ showMode: false, focus: false });
    console.log(this.data.classValue)
  },
  readMsg() {
    console.log(this.data.classValue)
    if (this.data.lastClassValue) {
      wx.navigateTo({
        url: '/pages/leaveMsg/leaveMsg?classId=' + this.data.lastClassValue
      })
    } else {
      wx.showToast({
        title: '你还没有班级',
        icon: 'loading',
        duration: 2000
      })
    }
  }
})