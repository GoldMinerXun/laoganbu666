Component({
  externalClasses: ['i-class'],

  options: {
    multipleSlots: true
  },

  properties: {
    full: {
      type: Boolean,
      value: false
    },
    thumb: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    extra: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    },
    author: {
      type: String,
      value : ''
    }
  }
});