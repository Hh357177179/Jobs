<template>
  <div class="edit">
    <div class="edit_content">
      <textarea v-model="editContent"></textarea>
    </div>
    <div class="pic_main clearfix">
      <div v-for="(item, index) in answerArr" :key="index">
        <div class="pic_list">
          <i class="iconfont icon-trash deleteIcon" @click="deletePic(index)"></i>
          <img :src="item" alt="">
        </div>
      </div>
    </div>
    <div class="reason_input">
      <input type="text" placeholder="请填写修改原因" v-model="reason">
    </div>
    <div class="submit" @click="submit">提交修改</div>
  </div>
</template>

<script>
import { answerEdit } from '../../api/api.js'
export default {
  data () {
    return {
      editContent: '',
      answerObj: {},
      answerArr: [],
      reason: ''
    }
  },
  methods: {
    deletePic (num) {
      console.log(num)
      this.answerArr.splice(num,1)
      console.log(123,this.answerArr)
    },
    submit () {
      let key = JSON.parse(localStorage.getItem('token'))
      let params = {
        token: key.token,
        answer_id: this.answerObj.id,
        content: this.editContent,
        picurl: this.answerArr.join('|'),
        fileurl: '',
        reason: this.reason
      }
      answerEdit(params).then(res => {
        console.log(res)
        this.$router.back(-1)
      })
    }
  },
  mounted () {
    if (JSON.stringify(this.$route.params) == '{}') {
      console.log(1)
      this.$router.back(-1)
    } else {
      console.log(this.$route.params)
      this.answerObj = this.$route.params
      this.editContent = this.$route.params.content
      this.answerArr = this.$route.params.picurl
    }
  }
}
</script>

<style lang="less">
  .edit{
    padding: 10px;
    padding-bottom: 40px;
    .edit_content{
      border: 1px solid #f0f0f0;
      border-radius: 3px;
      min-height: 200px;
      padding: 10px;
      font-size: 15px;
      color: #333;
      textarea{
        width: 100%;
        min-height: 200px;
        resize: none;
      }
    }
    .pic_main{
      .pic_list{
        width: 33.33%;
        float: left;
        height: 100px;
        margin-top: 10px;
        border:1px solid #f0f0f0;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .deleteIcon{
          font-size: 20px;
          position: absolute;
          padding: 5px;
          color: #666;
          right: 0;
          top: 0;
        }
      }
    }
    .reason_input{
      width: 100%;
      height: 50px;
      font-size: 14px;
      border-bottom: 1px solid #f0f0f0;
      margin-top: 20px;
      input{
        padding-left: 20px;
        width: 100%;
        height: 100%;
      }
    }
    .submit{
      width: 120px;
      color: #fff;
      text-align: center;
      font-size: 15px;
      line-height: 40px;
      background: #eb622b;
      margin:30px auto 0;
      border-radius: 5px;
    }
  }
</style>

