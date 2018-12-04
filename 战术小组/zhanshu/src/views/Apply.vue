<template>
  <div class="apply">
    <div class="apply_list clearfix">
      <p class="apply_left clearfix">
        <span class="al_icon iconfont icon-mingcheng"></span>
        <i class="al_import">*</i>
        <span class="al_label">名称</span>
      </p>
      <p class="apply_right">
        <input type="text" v-model="title" placeholder="请输入名称">
      </p>
    </div>
    <div class="apply_list clearfix">
      <p class="apply_left clearfix">
        <span class="al_icon iconfont icon-fuzeren"></span>
        <i class="al_import">*</i>
        <span class="al_label">组长</span>
      </p>
      <p class="apply_right">
        <input type="text" v-model="person" placeholder="请输入组长姓名">
      </p>
    </div>
    <div class="apply_list clearfix">
      <p class="apply_left clearfix">
        <span class="al_icon iconfont icon-shouji"></span>
        <i class="al_unimport">*</i>
        <span class="al_label">手机号</span>
      </p>
      <p class="apply_right">
        <input type="number" v-model="phone" placeholder="请输入手机号">
      </p>
    </div>
    <div class="apply_list clearfix">
      <p class="apply_left clearfix">
        <span class="al_icon iconfont icon-weixin1"></span>
        <i class="al_unimport">*</i>
        <span class="al_label">微信号</span>
      </p>
      <p class="apply_right">
        <input type="text" v-model="wechat" placeholder="请输入微信号">
      </p>
    </div>
    <div class="apply_list clearfix">
      <p class="apply_left clearfix">
        <span class="al_icon iconfont icon-dizhi"></span>
        <i class="al_unimport">*</i>
        <span class="al_label">所在地</span>
      </p>
      <p class="apply_right">
        <input type="text" v-model="address" placeholder="请输入所在城市">
      </p>
    </div>
    <!-- <div class="apply_list clearfix">
      <p class="apply_left clearfix">
        <span class="al_icon iconfont icon-baojia"></span>
        <i class="al_unimport">*</i>
        <span class="al_label">报价</span>
      </p>
      <p class="apply_right">
        <input type="number" v-model="money" placeholder="请输入报价">
      </p>
    </div> -->
    <div class="apply_area clearfix">
      <p class="apply_left clearfix">
        <span class="al_icon iconfont icon-jieshao"></span>
        <i class="al_unimport">*</i>
        <span class="al_label">介绍</span>
      </p>
      <p class="apply_right apply_textarea">
        <textarea placeholder="请输入介绍" v-model="info"></textarea>
      </p>
    </div>
    <div class="submit_apply" @click="subApply">申请战术小组</div>
  </div>
</template>

<script>
import { Apply } from '../api/api.js'
import { myMixin } from '../mixin/myMixin.js'
export default {
  mixins: [myMixin],
  data () {
    return {
      title: '',
      person: '',
      phone: '',
      wechat: '',
      address: '',
      money: '',
      info: ''
    }
  },
  methods: {
    subApply () {
      if (this.verifyName(this.title) == true && this.verifyPerson(this.person) == true) {
        // console.log(params)
        let param = {
          title: this.title,
          person: this.person,
          phone: this.phone,
          wechat: this.wechat,
          address: this.address,
          money: this.money,
          info: this.info
        }
        Apply(param).then(res => {
          // console.log(res)
          this.showToast('申请成功，请等待审核')
          this.title = ''
          this.person = ''
          this.phone = ''
          this.wechat = ''
          this.address = ''
          this.money = ''
          this.info = ''
        })
      }
    }
  }
}
</script>

<style lang="less">
  .apply{
    padding: 20px 30px 10px;
    .apply_list{
      margin-bottom: 20px;
      height: 40px;
      line-height: 40px;
      .apply_left{
        width: 90px;
        float: left;
        color: #666;
        .al_icon{
          font-size: 20px;
          margin-right: 8px;
          float: left;
          color: #eb622b;
        }
        .al_import{
          color:#f00;
          float: left;
        }
        .al_unimport{
          color: #fff;
          float: left;
        }
        .al_label{
          font-size: 15px;
          float: left;
        }
      }
      .apply_right{
        float: left;
        width: 70%;
        border-bottom: 1px solid #f0f0f0;
        input{
          font-size: 15px;
          padding-left: 10px;
          width: 100%;
          -webkit-appearance:none; /*去除input默认样式*/
          -webkit-tap-highlight-color:rgba(0, 0, 0, 0); /*去除点击高亮的颜色*/
          font-family: "微软雅黑";
        }
      }
      .apply_textarea{
        border: none;
        border:1px solid #f0f0f0;
        height: 120px;
        textarea{
          outline: none;
          resize: none;
          font-size: 15px;
          padding: 8px 5px;
        }
      }
    }
    .apply_area{
      .apply_left{
        margin-top: 10px;
        width: 90px;
        float: left;
        color: #666;
        .al_icon{
          font-size: 20px;
          margin-right: 8px;
          float: left;
          color: #eb622b;
        }
        .al_import{
          color:#f00;
          float: left;
        }
        .al_unimport{
          color: #fff;
          float: left;
        }
        .al_label{
          font-size: 15px;
          float: left;
        }
      }
      .apply_textarea{
        float: left;
        width: 70%;
        border: none;
        border:1px solid #f0f0f0;
        height: 120px;
        textarea{
          border: none;
          outline: none;
          resize: none;
          font-size: 15px;
          padding: 8px 5px;
          width: 100%;
          height: 100%;
          -webkit-appearance:none; /*去除input默认样式*/
          -webkit-tap-highlight-color:rgba(0, 0, 0, 0); /*去除点击高亮的颜色*/
        }
      }
    }
    .submit_apply{
      width: 120px;
      height: 35px;
      text-align: center;
      line-height: 40px;
      font-size: 15px;
      border-radius: 5px;
      background: #eb622b;
      color: #fff;
      margin: 30px auto 60px;
    }
  }
</style>
