<template>
  <div class="checkquery">
    <div class="check_main">
      <p class="check_title">我是一个标题</p>
      <div class="check_content">

      </div>
      <!-- <div class="check_pic">
        <img src="../../assets/image/demo.jpg" alt="">
      </div> -->
    </div>
  </div>
</template>

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
        margin-top: 5px;
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
