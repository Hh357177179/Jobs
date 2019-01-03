<template>
  <div class="home">
    <div class="home_search clearfix">
      <div class="sIcon">
        <p class="iconfont icon-xingtaiduICON_sousuo---copy"></p>
        <p>搜索</p>
      </div>
      <div class="sInput">
        <input class="seach_input" @blur.prevent="changeCount" v-model="sVal" type="text" placeholder="请输入小组名称...">
        <i class="iconfont icon-qingchu clearIcon" @click="clearVal" v-show="clearShow"></i>
      </div>
      <div class="right_logo">
        <img src="../assets/image/logo.png" alt="">
      </div>
    </div>
    <div class="nowDay first_title clearfix">
      <span style="float:left;">
        <img class="type_pic" src="../assets/image/firstPic.png" alt="">
      </span>
      <!-- <span class="small_text">每天都有新播报</span> -->
    </div>
    <div class="home_banner">
      <swiper class="banner" :options="swiperOption" v-if="banPic.length>1">
        <swiper-slide class="banner_pic" v-for="(item, index) in banPic" :key="index">
          <img :src="item.image">
        </swiper-slide>
      </swiper>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </div>
    <div class="nowDay clearfix">
      <span style="float:left;">
        <img class="type_pic" src="../assets/image/secondPic.png" alt="">
      </span>
      <!-- <span class="small_text">每天都有新播报</span> -->
    </div>
    <div class="list_big_type clearfix">
      <div class="bt_li" v-for="(item, index) in firstArr" :key= "index" @click="typeR({id: item.id, ind: index})">
        <p class="bt_pic">
          <img v-if="item.cate_img != ''" :src="item.cate_img" alt="">
          <img v-else src="../assets/image/olevel.png" alt="">
        </p>
        <p class="bt_title">{{item.cate_title}}</p>
      </div>
    </div>
    <div class="line"></div>
    <div class="nowDay clearfix">
        <span style="float:left;">
          <img class="type_pic" src="../assets/image/threePic.png" alt="">
        </span>
        <!-- <span class="small_text">每天都有新播报</span> -->
      </div>
    <div class="group_card clearfix">
      <div class="group_list" v-for="(item, index) in groupArr" :key="index" @click="rDetail(item.id)">
        <div class="group_pic">
          <img v-if="item.image != ''" :src="item.image" alt="">
          <img v-else src="../assets/image/glevel.png" alt="">
        </div>
        <p class="group_title">{{item.title}}</p>
        <p class="g_content">{{item.info}}</p>
        <p class="bot_text">
          <span class="principal">组长：{{item.person}}</span>
        </p>
      </div>
    </div>
    <div class="noData" v-show="nodata">
      <div class="no_pic">
        <img src="../assets/image/nodata.png" alt="">
      </div>
      <p>没有找到相关小组</p>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { GetBanner, getType, getGroupList } from '../api/api.js'
import { myMixin } from '../mixin/myMixin.js'
export default {
  mixins: [myMixin],
  data () {
    return {
      counts: 0,
      clearShow: false,
      nodata: false,
      groupArr: [],
      firstArr: [],
      banPic: [],
      swiperOption: {
        spaceBetween: 20,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
          waitForTransition: true
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        speed: 1000,
        loop: true
      },
      pid: 0,
      page:1,
      pagesize: 4,
      sVal: '',
      keyword: '',
      cate_id: '',
      valKey: ''
    }
  },
  watch: {
    sVal (valKey) {
      // console.log(123,valKey)
      this.keyword = valKey
      if (this.keyword != '') {
        this.clearShow = true
      } else {
        this.clearShow = false
      }
    }
  },
  methods: {
    // 跳转分类
    typeR (par) {
      console.log(par)
      this.$router.push(`/category?id=${par.id}&ind=${par.ind}`)
    },
    handleScroll () {
   		//变量scrollTop是滚动条滚动时，距离顶部的距离
   		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
   		//变量windowHeight是可视区的高度
   		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
   		//变量scrollHeight是滚动条的总高度
   		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
      //滚动条到底部的条件
      if(scrollTop + windowHeight == scrollHeight){
//         console.log('loadingMore')
        if (this.page * this.pagesize < this.counts) {
          this.page = this.page + 1
          // console.log(this.page)
          this.getGroup()
        } else {
          this.showToast('无更多数据')
        }
      }
    },

    // 清除输入框
    clearVal () {
      this.sVal = ''
      this.keyword = ''
      this.page = 1
      this.groupArr = []
      this.getGroup()
    },
    rDetail (id) {
      this.$router.push(`/category/detail/${id}`)
    },
    // 获取首页banner
    getbanner () {
      GetBanner().then(res => {
        this.banPic = res
      })
    },
    // 获取大分类
    gettypes () {
      getType(this.pid).then(res => {
        // console.log(res)
        this.firstArr = res
      })
    },
    // 获取战术小组列表
    getGroup () {
      let param = {
        keyword: this.keyword,
        page: this.page,
        pagesize: this.pagesize,
        cate_id: this.cate_id
      }
      getGroupList(param).then(res => {
        // console.log(res)
          if (res.list.length == 0) {
            this.nodata = true
          } else {
            this.nodata = false
          }
          this.groupArr = this.groupArr.concat(res.list)
          this.counts = res.count
      })
    },
    // 搜索框失去焦点
    changeCount () {
      this.groupArr = []
      this.page = 1
      this.getGroup()
    }
  },
  mounted () {
    this.getbanner()
    this.gettypes()
    this.getGroup()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    // console.log('取消监听')
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="less">
  .home{
    padding: 5px 0 60px;
    .home_search{
      padding: 5px 10px;
      background: #fff; 
      width: 100%;
      left: 0;
      top: 0;
      z-index: 11;
      position: fixed;
      border-bottom: 0.8px solid #e8e8e8;
      .sIcon{
        float: left;
        color: #999;
        .iconfont{
          font-size: 20px;
          margin-top: 2px;
          margin-bottom: 2px;
        }
      }
      .sInput{
        float: left;
        width: 75%;
        background: #f0f0f0;
        font-size: 14px;
        margin-left: 10px;
        border-radius: 15px;
        height: 35px;
        margin-top: 5px;
        color: #bbb;
        padding-left: 20px;
        position: relative;
        .seach_input{
          float: left;
          background: none;
          width: 100%;
          height: 100%;
          color:#666;
        }
        .clearIcon{
          position: absolute;
          font-size: 20px;
          right: 0;
          padding: 7px 10px;
          color: #ccc;
        }
      }
      .right_logo{
        float: right;
        width: 40px;
        height: 40px;
        margin-top: 3px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .nowDay{
      margin-top: 15px;
      font-size: 15px;
      padding: 0 10px;
      font-weight: bold;
      position: relative;
      color: #333;
      .small_text{
        color: #999;
        font-size: 12px;
        font-weight: normal;
        margin-left: 10px;
        position: absolute;
        bottom: 0;
      }
      .type_pic{
        width: 70px;
      }
    }
    .first_title{
      margin-top: 63px;
    }
    .home_banner{
      border-bottom: 1px solid #f0f0f0;
      margin-top: 10px;
      width: 100%;
      padding: 0 10px;
      padding-bottom: 10px;
      .banner{
        height: 170px;
        border-radius: 10px;
        .banner_pic{
          width: 100%;
          height: 100%;
          border-radius: 10px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
      }
    }
    .list_big_type{
      width: 100%;
      padding: 0 10px;
      margin-top: 10px;
      overflow-x: scroll;
      white-space: nowrap;
      padding-bottom: 10px;
      .bt_li{
        width: 23%;
        display: inline-block;
        text-align: center;
        .bt_pic{
          width: 50px;
          height: 50px;
          background: #ccc;
          margin: 0 auto;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .bt_title{
          margin-top: 5px;
          font-size: 13px;
          color: #666;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          width: 100%;
        }
      }
    }
    .line{
      width: 100%;
      height: 8px;
      background: #f0f0f0;
    }
    .group_card{
      padding: 0 10px;
      margin-top: 10px;
      width: 100%;
      .group_list {
        margin-bottom: 5px;
        float: left;
        width: 49%;
        box-shadow: 2px 2px 15px #ccc;
        background: #fff;
        padding: 10px 10px 0 10px;
        .group_pic{
          width: 100%;
          height: 140px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .group_title{
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
          margin-top: 5px;
          font-size: 15px;
          color: #333;
          font-weight: bold;
          padding: 0 5px;
        }
        .g_content{
          margin-top: 5px;
          height: 18px;
          font-size: 13px;
          color: #666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
          padding: 0 5px;
        }
        .bot_text{
          font-size: 13px;
          color: #333;
          padding: 0 5px 5px;
          margin-top: 2px;
        }
      }
      .group_list:nth-of-type(2n) {
        float: right;
      }
    }
    .noData{
      width: 130px;
      height: 130px;
      margin: 10px auto;
      text-align: center;
      color: #999;
      font-size: 14px;
      .no_pic{
        width: 100px;
        height: 100px;
        margin: 0 auto;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
