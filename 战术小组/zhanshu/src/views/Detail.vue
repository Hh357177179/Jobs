<template>
  <div class="detail">
     <p class="logo">
        <img v-if="detailObj.image != ''" :src="detailObj.image" alt="">
        <img v-else src="../assets/image/glevel.png" alt="">
      </p>
    <div class="detail_list clearfix">
      <p class="detail_left">
        <span class="dl_icon iconfont icon-mingcheng"></span>
        <span class="dl_label">名称</span>
      </p>
      <p class="dl_text">{{detailObj.title}}</p>
    </div>
     <div class="detail_list clearfix">
      <p class="detail_left">
        <span class="dl_icon iconfont icon-fuzeren"></span>
        <span class="dl_label">组长</span>
      </p>
      <p class="dl_text">{{detailObj.person}}</p>
    </div>
     <div class="detail_list clearfix">
      <p class="detail_left">
        <span class="dl_icon iconfont icon-shouji"></span>
        <span class="dl_label">手机号</span>
      </p>
      <p class="dl_text">{{detailObj.phone}}</p>
    </div>
     <div class="detail_list clearfix">
      <p class="detail_left">
        <span class="dl_icon iconfont icon-weixin1"></span>
        <span class="dl_label">微信号</span>
      </p>
      <p class="dl_text">{{detailObj.wechat}}</p>
    </div>
    <div class="detail_list clearfix">
      <p class="detail_left">
        <span class="dl_icon iconfont icon-dizhi"></span>
        <span class="dl_label">所在地</span>
      </p>
      <p class="dl_text">{{detailObj.address}}</p>
    </div>
    <!-- <div class="detail_list clearfix" v-if="detailObj.money != ''">
      <p class="detail_left">
        <span class="dl_icon iconfont icon-baojia"></span>
        <span class="dl_label">报价</span>
      </p>
      <p class="dl_text">{{detailObj.money}}</p>
    </div> -->
    <div class="dl_introduce" v-if="detailObj.info != ''">
      <p class="detail_left dl_left">
        <span class="dl_icon iconfont icon-dizhi"></span>
        <span class="dl_label">简介</span>
      </p>
      <p class="dl_area">{{detailObj.info}}</p>
    </div>
  </div>
</template>

<script>
import { getDetail } from '../api/api.js'
export default {
  data () {
    return {
      detailObj: {}
    }
  },
  mounted () {
    let param = {
      project_id: this.$route.params.id
    }
    getDetail(param).then(res => {
      console.log(res)
      this.detailObj = res
    })
  }
}
</script>


<style lang="less">
  .detail{
    padding: 5px 20px 60px;
    .logo {
      width: 80px;
      height: 80px;
      margin: 0 auto 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .detail_list{
      margin-bottom: 20px;
      height: 40px;
      line-height: 40px;
      .detail_left{
        width: 90px;
        float: left;
        color: #666;
        .dl_icon{
          font-size: 20px;
          margin-right: 8px;
          float: left;
          color: #eb622b;
        }
        .dl_label{
          font-size: 15px;
          float: left;
        }
      }
      .dl_text{
        float: left;
        width: 70%;
        border-bottom: 1px solid #f0f0f0;
        font-size: 15px;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
        padding-left: 10px;
      }
    }
    .dl_introduce{
      .detail_left{
        width: 90px;
        float: left;
        color: #666;
        .dl_icon{
          font-size: 20px;
          margin-right: 8px;
          float: left;
          color: #eb622b;
        }
        .dl_label{
          font-size: 15px;
          float: left;
        }
      }
      .dl_left{
        margin-top: 10px;
      }
      .dl_area{
        float: left;
        width: 70%;
        font-size: 15px;
        color: #333;
        border: 1px solid #f0f0f0;
        border-radius: 5px;
        padding: 10px;
      }
    }
  }
</style>
