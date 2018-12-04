<template>
  <div class="some_one">
    <div class="one_title">这是一个历史版本，哈哈哈哈哈哈哈哈哈哈哈哈哈哈这是一个历史版本，哈哈哈哈哈哈哈哈哈哈</div>
    <div class="one_main">
      <p class="one_tit">这是一个标题</p>
      <p class="one_content">我是内容啊哈哈哈哈哈哈哈哈哈哈我是内容啊哈哈哈哈哈哈哈哈哈哈我是内容啊哈哈哈哈哈哈哈哈哈哈我是内容啊哈哈哈哈哈哈哈哈哈哈我是内容啊哈哈哈哈哈哈哈哈哈哈</p>
      <p class="one_pic">
        <img src="../../assets/image/demo.jpg" alt="">
      </p>
    </div>
    <div class="ans_content">专家回答的内容哈哈哈哈哈啊哈哈哈哈啊哈哈啊哈啊哈啊哈啊哈哈哈啊哈啊哈啊哈啊哈啊哈啊啊啊啊哈阿拉基</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less">
  .some_one{
    width: 100%;
    height: 100%;
    .one_title{
      // position: fixed;
      // left: 0;
      // top: 0;
      padding: 10px;
      font-size: 14px;
      color:#fff;
      background: #eb622b;
    }
    .one_main{
      // padding: 65px 15px 70px;
      border-bottom: 1px solid #d9d9d9;
      margin-top: 10px;
      padding: 0 15px 15px;
      .one_tit{
        font-size: 17px;
        font-weight: bold;
      }
      .one_content{
        margin-top: 5px;
        font-size: 15px;
      }
      .one_pic{
        width: 180px;
        height: 120px;
        margin-top: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .ans_content{
      font-size: 15px;
      padding: 15px;
    }
  }
</style>
