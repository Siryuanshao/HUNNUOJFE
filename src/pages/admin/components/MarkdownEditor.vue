<template>
  <mavon-editor :ref="refId"
                v-model="content"
                @change="parseHtml"
                @imgAdd="uploadImage"
                :autofocus="false">
  </mavon-editor>
</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: 'MarkdownEditor',
    components: {
      mavonEditor
    },
    props: {
      refId: {
        type: String,
        required: true
      },
      value: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        content : this.value,
        render: ''
      }
    },
    methods: {
      uploadImage: function (pos, imgFile) {
        let refId = this.refId
        if(imgFile.size > 1024 * 1024) {
          this.$refs[refId].$img2Url(pos, '')
          this.$message.warning('The maximum limit for uploading pictures is 1MB')
          return
        }
        let formData = new FormData()
        formData.append('image', imgFile)
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
        });
        this.$http({
          method: 'post',
          url: 'admin/uploadImage',
          data: formData,
          headers: {'content-type' : 'multipart/form-data'}
        }).then(res => {
          if(!res.data.error) {
            this.$message.success("Image uploaded successfully")
            this.$refs[refId].$img2Url(pos, res.data.data.path)
          }else{
            this.$message.error(res.data.err_info)
            this.$refs[refId].$img2Url(pos, '')
          }
          loading.close()
        }).catch(_ => {
          this.$message.warning('Please re-upload again')
          this.$refs[refId].$img2Url(pos, '')
          loading.close()
        })
      },
      parseHtml: function (value, render) {
        this.render = render
        this.$emit('input', value)
      }
    },
    watch: {
      value: function (value) {
        this.content = value
      }
    }
  }
</script>

<style>

</style>
