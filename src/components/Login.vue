<template>
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input auto-complete="off" placeholder="账号"
                type="text" v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input auto-complete="off" placeholder="密码"
                type="password" v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" label-position="left"
                 v-model="checked">记住密码
    </el-checkbox>
    <el-form-item style="width: 100%">
      <el-button @click="submitClick" style="width: 100%" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {userLogin} from '@/api/login'

  export default {
    data() {
      return {
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'admin',
          password: '123'
        },
        loading: false
      }
    },
    methods: {
      submitClick: function () {
        var _this = this;
        this.loading = true;
        userLogin({
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then(resp => {
          _this.loading = false
          if (resp && resp.status == 200) {
            var data = resp.data
            _this.$store.commit('login', data.obj)
            var path = _this.$route.query.redirect
            _this.$router
              .replace({path: path == '/' || path == undefined ? '/home' : path})
          }
        })
      }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
