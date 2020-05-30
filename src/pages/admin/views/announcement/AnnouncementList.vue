<template>
  <Panel :title="title">
    <el-table
      v-loading="loading"
      element-loading-text="loading"
      :data="model.announcementList">
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
        prop="createTime"
        label="CreateTime">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="LastUpdateTime">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="Author">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Option"
        width="200">
        <template slot-scope="scope">
          <icon-btn name="Go Edit" icon="el-icon-edit-outline" @click.native="goAnnouncementEdit(scope.row.newsId)"></icon-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="model.announcementCount"
      style="margin-top: 20px;"
      background
      layout="prev, pager, next"
      @current-change="currentChange"
      :page-size="10"
      :total="model.announcementCount">
    </el-pagination>
  </Panel>
</template>

<script>
  import api from '@admin/apis/apis'

  export default {
    data () {
      return {
        title : '',
        newsType : '',
        mode: 'create',
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
        this.newsType = {
          'report-list' : 'report',
          'solution-list' : 'solution'
        }[this.$route.name]
        if(this.newsType === 'report') this.title = 'Report Announcement'
        else if(this.newsType === 'solution') this.title = 'Solution Announcement'
        this.getAnnouncementList()
      },
      // 切换页码回调
      currentChange (page) {
        this.currentPage = page
        this.getAnnouncementList(page)
      },
      getAnnouncementList (page) {
        this.loading = true
        api.getAnnouncementList(this.newsType, page).then(res => {
          this.loading = false
          this.model = res.data.data
        }, _ => {
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
