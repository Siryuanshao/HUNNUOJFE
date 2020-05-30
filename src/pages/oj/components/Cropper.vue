<template>
  <el-dialog
    title="Upload Avatar"
    width="35%"
    :visible="isShowCropper"
    :before-close="closeCropperModel"
    class="upload lCropper"
    @close="$emit('update:isShowCropper', false)"
    append-to-body
    :close-on-click-modal="false">
    <div class="cropper_content">
      <el-row :gutter="10">
        <el-col :span="16" class="imageArea">
          <div class="cropper-main">
            <vueCropper
              ref="cropper"
              autoCrop
              fixed
              :autoCropWidth="200"
              :autoCropHeight="200"
              :img="option.image"
              :outputSize="option.outputSize"
              :outputType="option.outputType"
              @realTime="realTime">
            </vueCropper>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="preview">
            <div class="avatar" :style="previews.div">
              <img :src="option.image" :style="previews.img">
            </div>
          </div>
          <el-row :gutter="10">
            <el-col :span="12">
              <!-- 放大 -->
              <el-button type="primary" @click="changeScale(1)">放大</el-button>
            </el-col>
            <el-col :span="12">
              <!-- 缩小 -->
              <el-button type="primary" @click="changeScale(-1)">缩小</el-button>
            </el-col>
            <el-col :span="12">
              <!-- 左旋转 -->
              <el-button type="primary" @click="rotateLeft">左旋转</el-button>
            </el-col>
            <el-col :span="12">
              <!-- 右旋转 -->
              <el-button type="primary" @click="rotateRight">右旋转</el-button>
            </el-col>
            <el-col :span="12">
              <!-- 上传 -->
              <el-button type="primary" @click="uploadImg('blob')" :loading="loadingUploadBtn">上传</el-button>
            </el-col>
            <el-col :span="12">
              <!-- 取消 -->
              <el-button type="primary" @click="cancelUpload">取消</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
  import { mapActions } from 'vuex'
  import {VueCropper} from 'vue-cropper'

  export default {
    components: {
      VueCropper
    },
    props: {
      imgSrc: {
        type: String,
        default: ''
      },
      isShowCropper: {
        type: Boolean,
        default: false
      },
      uploadUrl: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        previews: {},
        option: {
          image: this.imgSrc,
          outputSize: 0.8,
          outputType: 'jpeg'
        },
        loadingUploadBtn: false
      }
    },
    methods: {
      ...mapActions([
        'getProfile'
      ]),
      // 放大缩小
      changeScale (num) {
        num = num || 1
        this.$refs.cropper.changeScale(num)
      },
      // 左旋转
      rotateLeft () {
        this.$refs.cropper.rotateLeft()
      },
      // 右旋转
      rotateRight () {
        this.$refs.cropper.rotateRight()
      },
      // 上传
      uploadImg (type) {
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob(blob => {
            let formData = new window.FormData()
            let file = new window.File([blob], 'avatar.' + this.option.outputType)
            formData.append('image', file)
            this.loadingUploadBtn = true
            this.$http({
              method: 'post',
              url: this.uploadUrl,
              data: formData,
              headers: { 'content-type': 'multipart/form-data' }
            }).then(_ => {
              this.loadingUploadBtn = false
              this.$emit('update:isShowCropper', false)
              this.$message.success('Set new avatar successfully')
              this.getProfile()
            }, () => {
              this.loadingUploadBtn = false
              this.$message.error('Internal error')
            })
          })
        } else {

        }
      },
      // 取消上传
      cancelUpload () {
        this.$emit('update:isShowCropper', false)
      },
      // 预览
      realTime (data) {
        this.previews = data
      },
      // 关闭弹窗之前
      closeCropperModel (done) {
        done()
      }
    },
    watch: {
      imgSrc (param) {
        this.option.image = param
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload {
    .btn {
      display: inline-block;
      width: 100%;
      cursor: pointer;
    }
    .imageArea {
      position: relative;
    }
  }
  .lCropper {
    .cropper_content {
      .cropper-main {
        height: 360px;
      }
      .preview {
        zoom: 0.45;
        overflow: hidden;
        margin-top: 20px;
        height: 400px;
        .avatar{
          margin: auto;
          overflow: hidden;
          border-radius: 50%;
          box-shadow: 0 0 1px 0;
        }
      }
      .el-button {
        margin-top: 10px;
        width: 100%;
        height: 40px;
        font-size: 12px;
        text-align: center;
      }
      .changeImage {
        margin-top: 10px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background: #67c23a;
        border-color: #67c23a;
        border-radius: 4px;
      }
    }
  }
</style>
