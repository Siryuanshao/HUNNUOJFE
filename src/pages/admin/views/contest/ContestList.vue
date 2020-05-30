<template>
  <Panel title="Contest List">
    <el-table
      v-loading="loading"
      element-loading-text="loading"
      :data="model.contestList">
      <el-table-column
        prop="contestId"
        width="150"
        label="Contest ID">
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="Start Time">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="End Time">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="250"
        label="Operation">
        <div slot-scope="scope">
          <icon-btn name="Go Edit" icon="el-icon-edit-outline" @click.native="goContestEdit(scope.row.contestId)"></icon-btn>
          <icon-btn name="Go Problem" icon="el-icon-link" @click.native="goContestProblemList(scope.row.contestId)"></icon-btn>
          <icon-btn name="Go Announcement" icon="el-icon-magic-stick" @click.native="goContestAnnouncement(scope.row.contestId)"></icon-btn>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="model.contestCount"
      style="margin-top: 20px;"
      background
      layout="prev, pager, next"
      @current-change="currentChange"
      :page-size="10"
      :total="model.contestCount">
    </el-pagination>
  </Panel>
</template>

<script>
  import api from '@admin/apis/apis'

  export default {
    data () {
      return {
        model : {
          contestList: [],
          contestCount : 0
        },
        loading: false,
        currentPage: null,
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init() {
        this.getContestList()
      },
      // 切换页码回调
      currentChange (page) {
        this.currentPage = page
        this.getContestList(page)
      },
      getContestList (page) {
        this.loading = true
        api.getContestList(null, page).then(res => {
          this.loading = false
          this.model = res.data.data
        }, _ => {
          this.loading = false
        })
      },
      goContestEdit (contestId) {
        this.$router.push({name: 'edit-contest', params: {contestId}})
      },
      goContestAnnouncement (contestId) {
        this.$router.push({name: 'contest-announcement-list', params: {contestId}})
      },
      goContestProblemList (contestId) {
        this.$router.push({name: 'contest-problem-list', params: {contestId}})
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
