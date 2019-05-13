<template>
  <div class="direction">
    <div class="big_title">您的专业类别更贴近于哪一个方向？</div>
    <div class="choose_main">
      <ul class="main_ul">
        <li @click="checkedItem(index)" :class="{active:index == isActive}" v-for='(item,index) in arr' :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="page_num">1/6</div>
    <div class="true_btn" @click="rNext">确认</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fangxiang: '',
      isActive: -1,
      arr: [
        '会计',
        '会计与统计核算',
        '财务管理',
        '会计与审计',
        '会计电算化',
        '审计实务',
        '财务信息管理',
        '统计实务'
      ]
    }
  },
  methods: {
    checkedItem(index){
      // console.log(this.arr[index])
      this.isActive = index;
      this.fangxiang = this.arr[index]
    },
    rNext () {
      // console.log(this.fangxiang)
      if (this.isActive != -1) {
        sessionStorage.setItem('fangxiang', this.fangxiang)
        this.$router.push('/record')
      } else {
        this.$toast('请选择方向')
      }
    }
  }
}
</script>

<style lang="less">
  .direction{
    padding:20px 30px;
    .big_title{
      height: 40px;
      line-height: 45px;
      font-size: 15px;
      color: #fff;
      background: #eb622b;
      text-align: center;
      border-radius: 6px;
    }
    .choose_main{
      .main_ul{
        li{
          margin-top: 20px;
          height: 35px;
          font-size: 14px;
          line-height: 38px;
          color: #333;
          background: #f0f0f0;
          text-align: center;
        }
      }
    }
    .page_num{
      color: #ccc;
      font-size: 14px;
      text-align: center;
      margin-top: 20px;
    }
    .true_btn{
      font-size: 15px;
      color: #fff;
      background: #eb622b;
      width: 100px;
      text-align: center;
      border-radius: 6px;
      height: 40px;
      line-height: 40px;
      margin: 30px auto 0;
    }
    .active{
      color: #fff !important;
      background: #4FB8F2 !important;
    }
  }
  
</style>

