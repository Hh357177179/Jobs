<template>
  <div class="login">
    <div class="top_title">EHS互助问答库</div>
    <div class="login_input">
      <input v-model="username" type="number" placeholder="请输入手机号码">
    </div>
    <div class="login_input">
      <input v-model="password" type="password" placeholder="请输入密码">
    </div>
    <div class="login_btn" @click="loginBtn">登录</div>
  </div>
</template>

<script>
import { Login } from '../../api/api.js'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginBtn () {
      if (this.username == '') {
        this.$toast('请输入手机号')
      } else if (this.password == '') {
        this.$toast('请输入密码')
      } else {
        let params = {
          username: this.username,
          password: this.password
        }
        // console.log(params)
        Login(params).then(res => {
          console.log(123,res)
          let userInfo = JSON.stringify(res)
          localStorage.setItem('token',userInfo)
          this.$router.push('/')
        })
      }
    }
  }
}
</script>

<style lang="less">
  .login{
    border: 1px solid rgba(0,0,0,0);
    .top_title{
      font-size: 20px;
      color: #333;
      text-align: center;
      margin-top: 40px;
    }
    .login_input{
      padding: 0 20px;
      height: 50px;
      margin-top: 30px;
      input{
        border-bottom: 1px solid #f0f0f0;
        width: 100%;
        height: 100%;
        padding-left: 20px;
        font-size: 14px;
      }
    }
    .login_btn{
      width: 100px;
      padding: 10px 0;
      font-size: 16px;
      color: #fff;
      margin: 40px auto 0;
      background: #eb622b;
      text-align: center;
      border-radius: 5px;
    }
  }
</style>
