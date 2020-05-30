<template>
  <div class="submission-detail">
    <el-card>
      <div slot="header">
        <div v-if="model.sourcecode" class="status">
          <el-alert :type="STATUS_COLOR_HASH[model.status]" :closable="false" show-icon>
            <span class="title">{{STATUS_HASH[model.status]}}</span>
            <slot>
              <div class="content">
                <template v-if="model.ext">
                  <pre>{{model.ext}}</pre>
                </template>
                <template v-else>
                  <span>Time : {{model.timeUsed !== -1 ? model.timeUsed : '--'}}ms</span>
                  <span>Memory : {{model.memoryUsed !== -1 ? model.memoryUsed : '--'}}kB</span>
                  <span>Length : {{model.length}}</span>
                  <span>Language : {{LANGUAGE_HASH[model.language]}}</span>
                  <span>Author : {{model.userId}}</span>
                  <span>When : {{model.when}}</span>
                </template>
              </div>
            </slot>
          </el-alert>
        </div>
      </div>
      <div style="font-size: 12px;">
        <Highlight :code="model.sourcecode" :language="LANGUAGE_HASH[model.language]"></Highlight>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Highlight from '@oj/components/Highlight'
  import { JUDGE_OPTIONS } from 'Utils/constants'
  import api from '@oj/apis/apis'

  export default {
    components: {
      Highlight
    },
    mounted () {
      // 因为el-alert 和 el-tag style 不同
      this.STATUS_COLOR_HASH = Object.assign({}, JUDGE_OPTIONS.STATUS_COLOR_HASH)
      this.STATUS_COLOR_HASH[4] = 'error'
      this.init()
    },
    data () {
      return {
        STATUS_HASH: JUDGE_OPTIONS.STATUS_HASH,
        STATUS_COLOR_HASH: [],
        LANGUAGE_HASH: JUDGE_OPTIONS.LANGUAGE_HASH,
        model: {
          submissionId : '',
          problemId : '',
          when: '',
          status : '',
          sourcecode: '',
          length : '',
          language : '',
          timeUsed : '',
          memoryUsed : '',
          ext : ''
        },
      }
    },
    methods: {
      init: function () {
        let submissionId = this.$route.params.submissionId
        api.getSubmissionDetail(submissionId).then(res => {
          this.model = res.data.data
        }).catch(_ => {

        })
      }
    },
    watch: {
      '$route': function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .submission-detail {
    margin: 20px auto;
    width: 1000px;
    background-color: #F7F7FA;
    .status {
      .title {
        font-size: 20px;
      }
      .content {
        margin-top: 10px;
        font-size: 14px;
        span {
          color: #333;
          margin-right: 10px;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
    }
  }
</style>
