Component({
  properties: {
    showMask: {
      type: Boolean,
      value: true
    },
    showTitle: {
      type: Object,
      value: {
        name: '',
        describe: ''
      }
    }
  },
  data: {
    
  },
  methods: {
    hideMaskAction: function () {
      this.triggerEvent('myevent')
    }
  }
})