const app = getApp()
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  data: {
    msg: {},
    updateInput: {},
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    currChoose: '',
    showMask: false,
    currMsg: {
      name: '',
      describe: ''
    },
    titleMap: {
      'phone': {
        name: '修改手机号',
        describe: '当前绑定手机号为156****3015'
      },
      'email': {
        name: '修改邮箱',
        describe: '当前绑定邮箱为123456789@qq.com'
      },
      'nick': {
        name: '修改昵称',
        describe: '好的昵称可以让朋友更容易记住你'
      },
      'birthday': {
        name: '选择生日',
        describe: ''
      },
      'passworld': {
        name: '修改密码',
        describe: ''
      }
    }
  },
  datechange: function (e) {
    const val = e.detail.value
    console.log(e.detail.value)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
    console.log(this.data.year, this.data.month, this.data.day)
  },
  onLoad(options) {
    this.getUserInfo()
  },
  // 获取当前弹出框中输入框的值
  setInput: function (e) {
    this.data.updateInput[e.currentTarget.dataset.key] = e.detail.value
  },
  // 获取个人信息
  getUserInfo: function () {
    app.api.request('/index/user/getUserInfo/Id/' + app.globalData.code, {}).then(data => {
      console.log(data)
      if (data.data.Status == 'success') {
        this.setData({ msg: data.data.Result })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 修改个人信息  
  updateUserInfo: function () {
    let self = this;
    setTimeout(function() {
      // 修改类型
      let type = ''
      // 传递参数
      let updateInfo = {}
      console.log(self.data.updateInput)
      console.log(Object.keys(self.data.updateInput))
      if (!self.data.updateInput[Object.keys(self.data.updateInput)[0]] && self.data.currChoose !='birthday'){
        wx.showToast({
          title: '不能为空',
          icon: 'loading',
          duration: 1000
        })
        // return;
      }
      // 此处用的switch , 等前后端字段名统一后 , 可以直接使用属性进行绑定
      switch (self.data.currChoose) {
        case 'nick':
          // 昵称
          type = 'NickName'
          updateInfo = self.data.updateInput
          break;
        case 'phone':
          // 手机
          type = 'NickPhone'
          updateInfo = self.data.updateInput
          break;
        case 'birthday':
          // 生日 
          type = 'Birthday'
          updateInfo = { Birthday: (self.data.year + '-' + self.data.month + '-' + self.data.day) }
          break;
        case 'email':
          // 邮箱
          type = 'Email'
          updateInfo = self.data.updateInput
          break;
        case 'passworld':
          // 邮箱
          type = 'PassWorld'
          // updateInfo = self.data.updateInput
          updateInfo = {"Passworld":"123426","rePassworld":"123426"}
          break;
        default:
          break;
      }
      app.api.useCookie('/index/user/updateUser' + type, updateInfo).then(data => {
        console.log(data)
        if (data.data.Status == 'success') {
          self.showMaskToggle();
          // 显示提示信息
          wx.showToast({
            title: '保存成功',
            icon: 'loading',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.data.Message,
            icon: 'loading',
            duration: 2000
          })
        }
        // 重新更新用户列表
        self.getUserInfo()
      }).catch(err => {
        console.log(err)
      })
    }.bind(this), 500)
  },
  showMaskTrue: function (e) {
    this.setData({ showMask: true, currChoose: e.currentTarget.dataset.key, currMsg: this.data.titleMap[e.currentTarget.dataset.key] })
  },
  showMaskToggle: function () {
    this.setData({ showMask: !this.data.showMask})
  },
  sureChange(){
    // 点击确定修改个人信息
    this.updateUserInfo()
  },
  signUp() {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  }
})