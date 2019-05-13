<template>
  <div class="nature">
    <div class="big_title">您的性格是？（我们只做收集分类）任选三项或以上</div>
    <div class="nature_main">
      <ul class="ul_card">
        <li @click="clickLi1" data-index="1" :class="{active: isActive1}" ref="li1">谨慎的</li>
        <li @click="clickLi2" data-index="2" :class="{active: isActive2}" ref="li2">耐心的</li>
        <li @click="clickLi3" data-index="3" :class="{active: isActive3}" ref="li3">幽默的</li>
        <li @click="clickLi4" data-index="4" :class="{active: isActive4}" ref="li4">果敢的</li>
        <li @click="clickLi5" data-index="5" :class="{active: isActive5}" ref="li5">热心的</li>
        <li @click="clickLi6" data-index="6" :class="{active: isActive6}" ref="li6">平易近人的</li>
        <li @click="clickLi7" data-index="7" :class="{active: isActive7}" ref="li7">腼腆的</li>
        <li @click="clickLi8" data-index="8" :class="{active: isActive8}" ref="li8">稳重的</li>
        <li @click="clickLi9" data-index="9" :class="{active: isActive9}" ref="li9">感性的</li>
        <li @click="clickLi10" data-index="10" :class="{active: isActive10}" ref="li10">理性的</li>
        <li @click="clickLi11" data-index="11" :class="{active: isActive11}" ref="li11">灵活的</li>
        <li @click="clickLi12" data-index="12" :class="{active: isActive12}" ref="li12">富有创造力</li>
        <li @click="clickLi13" data-index="13" :class="{active: isActive13}" ref="li13">内敛的</li>
        <li @click="clickLi14" data-index="14" :class="{active: isActive14}" ref="li14">擅长交际的</li>
        <li @click="clickLi15" data-index="15" :class="{active: isActive15}" ref="li15">忠诚的</li>
        <li @click="clickLi16" data-index="16" :class="{active: isActive16}" ref="li16">原则性强的</li>
      </ul>
    </div>
    <div class="page_num">5/6</div>
    <div class="true_btn" @click="subTrue">确认</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive1: 0,
      isActive2: 0,
      isActive3: 0,
      isActive4: 0,
      isActive5: 0,
      isActive6: 0,
      isActive7: 0,
      isActive8: 0,
      isActive9: 0,
      isActive10: 0,
      isActive11: 0,
      isActive12: 0,
      isActive13: 0,
      isActive14: 0,
      isActive15: 0,
      isActive16: 0,
      chooseArr: []
    }
  },
  methods: {
    clickLi1 (e) {
      console.log(e.target.dataset.index)
      console.log(this.$refs.li1.innerHTML)
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
    clickLi9 (e) {
      console.log(e.target.dataset.index)
     if (this.isActive9 == 0) {
        this.isActive9 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li9.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li9.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive9 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi10 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive10 == 0) {
        this.isActive10 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li10.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li10.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive10 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi11 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive11 == 0) {
        this.isActive11 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li11.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li11.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive11 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi12 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive12 == 0) {
        this.isActive12 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li12.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li12.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive12 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi13 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive13 == 0) {
        this.isActive13 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li13.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li13.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive13 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi14 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive14 == 0) {
        this.isActive14 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li14.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li14.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive14 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi15 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive15 == 0) {
        this.isActive15 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li15.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li15.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive15 = 0
      }
      console.log(this.chooseArr)
    },
    clickLi16 (e) {
      console.log(e.target.dataset.index)
      if (this.isActive16 == 0) {
        this.isActive16 = e.target.dataset.index
        this.chooseArr = this.chooseArr.concat(this.$refs.li16.innerHTML)
      } else {
        let arrs = this.chooseArr.findIndex(x => x == this.$refs.li16.innerHTML)
        this.chooseArr.splice(arrs, 1)
        this.isActive16 = 0
      }
      console.log(this.chooseArr)
    },
    subTrue () {
      if (this.chooseArr.length < 3) {
        this.$toast('请选择三个或三个以上')
      } else {
        let xg = this.chooseArr.join(',')
        sessionStorage.setItem('xingge', xg)
        this.$router.push('/contact')
      }
    }
  }
}
</script>

<style lang="less">
  .nature{
    padding:20px 10px;
    .big_title{
      // width: 330px;
      height: 40px;
      line-height: 45px;
      font-size: 15px;
      color: #fff;
      background: #eb622b;
      text-align: center;
      border-radius: 6px;
      margin: 0 auto;
    }
    .nature_main{
      margin-top: 20px;
      .ul_card{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          width: 80px;
          height: 50px;
          font-size: 14px;
          color: #333;
          background: #f0f0f0;
          text-align: center;
          margin-top: 20px;
          line-height: 50px;
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
