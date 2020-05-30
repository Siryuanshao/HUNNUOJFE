<template>
  <div class="setting-main">
    <el-row type="flex" :gutter="60">
      <el-col :span="10" style="border-right: 1px #999 dashed;">
        <h2>Update Password</h2>
        <el-form ref="form1" :model="form1" status-icon :rules="rules1">
          <el-form-item label="old password" prop="oldPassword" required>
            <el-input v-model="form1.oldPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="new password" prop="newPassword" required>
            <el-input v-model="form1.newPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="confirm new password" prop="newPassword_again" required>
            <el-input v-model="form1.newPassword_again" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatePassword('form1')">Update Password</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10">
        <h2>Update Email</h2>
        <el-form ref="form2" :model="form2" status-icon :rules="rules2">
          <el-form-item label="current password" prop="currentPassword" required>
            <el-input v-model="form2.currentPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="old email" prop="oldEmail">
            <el-input v-model="form2.oldEmail" disabled></el-input>
          </el-form-item>
          <el-form-item label="new email" prop="newEmail" required>
            <el-input v-model="form2.newEmail"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateEmail('form2')">Update Email</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from '@oj/apis/apis'
  import { mapState, mapActions } from 'vuex'

  export default {
    mounted () {
      this.form2.oldEmail = this.profile.email
    },
    computed: {
      ...mapState([
        'profile'
      ])
    },
    data () {
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
        form1: {
          oldPassword: '',
          newPassword: '',
          newPassword_again: ''
        },
        form2: {
          currentPassword: '',
          oldEmail: '',
          newEmail: ''
        },
        rules1: {
          oldPassword: [
            { validator: checkPassword, trigger: 'blur' }
          ],
          newPassword: [
            { validator: checkPassword, trigger: 'blur' }
          ],
          newPassword_again: [
            { validator: checkPasswordAgain, trigger: 'blur' }
          ]
        },
        rules2: {
          currentPassword: [
            { validator: checkPassword, trigger: 'blur' }
          ],
          newEmail: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'getProfile'
      ]),
      updatePassword: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.updateUserPassword(this.form1.oldPassword, this.form1.newPassword).then(_ => {
              this.$message.success("Password update success")
            }).catch(_ => {

            })
          } else {
            return false
          }
        })
      },
      updateEmail: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.updateUserEmail(this.form2.currentPassword, this.form2.newEmail).then(_ => {
              this.getProfile()
              this.$message.success('Email update success')
            }).catch(_ => {

            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .setting-main {
    margin-left: 40px;
    padding-bottom: 20px;
  }
</style>
