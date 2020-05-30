<template>
  <el-dialog
    :title="title"
    :visible="isShowModal"
    @close="$emit('update:isShowModal', false)"
    :close-on-click-modal="false">
    <div style="line-height: 60px;">
      <div style="display: inline-block;">
        <span style="font-size: 14px; font-weight: 600; color: #666;">Language :</span>
      </div>
      &nbsp;&nbsp;
      <div style="display: inline-block;">
        <el-select v-model="language">
          <el-option
            v-for="(lan, index) in LANGUAGE_HASH"
            :key="index"
            :label="lan"
            :value="index">
          </el-option>
        </el-select>
      </div>
    </div>
    <div style="margin-top: 10px;">
      <el-input v-model="textArea" type="textarea" :rows="20"></el-input>
    </div>
    <span slot="footer">
      <el-button @click="$emit('update:isShowModal', false)">Cancel</el-button>
      <el-button type="primary" @click="SubmitCode">Submit</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { mapState } from 'vuex'
  import { JUDGE_OPTIONS } from 'Utils/constants'
  import storage from 'Utils/storage'

  export default {
    props: {
      title : {
        type : String,
        default : ''
      },
      isShowModal: {
        type: Boolean,
        default: false
      },
      uploadUrl : {
        type : String,
        default : ''
      },
      redirectPath : {
        type : String,
        default : ''
      }
    },
    mounted () {
      this.language = storage.get("language")
    },
    data () {
      return {
        textArea: '',
        language: '',
        LANGUAGE_HASH : JUDGE_OPTIONS.LANGUAGE_HASH
      }
    },
    computed: {
      ...mapState([
        'modalStatus'
      ])
    },
    methods: {
      SubmitCode: function () {
        if (!this.modalStatus) {
          this.$message.error('Please login first')
        } else if (this.language == null) {
          this.$message.warning('Please select a language first')
        } else if (!this.textArea) {
          this.$message.warning("Code could't be empty")
        } else {
          storage.set("language", this.language)
          const pid = this.$route.params.problemId
          const cid = this.$route.params.contestId
          this.$http({
            method: 'post',
            url: this.uploadUrl,
            data: {
              problemId: pid,
              contestId : cid,
              language: this.language,
              sourcecode: this.textArea
            }
          }).then(_ => {
            this.$message.success('Submit success')
            this.$emit('update:isShowModal', false)
            this.$router.push({
              name: this.redirectPath,
              params: {
                contestId: cid,
              },
              query: {
                problemId: pid
              }
            })
          }).catch(_ => {
            this.$message.error('Judge internal error')
          })
        }
      }
    }
  }
</script>

<style>

</style>
