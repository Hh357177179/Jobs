<template>
  <div class="checkquery">
    <div class="check_main" v-for="(item, index) in chechObj" :key="index">
        <!-- <p class="check_title">{{item.}}</p> -->
      <div class="check_content">
        <p class="check_small_title">质疑内容与原因：</p>
        <div class="check_detail">{{item.reason}}</div>
        <p class="check_small_title" style="margin-top:10px;">建议修改为：</p>
        <div class="check_detail">{{item.suggest}}</div>
      </div>
      <!-- <div class="check_pic">
        <img src="../../assets/image/demo.jpg" alt="">
      </div> -->
    </div>
  </div>
</template>

<script>
import { distrustList } from '../../api/api.js'
export default {
  data () {
    return {
      chechObj: []
    }
  },
  methods: {
    getDtail () {
      let params = {
        answer_id: this.$route.params.id
      }
      distrustList(params).then(res => {
        console.log(res)
        this.chechObj = res
      })
    }
  },
  mounted () {
    this.getDtail()
  }
}
</script>


<style lang="less">
  .checkquery{
    padding: 0 20px;
    .check_main{
      padding: 15px 0;
      border-bottom: 1px solid #d9d9d9;
      .check_title{
        font-size: 17px;
        font-weight: bold;
      }
      .check_content{
        font-size: 15px;
        margin-top: 10px;
        .check_small_title{
          font-size: 15px;
          color: #333;
        }
        .check_detail{
          color: #666;
        }
      }
      .check_pic{
        margin-top: 5px;
        width: 180px;
        height: 120px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
