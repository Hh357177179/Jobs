<template>
  <div class="groupList">
    <div v-for="(item, index) in groupListArr" :key="index">
      <div class="apply_main" @click="rDetail(item.id)">
        <div class="apply_list clearfix">
          <div class="al_pic">
            <img v-if="item.image != ''" :src="item.image" alt="">
            <img v-else src="../assets/image/glevel.png" alt="">
          </div>
          <div class="al_text">
            <p class="al_title">{{item.title}}</p>
            <p class="al_content">{{item.info}}</p>
            <div class="al_user">
              <span class="al_person">组长：{{item.person}}</span>
              <span class="al_time">{{item.create_time | formatTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGroupList } from '../api/api.js'
import { myMixin } from '../mixin/myMixin.js'
export default {
  mixins: [myMixin],
  data () {
    return {
      counts: 0,
      keyword: '',
      page: 1,
      pagesize: 10,
      cate_id: '',
      groupListArr: []
    }
  },
  methods: {
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
          this.getList()
        } else {
          this.showToast('无更多数据')
        }
      }
    },

    // 跳转详情页
    rDetail (id) {
      this.$router.push(`/category/detail/${id}`)
    },

    // 加载列表
    getList () {
      let param = {
        keyword: this.keyword,
        page: this.page,
        pagesize: this.pagesize,
        cate_id: this.cate_id
      }
      getGroupList(param).then(res => {
        console.log(res)
        this.groupListArr = res.list
        this.counts = res.count
      })
    }
  },
  mounted () {
    this.cate_id = this.$route.query.cate_id
    console.log(this.cate_id)
    this.getList()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    // console.log('取消监听')
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>


<style lang="less">
  .groupList{
    padding: 10px 20px 60px;
    .apply_list{
      margin-bottom: 10px;
      position: relative;
      padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
      .al_pic{
        float: left;
        width: 100px;
        height: 100px;
        background: #ccc;
        border-radius: 5px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .al_text{
        width: 220px;
        float: right;
        .al_title{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 5px;
          color: #333;
        }
        .al_content{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 13px;
          color: #666;
        }
        .al_user{
          position: absolute;
          bottom: 10px;
          width: 220px;
          .al_person{
            float: left;
            font-size: 13px;
            color: #333;
          }
          .al_time{
            float: right;
            font-size: 13px;
            font-family: "微软雅黑";
            color: #333;
          }
        }
      }
    }
  }
</style>
