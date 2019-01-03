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
      <p class="list_main clearfix" @click="someOne(item.id)" v-for="(item, index) in historyList" :key="index">
        <span class="list_time">{{item.create_time | dateFr}}</span>
        <span class="list_name">{{item.user_nickname}}</span>
        <span class="list_cause">{{item.reason}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { history } from '../../api/api.js'
export default {
  data () {
    return {
      historyList: []
    }
  },
  methods: {
    // 跳转某一个历史版本
    someOne (id) {
      this.$router.push(`/someone/${id}`)
    }
  },
  mounted () {
    // let key = JSON.parse(localStorage.getItem('token'))
    let params = {
      question_id: this.$route.params.id
    }
    history(params).then(res => {
      console.log(res)
      this.historyList = res
    })
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
