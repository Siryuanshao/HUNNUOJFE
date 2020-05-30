<template>
  <div class="forget-password">
    <div style="background-color: #ffffff; padding: 20px;">
      <img src="../../../../assets/animation/shiraishi.jpg" style="height: 275px; float: left; border-radius: 4px;"/>
      <div class="forget-password-box">
        <h1 style="margin-bottom: 40px; color: rgb(149, 138, 148);">Forget Password</h1>
        <el-form :model="forgetForm" status-icon :rules="rules" ref="forgetForm">
          <el-form-item prop="userId">
            <el-input v-model="forgetForm.userId" type="text" placeholder="User ID" />
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="forgetForm.email" type="text" placeholder="Email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleForget('forgetForm')" :loading="isOnLoading" style="width: 45%;">Send verification mail</el-button>
            <el-button type="success" @click="goBack()" style="width: 45%;">Return Login</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>

<script>
  import api from '@oj/apis/apis'

  export default {
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
      const checkEmail = (rule, value, callback) => {
        const reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
        if (!value) {
          return callback(new Error('Email cannot be empty'))
        } else if (!reg.test(value)) {
          return callback(new Error('Email format error'))
        } else {
          return callback()
        }
      }
      return {
        isOnLoading: false,
        forgetForm: {
          userId: '',
          email: ''
        },
        rules: {
          userId: [
            { validator: checkUserId, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleForget: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isOnLoading = true
            api.forgetPassword(this.forgetForm.userId, this.forgetForm.email).then(_ => {
              this.isOnLoading = false
              this.$message.success('The email has been send to your mailbox, please check it')
              this.$router.go(-1)
            }).catch(_ => {
              this.isOnLoading = false
            })
          } else {
            return false
          }
        })
      },
      goBack: function () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .forget-password {
    margin: 100px auto;
    width: 700px;
    border-radius: 20px;
    &-box {
      float: right;
      width: 400px;
    }
  }
</style>
