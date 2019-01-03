<template>
  <div class="home">
   <div class="home_top clearfix" @click="routerDown">
     <div class="home_search"></div>
     <div class="down">
      <i class="iconfont icon-sousuo" style="font-size:30px;color:#ccc;margin-top:5px;"></i>
    </div>
   </div>
   <div class="new_answer">
     <p class="answer_title">最新回答</p>
     <div class="list_card clearfix" @click="rAnsdetail(item.id)" v-for="(item, index) in homeArr" :key="index">
       <div class="card_text">{{item.title}}</div>
       <div class="card_contents">{{item.content}}</div>
       <div class="card_pic" v-for="(items, indexs) in item.picurl" :key="indexs">
         <img :src="items" alt="">
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import {homeList} from '../../api/api.js'
export default {
  data () {
    return {
      page: 1,
      pagesize: 10,
      keyword: '',
      homeArr: [],
      counts: ''
    }
  },
  mounted () {

  },
  methods: {
    // 获取首页列表
    getList () {
      let params = {
        keyword: '',
        page: this.page,
        pagesize: this.pagesize
      }
      homeList(params).then(res => {
        console.log(res)
        for (let i = 0,len = res.list.length; i < len;i++) {
          if (res.list[i].picurl != '') {
            res.list[i].picurl = res.list[i].picurl.split('|')
          }
        }
        this.homeArr = this.homeArr.concat(res.list)
        this.counts = res.count
      })
    },
    // 跳转下载详情
    routerDown () {
      this.$router.push('/search')
    },
    // 跳转详情页
    rAnsdetail (id) {
      this.$router.push(`/adetail/${id}`)
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
    window.addEventListener('scroll', this.handleScroll)
    this.getList()
  },
  beforeDestroy () {
    // console.log('取消监听')
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>


<style lang="less">
  .home{
    border: 1px solid rgba(0,0,0,0);
    padding: 0 20px;
    .home_top{
      height: 40px;
      border-radius: 10px;
      margin-top: 20px;
      .home_search{
        float: left;
        width: 85%;
        height: 100%;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
      }
      .down{
        float:right;
        width: 30px;
        height: 30px;
        margin-top: 5px;
        img{
          float: left;
          width: 20px;
          height: 20px;
          margin-left: 10px;
          margin-top: 10px;
        }
      }
    }
    .search_history{
      margin-top: 10px;
      .my_search{
        font-size: 15px;
      }
      .hislist{
        margin-top: 5px;
        font-size: 14px;
        color: #666;
      }
    }
    .new_answer{
      margin-top: 20px;
      padding-bottom: 50px;
      .answer_title{
        font-size: 16px;
        font-weight: 500;
        // margin-bottom: 10px;
      }
      .list_card{
        padding: 10px 0;
        border-bottom: 1px solid #d9d9d9;
        .card_text{
          font-size: 15px;
          color: #333;
        }
        .card_left{
          font-size: 15px;
          width: 175px;
          float: left;
          color: #666;
        }
        .card_contents{
          font-size: 15px;
          color: #666;
        }
        .card_pic{
          float: left;
          width: 160px;
          height: 120px;
          margin-top: 10px;
          background: #ccc;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .card_pic:nth-of-type(2n){
          float: right;
        }
      }
    }
  }
</style>
