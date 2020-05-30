<template>
  <div class="submission-content">
    <el-row :gutter="60">
      <el-col :span="18">
        <el-card>
          <div slot="header">
            <div style="display: inline-block; line-height: 45px;">
              <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">Solution Rank</span>
            </div>
            <div style="float: right; line-height: 45px; margin-right: 10px;">
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
                <el-button type="primary" :disabled="buttonDisable" @click="handleSearch">
                  <i :class="buttonStyle"></i>
                  <span>Search</span>
                </el-button>
              </div>
            </div>
            <div style="clear: both;"></div>
          </div>
          <el-table
            :data="model.summaryList"
            stripe
            empty-text="now loading!!!"
            :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
            style="font-size: 12px;">
            <el-table-column
              align="center"
              label="Rank"
              prop="rank">
            </el-table-column>
            <el-table-column
              align="center"
              label="RunID">
              <template slot-scope="scope">
                <a @click="handleSubmissionView(scope.row.submissionId)">{{scope.row.submissionId}}</a>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="Author">
              <template slot-scope="scope">
                <a @click="handleProfile(scope.row.userId)">{{scope.row.userId}}</a>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="Time(ms)"
              prop="timeUsed">
            </el-table-column>
            <el-table-column
              align="center"
              label="Memory(kB)"
              prop="memoryUsed">
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
              label="When"
              prop="when">
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
      </el-col>
      <el-col :span="6">
        <div class="sidebar">
          <el-card>
            <div style="margin-bottom: 30px; font-size: 18px;">
              <i class="el-icon-info" style="color: #666;"></i>
              <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">Statistics</span>
            </div>
            <el-row>
              <el-col :span="14">
                <span>Total Submissions</span>
              </el-col>
              <el-col :span="10">
                <span class="linker" @click="handleProblemStatus()">{{model.totalSubmission}}</span>
              </el-col>
            </el-row>
            <div class="divider"></div>
            <el-row>
              <el-col :span="14">
                <span>Users Solved</span>
              </el-col>
              <el-col :span="10">
                <span>{{model.userAccept}}</span>
              </el-col>
            </el-row>
            <div class="divider"></div>
            <el-row>
              <el-col :span="14">
                <span>User Submitted</span>
              </el-col>
              <el-col :span="10">
                <span>{{model.userSubmit}}</span>
              </el-col>
            </el-row>
            <div class="divider"></div>
            <div v-for="(state, index) in model.statistic" :key="index">
              <el-row>
                <el-col :span="14">
                  <span>{{STATUS_HASH[index]}}</span>
                </el-col>
                <el-col :span="10">
                  <span class="linker" @click="handleProblemStatus(index)">{{state}}</span>
                </el-col>
              </el-row>
              <div class="divider"></div>
            </div>
            <div style="clear: both;"></div>
            <div style="margin-top: 10px;">
              <el-button type="info" style="width: 100%;" @click="backToProblem">Back to Problem</el-button>
            </div>
            <el-divider></el-divider>
            <div>
              <echarts id="echarts" :data-arr="dataArr"></echarts>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import api from '@oj/apis/apis'
  import { JUDGE_OPTIONS } from 'Utils/constants'
  import Echarts from '@oj/components/Echarts'

  export default {
    components: { Echarts },
    mounted () {
      this.init()
    },
    data: function () {
      return {
        STATUS_HASH: JUDGE_OPTIONS.STATUS_HASH,
        LANGUAGE_HASH: JUDGE_OPTIONS.LANGUAGE_HASH,
        SHORT_NAME: JUDGE_OPTIONS.SHORT_NAME,
        problemId: null,
        buttonDisable: false,
        buttonStyle: 'el-icon-refresh',
        currentPage: null,
        model: {
          totalSubmission : 0,
          userSubmit : 0,
          userAccept : 0,
          statistic : [],
          summaryList : [],
          submissionCount : 0
        },
        language: '',
      }
    },
    computed: {
      dataArr : function () {
        return this.model.statistic.slice(2).map((item, index) => {
          return {name : this.SHORT_NAME[index + 2], value : item}
        })
      }
    },
    methods: {
      init: function () {
        this.problemId = this.$route.params.problemId
        this.buttonDisable = true
        this.buttonStyle = 'el-icon-loading'
        this.language = this.$route.query.language != null ? parseInt(this.$route.query.language) : -1
        this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
        api.getProblemSummary(this.problemId, this.language, this.page).then(res => {
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
          name: 'problem-summary',
          params : {
            problemId: this.problemId,
          },
          query: {
            language: this.language,
            page: this.currentPage
          }
        })
      },
      handleSearch: function () {
        this.$router.push({
          name: 'problem-summary',
          params : {
            problemId: this.problemId,
          },
          query: {
            language: this.language,
            page: "1"
          }
        })
      },
      handleProfile: function (userId) {
        this.$router.push({
          name: 'user-profile',
          query: { userId: userId }
        })
      },
      handleProblemStatus: function (status) {
        this.$router.push({
          name: 'submission-list',
          query: {
            problemId: this.problemId,
            status: status
          }
        })
      },
      handleSubmissionView: function (submissionId) {
        this.$router.push({
          name: 'submission-detail',
          params: {
            submissionId
          }
        })
      },
      backToProblem: function () {
        this.$router.push({
          name: 'problem-detail',
          params: { problemId: this.problemId }
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
    .sidebar {
      span {
        font-size: 12px;
      }
      span.linker {
        color: #337ab7;
        &:hover {
          cursor: pointer;
        }
      }
      .divider {
        border-bottom: 1px dotted #e9eaec;
        margin-bottom: 15px;
      }
    }
  }
</style>
