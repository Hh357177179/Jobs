<template>
  <div class="publicityd">
    <div class="pub_top">
      <p class="pub_title">{{publicObj.title}}</p>
      <div class="pt_content">{{publicObj.content}}</div>
      <div class="clearfix">
        <div class="pt_pic" v-for="(items, indexs) in publicObj.picurl" :key="indexs">
          <img :src="items" alt="">
        </div>
      </div>
    </div>
    <div class="pub_main">
      <span class="iconfont icon-huida editIcon" @click="editAnswer" v-if='level == 3'></span>
      <p class="public_tit">公示阶段：第{{publicObj.start_date | formDate}}天</p>
      <div class="public_content">{{answerObj.content}}</div>
      <div class="clearfix">
        <div class="public_pic" v-for="(picOnly, picNum) in answerObj.picurl" :key="picNum">
          <img :src="picOnly" alt="">
        </div>
      </div>
      <div class="public_download" v-if="answerObj.fileurl != 0">
        <i class="iconfont icon-xiazai"></i>
        <span>查看回答相关附件</span>
      </div>
      <div class="public_zan clearfix" v-if="level != '3'">
        <p class="zan_left clearfix" @click="argee">
          <i class="iconfont icon-zan"></i>
          <span style="margin-top:3px;">该回答收到的赞同数：<i>{{publicObj.agree_number}}</i></span>
        </p>
        <p class="zan_right" style="margin-top:3px;" @click="submitQuery">我有质疑</p>
      </div>
      <div class="public_zan clearfix">
        <p class="zan_left clearfix">
          <i class="iconfont icon-nozan-copy" style="margin-top:3px;"></i>
          <span>该回答收到的质疑数：<i>{{publicObj.distrust_number}}</i></span>
        </p>
        <p class="zan_right" @click="checkQuery(answerObj.id)">查看</p>
      </div>
    </div>
    <p class="bot_text" v-if="level != '3'">（满足公示10日并且专家赞同数达到3的词条将上传）</p>
  </div>
</template>

<script>
import { expertDetail, answerAgree } from '../../api/api.js'
export default {
  data () {
    return {
      publicObj: {},
      answerObj: {},
      level: ''
    }
  },
  methods: {
    // 同意
    argee () {
      let key = JSON.parse(localStorage.getItem('token'))
      let params = {
        token: key.token,
        answer_id: this.answerObj.id
      }
      answerAgree(params).then(res => {
        console.log(res)
        this.$toast('同意成功')
        this.getDetail()
      })
    },
    // 编辑
    editAnswer () {
      this.$router.push({
        path: `/edit`,
        name: 'edit',
        params: this.answerObj
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
        if (res.picurl != '') {
          res.picurl = res.picurl.split('|')
        }
        if (res.answer.picurl != '') {
          res.answer.picurl = res.answer.picurl.split('|')
        }
        this.publicObj = res
        this.answerObj = res.answer
      })
    },
    // 提交质疑
    submitQuery () {
      this.$router.push({
        path: '/referquery',
        name: 'referquery',
        params: this.answerObj
      })
    },
    // 查看质疑
    checkQuery (id) {
      this.$router.push(`/checkquery/${id}`)
    }
  },
  mounted () {
    let levels = JSON.parse(localStorage.getItem('token'))
    this.level = levels.level
    this.getDetail()
  }
}
</script>


<style lang="less">
  .publicityd {
    padding: 15px 20px;
    .pub_top{
      padding-bottom: 10px;
      border-bottom: 1px solid #d9d9d9;
      .pub_title{
        font-size: 17px;
        font-weight: bold;
      }
      .pt_content{
        margin-top: 10px;
        font-size: 15px;
      }
      .pt_pic{
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
      .pt_pic:nth-of-type(2n){
        float: right;
      }
    }
    .pub_main{
      padding-top: 10px;
      font-size: 15px;
      position: relative;
      .editIcon{
        font-size: 20px;
        position: absolute;
        right: 10px;
        top: 10px;
        color: #eb622b;
      }
      .public_tit{
        color: #f00;
      }
      .public_content{
        margin-top: 5px;
      }
      .public_pic{
        margin-top: 10px;
        width: 160px;
        height: 120px;
        float: left;
        border: 1px solid #f0f0f0;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .public_pic:nth-of-type(2n){
        float: right;
      }
      .public_download{
        margin-top: 10px;
        margin-bottom: 15px;
        padding: 5px 0;
        font-size: 14px;
        color: #666;
        i{
          margin-right: 5px;
        }
      }
      .public_zan{
        margin-top: 5px;
        font-size: 16px;
        .zan_left{
          float: left;
          .iconfont{
            margin-right: 5px;
            color: #eb622b;
            font-size: 20px;
            float: left;
          }
          span{
            float: left;
            i{
              font-family: "微软雅黑";
            }
          }
        }
        .zan_right{
          float: right;
          width: 80px;
          padding: 2px 0;
          border: 1px solid #d9d9d9;
          border-radius: 5px;
          text-align: center;
        }
      }
    }
    .bot_text{
      font-size: 14px;
      color: #eb622b;
      text-align: center;
      margin-top: 15px;
    }
  }
</style>
