<template>
  <div class="exchange">
    <div class="ex_list">
      <input type="text" placeholder="收件人姓名" v-model="consignee">
    </div>
    <div class="ex_list">
      <input type="text" placeholder="收件人电话" v-model="consignee_mobile">
    </div>
    <div class="ex_list">
      <input type="text" placeholder="收件人地址" v-model="consignee_address">
    </div>
    <div class="exchangeSub" @click="exchangeSub">申请兑换</div>
  </div>
</template>

<script>
import { CouponExchange } from '../api/api.js'
export default {
  data () {
    return {
      orderid: '',
      coupon_id: '',
      consignee: '',
      consignee_mobile: '',
      consignee_address: ''
    }
  },
  methods: {
    exchangeSub () {
      if (this.consignee == '') {
        this.$toast('请输入姓名')
      } else if (this.consignee_mobile == '') {
        this.$toast('请输入电话')
      } else if (this.consignee_address == '') {
        this.$toast('请输入地址')
      } else {
        let params = {
          orderid: this.orderid,
          coupon_id: this.coupon_id,
          consignee: this.consignee,
          consignee_mobile: this.consignee_mobile,
          consignee_address: this.consignee_address
        }
        console.log(params)
        CouponExchange(params).then(res => {
          console.log(res)
          this.$toast('兑换卡券成功')
          this.$router.push('/mecard')
        })
      }
    }
  },
  mounted () {
    console.log(this.$route.params)
    this.orderid = this.$route.params.orderid
    this.coupon_id = this.$route.params.coupon_id
  }
}
</script>

<style lang="less">
  .exchange{
    padding: 0 10px;
    .ex_list{
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #f0f0f0;
      input{
        width: 100%;
        height: 100%;
        padding-left: 10px;
        font-size: 15px;
      }
    }
    .exchangeSub{
      width: 325px;
      height: 44px;
      line-height: 46px;
      color: #fff;
      border-radius: 22px;
      margin: 30px auto 0;
      background: #CBA787;
      text-align: center;
      font-size: 18px;
    }
  }
</style>
