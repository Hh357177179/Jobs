<template>
  <div class="skill">
    <div class="big_title">您拥有哪些专业技能？</div>
    <div class="choose_main">
      <ul class="main_ul">
        <li @click="clickLi1" data-index="1" :class="{active: isActive1}" ref="li1">熟悉核算对账保管复核</li>
        <li @click="clickLi2" data-index="2" :class="{active: isActive2}" ref="li2">通晓税务法规申报</li>
        <li @click="clickLi3" data-index="3" :class="{active: isActive3}" ref="li3">熟悉银行结算方式</li>
        <li @click="clickLi4" data-index="4" :class="{active: isActive4}" ref="li4">熟练应用办公软件</li>
        <li @click="clickLi5" data-index="5" :class="{active: isActive5}" ref="li5">熟悉财务管理全流程</li>
        <li @click="clickLi6" data-index="6" :class="{active: isActive6}" ref="li6">熟练进行账务处理</li>
        <li @click="clickLi7" data-index="7" :class="{active: isActive7}" ref="li7">参与过财务策划，团队合规性改造，资本运营</li>
        <li @click="clickLi8" data-index="8" :class="{active: isActive8}" ref="li8">具有较强的沟通能力和团队管理能力</li>
      </ul>
    </div>
    <div class="page_num">3/6</div>
    <div class="true_btn" @click="subTrue">确认</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      jineng: '',
      isActive1: 0,
      isActive2: 0,
      isActive3: 0,
      isActive4: 0,
      isActive5: 0,
      isActive6: 0,
      isActive7: 0,
      isActive8: 0,
      chooseArr: []
    }
  },
  methods: {
    clickLi1 (e) {
      if (this.isActive1 == 0) {
        this.isActive1 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li1.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li1.innerHTML)
        console.log(arrs)
        this.chooseArr.splice(arrs, 1)
        this.isActive1 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi2 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive2 == 0) {
        this.isActive2 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li2.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li2.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive2 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi3 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive3 == 0) {
        this.isActive3 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li3.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li3.innerHTML)
        console.log(arrs)
        this.chooseArr.splice(arrs, 1)
        this.isActive3 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi4 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive4 == 0) {
        this.isActive4 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li4.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li4.innerHTML)
        console.log(arrs)
        this.chooseArr.splice(arrs, 1)
        this.isActive4 = 0
      }
    },
    clickLi5 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive5 == 0) {
        this.isActive5 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li5.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li5.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive5 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi6 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive6 == 0) {
        this.isActive6 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li6.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li6.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive6 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi7 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive7 == 0) {
        this.isActive7 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li7.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li7.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive7 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi8 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive8 == 0) {
        this.isActive8 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li8.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li8.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive8 = 0
      }
      console.log(this.chooseArr)
    },
    subTrue () {
      if (this.chooseArr.length == 0) {
        this.$toast('请选择技能')
      } else {
        let str = this.chooseArr.join(',')
        sessionStorage.setItem('jineng', str)
        this.$router.push('/refining')
      }
    }
  }
}
</script>

<style lang="less">
  .skill{
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
