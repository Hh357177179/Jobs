<template>
  <div class="history">
    <p class="history_title">我是标题</p>
    <p class="history_text">历史版本</p>
    <div class="history_list">
      <p class="list_title clearfix">
        <span class="update_time">更新时间</span>
        <span class="update_personal">内容修改人</span>
        <span class="update_reason">修改原因</span>
      </p>
      <p class="list_main clearfix" @click="someOne">
        <span class="list_time">2018-09-23 10:33</span>
        <span class="list_name">王小二</span>
        <span class="list_cause">修改错修改错别字别字</span>
      </p>
      <p class="list_main clearfix">
        <span class="list_time">2018-09-23 10:33</span>
        <span class="list_name">王小二</span>
        <span class="list_cause">修改错修改错别字别字</span>
      </p>
      <p class="list_main clearfix">
        <span class="list_time">2018-09-23 10:33</span>
        <span class="list_name">王小二</span>
        <span class="list_cause">修改错修改错别字别字</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    // 跳转某一个历史版本
    someOne () {
      this.$router.push('/someone')
    }
  }
}
</script>

<style lang="less">
  .history {
    padding: 20px 0 0 0;
    .history_title{
      font-size: 17px;
      font-weight: bold;
      padding: 0 15px;
    }
    .history_text{
      font-size: 14px;
      color: #666;
      margin-top: 5px;
      padding: 0 15px;
    }
    .list_title{
      margin-top: 20px;
      font-size: 15px;
      text-align: center;
      padding: 0 15px;
      .update_time{
        float: left;
        text-align: left;
        width: 38%;
      }
      .update_personal{
        float: left;
        width: 28%;
      }
      .update_reason{
        float: left;
        width: 34%;
        text-align: center;
      }
    }
    .list_main{
      color: #666;
      padding: 0 15px;
      font-size: 14px;
      border-bottom: 1px solid #d9d9d9;
      .list_time{
        float: left;
        width: 38%;
        line-height: 50px;
        font-family: "微软雅黑";
      }
      .list_name{
        float: left;
        text-align: center;
        line-height: 50px;
        width: 28%;
      }
      .list_cause{
        float: left;
        line-height: 50px;
        text-align: center;
        width: 34%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    
  }
</style>
