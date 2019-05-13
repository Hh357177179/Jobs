<template>
  <div class="job">
    <div class="job_main">
      <p class="first_title">请根据您的真实信息选择</p>
      <p class="second_title">为您匹配最契合的公司</p>
    </div>
    <div class="job_main">
      <p class="first_title">我们会根据您的每次选项</p>
      <p class="second_title">给您提出最适合的职业规划</p>
    </div>
    <div class="job_main">
      <p class="last_tit">好工作，一定是最适合的</p>
    </div>
    <div class="clickAnswer" @click="rdirect">
      <span class="answerText">开始答题</span>
      <img class="rightGif" src="../assets/img/right.gif" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    rdirect () {
      this.$router.push('/directives')
    }
  }
}
</script>

<style lang="less">
  .job{
    border: 1px solid rgba(0,0,0,0);
    .job_main{
      color: #333;
      margin-top: 60px;
      padding: 0 40px;
      font-size: 16px;
      .second_title{
        margin-left: 20px;
        margin-top: 10px;
        color: #666;
      }
      .last_tit{
        text-align: center;
        color: #eb622b;
      }
    }
    .clickAnswer{
       margin-top: 140px;
       float: right;
       margin-right: 20px;
      .answerText{
        font-size: 17px;
        font-weight: blod;
        float: left;
        line-height: 33px;
        margin-right: 10px;
      }
      .rightGif{
        width: 50px;
        height: 30px;
        float: left;
      }
    }
  }
</style>

