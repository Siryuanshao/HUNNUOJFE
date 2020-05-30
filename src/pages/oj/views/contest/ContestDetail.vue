<template>
  <div class="contest-detail">
    <el-row :gutter="40">
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
      <el-col :span="4">
        <el-card :body-style="{padding: '10px'}">
          <ul class="contest-menu">
            <li @click="handleRoute('contest-dashboard')"><i class="el-icon-data-board"></i><span>Dashboard</span></li>
            <li @click="handleRoute('contest-problem-list')"><i class="el-icon-collection"></i><span>Problems</span></li>
            <li @click="handleRoute('contest-announcement-list')"><i class="el-icon-news"></i><span>Announcements</span></li>
            <li @click="handleRoute('contest-submission-list')"><i class="el-icon-position"></i><span>Submissions</span></li>
            <li @click="handleRoute('contest-ranking')"><i class="el-icon-medal-1"></i><span>Ranking</span></li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    methods: {
      handleRoute: function (route) {
        const contestId = this.$route.params.contestId
        this.$router.push({
          name: route,
          params: {
            contestId: contestId
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contest-detail {
    margin: 20px 2%;
    .contest-menu{
      margin: 0px;
      padding: 0px;
      li{
        font-size: 14px;
        border-bottom: 1px dashed #e9eaec;
        color: #495060;
        display: block;
        text-align: left;
        padding: 15px 0px;
        &:hover {
          background: #f8f8f9;
          border-left: 2px solid #5cadff;
          color: #2d8cf0;
        }
        i{
          font-size: 16px;
          margin-right: 10px;
          vertical-align: middle;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
</style>
