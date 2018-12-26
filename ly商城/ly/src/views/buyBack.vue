<template>
    <div class="withdraw">
    <div class="top_card">
      <p class="card_money">690.50</p>
      <p class="money_text">可回购金额</p>
    </div>
    <div class="zfb_num">
      <input type="tel" placeholder="请输入支付宝账号" v-model="alipayaccount">
    </div>
    <div class="zfb_num">
      <input type="tel" placeholder="请输入真实姓名" v-model="name">
    </div>
    <!-- <div class="money_num clearfix">
      <span class="money_labe">￥</span>
      <input class="m_inp" type="tel" placeholder="提现金额（≥1元的整数）"/>
    </div> -->
    <div class="withdraw_btn" @click='withdrawSub'>申请回购</div>
  </div>
</template>

<script>
import { CouponExtract } from '../api/api.js'
export default {
  data () {
    return {
      alipayaccount: '',
      name: ''
    }
  },
  methods: {
    // 提现
    withdrawSub () {
      console.log(1)
      if (this.alipayaccount == '') {
        this.$toast('请输入支付宝账户')
      } else if (this.name == '') {
        this.$toast('请输入真实姓名')
      } else {
        let params = {
          alipayaccount: this.alipayaccount,
          name: this.name
        }
        console.log(params)
        CouponExtract(params).then(res => {
          this.$toast('申请成功')
        })
      }
    },
  }
}
</script>


<style lang="less">
  .withdraw{
    width: 100%;
    min-height: 100%;
    background: #F3F2F1;
    .top_card{
      width:100%;
      height:190px;
      background:linear-gradient(0deg,rgba(202,166,134,1),rgba(226,192,167,1));
      text-align: center;
      .card_money{
        padding-top: 70px;
        font-size: 36px;
        font-weight: 600;
        color: #fff;
      }
      .money_text{
        color: rgba(255,255,255,.6);
        font-size: 14px;
        font-weight: 400;
      }
    }
    .zfb_num{
      margin-top: 15px;
      width: 100%;
      height: 60px;
      font-size: 15px;
      color:rgba(25,31,37,.4);
      border-bottom: 1px solid rgba(25,31,37,.12);
      input{
        width: 100%;
        height: 100%;
        padding-left: 20px;
      }
    }
    .money_num{
      width: 100%;
      height: 60px;
      background: #fff;
      .money_labe{
        float: left;
        color: #191F25;
        font-size: 23px;
        line-height: 60px;
        padding-left: 20px;
      }
      .m_inp{
        float: left;
        height: 100%;
        font-size: 15px;
        color:rgba(25,31,37,.4);
        padding-left: 15px;
      }
    }
    .withdraw_btn{
      width: 325px;
      height: 44px;
      line-height: 46px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      margin: 30px auto 0;
      border-radius: 22px;
      background: #CBA787;
    }
  }
</style>
