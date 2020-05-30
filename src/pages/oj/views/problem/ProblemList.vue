<template>
  <div class="problem-list">
    <el-card>
      <div slot="header">
        <div style="display: inline-block; line-height: 45px;">
          <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">ACM Problem List</span>
        </div>
        <div style="float: right; line-height: 45px; margin-right: 10px;">
          <div style="display: inline-block; padding-left: 10px;">
            <span>Title : </span><el-input v-model="title" @keyup.enter.native="handleSearch" style="width: 120px;"></el-input>
          </div>
          <div style="display: inline-block; padding-left: 10px;">
            <el-button type="primary" :disabled="buttonDisable" @click="handleSearch">
              <i :class="buttonStyle"></i>
              <span>Search</span>
            </el-button>
          </div>
        </div>
      </div>
      <el-table
        :data="model.problemList"
        empty-text="now loading!!!!"
        :header-cell-style="{color:'#606266'}">
        <el-table-column
          label="#"
          align="center"
          width="40">
          <template slot-scope="scope">
            <i :class="STATUS_SET[scope.row.status]" :style="STATUS_COLOR_SET[scope.row.status]"></i>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="problemId"
          width="100"
          label="ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="Title">
          <template slot-scope="scope">
            <a @click='handleProblemView(scope.row.problemId)'>{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="AC/Submit">
          <template slot-scope="scope">
            {{getACRate(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="source"
          label="Source">
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      v-if="model.problemCount"
      style="margin-top: 20px;"
      :current-page.sync="currentPage"
      @current-change="handleRoute"
      :page-size="30"
      background
      layout="prev, pager, next"
      :total="model.problemCount">
    </el-pagination>
  </div>
</template>

<script>
  import api from '@oj/apis/apis'
  import {PROBLEM_STATUS} from 'Utils/constants'

  export default {
    mounted () {
      this.init()
    },
    data: function () {
      return {
        STATUS_SET: PROBLEM_STATUS.STATUS_SET,
        STATUS_COLOR_SET: PROBLEM_STATUS.STATUS_COLOR_SET,
        title: '',
        buttonDisable: false,
        buttonStyle: 'el-icon-refresh',
        currentPage: null,
        model: {
          problemList : [],
          problemCount : 0
        }
      }
    },
    methods: {
      init: function () {
        this.buttonDisable = true
        this.buttonStyle = 'el-icon-loading'
        this.title = this.$route.query.keyword
        this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
        api.getProblemList(this.title, this.currentPage).then(res => {
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
          name: 'problem-list',
          query: { keyword: this.title, page: this.currentPage }
        })
      },
      handleProblemView: function (problemId) {
        this.$router.push({
          name: 'problem-detail',
          params : { problemId: problemId }
        })
      },
      handleSearch: function () {
        this.$router.push({
          name: 'problem-list',
          query: { keyword: this.title, page: "1" }
        })
      },
      getACRate: function (key) {
        return key.accept.toString() + '/' + key.submit.toString()
      }
    },
    watch: {
      '$route': function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .problem-list {
    margin: 20px 2%;
  }
</style>
