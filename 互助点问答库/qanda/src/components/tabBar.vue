<template>
  <div class="footTab">
     <ul class="clearfix foot_tab_ul">
      <router-link tag="li" to='/' :class="{ active: isActive }">
        <p class="tab_img">
          <i class="iconfont icon-wenda"></i>
        </p>
        <p>ESH问答</p>
      </router-link>
      <router-link tag="li" to="/special" v-if='showStatus'>
        <p class="tab_img">
           <i class="iconfont icon-pindao"></i>
         </p>
         <p>专家频道</p>
      </router-link>
      <router-link tag="li" to="sendcenter" :class="{ active: isActive }">
         <p class="tab_img">
           <i class="iconfont icon-fasong"></i>
         </p>
         <p>发布中心</p>
      </router-link>
     </ul>
   </div>
</template>

<script>
export default {
  data () {
    return {
      showStatus: false,
      isActive: true
    }
  },
  mounted () {
    let key = JSON.parse(localStorage.getItem('token'))
    if (key.level != 1) {
      this.showStatus = true,
      this.isActive = false
    }
  }
}
</script>


<style lang="less">
  .footTab{
    width: 100%;
    height: 49px;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #DDDDDD;
    background: #fff;
    color: #999999;
    font-size: 11px;
    .foot_tab_ul{
      width: 100%;
      li{
        width: 33.33%;
        float: left;
        text-align: center;
        .tab_img{
          width: 25px;
          height: 25px;
          margin: 3px auto 2px;
          i{
            font-size: 23px;
          }
        }
      }
      .active{
        width: 50%;
      }
    }
  }
  .router-link-exact-active{
    color: #eb622b;
  }
</style>

