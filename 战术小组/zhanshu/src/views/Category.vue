<template>
  <div class="category">
    <div class="ct_left">
      <div v-for="(item, index) in firstArr" :key="index">
        <p class="ct_type"  @click="Classify({ index: index, id: item.id, tit: item.cate_title })">
          <span style="width:100%;display:inline-block;" :class="{active:index==ins}">{{item.cate_title}}</span>
          <span class="ct_line" :class="{ct_lineBack:index==ins}"></span>
        </p>
      </div>
    </div>
    <div class="ct_main clearfix">
      <!-- <div class="top_nav" @click="backPerv"> -->
        <!-- <p class="nav_list"> -->
          <!-- <span>返回上级分类</span> -->
        <!-- </p> -->
      <!-- </div> -->
      <div>
        <!-- <div v-for="(item, index) in otherArr" :key="index" class="ctm_card" @click="secondType({id: item.id, title: item.cate_title })">
          <div class="cts_pic">
            <img src="../assets/image/thlevel.png" alt="">
          </div>
          <p class="cts_title">{{item.cate_title}}</p>
        </div> -->
        <div class="ct_list clearfix"  v-for="(item, index) in otherArr" :key="index" @click="secondType({id: item.id, title: item.cate_title })">
          <div class="ct_pic">
            <img v-if="item.cate_img == ''" src="../assets/image/thlevel.png" alt="">
            <img v-else :src="item.cate_img" alt="">
          </div>
          <div class="ct_list_text">{{item.cate_title}}</div>
        </div>
      </div>
    </div>
    <div class="nodata" v-show="noShow">
      <div class="nodata_pic">
        <img src="../assets/image/nodata.png" alt="">
      </div>
      <p class="nodate_text">该类别下小组为空</p>
    </div>
  </div>
</template>

<script>
import { getType, getGroupList } from "../api/api.js";

export default {
  data() {
    return {
      noShow: false,
      ins: '0',
      pid: '0',
      firstArr: [],
      otherArr: [],
      numId: "",
      keyword: "",
      page: 1,
      pagesize: 10,
      cate_id: "",
      topsObj: {},
      prevId: '',
    };
  },
  methods: {
    // 点击返回上级分类
    backPerv () {
      console.log(this.prevId)
    },
    
    // 获取分类
    getFirst() {
      let param = {
        pid: this.pid
      };
      getType(param).then(res => {
        console.log(res)
        this.firstArr = res;
        if (this.numId == '') {
          this.numId = res[0].id;
        }
        this.getOtherType();
      });
    },

    // 获取小组列表
    getGroups() {
      let param = {
        keyword: this.keyword,
        page: this.page,
        pagesize: this.pagesize,
        cate_id: this.cate_id
      };
      getGroupList(param).then(res => {
        // console.log(123, res);
        if (res.list.length == 0) {
          this.noShow = true;
        } else {
          this.$router.push(`/category/grouplist?cate_id=${this.cate_id}`);
        }
      });
    },

    // 获取二级分类
    getOtherType() {
      // this.prevId = this.numId
      console.log(11111,this.numId)
      let param = {
        pid: this.numId
      };
      getType(param).then(res => {
        // console.log(res)
        if (res.length == 0) {
          this.getGroups();
        } else {
          this.noShow = false;
        }
        this.otherArr = res;
      });
    },

    // 点击二级或者三级分类
    secondType(sargue) {
      this.prevId = sargue.id
      let param = {
        pid: sargue.id
      };
      getType(param).then(res => {
        // console.log(res)
        if (res.length == 0) {
          this.cate_id = sargue.id;
          this.getGroups();
        } else {
          this.noShow = false;
        }
        this.otherArr = res;
      });
    },

    // 点击一级分类
    Classify(argues) {
      // console.log(argues);
      this.ins = argues.index;
      this.numId = argues.id;
      this.cate_id = argues.id;
      this.getOtherType();
    }
  },
  mounted() {
    // console.log(1)
  //  console.log(this.$route.query)
   let parNums = this.$route.query
  //  console.log(123123,parNums)
   if (parNums.id) {
     this.ins = parNums.ind;
     this.numId = parNums.id;
     this.cate_id = parNums.id;
     console.log(this.ins)
   }
    this.getFirst();
  }
};
</script>

<style lang="less">
.category {
  width: 100%;
  height: 100%;
  .ct_left {
    width: 100px;
    height: 100%;
    overflow-y: scroll;
    background: #f0f0f0;
    position: fixed;
    top: 0;
    left: 0;
    padding-bottom: 50px;
    .ct_type {
      // width: 100%;
      font-size: 14px;
      text-align: center;
      padding: 10px 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      .ct_line {
        width: 4px;
        height: 20px;
        background: rgba(0, 0, 0, 0);
        position: absolute;
        left: 0;
      }
      .ct_lineBack {
        background: #eb622b;
      }
      .active {
        color: #eb622b;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .ct_main {
    margin-left: 100px;
    padding: 10px 2% 60px;
    .top_nav {
      width: 100%;
      height: 30px;
      border-bottom: 0.8px solid #f0f0f0;
    }
    .ct_list{
      float: left;
      margin-bottom: 15px;
      width: 100%;
      .ct_pic{
        width: 60px;
        height: 60px;
        float: left;
        background: #F00;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .ct_list_text{
        float: left;
        font-size: 14px;
        width: 180px;
        line-height: 60px;
        margin-left: 15px;
        overflow: hidden;
        text-overflow: ellipsis; 
        white-space: nowrap;
      }
    }
    .ctm_card {
      width: 30%;
      float: left;
      // background: #ccc;
      box-shadow: 2px 2px 15px #ccc;
      text-align: center;
      padding-bottom: 5px;
      margin-top: 10px;
      .cts_pic {
        width: 100%;
        padding: 10px 10px 5px 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cts_title {
        font-size: 13px;
        float: left;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .ctm_card:nth-of-type(2n) {
      float: right;
    }
  }
  .nodata {
    margin-left: 100px;
    text-align: center;
    margin-top: 50px;
    .nodata_pic {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .nodate_text {
      font-size: 15px;
      color: #999;
    }
  }
}
</style>
