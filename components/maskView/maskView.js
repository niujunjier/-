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
    },
    titleOpcity: {
      type: Boolean,
      value: false
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