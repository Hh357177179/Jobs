<template>
  <div class="adetail">
    <div class="ad_top">
      <p class="ad_title clearfix">
        <span class="ad_smallt">我是标题哈哈</span>
        <span class="ad_classify">分类1</span>
      </p>
      <div class="ad_content">
        我是一大段内容我是一大段内容我是一大段内容我是一大段内容我是一大段内容我是一大段内容我是一大段内容我是一大段内容我是一大段内容我是一大段内容我是一大段内容
      </div>
      <div class="ad_pic">
        <img src="../../assets/image/demo.jpg" alt="">
      </div>
    </div>
    <div class="ad_expert">
      <p class="asnwer_content">
        我是专家回答的内容~啊哈哈哈哈哈哈哈哈哈我是专家回答的内容~啊哈哈哈哈哈哈哈哈哈我是专家回答的内容~啊哈哈哈哈哈哈哈哈哈我是专家回答的内容~啊哈哈哈哈哈哈哈哈哈
      </p>
      <div class="asn_pic">
        <img src="../../assets/image/demo.jpg" alt="">
      </div>
    </div>
    <div class="download clearfix">
      <i class="downIcon">
        <img src="../../assets/image/downIcon.png" alt="">
      </i>
      <span class="down_text">下载回答相关附件</span>
    </div>
    <div class="group_main">
      <p class="group_title">专家组：</p>
      <ul class="grouplist clearfix">
         <li>
          <p class="group_pic"></p>
          <p class="group_name">专家一</p>
        </li>
         <li>
          <p class="group_pic"></p>
          <p class="group_name">专家一</p>
        </li>
         <li>
          <p class="group_pic"></p>
          <p class="group_name">专家一</p>
        </li>
        <li>
          <p class="group_pic"></p>
          <p class="group_name">专家一</p>
        </li>
        <li>
          <p class="group_pic"></p>
          <p class="group_name">专家一</p>
        </li>
        <li>
          <p class="group_pic"></p>
          <p class="group_name">专家一</p>
        </li>
        <li>
          <p class="group_pic"></p>
          <p class="group_name">专家一</p>
        </li>
      </ul>
    </div>
    <div class="lookhistory" @click="lookhistory">查看历史版本</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 查看历史版本
    lookhistory () {
      this.$router.push('/history')
    }
  }
};
</script>

<style lang="less">
.adetail {
  padding: 20px 15px;
  .ad_top {
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 10px;
    .ad_title {
      font-size: 17px;
      font-weight: bold;
      line-height: 24px;
      .ad_smallt {
        float: left;
      }
      .ad_classify {
        font-size: 14px;
        float: right;
        font-weight: normal;
        color: #eb622b;
      }
    }
    .ad_content {
      font-size: 15px;
      margin-top: 10px;
    }
    .ad_pic {
      margin-top: 5px;
      width: 180px;
      height: 120px;
      background: #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ad_expert {
    margin-top: 10px;
    .asnwer_content {
      font-size: 15px;
    }
    .asn_pic {
      margin-top: 5px;
      width: 180px;
      height: 120px;
      background: #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .download {
    padding: 10px 0;
    .downIcon {
      width: 20px;
      height: 20px;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .down_text {
      float: left;
      margin-top: 2px;
      margin-left: 5px;
      font-size: 14px;
      color: #999;
    }
  }
  .group_main {
    margin-bottom: 40px;
    .group_title {
      font-size: 15px;
    }
    .grouplist {
      text-align: center;
      li {
        margin-top: 8px;
        width: 25%;
        float: left;
        .group_pic {
          margin: 0 auto;
          width: 60px;
          height: 60px;
          background: #ccc;
          border-radius: 50%;
        }
        .group_name {
          margin-top: 5px;
        }
      }
    }
  }
  .lookhistory {
    font-size: 15px;
    color: #999;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: #fff;
    line-height: 40px;
    left: 0;
  }
}
</style>

