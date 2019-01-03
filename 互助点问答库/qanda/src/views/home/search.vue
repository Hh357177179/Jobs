<template>
  <div class="search">
    <div class="clearfix">
      <div class="search_input">
        <input type="text" placeholder="请输入搜索条件" v-model="keyword">
      </div>
      <div class="sousuo" @click="searchBtn">搜索</div>
    </div>
    <div class="search_condition" v-if="hisArr.length != 0">
      <p class="condition_title">我的搜索历史</p>
      <ul class="ul_list">
        <li v-for='(list, indexx) in hisArr' :key="indexx" @click="listSearch(list)">{{list}}</li>
      </ul>
    </div>
    <div class="search_main">
      <div class="main_list" v-for='(item, index) in searchArr' :key="index" @click="rAnsdetail(item.id)">
        <p class="main_notitle">{{item.title}}</p>
        <div class="main_content">{{item.content}}</div>
        <div class="clearfix">
          <div class="main_pic" v-for="(items, indexs) in item.picurl" :key="indexs">
            <img :src="items" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="noData" v-if='showNodata'>未搜索到相关问答</div>
  </div>
</template>

<script>
import { homeList } from '../../api/api.js'
export default {
  data () {
    return {
      showNodata: false,
      keyword: '',
      page: 1,
      pagesize: 10,
      searchArr: [],
      hisArr: [],
      counts: ''
    }
  },
  methods: {
    // 跳转详情页
    rAnsdetail (id) {
      this.$router.push(`/adetail/${id}`)
    },
    listSearch (list) {
      console.log(list)
      this.keyword = list
      this.page = 1
      this.searchArr = []
      this.getList()
    },
    searchBtn () {
      console.log(this.keyword)
      this.searchArr = []
      this.page = 1
      this.getList()
    },
    getList() {
      let params = {
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword
      }
      homeList(params).then(res => {
        console.log(res)
        if (this.keyword != '') {
          if (this.hisArr.length < 5) {
            this.hisArr.unshift(this.keyword)
            localStorage.setItem('his', JSON.stringify(this.hisArr))
          } else {
            this.hisArr.splice(4,1)
            this.hisArr.unshift(this.keyword)
            localStorage.setItem('his', JSON.stringify(this.hisArr))
          }
        }
        if (res.list.length == 0) {
          this.showNodata = true
        } else {
          this.showNodata = false
        }
        for (let i = 0,len = res.list.length; i < len; i++) {
          if (res.list[i].picurl != '') {
            res.list[i].picurl = res.list[i].picurl.split('|')
          }
        }
        this.searchArr = this.searchArr.concat(res.list)
        this.counts = res.count
      })
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
        console.log('loadingMore')
        if (this.page * this.pagesize < this.counts) {
          this.page = this.page + 1
          console.log(this.page)
          this.getList()
        } else {
          this.$toast('无更多数据')
        }
      }
    },
  },
  mounted () {
    if (localStorage.getItem('his')) {
      let key = JSON.parse(localStorage.getItem('his'))
      this.hisArr = key
    }
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    // console.log('取消监听')
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="less">
  .search {
    border: 1px solid rgba(0,0,0,0);
    .search_input{
      width: 70%;
      height: 40px;
      border: 1px solid #d9d9d9;
      margin-top: 10px;
      margin-left: 20px;
      float: left;
      border-radius: 5px;
      font-size: 15px;
      overflow: hidden;
      input{
        width: 100%;
        height: 100%;
        padding-left: 20px;
      }
    }
    .sousuo{
      float: right;
      background: #f0f0f0;
      margin-top: 10px;
      float: right;
      line-height: 40px;
      font-size: 15px;
      margin-right: 10px;
      width: 70px;
      text-align: center;
      color: #333;
      border-radius: 5px;
    }
    .search_condition{
      font-size: 14px;
      color: #333;
      margin-top: 10px;
      margin-left: 20px;
      .condition_title{
        font-weight: bold;
      }
      .ul_list{
        li{
          width: 95%;
          font-size: 14px;
          color: #666;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
    .search_main{
      .main_list{
        padding: 10px 20px;
        border-bottom: 1px solid #d9d9d9;
      }
      .main_notitle{
        font-size: 15px;
        color: #333;
      }
      .main_content{
        font-size: 14px;
        color: #666;
      }
      .main_title{
        font-size: 15px;
        color: #333;
      }
      .main_pic{
        width: 48%;
        height: 120px;
        float: left;
        background: #ccc;
        margin-top: 10px;
      }
      .main_pic:nth-of-type(2n){
        float: right;
      }
    }
    .noData{
      font-size: 15px;
      margin-top: 150px;
      text-align: center;
      color: #ccc;
    }
  }
</style>

