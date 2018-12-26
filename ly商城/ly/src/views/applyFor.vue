<template>
  <div>
    <div class="applyfor" v-if="applyShow">
    <div class="card_input">
      <p class="input_list clearfix">
        <!-- <span class="input_labe">代理商电话</span> -->
        <input type="text" v-model="mobile" placeholder="代理商电话">
      </p>
      <p class="input_list tel_input clearfix">
        <!-- <span class="input_labe">身份证号</span> -->
        <input type="tel" v-model="identitycard" placeholder="身份证号">
      </p>
    </div>
    <div class="apply_btn" @click="applySub">申请</div>
  </div>
  <div class="withdraw" v-if="withdrawShow">
    <div class="top_card">
      <p class="card_money">{{userInfo.money}}</p>
      <p class="money_text">可提现金额</p>
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
    <div class="withdraw_btn" @click="withdrawSub">申请提现</div>
  </div>
  </div>
</template>

<script>
import { AgentApply, GetUser, CouponExtract } from '../api/api.js'
export default {
  data () {
    return {
      withdrawShow: false,
      applyShow: false,
      mobile: '',
      identitycard: '',
      alipayaccount: '',
      name: '',
      user_id: '',
      userInfo: {}
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

    // 获取用户信息
    getUserInfo () {
      let params = {
        user_id: this.user_id
      }
      GetUser(params).then(res => {
        console.log(res)
        this.userInfo = res
        if (res.isagent == 1) {
          this.withdrawShow = true
          this.applyShow = false
        } else {
          this.applyShow = true
          this.withdrawShow = false
        }
      })
    },

    applySub () {
      let params = {
        mobile: this.mobile,
        identitycard: this.identitycard
      }
      console.log(params)
      AgentApply(params).then(res => {
        console.log(res)
         this.$toast('申请成功');
      })
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>


<style lang="less">
  .applyfor {
    width: 100%;
    min-height: 100%;
    background: #F3F2F1;
    border: 1px solid #F3F2F1;
    .card_input{
      width: 345px;
      height: 137px;
      background: #fff;
      border-radius: 6px;
      margin: 15px auto;
      padding: 20px;
      .input_list{
        height: 40px;
        line-height: 40px;
        width: 100%;
        border-bottom: 1px solid rgba(25,31,37,.12);
        font-size: 16px;
        color:rgba(25,31,37,.4);
        .input_labe{
          width: 80px;
          float: left;
          height: 100%;
          line-height: 39px;
        }
        input{
          width: 100%;
          float: left;
          height: 100%;
          padding-left: 20px;
        }
      }
      .tel_input{
        margin-top: 20px;
      }
    }
    .apply_btn{
      width: 345px;
      height: 44px;
      text-align: center;
      color: #fff;
      font-size: 18px;
      line-height: 46px;
      background: #CBA787;
      border-radius: 22px;
      margin: 30px auto 0;
    }
  }
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
