<template>
  <div class="some_one">
    <div class="one_title">这是一个历史版本，由内容修改人 {{detailObj.user_nickname}} 于 {{detailObj.create_time | dateFr}} 最后修改</div>
    <div class="one_main">
      <p class="one_tit">修改原因：</p>
      <p class="one_content">{{detailObj.reason}}</p>
      <div class="clearfix">
        <p class="one_pic" v-for="(item,index) in detailObj.picurl" :key="index">
          <img :src="item" alt="">
        </p>
      </div>
    </div>
    <div class="ans_tit">修改内容：</div>
    <div class="ans_content">{{detailObj.content}}</div>
  </div>
</template>

<script>
import { historyDetail } from '../../api/api.js'
export default {
  data () {
    return {
      detailObj: {},
    }
  },
  mounted () {
    let params = {
      answer_id: this.$route.params.id
    }
    historyDetail(params).then(res => {
      console.log(res)
      if (res.picurl != '') {
        res.picurl = res.picurl.split('|')
      }
      this.detailObj = res
    })
  }
}
</script>

<style lang="less">
  .some_one{
    width: 100%;
    height: 100%;
    .one_title{
      // position: fixed;
      // left: 0;
      // top: 0;
      padding: 10px;
      font-size: 14px;
      color:#fff;
      background: #eb622b;
    }
    .one_main{
      // padding: 65px 15px 70px;
      border-bottom: 1px solid #d9d9d9;
      margin-top: 10px;
      padding: 0 15px 15px;
      .one_tit{
        font-size: 15px;
        color: #333;
      }
      .one_content{
        margin-top: 5px;
        font-size: 15px;
        color: #666;
      }
      .one_pic{
        width: 160px;
        height: 120px;
        margin-top: 10px;
        float: left;
        border: 1px solid #f0f0f0;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .one_pic:nth-of-type(2n){
        float: right;
      }
    }
    .ans_tit{
      font-size: 15px;
      padding: 15px;
      color: #333;
    }
    .ans_content{
      font-size: 15px;
      padding: 0 15px;
      color: #666;
    }
  }
</style>
