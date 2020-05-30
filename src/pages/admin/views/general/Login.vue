<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-container">
    <h3 class="title">HUNNU OJ Admin</h3>
    <el-form-item prop="userId" required>
      <el-input type="text" v-model="ruleForm.userId" placeholder="Admin ID"></el-input>
    </el-form-item>
    <el-form-item prop="password" required>
      <el-input type="password" v-model="ruleForm.password" placeholder="Password"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin('ruleForm')" :loading="isOnLoading">Go</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapMutations } from 'vuex'
  import api from '@admin/apis/apis'

  export default {
    data : function () {
      const checkUserId = (rule, value, callback) => {
        const reg = /^[a-zA-z0-9]+$/
        if (!value) {
          return callback(new Error('User ID cannot be empty'))
        } else if (value.length > 18 || value.length < 5) {
          return callback(new Error('User ID must be between 5 and 18 in length'))
        } else if (!reg.test(value)) {
          return callback(new Error('User ID can only consist of numbers and letters'))
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
          return callback(new Error('Password can only consist of numbers and letters'))
        } else {
          return callback()
        }
      }
      return {
        isOnLoading: false,
        ruleForm: {
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
      handleLogin (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isOnLoading = true
            api.login(this.ruleForm.userId, this.ruleForm.password).then(res => {
              this.isOnLoading = false
              this.setProfile(res.data.data)
              this.$router.push('/')
            }, () => {
              this.isOnLoading = false
            })
          }else{
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    background-color: #fff;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
