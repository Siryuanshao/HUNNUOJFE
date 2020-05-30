<template>
  <div class="register-card">
    <div style="background-color: #ffffff; padding: 20px;">
      <img src="../../../../assets/animation/sofia.jpg" style="height: 390px; float: left; border-radius: 4px;"/>
      <div class="register-card-box">
        <h1 style="margin-bottom: 40px; color: rgb(193, 180, 227);">Register</h1>
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm">
          <el-form-item prop="userId">
            <el-input v-model="registerForm.userId" type="text" placeholder="User ID" />
          </el-form-item>
          <el-form-item prop="userName">
            <el-input v-model="registerForm.userName" type="text" placeholder="User nickname" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" type="password" placeholder="Password" />
          </el-form-item>
          <el-form-item prop="password_again">
            <el-input v-model="registerForm.password_again" type="password" placeholder="Repeat password Again" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRegister('registerForm')" :loading="isOnLoading" style="width: 45%;">Register</el-button>
            <el-button type="success" @click="handleLogin()" style="width: 45%;">Return Login</el-button>
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
          api.checkUserIfExist(value).then(_ => {
            callback()
          }).catch(res => {
            callback(new Error(res.data.err_info))
          })
        }
      }
      const checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('User nickname cannot be empty'))
        } else if (value.length > 18 || value.length < 2) {
          return callback(new Error('User nickname must be between 2 and 18 in length'))
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
      const checkPasswordAgain = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('Please re-enter the password'))
        } else if (value !== this.registerForm.password) {
          return callback(new Error('Two passwords are inconsistent'))
        } else {
          return callback()
        }
      }

      return {
        remember: false,
        isOnLoading: false,
        registerForm: {
          userId: '',
          userName: '',
          password: '',
          password_again: ''
        },
        rules: {
          userId: [
            { validator: checkUserId, trigger: 'blur' }
          ],
          userName: [
            { validator: checkUserName, trigger: 'blur' }
          ],
          password: [
            { validator: checkPassword, trigger: 'blur' }
          ],
          password_again: [
            { validator: checkPasswordAgain, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleRegister: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isOnLoading = true
            api.register(this.registerForm.userId, this.registerForm.userName, this.registerForm.password).then(_ => {
              this.isOnLoading = false
              this.$message.success('User register success')
              this.$router.replace({name : 'login'})
            }).catch(_ => {
              this.isOnLoading = false
            })
          } else {
            return false
          }
        })
      },
      handleLogin: function () {
        this.$router.replace({name : 'login'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .register-card {
    margin: 100px auto;
    width: 700px;
    border-radius: 20px;
    &-box {
      float: right;
      width: 400px;
    }
  }
</style>
