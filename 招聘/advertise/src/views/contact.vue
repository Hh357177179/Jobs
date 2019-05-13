<template>
  <div class="contact">
    <div class="big_title">请留下一些基本信息方便用人单位联系你</div>
    <div class="main_info">
      <div class="info_list">
        <span>您的姓名：</span>
        <input v-model="name" type="text" placeholder="请输入您的姓名">
      </div>
      <div class="info_list">
        <span>您的电话：</span>
        <input v-model="phone" type="text" placeholder="请输入您的电话">
      </div>
      <div class="info_list">
        <span>您的微信：</span>
        <input v-model="wechat" type="text" placeholder="请输入您的微信">
      </div>
      <div class="info_list">
        <span>您的邮箱：</span>
        <input v-model="email" type="text" placeholder="请输入您的邮箱">
      </div>
      <div class="info_list">
        <span>一句话自述：</span>
        <input v-model="about" type="text" placeholder="请输入您的一句话自述">
      </div>
      <div class="upload_pic">
        <i class="iconfont icon-mn_shangchuantupian"></i>
        <span>上传一张工作照</span>
        <input class="uploadPic" type='file' accept="image/*" @change="uploadPics"/>
      </div>
      <div class="showPic">
        <img :src="strPic" alt="">
      </div>
    </div>
    <!-- <div></div> -->
    <div class="page_num">6/6</div>
    <div class="true_btn" @click="subTrue">确认</div>
  </div>
</template>

<script>
import { subPublish, upPic } from '../api/api.js'
export default {
  data () {
    return {
      name: '',
      phone: '',
      wechat: '',
      email: '',
      about: '',
      strPic: '',
      picUrl: ''
    }
  },
  methods: {
    uploadPics (e) {
      console.log(1)
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
      upPic(param).then(res => {
        console.log(res)
        this.picUrl = res
        this.strPic = `http://zhaopin.zhaodaka.vip${res}`
      })
    },
    subTrue () {
      if (this.name == '') {
        this.$toast('请输入姓名')
      } else if (this.phone == '') {
        this.$toast('请输入电话')
      } else if (this.wechat == '') {
        this.$toast('请输入微信')
      } else if (this.email == '') {
        this.$toast('请输入邮箱')
      } else if (this.about == '') {
        this.$toast('请输入自述')
      } else if (this.strPic == '') {
        this.$toast('请上传工作照')
      } else {
        let params = {
          fangxiang: sessionStorage.getItem('fangxiang'),
          gongzuoshichang: sessionStorage.getItem('gongzuoshichang'),
          zhiwei: sessionStorage.getItem('zhiwei'),
          danwei: sessionStorage.getItem('danwei'),
          jineng: sessionStorage.getItem('jineng'),
          zhuanyejineng: sessionStorage.getItem('zhuanyejineng'),
          zhengshu: sessionStorage.getItem('zhengshu'),
          xiangmu: sessionStorage.getItem('xiangmu'),
          xingge: sessionStorage.getItem('xingge'),
          name: this.name,
          phone: this.phone,
          wechat: this.wechat,
          email: this.email,
          about: this.about,
          picurl: this.picUrl
        }
        console.log(params)
        subPublish(params).then(res => {
          sessionStorage.clear()
          // sessionStorage.setItem('fangxiang', '')
          // sessionStorage.setItem('gongzuoshichang', '')
          // sessionStorage.setItem('zhiwei', '')
          // sessionStorage.setItem('danwei', ''),
          // sessionStorage.setItem('jineng', '')
          // sessionStorage.setItem('zhuanyejineng', '')
          // sessionStorage.setItem('zhengshu', '')
          // sessionStorage.setItem('xiangmu', '')
          // sessionStorage.setItem('xingge', '')
          console.log(res)
          this.$toast('提交成功')
          setTimeout(() => {
            this.$router.push('/thank')
          }, 2000)
        })
      }
    }
  }
}
</script>

<style lang="less">
  .contact{
    padding:20px 30px;
    .big_title{
      height: 40px;
      line-height: 45px;
      font-size: 15px;
      color: #fff;
      background: #eb622b;
      text-align: center;
      border-radius: 6px;
    }
    .main_info{
      .info_list{
        margin-top: 40px;
        line-height: 40px;
        font-size: 15px;
        span{
          float: left;
          width: 100px;
        }
        input{
          width: 200px;
          border-bottom: 1px solid #eee;
          padding-left: 20px;
        }
      }
      .upload_pic{
        margin-top: 15px;
        font-size: 15px;
        height: 30px;
        line-height: 30px;
        // color: #666;
        position: relative;
        .iconfont{
          font-size: 20px;
          float: left;
          margin-right: 5px;
        }
        .uploadPic{
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
        }
      }
      .showPic {
        width: 150px;
        height: 150px;
        // background: #ccc;
        border: 1px solid #f0f0f0;
        margin: 10px auto;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .page_num{
      color: #ccc;
      font-size: 14px;
      text-align: center;
      margin-top: 20px;
    }
    .true_btn{
      font-size: 15px;
      color: #fff;
      background: #eb622b;
      width: 100px;
      text-align: center;
      border-radius: 6px;
      height: 40px;
      line-height: 40px;
      margin: 30px auto 0;
    }
  }
</style>
