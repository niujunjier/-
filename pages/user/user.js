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
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    currChoose: '',
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
      },
      bindChange: function (e) {
        const val = e.detail.value
        this.setData({
          year: this.data.years[val[0]],
          month: this.data.months[val[1]],
          day: this.data.days[val[2]]
        })
      }
    }
  },
  showMaskTrue: function (e) {
    this.setData({ currChoose: e.currentTarget.dataset.key, currMsg: this.data.titleMap[e.currentTarget.dataset.key] })
  },
  showMaskToggle: function () {
    this.setData({ currChoose: "" })
  }
})