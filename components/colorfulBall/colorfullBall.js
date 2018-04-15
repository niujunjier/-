Component({
  properties: {
    color: {
      type: String,
      value: 'red'
    },
    detail: {
      type: Object,
      value: {}
    }
  },
  data: {

  },
  methods: {
    toParents: function () {
      var self = this;
      this.triggerEvent('myevent', {detail: self.properties.detail})
    }
  }
})