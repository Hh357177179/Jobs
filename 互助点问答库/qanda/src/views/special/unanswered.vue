<template>
  <div class="unanswer">
    <div class="unanswer_top">
      <p class="unanswer_title">{{detailObj.title}}</p>
      <div class="unanswer_content">{{detailObj.content}}</div>
      <div class="clearfix">
        <div class="unanswer_pic" v-for="(item, index) in detailObj.picurl" :key="index">
          <img :src="item" alt="">
        </div>
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
        <i class="iconfont icon-mn_shangchuantupian"></i>
        <span>上传图片</span>
        <input class="uploadPic" type='file' accept="image/*" @change="uploadPics"/>
      </div>
      <div class="pic_main clearfix">
        <div class="pic_lists" v-for="(itempic, upPic) in picArr" :key="upPic">
          <img :src="itempic" alt="">
        </div>
      </div>
      <!-- <div class="upload_file clearfix">
        <p>
          <i class="iconfont icon-shangchuan"></i>
          <span>上传附件</span>
        </p> -->
      <!-- </div> -->
      <div class="submit_answer" @click="submitAns">提交</div>
    </div>
  </div>
</template>

<script>
import { expertDetail, upLoad, answer } from '../../api/api.js'
export default {
  data () {
    return {
      write: true,
      writeText: false,
      desc: '',
      detailObj: {},
      picArr: []
    }
  },
  methods: {
    // 提交
    submitAns () {
      let key = JSON.parse(localStorage.getItem('token'))
      if (this.desc == '') {
        this.$toast('请填写回答')
      } else {
        let params = {
          token: key.token,
          question_id: this.detailObj.id,
          content: this.desc,
          picurl: this.picArr.join('|'),
          fileurl: ''
        }
        console.log(params)
        answer(params).then(res => {
          console.log(res)
          this.$toast('回答成功！')
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
      }
    },
    // 上传图片
    uploadPics (e) {
      console.log(1)
      let file = e.target.files[0]
      let param = new FormData() // 创建form对象
        param.append('file', file, file.name) // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      upLoad(param).then(res => {
        console.log(res)
        // this.picurl = res
        this.picArr = this.picArr.concat(`http://huzhudian.zhaodaka.net${res}`)
        console.log(this.picArr.join('|'))
      })
    },
    // 获取详情内容
    getDetail () {
      let key = JSON.parse(localStorage.getItem('token'))
      let params = {
        token: key.token,
        question_id: this.$route.params.id
      }
      expertDetail(params).then(res => {
        console.log(res)
        res.picurl = res.picurl.split('|')
        this.detailObj = res
      })
      .catch({})
    },
    // 点击回答
    replyTo () {
      this.write = false,
      this.writeText = true
    }
  },
  mounted () {
    this.getDetail()
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
        float: left;
        margin-top: 10px;
        width: 160px;
        height: 120px;
        border: 1px solid #ccc;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .unanswer_pic:nth-of-type(2n) {
        float: right;
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
      // border-radius: 5px;
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
      font-size: 15px;
      height: 30px;
      line-height: 30px;
      color: #666;
      position: relative;
      .iconfont{
        font-size: 20px;
        float: left;
        margin-right: 5px;
      }
      .uploadPic{
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
      }
    }
    .pic_main{
      .pic_lists{
        width: 100px;
        height: 100px;
        border: 1px solid #f0f0f0;
        float: left;
        margin-left: 10px;
        margin-top: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
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
