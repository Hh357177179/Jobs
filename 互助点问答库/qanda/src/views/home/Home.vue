<template>
  <div class="home">
   <div class="home_top clearfix">
     <div class="home_search"></div>
     <div class="down" @click="routerDown">
      <img src="../../assets/image/downman.png" alt="">
    </div>
   </div>
   <div class="search_history">
     <p class="my_search">我的搜索历史：</p>
     <p class="hislist">离子气枪产生的噪音如何解决？</p>
     <p class="hislist">刚入职的工厂EHS负责人会遇到哪些挑战？</p>
     <p class="hislist">有关EHS人才可持续发展的建议？</p>
   </div>
   <div class="new_answer">
     <p class="answer_title">最新回答</p>
     <div class="list_card" @click="rAnsdetail">
       <div class="card_text">有关EHS人才可持续发展的建议？我是带图片的不需要折行显示，哈哈哈哈哈哈</div>
       <!-- <div class="card_pic"></div> -->
     </div>
     <div class="list_card clearfix">
       <div class="card_left">
         我是带图片的列表，需要做到折行。
       </div>
       <div class="card_pic">
         <img src="../../assets/image/demo.jpg" alt="">
       </div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    // 跳转下载详情
    routerDown () {
      this.$router.push('/down')
    },
    // 跳转详情页
    rAnsdetail () {
      this.$router.push('/adetail')
    }
  }
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
        width: 40px;
        height: 40px;
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
        }
        .card_left{
          font-size: 15px;
          width: 175px;
          float: left;
        }
        .card_pic{
          float: right;
          width: 150px;
          height: 100px;
          background: #ccc;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
