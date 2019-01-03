<template>
  <div class="send_center clearfix">
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
    <div class="picArr">
      <ul class="clearfix">
        <li v-for="(item, index) in picArr" :key="index">
          <img :src='item' alt="">
        </li>
      </ul>
    </div>
    <div class="clearfix">
      <div class="upload" v-if="showUpload">
        <i class="iconfont icon-mn_shangchuantupian uploadIcon"></i>
        <input class="uploadPic" type='file' accept="image/*" @change="update"/>
      </div>
      <div class="choosePic" v-if="showUpload">(可选)</div>
    </div>
    <div class="send_list clearfix" style="margin-top:20px;">
      <span class="send_label">悬赏：</span>
      <input v-model="score" class="send_input" type="text" placeholder="请输入悬赏EHS互助点数量">
    </div>
    <div class="subBtn" @click="subBtn">提交</div>
    <van-popup v-model="queshow" position="bottom" style="font-size: 20px;">
      <van-picker show-toolbar title="请选择分类" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
import { cateList, upLoad, publish } from '@/api/api.js'
import Ax from '../../api/api.js'
export default {
  data () {
    return {
      title: '',
      content: '',
      columns: [],
      queshow: false,
      chooseText: '请选择分类',
      cate_id: '',
      picurl: '',
      picArr: [],
      showUpload: true,
      score: ''
    }
  },
  methods: {
    // 提交
    subBtn () {
      let token = JSON.parse(localStorage.getItem('token'))
      if (this.title == '') {
        this.$toast('请填写标题')
      } else if (this.content == '') {
        this.$toast('请填写内容')
      } else if (this.cate_id == '') {
        this.$toast('请选择分类')
      } else {
        let params = {
          token: token.token,
          cate_id: this.cate_id,
          title: this.title,
          content: this.content,
          picurl: this.picArr.join('|'),
          score: this.score * 1000
        }
        console.log(params)
        publish(params).then(res => {
          console.log(res)
          this.$toast('发布成功！')
          setTimeout(() => {
            this.$router.push('/special')
          }, 2000)
        })
      }
    },
    // 点击显示prop
    choType () {
      this.queshow = true
    },
    update (e) {
      let file = e.target.files[0]
      let param = new FormData() // 创建form对象
        param.append('file', file, file.name) // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      upLoad(param).then(res => {
        console.log(res)
        // this.picurl = res
        this.picArr = this.picArr.concat(`http://huzhudian.zhaodaka.net${res}`)
        console.log(this.picArr.join('|'))
        if (this.picArr.length == 9) {
          this.showUpload = false
        }
      })
    },

    // 获取分类
    getCateList () {
      cateList().then(res => {
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
    padding-bottom: 100px;
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
    .picArr{
      width: 100%;
      ul{
        li {
          width: 100px;
          height: 100px;
          margin-top: 10px;
          float: left;
          margin-right: 10px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .upload{
      width: 100px;
      height: 100px;
      border: 1px solid #f0f0f0;
      margin-top: 20px;
      float: left;
      .uploadIcon{
        position: absolute;
        font-size: 40px;
        color: #ccc;
        width: 100px;
        height: 100px;
        background: rgba(0,0,0,0);
        text-align: center;
        line-height: 100px;
      }
      .uploadPic{
        width: 100px;
        height: 100px;
        position: absolute;
        z-index: 12;
        opacity: 0;
      }
    }
    .choosePic{
      float: left;
      margin-top: 100px;
      font-size: 13px;
      color: #ccc;
      margin-left: 20px;
    }
    .subBtn{
      width: 120px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      text-align: center;
      background: #259B24;
      font-size: 14px;
      margin: 0 auto;
      border-radius: 5px;
    }
  }
</style>

