<template>
  <div class="home">
    <div class="home_top clearfix">
      <div class="top_list" @click="chooseDir">{{directionText}}</div>
      <div class="top_list" @click="workTime">{{workTimeText}}</div>
      <div class="top_list" @click="chooseJob">{{jobText}}</div>
    </div>
    <div class="reset_btn" @click="resetBtn">
      <img src="../assets/img/refresh.png" alt="">
    </div>
    <div class="card_main">
      <div class="card_list" v-for="(item, index) in listArr" :key="index">
        <div class="nameJob"><span class="labelColor">姓名：</span>{{item.name}}</div>
        <div class="yearJob"><span class="labelColor">工作年限：</span>{{item.gongzuoshichang}}</div>
        <div class="powerkeyword clearfix">
          <p style="float: left;" class="labelColor">能力关键词：</p>
          <span class="powerCard" v-for="(items, nums) in item.zhuanyejineng" :key="nums">{{items}}</span>
          <!-- <span class="powerCard">关键词2</span>
          <span class="powerCard">关键词3</span>
          <span class="powerCard">关键词4</span> -->
        </div>
        <div class="character"><span class="labelColor">TA的性格是：</span>{{item.xingge}}</div>
        <div class="character"><span class="labelColor">工作照：</span>
          <p class="workPic" v-if="item.picurl != ''">
            <img :src="item.picurl" alt="">
          </p>
        </div>
        <div class="contactUs clearfix">
          <a :href="item.phone" class="clearfix">
            <p style="float:right;" class="clearfix">
              <img src="../assets/img/tel.png" alt="">
              <span>联系TA</span>
            </p>
          </a>
        </div>
      </div>
    </div>
    <!-- 方向 -->
    <van-popup v-model="directionShow" position="bottom" style="font-size: 20px;">
      <van-picker show-toolbar title="专业方向" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
    <!-- 时间 -->
    <van-popup v-model="workTimeShow" position="bottom" style="font-size: 20px;">
      <van-picker show-toolbar title="工作时长" :columns="timeColums" @cancel="onCancel" @confirm="timeConfirm" />
    </van-popup>
    <!-- 职位 -->
    <van-popup v-model="chooseJobShow" position="bottom" style="font-size: 20px;">
      <van-picker show-toolbar title="工作职位" :columns="jobColums" @cancel="onCancel" @confirm="jobConfirm" />
    </van-popup>
  </div>
</template>

<script>
import { recruitList } from '../api/api.js'
export default {
  data () {
    return {
      listArr: [],
      directionShow: false,
      workTimeShow: false,
      chooseJobShow: false,
      columns: ['会计', '会计与统计核算', '财务管理', '会计与审计', '会计电算化', '审计实务', '财务信息管理', '统计实务'],
      timeColums: ['0-1年', '1-3年', '3-5年', '5年以上'],
      jobColums: ['出纳', '核算会计', '管理会计', '财务主管', '财务经理', '财务总监', 'CFO'],
      directionText: '请选择方向',
      workTimeText: '请选择工作时长',
      jobText: '请选择工作职位',
      fangxiang: '',
      gongzuoshichang: '',
      zhiwei: '',
      page: 1,
      pagesize: 10,
      counts: ''
    }
  },
  methods: {
    resetBtn () {
       this.directionText = '请选择方向'
       this.workTimeText = '请选择工作时长'
       this.jobText = '请选择工作职位'
       this.fangxiang = ''
       this.gongzuoshichang = ''
       this.zhiwei = ''
       this.page = 1
       this.listArr = []
       this.getList()
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
          this.getList()
        } else {
          this.$toast('无更多数据')
        }
      }
    },
    // 获取列表
    getList () {
      let params = {
        fangxiang: this.fangxiang,
        gongzuoshichang: this.gongzuoshichang,
        zhiwei: this.zhiwei,
        page: this.page,
        pagesize: this.pagesize
      }
      recruitList(params).then(res => {
        console.log(res)
        for (var i = 0,len = res.list.length; i < len; i++) {
          if (res.list[i].zhuanyejineng != '') {
            res.list[i].zhuanyejineng = res.list[i].zhuanyejineng.split(',')
          }
          if (res.list[i].phone != '') {
            res.list[i].phone = `tel:${res.list[i].phone}`
          }
          if (res.list[i].picurl != '') {
            res.list[i].picurl = `http://zhaopin.zhaodaka.vip${res.list[i].picurl}`
          }
        }
        this.listArr = this.listArr.concat(res.list)
        this.counts = res.count
      })
    },
     onConfirm(value, index) {
       console.log('方向',value, index)
       this.directionShow = false
       this.directionText = value
       this.fangxiang = value
       this.page = 1
       this.listArr = []
       this.getList()
    },
    timeConfirm (value, index) {
      console.log('时间',value, index)
      this.workTimeShow = false
      this.workTimeText = value
      this.gongzuoshichang = value
      this.page = 1
      this.listArr = []
      this.getList()
    },
    jobConfirm (value, index) {
      console.log('职位',value, index)
      this.chooseJobShow = false
      this.jobText = value
      this.zhiwei = value
      this.page = 1
      this.listArr = []
      this.getList()
    },
    onCancel () {
      console.log('关闭')
      this.directionShow = false
      this.workTimeShow = false
      this.chooseJobShow = false
    },
    // 选择方向
    chooseDir () {
      this.directionShow = true
    },
    // 选择工作时长
    workTime () {
      this.workTimeShow = true
    },
    chooseJob () {
      this.chooseJobShow = true
    }
  },
  mounted () {
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
  .home{
    width: 100%;
    .home_top{
      height: 49px;
      border-bottom: 1px solid #eee;
      background: #fff;
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 11;
      .top_list{
        width: 33.33%;
        float: left;
        font-size: 14px;
        color: #333;
        text-align: center;
        line-height: 49px;
        border-right: 1px solid #eee;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
      }
      .top_list:nth-last-of-type(1){
        border-right: none;
      }
    }
    .reset_btn{
      width: 75px;
      height: 40px;
      position: fixed;
      bottom: 20px;
      right: 10px;
      background: #fff;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .card_main{
      // padding-top: 50px;
      padding-bottom: 20px;
      .card_list{
        width: 86%;
        margin: 10px auto 0;
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 3px;
        font-size: 14px;
        color: #333;
        // .nameJob{
        //   overflow:hidden;
        //   text-overflow:ellipsis;
        //   white-space:nowrap;
        //   margin-right: 20px;
        // }
        .yearJob{
          // float: left;
          margin-top: 5px;
        }
        .powerkeyword{
          margin-top: 10px;
          .powerCard{
            float: left;
            border: 1px solid #666;
            color: #666;
            margin-right: 10px;
            padding:0 5px;
            margin-bottom: 5px;
            border-radius: 3px;
          }
        }
        .character{
          margin-top: 5px;
          .workPic{
            width: 120px;
            height: 120px;
            margin: 5px auto;
            // background: #ccc;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        .labelColor{
          color: #eb622b;
        }
        .contactUs{
          margin-top: 5px;
          img{
            width: 25px;
            height: 25px;
            float: left;
            margin-right: 5px;
          }
          span{
            float: left;
            line-height: 30px;
          }
        }
      }
    }
  }
</style>
