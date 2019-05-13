<template>
  <div class="me_card">
    <div class="card_list" v-for="(item, index) in cardArr" :key="index" @click="rbuyD(item.orderid)">
      <div class="card_pic">
        <img :src="item.img" alt="">
        <span class="money_only">现价：{{item.coupon_price}}元</span>
        <div class="card_time">有效期：{{item.createdate}}—{{item.validdate}}</div>
      </div>
      <div class="card_tit">
        <span class="title_name">{{item.coupon_title}}{{item.coupon_price}}元代金券</span>
        <div class="title_pic" v-if="item.coupon_state == 1">已兑换</div>
        <div class="title_pic pic_give" v-if="item.coupon_state == 2">已转赠</div>
        <div class="title_pic pic_await" v-if="item.coupon_state == 0">待使用</div>
        <div class="title_pic pic_await" v-if="item.coupon_state == 3">转赠待使用</div>
        <div class="title_pic pic_await" v-if="item.coupon_state == 4">已提现</div>
        <div class="title_pic pic_await" v-if="item.coupon_state == 5">已退款</div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetCouponListByUser } from '../api/api.js'
export default {
  data() {
    return {
      cardArr: [],
      page: 1,
      limit: 10
    };
  },
  methods: {
    // 跳转详情页
    rbuyD (orderid) {
      this.$router.push({path: `/buydetail/${orderid}`})
    },
    getList () {
      let params = {
        page: this.page,
        limit: this.limit
      }
      GetCouponListByUser(params).then(res => {
        console.log(res)
        this.cardArr = res.list
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="less">
.me_card {
  width: 100%;
  min-height: 100%;
  background: #f3f2f1;
  border: 1px solid rgba(0,0,0,0);
  .card_list {
    width: 345px;
    background: #fff;
    margin: 10px auto 0;
    border-radius: 6px;
    .card_pic {
      position: relative;
      width: 100%;
      height: 194px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .money_only {
        display: inline-block;
        color: #191f25;
        height: 22px;
        line-height: 22px;
        position: absolute;
        top: 30px;
        right: 0;
        font-size: 12px;
        font-weight: 600;
        padding: 0 10px;
        background: linear-gradient(
          0deg,
          rgba(207, 185, 139, 1),
          rgba(242, 228, 190, 1)
        );
        border-radius: 11px 0px 0px 11px;
      }
      .card_time{
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        color:rgba(255,255,255,0.65);
        background:rgba(25,31,37,0.3);
        padding-left: 15px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    .card_tit{
      height: 54px;
      font-size: 15px;
      color: #191f25;
      font-weight: 600;
      .title_name{
        float: left;
        margin-left: 30px;
        width: 240px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        line-height: 54px;
      }
      .title_pic{
        float: right;
        min-width: 60px;
        height: 24px;
        background: url('../assets/img/exchange.png') no-repeat;
        background-size: 100% 100%;
        font-size: 12px;
        color: #CBA787;
        margin-top: 15px;
        line-height: 24px;
        text-align: center;
      }
      .pic_give{
        background: url('../assets/img/give.png') no-repeat;
        background-size: 100% 100%;
        color: #BFC1C2;
      }
      .pic_await{
        background: url('../assets/img/wait.png') no-repeat;
        background-size: 100% 100%;
        color: #FB8879;
      }
    }
  }
}
</style>

