<template>
  <div class="home">
    <div class="card"  v-for="(item, index) in cardArr" :key="index" @click="rDetailCard(item.id)">
      <div class="cardPic">
        <img :src="item.img" alt="">
        <div class="card_money">现价：{{item.coupon_price}}元</div>
      </div>
      <div class="card_title">
        {{item.coupon_title}}
        {{item.coupon_price}}元代金券
      </div>
    </div>
  </div>
</template>

<script>
import { GetCouponList } from '../api/api.js'
export default {
  data () {
    return {
      cardArr: [],
      page: 1,
      limit: 10
    }
  },
  methods: {
    // 获取卡卷列表
    getCardList () {
      let params = {
        page: this.page,
        limit: this.limit
      }
      GetCouponList(params).then(res => {
        console.log('我是卡卷列表',res)
        this.cardArr = res.list
      })
    },

    // 跳转详情页面
    rDetailCard (id) {
      console.log(id)
      this.$router.push({path: `/mycard/${id}`})
    },
  },
  mounted () {
    this.getCardList()
  }
}
</script>

<style lang="less">
  .home{
    width: 100%;
    min-height: 100%;
    background: #ebebeb;
    padding: 0 15px 20px;
    border: 1px solid #ebebeb;
    .card{
      width: 345px;
      background: #fff;
      margin-top: 20px;
      border-radius: 6px;
      .cardPic{
        width: 100%;
        height: 194px;
        position:relative;
        // border-bottom: 1px solid #f0f0f0;
        img{
          width: 100%;
          height: 100%;
        }
        .card_money{
          position:absolute;
          // width: 55px;
          display: inline-block;
          padding: 0 15px;
          height: 22px;
          font-size: 12px;
          color: #191F25;
          font-weight: 600;
          line-height: 22px;
          background: #D5C79E;
          text-align: center;
          border-radius:11px 0px 0px 11px;
          bottom: 15px;
          right: 0;
        }
      }
      .card_title{
        line-height: 54px;
        padding-left: 15px;
        font-size: 15px;
        color: #191F25;
        font-weight: 600;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
