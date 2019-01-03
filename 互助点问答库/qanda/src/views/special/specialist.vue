<template>
  <div class="specialist">
    <div class="special_top clearfix">
      <span class="question_type" @click="quePicker">{{questionTypes}}
        <!-- <i class="icon-xiala1 iconfont xialaIcon"></i> -->
      </span>
      <span class="answer_type" @click="ansPicker">{{answerType}}
        <!-- <i class="iconfont icon-xiala1 xialaIcon"></i> -->
      </span>
    </div>
    <div class="special_mian">
      <div class="s_main_card" v-for='(item, index) in listArr' :key="index" @click="searchpuhlic(item.start_date,item.id)">
        <p class="s_main_top clearfix">
          <span class="s_main_title">{{item.title}}</span>
          <span class="type_text">{{item.cate_id | types}}</span>
        </p>
        <div class="s_main_content">{{item.content}}</div>
        <div class="s_main_pic clearfix">
          <p class="s_pic" v-for="(items, index2) in item.picurl" :key="index2">
            <img :src="items" alt="">
          </p>
        </div>
        <div style="margin-top:10px;">
            <p class="pic_text" v-if="item.start_date != null">公示阶段：第{{item.start_date | formDate}}天</p>
            <p class="pic_text" v-else>未回答阶段</p>
            <p class="reward" v-if="item.score != 0">悬赏EHS互助点：{{item.score / 1000}}</p>
          </div>
      </div>
      <!-- <div class="s_main_card" @click="rUnanswer">
        <p class="s_main_top clearfix">
          <span class="s_main_title">有关EHS人才可持续发展的建议？有关EHS人才可持续发展的建议？</span>
          <span class="type_text">分类1</span>
        </p>
        <div class="s_main_content">哈哈哈哈哈哈我是内容哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈</div>
        <div class="s_main_pic">
          <p class="s_pic">
            <img src="../../assets/image/demo.jpg" alt="">
          </p>
        </div>
         <p class="pic_text">未回答阶段</p>
        
      </div> -->
    </div>
    <!-- picker问题分类 -->
    <van-popup v-model="queshow" position="bottom" style="font-size: 20px;">
      <van-picker show-toolbar title="请选择问题分类" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
    <!-- picker回答阶段 -->
    <van-popup v-model="ansShow" position="bottom" style="font-size: 20px;">
      <van-picker show-toolbar title="请选择问答阶段" :columns="ansArr" @cancel="onCancel" @confirm="ansConfirm" />
    </van-popup>
  </div>
</template>

<script>
import {expertList,cateList} from '../../api/api.js'
export default {
  data () {
    return {
      questionTypes: '请选择问题分类',
      queshow: false,
      columns: [],
      ansShow: false,
      ansArr: ['未回答','公示中'],
      answerType: '请选择问答阶段',
      page: 1,
      pagesize: 10,
      status: '',
      cate_id: '',
      listArr: [],
      counts: ''
    }
  },
  methods: {
    // 获取分类
    getCateList () {
      cateList().then(res => {
        // console.log(res)
        for (let i = 0,len = res.length;i < len; i++) {
          // console.log(res[i].title)
          // this.column = this.column.concat(res[i].title)
          this.columns = this.columns.concat(res[i].title)
        }
      })
    },

    // 查看专家回答列表
    expertList () {
      let token = JSON.parse(localStorage.getItem('token'))
      let params = {
        token: token.token,
        cate_id: this.cate_id,
        status: this.status,
        page: this.page,
        pagesize: this.pagesize
      }
      // console.log(params)
      expertList(params).then(res => {
        console.log(res)
        let response = res.list
        for (let i = 0,len = response.length;i < len; i++) {
          if (response[i].picurl != '') {
            response[i].picurl = response[i].picurl.split('|')
          }
        }
        this.listArr = response
      })
    },

    // 显示问题分类选择框
    quePicker () {
      this.queshow = true
    },
    ansPicker () {
      this.ansShow = true
    },
    // 关闭
    onCancel () {
      this.queshow = false,
      this.ansShow = false
    },
    // 选择当前问题分类值
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.questionTypes = `${value}`
      this.queshow = false
      this.cate_id = index + 1
      this.page = 1
      this.listArr = []
      this.expertList()
    },
     // 选择当前问题分类值
    ansConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.answerType = `${value}`
      this.ansShow = false
      this.status = index + 1
      this.page = 1
      this.listArr = []
      this.expertList()
    },
    // 跳转公示详情
    searchpuhlic (a,b) {
      console.log(b)   //id
      if (a == null) {
        this.$router.push(`/unanswer/${b}`)
      } else {
        this.$router.push(`/publicityd/${b}`)
      }
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
          this.expertList()
        } else {
          this.$toast('无更多数据')
        }
      }
    },
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.getCateList()
    this.expertList()
  },
  beforeDestroy () {
    // console.log('取消监听')
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="less">
  .special_top{
    width: 100%;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    padding: 10px 30px;
    border-bottom: 1px solid #d9d9d9;
    font-size: 15px;
    z-index: 1111;
    span{
      border: 1px solid #d9d9d9;
      padding: 10px 0;
      border-radius: 5px;
      color: #666;
      text-align: center;
      position: relative;
      .xialaIcon{
        position: absolute;
        right: 3px;
        font-size: 15px;
        top: 12px;
      }
    }
    .question_type{
      float: left;
      width: 140px;
    }
    .answer_type{
      float: right;
      width: 140px;
    }
  }
  .special_mian{
    padding-top: 65px;
    padding-bottom: 60px;
    .s_main_card{
      border-bottom: 1px solid #d9d9d9;
      padding: 5px 15px;
      .s_main_top{
        // line-height: 20px;
        .s_main_title{
          float: left;
          font-size: 16px;
          width: 75%;
          // background: #ccc;
        }
        .type_text{
          float: right;
          font-size: 14px;
          margin-top: 2px;
          color: #eb622b;
        }
      }
      .s_main_content{
        margin-top: 10px;
        font-size: 15px;
      }
      .s_main_pic{
        margin-top: 10px;
        position: relative;
        .s_pic{
          width: 33%;
          height: 110px;
          float: left;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .pic_text{
          text-align: right;
          bottom: 0;
          right: 0;
          font-size: 14px;
          color: #f00;
        }
      .reward{
        color: #3F51B5;
        font-size: 14px;
        text-align: right;
        margin-top: 10px;
      }
    }
  }
</style>
