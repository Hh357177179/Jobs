<template>
  <div class="unanswer">
    <div class="unanswer_top">
      <p class="unanswer_title">我是一个标题</p>
      <div class="unanswer_content">问题简介哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈</div>
      <div class="unanswer_pic">
        <img src="../../assets/image/demo.jpg" alt="">
      </div>
    </div>
    <div class="reply_to" @click="replyTo" v-if="write">
      <p class="reply_text">
        <i class="iconfont icon-huida huidaIcon"></i>
        <span>此条问题还没有回答 ，现在来回答。</span>
      </p>
    </div>
    <div class="replyTo_text clearfix" v-if="writeText">
      <div class="rt_content">
        <textarea placeholder="请填写回答……" class="rt_text" v-model="desc"></textarea>
      </div>
      <div class="upload_pic">
        上传
      </div>
      <div class="upload_file clearfix">
        <p>
          <i class="iconfont icon-shangchuan"></i>
          <span>上传附件</span>
        </p>
      </div>
      <div class="submit_answer">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      write: true,
      writeText: false,
      desc: ''
    }
  },
  methods: {
    // 点击回答
    replyTo () {
      this.write = false,
      this.writeText = true
    }
  }
}
</script>

<style lang="less">
  .unanswer {
    padding: 15px 20px;
    .unanswer_top{
      border-bottom: 1px solid #d9d9d9;
      padding-bottom: 10px;
      .unanswer_title{
        font-size: 17px;
        font-weight: bold;
      }
      .unanswer_content{
        margin-top: 5px;
        font-size: 15px;
      }
      .unanswer_pic{
        margin-top: 10px;
        width: 180px;
        height: 120px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .reply_to{
      text-align: center;
      font-size: 16px;
      color: #eb622b;
      margin-top: 100px;
      padding: 20px 0;
      .reply_text{
        .huidaIcon{
          margin-right: 10px;
        }
      }
    }
    .rt_content{
      margin-top: 15px;
      border: 1px solid #d9d9d9;
      border-radius: 5px;
      height: 180px;
      .rt_text {
        padding: 10px;
        width: 100%;
        height: 100%;
        border: none;
        font-size: 15px;
        resize:none
      }
    }
    .upload_pic{
      margin-top: 15px;
      width: 130px;
      height: 100px;
      background: #d9d9d9;
    }
    .upload_file{
      float: left;
      margin-top: 10px;
      font-size: 15px;
      padding: 10px 0;
      color:#666;
      line-height: 38px;
      i{
        margin-right: 10px;
        font-size: 20px;
        float: left;
      }
      span{
        float: left;
      }
    }
    .submit_answer{
      margin-top: 20px;
      float: right;
      width: 80px;
      background: #eb622b;
      height: 35px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      border-radius: 5px;
      line-height: 38px;
    }
  }
</style>
