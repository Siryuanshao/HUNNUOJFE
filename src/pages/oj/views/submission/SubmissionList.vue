<template>
  <div class="submission-content">
    <el-card>
      <div slot="header">
        <div style="display: inline-block; line-height: 45px;">
          <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">Realtime Judge Status</span>
        </div>
        <div style="float: right; line-height: 45px; margin-right: 10px;">
          <div style="display: inline-block; padding-left: 10px;">
            <span>User ID : </span><el-input v-model="userId" @keyup.enter.native="handleRefresh" style="width: 120px;"></el-input>
          </div>
          <div style="display: inline-block; padding-left: 10px;">
            <span>Problem ID : </span><el-input v-model="problemId" @keyup.enter.native="handleRefresh" style="width: 120px;"></el-input>
          </div>
          <div style="display: inline-block; padding-left: 20px;">
            <el-dropdown
              @command="status = $event"
              placement="bottom">
              <span>{{status !== -1 ? STATUS_HASH[status] : "Status"}}</span><i class="el-icon-caret-bottom"></i>
              <el-dropdown-menu>
                <el-dropdown-item :command="-1">All</el-dropdown-item>
                <el-dropdown-item v-for="(state, index) in STATUS_HASH" :key="index" :command="index">
                  {{state}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div style="display: inline-block; padding-left: 20px;">
            <el-dropdown
              @command="language = $event"
              placement="bottom">
              <span>{{language !== -1 ? LANGUAGE_HASH[language] : "Language"}}</span><i class="el-icon-caret-bottom"></i>
              <el-dropdown-menu>
                <el-dropdown-item :command="-1">All</el-dropdown-item>
                <el-dropdown-item v-for="(lan,index) in LANGUAGE_HASH" :key="index" :command="index">
                  {{lan}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div style="display: inline-block; padding-left: 10px;">
            <el-button type="primary" :disabled="buttonDisable" @click="handleRefresh">
              <i :class="buttonStyle"></i>
              <span>Refresh</span>
            </el-button>
          </div>
        </div>
        <div style="clear: both;"></div>
      </div>
      <el-table
        :data="model.submissionList"
        stripe
        empty-text="now loading!!!"
        :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
        style="font-size: 12px;">
        <el-table-column
          align="center"
          label="When"
          prop="when">
        </el-table-column>
        <el-table-column
          align="center"
          label="RunId">
          <template slot-scope="scope">
            <template v-if="scope.row.permission">
              <a @click="handleSubmissionView(scope.row.submissionId)">{{scope.row.submissionId}}</a>
            </template>
            <template v-else>
              <span>{{scope.row.submissionId}}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="Status">
          <template slot-scope="scope">
            <el-tag :type="STATUS_COLOR_HASH[scope.row.status]" effect="dark" size="mini">
              {{STATUS_HASH[scope.row.status]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="Problem">
          <template slot-scope="scope">
            <a @click='handleProblemView(scope.row.problemId)'>{{scope.row.problemId}}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="Time(ms)">
          <template slot-scope="scope">
            <span>{{scope.row.timeUsed !== -1 ? scope.row.timeUsed : '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="Memory(kB)">
          <template slot-scope="scope">
            <span>{{scope.row.memoryUsed !== -1 ? scope.row.memoryUsed : '--'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="Language">
          <template slot-scope="scope">
            <span>{{LANGUAGE_HASH[scope.row.language]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="Length"
          prop="length">
        </el-table-column>
        <el-table-column
          align="center"
          label="Author">
          <template slot-scope="scope">
            <a @click="handleProfile(scope.row.userId)">{{scope.row.userId}}</a>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      v-if="model.submissionCount"
      style="margin-top: 20px;"
      :current-page.sync="currentPage"
      @current-change="handleRoute"
      :page-size="30"
      background
      layout="prev, pager, next"
      :total="model.submissionCount">
    </el-pagination>
  </div>
</template>

<script>
  import api from '@oj/apis/apis'
  import { JUDGE_OPTIONS } from 'Utils/constants'

  export default {
    mounted () {
      this.init()
    },
    data: function () {
      return {
        STATUS_HASH: JUDGE_OPTIONS.STATUS_HASH,
        STATUS_COLOR_HASH: JUDGE_OPTIONS.STATUS_COLOR_HASH,
        LANGUAGE_HASH: JUDGE_OPTIONS.LANGUAGE_HASH,

        buttonDisable: false,
        buttonStyle: 'el-icon-refresh',
        currentPage: null,
        model: {
          submissionList : [],
          submissionCount : 0
        },
        userId: '',
        problemId: '',
        status: null,
        language: null,
      }
    },
    methods: {
      init: function () {
        this.buttonDisable = true
        this.buttonStyle = 'el-icon-loading'
        this.userId = this.$route.query.userId
        this.problemId = this.$route.query.problemId
        this.status = this.$route.query.status != null ? parseInt(this.$route.query.status) : -1
        this.language = this.$route.query.language != null ? parseInt(this.$route.query.language) : -1
        this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
        api.getSubmissionList(this.userId, this.problemId, this.status, this.language, this.currentPage).then(res => {
          this.model = res.data.data
          this.buttonDisable = false
          this.buttonStyle = 'el-icon-refresh'
        }).catch(_ => {
          this.buttonDisable = false
          this.buttonStyle = 'el-icon-refresh'
        })
      },
      handleRoute: function () {
        this.$router.push({
          name: 'submission-list',
          query: {
            userId: this.userId,
            problemId: this.problemId,
            status: this.status,
            language: this.language,
            page: this.currentPage
          }
        })
      },
      handleProblemView: function (problemId) {
        this.$router.push({
          name: 'problem-detail',
          params: { problemId: problemId }
        })
      },
      handleProfile: function (userId) {
        this.$router.push({
          name: 'user-profile',
          query: { userId: userId }
        })
      },
      handleRefresh: function () {
        const oldPath = this.$route.fullPath
        this.$router.replace({
          name: 'submission-list',
          query: {
            userId: this.userId,
            problemId: this.problemId,
            status: this.status,
            language: this.language,
            page: "1"
          }
        })
        const newPath = this.$route.fullPath
        if (oldPath === newPath) {
          this.init()
        }
      },
      handleSubmissionView: function (submissionId) {
        this.$router.push({
          name: 'submission-detail',
          params: { submissionId: submissionId }
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
  .submission-content {
    margin: 20px 2%;
  }
</style>
