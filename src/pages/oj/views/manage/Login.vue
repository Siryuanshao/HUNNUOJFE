<template>
  <div class="login-card">
    <div style="background-color: #ffffff; padding: 20px;">
      <img src="../../../../assets/animation/satanichia.jpg" style="height: 325px; float: left; border-radius: 4px;"/>
      <div class="login-card-box">
        <h1 style="margin-bottom: 40px; color: rgb(230, 102, 104);">Login</h1>
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
          <el-form-item prop="userId">
            <el-input v-model="loginForm.userId" type="text" placeholder="User ID" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="Password" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="remember" @change="handleRemember" style="width: 50%;">Remember me</el-checkbox>
            <router-link :to="{name : 'forget-password'}">Forget Password?</router-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin('loginForm')" :loading="isOnLoading" style="width: 45%;">Login</el-button>
            <el-button type="success" @click="handleRegister()" style="width: 45%;">Register</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import storage from 'Utils/storage'
  import api from '@oj/apis/apis'

  export default {
    mounted: function () {
      const remember = storage.get('remember')
      if (remember) {
        this.remember = true
        const userId = storage.get('userId')
        const password = storage.get('password')
        this.loginForm.userId = userId
        this.loginForm.password = password
      } else {
        this.$refs.loginForm.resetFields()
      }
    },
    data: function () {
      const checkUserId = (rule, value, callback) => {
        const reg = /^[a-zA-z0-9]+$/
        if (!value) {
          return callback(new Error('User ID cannot be empty'))
        } else if (value.length > 18 || value.length < 5) {
          return callback(new Error('User ID must be between 5 and 18 in length'))
        } else if (!reg.test(value)) {
          return callback(new Error('User ID can only consist of numbers an letters'))
        } else {
          return callback()
        }
      }
      const checkPassword = (rule, value, callback) => {
        const reg = /^[a-zA-z0-9]+$/
        if (!value) {
          return callback(new Error('Password cannot be empty'))
        } else if (value.length > 18 || value.length < 5) {
          return callback(new Error('Password must be between 5 and 18 in length'))
        } else if (!reg.test(value)) {
          return callback(new Error('Password can only consist of numbers an letters'))
        } else {
          return callback()
        }
      }
      return {
        remember: false,
        isOnLoading: false,
        loginForm: {
          userId: '',
          password: ''
        },
        rules: {
          userId: [
            { validator: checkUserId, trigger: 'blur' }
          ],
          password: [
            { validator: checkPassword, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      ...mapMutations([
        'setProfile'
      ]),
      handleLogin: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isOnLoading = true
            api.login(this.loginForm.userId, this.loginForm.password).then(res => {
              // 登录成功就就记住密码
              if (this.remember) {
                storage.set('userId', this.loginForm.userId)
                storage.set('password', this.loginForm.password)
              }
              this.setProfile(res.data.data)
              this.isOnLoading = false
              this.$message.success('User login success')
              this.$router.go(-1)
            }).catch(_ => {
              this.isOnLoading = false
            })
          } else {
            return false
          }
        })
      },
      handleRemember: function (value) {
        if (value) {
          storage.set('remember', true)
        } else {
          storage.clear()
        }
      },
      handleRegister: function () {
        this.$router.replace({name : 'register'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-card {
    margin: 100px auto;
    width: 700px;
    border-radius: 20px;
    &-box {
      float: right;
      width: 400px;
    }
  }
</style>
