<template>
  <div class="publicityd">
    <div class="pub_top">
      <p class="pub_title">我是标题哈哈</p>
      <div class="pt_content">问题简介哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
      <div class="pt_pic">
        <img src="../../assets/image/demo.jpg" alt="">
      </div>
    </div>
    <div class="pub_main">
      <p class="public_tit">公示阶段：第1日</p>
      <div class="public_content">专家回答内容内容内容内容内容内容内容内容内容内容内容内容内容专家回答内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
      <div class="public_pic">
        <img src="../../assets/image/demo.jpg" alt="">
      </div>
      <div class="public_download">
        <i class="iconfont icon-xiazai"></i>
        <span>查看回答相关附件</span>
      </div>
      <div class="public_zan clearfix">
        <p class="zan_left clearfix">
          <i class="iconfont icon-zan"></i>
          <span style="margin-top:3px;">该回答收到的赞同数：<i>3</i></span>
        </p>
        <p class="zan_right" style="margin-top:3px;" @click="submitQuery">我有质疑</p>
      </div>
      <div class="public_zan clearfix">
        <p class="zan_left clearfix">
          <i class="iconfont icon-nozan-copy" style="margin-top:3px;"></i>
          <span>该回答收到的质疑数：<i>3</i></span>
        </p>
        <p class="zan_right" @click="checkQuery">查看</p>
      </div>
    </div>
    <p class="bot_text">（满足公示10日并且专家赞同数达到3的词条将上传）</p>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    // 提交质疑
    submitQuery () {
      this.$router.push('/referquery')
    },
    // 查看质疑
    checkQuery () {
      this.$router.push('/checkquery')
    }
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
        margin-top: 5px;
        width: 180px;
        height: 120px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .pub_main{
      padding-top: 10px;
      font-size: 15px;
      .public_tit{
        color: #f00;
      }
      .public_content{
        margin-top: 5px;
      }
      .public_pic{
        margin-top: 5px;
        width: 180px;
        height: 120px;
        img{
          width: 100%;
          height: 100%;
        }
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
