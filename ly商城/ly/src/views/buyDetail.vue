<template>
  <div class="about">
    <div class="home_banner">
      <!-- <swiper class="banner" :options="swiperOption">
        <swiper-slide class="banner_pic" v-for="(item, index) in banPic" :key="index">
          <img :src="item.img">
        </swiper-slide>
      </swiper> -->
      <div class="banner">
        <img :src="banPic.img" alt="">
      </div>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </div>
    <div class="detail_title">
      <span class="ds_title">{{allObj.coupon_title}}</span>
      <span class="ds_money">{{allObj.coupon_price}}元</span>
    </div>
    <div class="useful_life">有效期：{{allObj.createdate}}—{{allObj.validdate}}</div>
    <div class="ds_info_title clearfix">
      <img class="iconPic" src="../assets/img/kjIcon.png" alt>
      <span class="iconPic_text">卡卷介绍</span>
    </div>
    <div v-html="obj" class="ds_content"></div>
    <div class="bot_btn" v-if="allObj.coupon_state == 0">
      <div class="active_btn exchange" @click="exchangeC(allObj.orderid, allObj.id)">兑换</div>
      <div class="active_btn given" @click="givenC">转赠</div>
      <div class="active_btn refund" @click="refundC">退款</div>
    </div>
    <div class="bot_btn" v-if="allObj.coupon_state == 3">
      <div class="active_btn exchange" @click="exchangeC(allObj.orderid, allObj.id)">兑换</div>
      <div class="active_btn given" @click="givenC">转赠</div>
      <div class="active_btn refund" @click="buyBack">回购</div>
    </div>
  </div>
</template>

<script>
import { GetConponByUser, GetUser } from "../api/api.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      user_id: "",
      userInfo: {},
      allObj: {},
      obj: "",
      banPic: {},
      // swiperOption: {
      //   spaceBetween: 20,
      //   autoplay: {
      //     delay: 2000,
      //     disableOnInteraction: false,
      //     waitForTransition: true
      //   },
      //   speed: 1000,
      //   loop: true
      // }
    };
  },
  methods: {
    // 获取详情
    getDetail() {
      let params = {
        orderid: this.$route.params.id
      };
      GetConponByUser(params).then(res => {
        console.log(123,res);
        this.allObj = res;
        this.obj = res.coupon_text;
        this.banPic = res.coupon_imglist[0];
      });
    },

    // 获取用户信息
    getUserInfo() {
      let params = {
        user_id: this.user_id
      };
      GetUser(params).then(res => {
        console.log(res);
        this.userInfo = res;
      });
    },

    // 兑换卡卷
    exchangeC(oid,id) {
      // this.$dialog.confirm({
      //   title: "提示",
      //   message: "确认是否兑换该卡卷？"
      // }).then(() => {
      //   // on close
      // }).catch(() => {
      //   // on cancel
      // });
      this.$router.push(`/exchange/${oid}/${id}`)
    },

    // 回购
    buyBack () {
      this.$router.push('/buyback')
    },

    // 转赠
    givenC() {
      this.$dialog.confirm({
        title: "提示",
        message: "确认是否转赠该卡卷？"
      }).then(() => {
        // on close
      }).catch(() => {
        // on cancel
      });
    },

    // 退款
    refundC() {
      this.$dialog.confirm({
        title: "提示",
        message: "确认是否退款？"
      }).then(() => {
        // on close
      }).catch(() => {
        // on cancel
      });
    }
  },
  mounted() {
    this.getDetail();
    this.getUserInfo();
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang="less">
.about {
  width: 100%;
  min-height: 100%;
  background: #f3f2f1;
  .home_banner {
    width: 100%;
    position: relative;
    .banner {
      height: 211px;
      // .swiper-wrapper {
      //   width: 100%;
      //   height: 100%;
        // .banner_pic {
        //   width: 100%;
        //   height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        // }
      // }
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
    .ds_money {
      // min-width: 60px;
      padding: 0 10px;
      height: 30px;
      display: inline-block;
      color: #191f25;
      font-size: 13px;
      font-weight: 600;
      border-radius: 15px 0px 0px 15px;
      background: linear-gradient(
        0deg,
        rgba(207, 185, 139, 1),
        rgba(242, 228, 190, 1)
      );
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .useful_life {
    font-size: 13px;
    color: rgba(25, 31, 37, 0.65);
    margin-left: 15px;
  }
  .ds_info_title {
    margin-top: 25px;
    padding-left: 16px;
    margin-bottom: 10px;
    .iconPic {
      float: left;
      width: 20px;
      height: 20px;
    }
    .iconPic_text {
      float: left;
      font-size: 15px;
      color: #c4a080;
      line-height: 20px;
      font-weight: 600;
      margin-left: 10px;
    }
  }
  .ds_content {
    margin-bottom: 50px;
    font-size: 13px;
    padding: 0 15px;
    color: #191f25;
    img {
      width: 100%;
    }
  }
  .bot_btn {
    width: 100%;
    height: 50px;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    .active_btn {
      margin-top: 7px;
      text-align: center;
      width: 100px;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      font-size: 14px;
      font-weight: 400;
    }
    .exchange {
      background: #cba787;
      color: #fff;
    }
    .given {
      border: 1px solid #cba787;
      color: #cba787;
    }
    .refund {
      color: #f87676;
      border: 1px solid #f87676;
    }
  }
}
</style>

