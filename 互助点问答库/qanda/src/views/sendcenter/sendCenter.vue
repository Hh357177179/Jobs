<template>
  <div class="send_center">
    <div class="send_list clearfix">
      <span class="send_label">标题：</span>
      <input v-model="title" class="send_input" type="text" placeholder="请输入标题">
    </div>
    <div class="send_content clearfix">
      <span class="send_content_lab">内容：</span>
      <textarea v-model="content" placeholder="请输入内容"></textarea>
    </div>
    <div class="classify">
      <span class="classify_label">分类：</span>
      <span class="choose_classify" @click="choType">{{chooseText}}</span>
    </div>
    <div class="upload">
      
    </div>
    <div class="choosePic">(可选)</div>
     
    <van-popup v-model="queshow" position="bottom" style="font-size: 20px;">
      <van-picker show-toolbar title="请选择分类" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import { cateList } from '@/api/api.js'
export default {
  data () {
    return {
      title: '',
      content: '',
      columns: [],
      queshow: false,
      chooseText: '请选择分类',
      cate_id: ''
    }
  },
  methods: {
    // 点击显示prop
    choType () {
      this.queshow = true
    },
    onRead(file) {
      console.log(file)
    },

    // 获取分类
    getCateList () {
      cateList().then(res => {
        console.log(res)
        for (let i = 0,len = res.length;i < len; i++) {
          // console.log(res[i].title)
          // this.column = this.column.concat(res[i].title)
          this.columns = this.columns.concat(res[i].title)
        }
      })
    },

    // 取消选择分类
    onCancel () {
      console.log('取消选择分类')
      this.queshow = false
    },
    // 选择分类
    onConfirm (value,index) {
      // console.log('选择分类')
      // console.log(value,index)
      this.chooseText = value
      this.cate_id = index + 1
      this.queshow = false
    }
  },
  mounted () {
    this.getCateList()
  }
}
</script>

<style lang="less">
  .send_center{
    padding: 20px;
    .send_list{
      font-size: 14px;
      margin-bottom: 30px;
      height: 40px;
      .send_label{
        float: left;
        line-height: 40px;
      }
      .send_input{
        float: left;
        height: 100%;
        margin-left: 15px;
        border-bottom: 1px solid #f0f0f0;
        padding-left: 10px;
        width: 260px;
      }
    }
    .send_content{
      font-size: 14px;
      margin-bottom: 30px;
      .send_content_lab{
        float: left;
        margin-top: 10px;
      }
      textarea{
        float: left;
        resize: none;
        width: 260px;
        height: 150px;
        border-radius: 5px;
        border: 1px solid #f0f0f0;
        margin-left: 15px;
        padding: 10px;
      }
    }
    .classify{
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      .classify_label{
        float: left;
      }
      .choose_classify{
        float: left;
        margin-left: 15px;
        border: 1px solid #f0f0f0;
        border-radius: 5px;
        height: 100%;
        width: 150px;
        text-align: center;
      }
    }
    .upload{
      width: 130px;
      height: 130px;
      border: 1px solid #f0f0f0;
      margin-top: 20px;
      float: left;
    }
    .choosePic{
      float: left;
      margin-top: 130px;
      font-size: 13px;
      color: #ccc;
      margin-left: 20px;
    }
  }
</style>

