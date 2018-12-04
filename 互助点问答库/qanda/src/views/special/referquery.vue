<template>
  <div class="referquery">
    <div class="refer_answer">
      <div class="refer_content">专家回答内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>  
      <div class="refer_pic">
        <img src="../../assets/image/demo.jpg" alt="">
      </div>
      <div class="refer_download">
        <i class="iconfont icon-xiazai"></i>
        <span>查看回答相关附件</span>
      </div>
    </div>
    <div class="refer_submit">
      <div class="sub_content">
        <p>质疑内容与原因：</p>
        <p class="sub_text">
          <textarea placeholder="请输入质疑内容和原因"></textarea>
        </p>
      </div>
      <div class="sub_content">
        <p>建议修改为：</p>
        <p class="sub_text">
          <textarea placeholder="请输入质疑内容和原因"></textarea>
        </p>
      </div>
    </div>
    <p class="botText">（您的质疑受到认同后问答将重新公示）</p>
  </div>
</template>

<style lang="less">
  .referquery{
    padding: 15px 20px;
    .refer_answer{
      padding-bottom: 10px;
      border-bottom: 1px solid #d9d9d9;
      .refer_content{
        font-size: 15px;
      }
      .refer_pic{
        margin-top: 10px;
        width: 180px;
        height: 120px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .refer_download{
        margin-top: 5px;
        padding: 10px 0 0;
        font-size: 14px;
        color: #666;
        i{
          margin-right: 5px;
        }
      }
    }
    .refer_submit{
      margin-top: 15px;
      font-size: 15px;
      .sub_content{
        margin-top: 20px;
        .sub_text{
          margin-top: 5px;
          height: 150px;
          border: 1px solid #d9d9d9;
          border-radius: 5px;
          textarea{
            width: 100%;
            height: 100%;
            padding: 5px;
            resize: none;
            border:none;
          }
        }
      }
    }
    .botText{
      font-size: 0.37333rem;
      color: #eb622b;
      text-align: center;
      margin-top: 0.4rem;
    }
  }
</style>
