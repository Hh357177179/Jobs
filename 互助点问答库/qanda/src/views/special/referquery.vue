<template>
  <div class="referquery">
    <div class="refer_answer">
      <div class="refer_content">{{referObj.content}}</div>  
      <div class="clearfix">
         <div class="refer_pic" v-for="(piclist, index) in referObj.picurl" :key="index">
          <img :src="piclist" alt="">
        </div>
      </div>
      <div class="refer_download" v-if="referObj.fileurl != ''">
        <i class="iconfont icon-xiazai"></i>
        <span>查看回答相关附件</span>
      </div>
    </div>
    <div class="refer_submit">
      <div class="sub_content">
        <p>质疑内容与原因：</p>
        <p class="sub_text">
          <textarea placeholder="请填写质疑内容和原因" v-model="reason"></textarea>
        </p>
      </div>
      <div class="sub_content">
        <p>建议修改为：</p>
        <p class="sub_text">
          <textarea placeholder="请填写建议修改的内容" v-model="suggest"></textarea>
        </p>
      </div>
    </div>
    <div class="submitBtn" @click="submitBtn">提交</div>
    <p class="botText">（您的质疑受到认同后问答将重新公示）</p>
  </div>
</template>

<script>
import { answerDistrust, expertDetail } from '../../api/api.js'
export default {
  data () {
    return {
      referObj: {},
      reason: '',
      suggest: ''
    }
  },
  methods: {
    // 获取质疑详情内容
    submitBtn () {
      let key = JSON.parse(localStorage.getItem('token'))
      if (this.reason == '') {
        this.$toast('请填写质疑内容和原因')
      } else if (this.suggest == '') {
        this.$toast('请填写建议修改的内容')
      } else {
        let params = {
          token: key.token,
          answer_id: this.referObj.id,
          reason: this.reason,
          suggest: this.suggest
        }
        console.log(params)
        answerDistrust(params).then(res => {
          console.log(res)
          this.$toast('提交成功')
          setTimeout(() => {
            this.$router.back(-1)
          }, 2000)
        })
      }
    }
  },
  mounted () {
    if (JSON.stringify(this.$route.params) == '{}') {
      this.$router.back(-1)
    } else {
      this.referObj = this.$route.params
    }
  }
}
</script>


<style lang="less">
  .referquery{
    padding: 15px 20px;
    .refer_answer{
      padding-bottom: 10px;
      border-bottom: 1px solid #d9d9d9;
      .refer_content{
        font-size: 15px;
      }
      .refer_pic{
        margin-top: 10px;
        width: 160px;
        height: 120px;
        border: 1px solid #f0f0f0;
        float: left;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .refer_pic:nth-of-type(2n){
        float: right;
      }
      .refer_download{
        margin-top: 5px;
        padding: 10px 0 0;
        font-size: 14px;
        color: #666;
        i{
          margin-right: 5px;
        }
      }
    }
    .refer_submit{
      margin-top: 15px;
      font-size: 15px;
      .sub_content{
        margin-top: 20px;
        .sub_text{
          margin-top: 5px;
          height: 150px;
          border: 1px solid #d9d9d9;
          border-radius: 5px;
          textarea{
            width: 100%;
            height: 100%;
            padding: 5px;
            resize: none;
            border:none;
          }
        }
      }
    }
    .botText{
      font-size: 0.37333rem;
      color: #eb622b;
      text-align: center;
      margin-top: 0.4rem;
    }
    .submitBtn{
      width: 120px;
      height: 40px;
      line-height: 40px;
      font-size: 15px;
      color: #fff;
      text-align: center;
      border-radius: 5px;
      background: #eb622b;
      margin: 20px auto 0;
    }
  }
</style>
