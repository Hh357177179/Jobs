<template>
  <div class="down">
    <div class="down_list clearfix">
      <div class="list_left">
        <p class="list_title">一个问题的标题</p>
        <p class="list_name">附件文件名称</p>
      </div>
      <div class="list_right">打开</div>
    </div>
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
  .down{
    .down_list{
      border-bottom: 1px solid #d9d9d9;
      padding: 10px 20px;
      .list_left{
        float: left;
        .list_title{
          font-size: 16px;
          font-weight: 500;
        }
        .list_name{
          margin-top: 5px;
          font-size: 14px;
        }
      }
      .list_right{
        float: right;
        font-size: 15px;
        padding: 13px 0 13px 20px;
      }
    }
  }
</style>

