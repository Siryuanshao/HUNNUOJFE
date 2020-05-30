<template>
  <el-card>
    <div slot="header">
      <div style="display: inline-block; line-height: 45px;">
        <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">Contest Problem List</span>
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
        width="100"
        label="ID">
        <template slot-scope="scope">
          {{scope.row.problemId | mappingToCharacter}}
        </template>
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
    </el-table>
  </el-card>
</template>

<script>
  import api from '@oj/apis/apis'
  import { PROBLEM_STATUS } from 'Utils/constants'

  export default {
    mounted () {
      this.init()
    },
    data () {
      return {
        STATUS_SET: PROBLEM_STATUS.STATUS_SET,
        STATUS_COLOR_SET: PROBLEM_STATUS.STATUS_COLOR_SET,
        model: {
          problemList : []
        }
      }
    },
    methods: {
      init: function () {
        const contestId = this.$route.params.contestId
        api.getContestProblemList(contestId).then(res => {
          this.model = res.data.data
        }).catch(_ => {

        })
      },
      handleProblemView: function (problemId) {
        const contestId = this.$route.params.contestId
        this.$router.push({
          name: 'contest-problem-detail',
          params: {
            contestId: contestId,
            problemId: problemId
          }
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

<style>

</style>
