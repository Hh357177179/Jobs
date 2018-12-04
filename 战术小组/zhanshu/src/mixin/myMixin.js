export const myMixin = {
  data () {
    return {}
  },
  methods: {
    // toast 提示
    showToast(msg) {
      this.$toast({
        duration: 1500,
        message: msg
      })
    },

    // 手机号验证
    verifyTel (a) {
      if (!a) {
        this.showToast('手机号码不能为空')
        return false
      } 
      if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(a))) {
        this.showToast('手机号码格式不正确')
        return false
      }
      return true
    },

     // 姓名验证
     verifyName (b) {
      if (!b) {
        this.showToast('请输入名称')
        return false
      }
      return true
    },

     // 负责人验证
     verifyPerson (c) {
      if (!c) {
        this.showToast('请输入姓名')
        return false
      }
      return true
    },

    //  // 微信验证
    //  verifyWeChart (d) {
    //   if (!d) {
    //     this.showToast('请输入微信号')
    //     return false
    //   }
    //   return true
    // },

    // // 所在地验证
    // verifyLocal (f) {
    //   if (!f) {
    //     this.showToast('请输入所在地')
    //     return false
    //   }
    //   return true
    // }
  }
}