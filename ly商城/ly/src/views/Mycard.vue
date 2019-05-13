<template>
  <div class="about">
    <div class="home_banner">
      <div class="banner">
        <img :src="banPic.img" alt="">
      </div>
      <!-- <swiper class="banner" :options="swiperOption">
        <swiper-slide class="banner_pic" v-for="(item, index) in banPic" :key="index">
          <img :src="item.img">
        </swiper-slide>
      </swiper> -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </div>
    <div class="detail_title">
      <span class="ds_title">{{allObj.coupon_title}}</span>
      <span class="ds_money">现价：{{allObj.coupon_price}}元</span>
    </div>
    <div class="ds_info_title clearfix">
      <img class="iconPic" src="../assets/img/kjIcon.png" alt="">
      <span class="iconPic_text">卡卷介绍</span>
    </div>
    <div v-html='obj' class="ds_content"></div>
    <div class="bot_btn">
      <div class="buy_now" @click="buyNow(allObj.id)">立即购买</div>
    </div>
  </div>
</template>

<script>
import { GetCouponById, downOrder } from "../api/api.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import wx from 'weixin-js-sdk'
export default {
  data() {
    return {
      allObj: {},
      obj: "",
      banPic: {},
      payInfo: {}
      // swiperOption: {
      //   spaceBetween: 20,
      //   autoplay: {
      //     delay: 2000,
      //     disableOnInteraction: false,
      //     waitForTransition: true
      //   },
      //   // pagination: {
      //   //   el: ".swiper-pagination",
      //   //   type: "progressbar"
      //   // },
      //   speed: 1000,
      //   loop: true
      // }
    };
  },
  methods: {
    // 下单
    buyNow (cid) {
      console.log(cid)
      let params = {
        coupon_id: cid,
        agent_id: ''
      }
      downOrder(params).then(res => {
        console.log(res)
        // alert(res.appId)
        this.payInfo = res
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId":res.appId,     //公众号名称，由商户传入     
            "timeStamp":res.timeStamp,         //时间戳，自1970年以来的秒数     
            "nonceStr":res.nonceStr, //随机串     
            "package":res.packageValue,     
            "signType":"MD5",         //微信签名方式：     
            "paySign":res.paySign //微信签名 
          },
          function(res){
          if(res.err_msg == "get_brand_wcpay_request:ok" ){
          // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          } 
        });
      })
    }
  },
  mounted() {
    console.log(wx);
    let params = {
      id: this.$route.params.id
    };
    GetCouponById(params).then(res => {
      console.log(res)
      this.allObj = res
      this.obj = res.coupon_text;
      this.banPic = res.coupon_imglist[0];
    });
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>


<style lang="less">
.about {
  width: 100%;
  min-height: 100%;
  background: #F3F2F1;
  .home_banner {
    width: 100%;
    position: relative;
    .banner {
      height: 211px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .detail_title {
    line-height: 30px;
    margin-top: 20px;
    padding-left: 16px;
    position: relative;
    .ds_title {
      color: #191f25;
      font-size: 18px;
      font-weight: 600;
    }
    .ds_money{
      // min-width: 60px;
      padding: 0 10px;
      height: 30px;
      display: inline-block;
      color: #191F25;
      font-size: 13px;
      font-weight: 600;
      border-radius: 15px 0px 0px 15px;
      background:linear-gradient(0deg,rgba(207,185,139,1),rgba(242,228,190,1));
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .ds_info_title{
    margin-top: 25px;
    padding-left: 16px;
    margin-bottom: 10px;
    .iconPic{
      float: left;
      width: 20px;
      height: 20px;
    }
    .iconPic_text{
      float: left;
      font-size: 15px;
      color: #C4A080;
      line-height: 20px;
      font-weight: 600;
      margin-left: 10px;
    }
  }
  .ds_content{
    margin-bottom: 50px;
    font-size: 0;
    padding: 0 15px;
    color: #191F25;
    img{
      width: 100%;
    }
  }
  .bot_btn{
    width: 100%;
    height: 50px;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    .buy_now{
      height: 36px;
      margin: 7px auto 0;
      width: 335px;
      background: #CBA787;
      border-radius: 5px;
      color: #fff;
      text-align: center;
      font-size: 16px;
      line-height: 40px;
    }
  }
}
</style>
