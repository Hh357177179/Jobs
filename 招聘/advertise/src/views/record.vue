<template>
  <div class="record">
    <div class="big_title">您的工作时长是？</div>
    <div class="time_main">
      <div class="time_card" @click="checkedItem(index)" :class="{active:index == isActive}" v-for="(item,index) in jobArr" :key="index">{{item}}</div>
    </div>
    <div class="big_title">您的职位是？</div>
    <div class="choose_job" @click="chooseJob">{{jobText}}</div>
    <div class="big_title">您的之前工作单位是？</div>
    <div class="last_job">
      <input type="text" v-model="danwei">
    </div>
    <div class="page_num">2/6</div>
    <div class="true_btn" @click="subTrue">确认</div>
    <!-- 职位 -->
    <van-popup v-model="chooseJobShow" position="bottom" style="font-size: 20px;">
      <van-picker show-toolbar title="工作职位" :columns="jobColums" @cancel="onCancel" @confirm="jobConfirm" />
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      danwei: '',
      gongzuoshichang: '',
      zhiwei: '',
      isActive: -1,
      jobArr: ['0-1年', '1-3年', '3-5年', '5年以上'],
      jobText: '请选择工作职位',
      chooseJobShow: false,
      jobColums: ['出纳', '核算会计', '管理会计', '财务主管', '财务经理', '财务总监', 'CFO'],
    }
  },
  methods: {
    subTrue () {
      if (this.gongzuoshichang == '') {
        this.$toast('请选择工作年限')
      } else if (this.zhiwei == '') {
        this.$toast('请选择工作职位')
      } else if (this.danwei == '') {
        this.$toast('请填写之前单位')
      } else {
        sessionStorage.setItem('gongzuoshichang', this.gongzuoshichang)
        sessionStorage.setItem('zhiwei', this.zhiwei)
        sessionStorage.setItem('danwei', this.danwei)
        this.$router.push('/skill')
      }
    },
    checkedItem (index) {
      this.isActive = index;
      this.gongzuoshichang = this.jobArr[index]
    },
    jobConfirm (value, index) {
      // console.log('职位',value)
      this.chooseJobShow = false
      this.jobText = value
      this.zhiwei = value
    },
    onCancel () {
      this.chooseJobShow = false
    },
    chooseJob () {
      this.chooseJobShow = true
    }
  }
}
</script>

<style lang="less">
  .record{
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
    .time_main{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 20px;
      .time_card{
        width: 130px;
        height: 100px;
        background: #f0f0f0;
        color: #333;
        font-size: 15px;
        line-height: 100px;
        margin-top: 20px;
        text-align: center;
      }
    }
    .choose_job{
      font-size: 15px;
      width: 150px;
      height: 40px;
      line-height: 43px;
      border: 1px solid #eee;
      text-align: center;
      margin-top: 10px;
      border-radius: 5px;
      color: #333;
      margin-bottom: 20px;
    }
    .last_job{
      border-bottom: 1px solid #eee;
      margin-top: 10px;
      font-size: 15px;
      color: #333;
      input{
        width: 100%;
        height: 30px;
        padding-left: 20px;
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
