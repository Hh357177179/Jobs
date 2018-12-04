<template>
  <div class="footTab">
     <ul class="clearfix foot_tab_ul">
      <router-link tag="li" to='/'>
        <p class="tab_img">
          <i class="iconfont icon-wenda"></i>
        </p>
        <p>ESH问答</p>
      </router-link>
      <router-link tag="li" to="/special">
        <p class="tab_img">
           <i class="iconfont icon-pindao"></i>
         </p>
         <p>专家频道</p>
      </router-link>
      <router-link tag="li" to="sendcenter">
         <p class="tab_img">
           <i class="iconfont icon-fasong"></i>
         </p>
         <p>发布中心</p>
      </router-link>
     </ul>
   </div>
</template>

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
    }
  }
  .router-link-exact-active{
    color: #eb622b;
  }
</style>

