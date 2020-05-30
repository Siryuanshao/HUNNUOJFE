<template>
  <div class="announcement-list">
    <el-card>
      <div slot="header">
        <div style="display: inline-block; line-height: 25px;">
          <span style="font-size: 16px; font-weight: 500; color: rgb(73, 80, 96);">{{model.sectionName}}</span>
        </div>
      </div>
      <ul class="announcements">
        <li v-for="(announcement,index) in model.announcementList" :key="index">
          <el-row>
            <el-col :span="16">
              <a @click="goAnnouncement(announcement.newsId)">{{announcement.title}}</a>
            </el-col>
            <el-col :span="4">{{announcement.creator}}</el-col>
            <el-col :span="4">{{announcement.updateTime}}</el-col>
          </el-row>
        </li>
      </ul>
    </el-card>
    <el-pagination
      v-if="model.announcementCount"
      style="margin-top: 20px;"
      :current-page.sync="currentPage"
      @current-change="handleRoute"
      :page-size="10"
      background
      layout="prev, pager, next"
      :total="model.announcementCount">
    </el-pagination>
  </div>
</template>

<script>
  import api from '@oj/apis/apis'

  export default {
    mounted () {
      this.init()
    },
    data: function () {
      return {
        section: null,
        currentPage: null,
        model: {
          sectionName: '',
          announcementList: [],
          announcementCount: 0
        }
      }
    },
    methods: {
      init: function () {
        this.section = this.$route.params.newsType
        this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
        api.getAnnouncementList(this.section, this.currentPage).then(res => {
          this.model = res.data.data
        }).catch(_ => {

        })
      },
      handleRoute: function () {
        this.$router.push({
          name: 'announcement-list',
          params: { newsType : this.section},
          query: { page: this.currentPage }
        })
      },
      goAnnouncement: function (newsId) {
        this.$router.push({
          name: 'announcement-detail',
          params: { newsId: newsId }
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
  .announcement-list {
    margin: 20px 2%;
    .announcements {
      margin-top: -10px;
      padding-left: 0;
      li {
        padding-top: 10px;
        list-style: none;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(187, 187, 187, 0.5);
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
