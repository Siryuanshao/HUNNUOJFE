<template>
  <div class="contest-problem-detail">
    <el-row :gutter="60">
      <el-col :span="18">
        <div class="problem">
          <el-card>
            <div slot="header">
              <h1>{{model.title}}</h1>
            </div>
            <div class="description">
              <h2>Description</h2>
              <vue-markdown :source="model.description" class="markdown-body"></vue-markdown>
            </div>
            <div class="input">
              <h2>Input</h2>
              <vue-markdown :source="model.inputDesc" class="markdown-body"></vue-markdown>
            </div>
            <div class="output">
              <h2>Output</h2>
              <vue-markdown :source="model.outputDesc" class="markdown-body"></vue-markdown>
            </div>
            <div class="input-sample">
              <h2>Input Sample</h2>
              <pre v-html="model.inputSample"></pre>
            </div>
            <div class="output-sample">
              <h2>Output Sample</h2>
              <pre v-html="model.outputSample"></pre>
            </div>
            <div class="hint">
              <h2>Hint</h2>
              <vue-markdown :source="model.hint" class="markdown-body"></vue-markdown>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="sidebar">
          <el-card>
            <div style="margin-bottom: 30px; font-size: 18px;">
              <i class="el-icon-info" style="color: #666;"></i>
              <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">Information</span>
            </div>
            <el-row>
              <el-col :span="14">
                <span>Problem ID</span>
              </el-col>
              <el-col :span="10">
                <span>{{model.problemId | mappingToCharacter}}</span>
              </el-col>
            </el-row>
            <div class="divider"></div>
            <el-row>
              <el-col :span="14">
                <span>Time Limit</span>
              </el-col>
              <el-col :span="10">
                <span>{{model.timeLimit}}&nbsp;ms</span>
              </el-col>
            </el-row>
            <div class="divider"></div>
            <el-row>
              <el-col :span="14">
                <span>Memory Limit</span>
              </el-col>
              <el-col :span="10">
                <span>{{model.memoryLimit}}&nbsp;kB</span>
              </el-col>
            </el-row>
            <div class="divider"></div>
            <el-row>
              <el-col :span="14">
                <span>Submitted</span>
              </el-col>
              <el-col :span="10">
                <span>{{model.submit}}</span>
              </el-col>
            </el-row>
            <div class="divider"></div>
            <el-row>
              <el-col :span="14">
                <span>Solved</span>
              </el-col>
              <el-col :span="10">
                <span>{{model.accept}}</span>
              </el-col>
            </el-row>
            <div class="divider"></div>
            <el-row>
              <el-col :span="14">
                <span>isSpj</span>
              </el-col>
              <el-col :span="10">
                <span v-if="model.isSpj" style="color: red">Special Judge</span>
                <span v-else style="color: dodgerblue">No Special Judge</span>
              </el-col>
            </el-row>
            <div class="divider"></div>
            <div style="margin-top: 20px;">
              <el-button @click="handleSubmit" type="primary" style="width: 100%;">Submit</el-button>
            </div>
            <div style="margin-top: 10px;">
              <el-button @click="goSubmissions" type="success" style="width: 100%;">Go Submissions</el-button>
            </div>
            <div style="margin-top: 10px;">
              <el-button @click="goContest" type="warning" style="width: 100%;">Go Contest</el-button>
            </div>
            <div style="clear: both;"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <SubmitDialog
      :isShowModal.sync="modalVisible"
      title="Upload Contest Submission"
      uploadUrl="uploadSubmission"
      redirectPath="contest-submission-list">
    </SubmitDialog>
  </div>
</template>

<script>
  import api from '@oj/apis/apis'
  import SubmitDialog from '@oj/components/SubmitDialog'

  export default {
    components: { SubmitDialog },
    mounted () {
      this.init()
    },
    data: function () {
      return {
        model: {
          title: '',
          description: '',
          inputDesc: '',
          outputDesc: '',
          inputSample: '',
          outputSample: '',
          hint: '',
          problemId: '',
          timeLimit: '',
          memoryLimit: '',
          accept: '',
          submit: '',
          isSpj: false
        },
        modalVisible: false
      }
    },
    methods: {
      init: function () {
        let pid = this.$route.params.problemId
        let cid = this.$route.params.contestId
        api.getContestProblemDetail(pid, cid).then(res => {
          this.model = res.data.data
        }).catch(_ => {

        })
      },
      handleSubmit: function () {
        this.modalVisible = true
      },
      goSubmissions : function () {
        let pid = this.$route.params.problemId
        let cid = this.$route.params.contestId
        this.$router.push({
          name: 'contest-submission-list',
          params: {
            contestId: cid
          },
          query: {
            problemId : pid
          }
        })
      },
      goContest: function () {
        let cid = this.$route.params.contestId
        this.$router.push({
          name: 'contest-problem-list',
          params: {
            contestId: cid
          }
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
  .contest-problem-detail {
    margin: 20px 2%;
    h1, h2 {
      color: #337AB7;
    }
    .description, .input, .output, .hint, .source{
      font-size: 15px;
    }
    .input-sample, .output-sample{
      pre {
        margin: 0px;
        display: block;
        padding: 10px;
        font-size: 14px;
        line-height: 1.5;
        border: 1px solid #eaeefb;
        background-color: #fafafa;
        color: #333;
        border-radius: 4px;
        font-family: Menlo,Monaco,Consolas,monospace;
      }
    }
    .sidebar {
      span {
        font-size: 12px;
      }
      .divider {
        border-bottom: 1px dotted #e9eaec;
        margin-bottom: 15px;
      }
    }
  }
</style>
