<template>
  <div class="tabBar">
    <ul class="link_route">
      <router-link tag="li" to="/home">
        <p class="iconfont icon-index-copy"></p>
        <p class="labe_text">首页</p>
      </router-link>
      <router-link tag="li" to="/apply">
        <p class="iconfont icon-shenqing"></p>
        <p class="labe_text">申请</p>
      </router-link>
      <router-link tag="li" to="/category">
        <p class="iconfont icon-leibie"></p>
        <p class="labe_text">类别</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
     
    }
  }
}
</script>


<style lang="less">
  .tabBar{
    width: 100%;
    height: 49px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    // background: #ccc;
    border-top: 1px solid #DDDDDD;
    background: #fff;
    color: #999999;
    font-size: 11px;
    .link_route{
      height: 100%;
      display: flex;
      justify-content: space-between;
      li{
        width: 33.33%;
        text-align: center;
        .iconfont{
          font-size: 23px;
          margin-top: 3px;
        }
        .labe_text{
          margin-top: 2px;
        }
        a {
          background: #fff;
        }
      }
    }
  }
  .router-link-active{
    color: #eb622b;
  }
</style>
