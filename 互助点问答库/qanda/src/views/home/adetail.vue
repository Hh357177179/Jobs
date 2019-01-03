<template>
  <div class="adetail">
    <div class="ad_top">
      <p class="ad_title clearfix">
        <span class="ad_smallt">{{allObj.title}}</span>
        <span class="ad_classify">{{allObj.cate_id | types}}</span>
      </p>
      <div class="ad_content">
        {{allObj.content}}
      </div>
      <div class="clearfix">
        <div class="ad_pic" v-for="(item, ipic) in allObj.picurl" :key="ipic">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
    <div class="ad_expert">
      <p class="asnwer_content">
        {{answerObj.content}}
      </p>
      <div class="clearfix">
        <div class="asn_pic" v-for="(items, index) in answerObj.picurl" :key="index">
          <img :src="items" alt="">
        </div>
      </div>
    </div>
    <div class="download clearfix" v-if="fileurlShow">
      <i class="downIcon">
        <img src="../../assets/image/downIcon.png" alt="">
      </i>
      <span class="down_text">下载回答相关附件</span>
    </div>
    <div class="group_main">
      <p class="group_title">专家组：</p>
      <ul class="grouplist clearfix">
         <li v-for="(lis, liindex) in agreeArr" :key="liindex">
          <p class="group_pic"></p>
          <p class="group_name">{{lis.Nickname}}</p>
        </li>
      </ul>
    </div>
    <div class="lookhistory" @click="lookhistory(allObj.id)">查看历史版本</div>
  </div>
</template>

<script>
import { detail } from '../../api/api.js'
export default {
  data() {
    return {
      allObj: {},
      answerObj: {},
      agreeArr: [],
      fileurlShow: false
    }
  },
  methods: {
    // 获取普通用户详情
    getPerList () {
      let params = {
        question_id: this.$route.params.id
      }
      console.log(params)
      detail(params).then(res => {
        console.log(res)
        if (res.picurl != '') {
          res.picurl = res.picurl.split('|')
        }
        if (res.answer.picurl != '') {
          res.answer.picurl = res.answer.picurl.split('|')
        }
        if (res.answer.fileurl != '') {
          this.fileurlShow = true
        }
        this.allObj = res
        this.answerObj = res.answer
        this.agreeArr = res.agree
      })
    },

    // 查看历史版本
    lookhistory (id) {
      this.$router.push(`/history/${id}`)
    }
  },
  mounted () {
    this.getPerList()
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
      float: left;
      margin-top: 5px;
      width: 160px;
      height: 120px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .ad_pic:nth-of-type(2n){
      float: right;
    }
  }
  .ad_expert {
    margin-top: 10px;
    .asnwer_content {
      font-size: 15px;
    }
    .asn_pic {
      float: left;
      margin-top: 5px;
      width: 160px;
      height: 120px;
      background: #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .asn_pic:nth-of-type(2n){
      float: right;
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
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #d9d9d9;
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

