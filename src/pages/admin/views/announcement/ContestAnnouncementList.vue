<template>
  <Panel title="Contest Announcement">
    <el-table
      v-loading="loading"
      element-loading-text="loading"
      ref="table"
      :data="model.announcementList"
      style="width: 100%">
      <el-table-column
        prop="newsId"
        width="100"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="Author">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Option"
        width="250">
        <template slot-scope="scope">
          <icon-btn name="Go Edit" icon="el-icon-edit-outline" @click.native="goAnnouncementEdit(scope.row.newsId)"></icon-btn>
        </template>
      </el-table-column>
    </el-table>
    <div class="panel-options">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="goCreateContestAnnouncement()">Create</el-button>
    </div>
  </Panel>
</template>

<script>
  import api from '@admin/apis/apis'

  export default {
    data () {
      return {
        contestId : '',
        model: {
          announcementList: [],
          announcementCount: 0,
        },
        loading: true,
        currentPage: null
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.contestId = this.$route.params.contestId
        this.getContestAnnouncementList()
      },
      getContestAnnouncementList () {
        this.loading = true
        api.getContestAnnouncementList(this.contestId).then(res => {
          this.loading = false
          this.model = res.data.data
        }).catch(() => {
          this.loading = false
        })
      },
      goAnnouncementEdit(newsId) {
        this.$router.push({
          name : 'edit-announcement',
          params :{
            newsId : newsId
          }
        })
      },
      goCreateContestAnnouncement() {
        this.$router.push({
          name : 'create-contest-announcement',
          params: this.contestId
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

<style>

</style>
