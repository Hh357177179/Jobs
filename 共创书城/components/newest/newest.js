// components/newest/newest.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newArr: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    rDetail(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: `/pages/bookDetail/bookDetail?id=${e.currentTarget.dataset.id}`,
      })
    }
  }
})
