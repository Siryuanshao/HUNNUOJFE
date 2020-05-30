<template>
  <div class="contest-list">
    <el-card>
      <div slot="header">
        <div style="display: inline-block; line-height: 45px;">
          <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">ACM Online Contest List</span>
        </div>
        <div style="float: right; line-height: 45px; margin-right: 10px;">
          <div style="display: inline-block;">
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
        :data="model.contestList"
        empty-text="now loading!!!!"
        :header-cell-style="{color:'#606266'}">
        <el-table-column
          align="center"
          prop="contestId"
          width="100"
          label="ID">
        </el-table-column>
        <el-table-column
          align="center"
          label="Title">
          <template slot-scope="scope">
            <a @click='handleContestView(scope.row.contestId)'>{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="startTime"
          label="Start Time">
        </el-table-column>
        <el-table-column
          align="center"
          prop="endTime"
          label="End Time">
        </el-table-column>
        <el-table-column
          align="center"
          label="Status">
          <template slot-scope="scope">
            <el-tag :type="STATUS_COLOR_SET[scope.row.status]" effect="dark" size="mini">
              {{STATUS_SET[scope.row.status]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="Contest Type">
          <template slot-scope="scope">
            <span>{{TYPE_SET[scope.row.type]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      v-if="model.contestCount"
      style="margin-top: 20px;"
      :current-page.sync="currentPage"
      @current-change="handleRoute"
      :page-size="10"
      background
      layout="prev, pager, next"
      :total="model.contestCount">
    </el-pagination>
  </div>
</template>

<script>
  import api from '@oj/apis/apis'
  import { CONTEST_STATUS } from 'Utils/constants'

  export default {
    mounted () {
      this.init()
    },
    data: function () {
      return {
        STATUS_SET: CONTEST_STATUS.STATUS_SET,
        STATUS_COLOR_SET: CONTEST_STATUS.STATUS_COLOR_SET,
        TYPE_SET: CONTEST_STATUS.TYPE_SET,
        title: '',
        buttonDisable: false,
        buttonStyle: 'el-icon-refresh',
        currentPage: null,
        model: {
          contestList : [],
          contestCount: 0
        }
      }
    },
    methods: {
      init: function () {
        this.buttonDisable = true
        this.buttonStyle = 'el-icon-loading'
        this.title = this.$route.query.keyword
        this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
        api.getContestList(this.title, this.currentPage).then(res => {
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
          name: 'contest-list',
          query: {
            keyword: this.title,
            page: this.currentPage
          }
        })
      },
      handleSearch: function () {
        this.$router.push({
          name: 'contest-list',
          query: {
            keyword: this.title,
            page: "1"
          }
        })
      },
      handleContestView: function (contestId) {
        this.$router.push({
          name: 'contest-dashboard',
          params: {
            contestId: contestId
          }
        })
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
  .contest-list {
    margin: 20px 2%;
  }
</style>
