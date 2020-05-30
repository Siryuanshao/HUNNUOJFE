<template>
  <div class="setting-main">
    <el-row type="flex" :gutter="60">
      <el-col :span="10" style="border-right: 1px #999 dashed;">
        <h2>Avatar Upload</h2>
        <el-upload
          drag
          action=""
          accept=".jpg,.jpeg,.png"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-upload" style="color: #2D8CF0;"></i>
          <div class="el-upload__text">Drop here, or click to select manually</div>
          <div class="el-upload__tip" slot="tip">Only jpg / png file can be uploaded, no more than 500kb</div>
        </el-upload>
      </el-col>
      <el-col :span="10">
        <h2>Profile Settings</h2>
        <el-form ref="form" :model="form" status-icon :rules="rules">
          <el-form-item label="nick name" prop="nickName">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
          <el-form-item label="school" prop="school">
            <el-input v-model="form.school"></el-input>
          </el-form-item>
          <el-form-item label="grade" prop="grade">
            <el-input v-model="form.grade"></el-input>
          </el-form-item>
          <el-form-item label="what'up" prop="whatUp">
            <el-input v-model="form.whatUp"></el-input>
          </el-form-item>
          <el-form-item label='sex' prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio v-for="(sex, index) in SEX_SET" :key="index" :label="index">
                {{sex}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button @click="updateProfile" type="primary">save all</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <Cropper :isShowCropper.sync="ShowCropper" :imgSrc="imgSrc" uploadUrl="uploadAvatar"></Cropper>
  </div>
</template>

<script>
  import api from '@oj/apis/apis'
  import Cropper from '@oj/components/Cropper'
  import { mapActions } from 'vuex'
  import { SEX_TYPE } from 'Utils/constants'

  export default {
    components: {
      Cropper
    },
    data: function () {
      const checkFormat = (rule, value, callback) => {
        if (!value) {
          return callback()
        } else if (value.length > 18 || value.length < 2) {
          return callback(new Error('Input must be between 2 and 18 in length'))
        } else {
          return callback()
        }
      }
      return {
        SEX_SET: SEX_TYPE.SEX_SET,
        ShowCropper: false,
        imgSrc: '',
        form: {
          nickName: '',
          school: '',
          grade: '',
          whatUp: '',
          sex: null
        },
        rules: {
          nickName: [
            { validator: checkFormat, trigger: 'blur' }
          ],
          school: [
            { validator: checkFormat, trigger: 'blur' }
          ],
          grade: [
            { validator: checkFormat, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'getProfile'
      ]),
      checkFileSize: function (file) {
        if (file.size > 1024 * 1024 / 2) {
          this.$message.warning('File exceed max size limit')
          return false
        }
        return true
      },
      checkFileType: function (file) {
        if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(file.name)) {
          this.$message.warning('File type not support')
          return false
        }
        return true
      },
      beforeAvatarUpload: function (file) {
        const isOk = this.checkFileType(file) && this.checkFileSize(file)
        if (!isOk) {
          return false
        }
        const reader = new window.FileReader()
        reader.onload = (e) => {
          this.ShowCropper = true
          this.imgSrc = e.target.result
        }
        reader.readAsDataURL(file)
        return false
      },
      updateProfile: function () {
        if (!(this.form.nickName || this.form.school || this.form.grade || this.form.sex != null || this.form.whatUp)) {
          this.$message.warning('At last one option is needed')
          return
        }

        api.updateUserProfile(this.form.nickName, this.form.school, this.form.grade, this.form.whatUp, this.form.sex).then(_ => {
          this.$message.success("Profile update success")
          this.getProfile()
        }).catch(_ => {

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
