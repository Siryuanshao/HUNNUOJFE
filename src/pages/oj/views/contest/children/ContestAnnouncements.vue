<template>
  <el-card>
    <div slot="header">
      <div style="display: inline-block; line-height: 45px;">
        <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">Contest Announcements</span>
      </div>
      <div style="float: right; line-height: 45px; margin-right: 10px;">
        <div style="display: inline-block;">
          <el-button type="primary" :disabled="buttonDisable" @click="handleRefresh">
            <i :class="buttonStyle"></i>
            <span>Refresh</span>
          </el-button>
        </div>
      </div>
    </div>
    <el-collapse>
      <el-collapse-item v-for="(announcement,index) in model.announcementList" :key="index" :title="announcement.title">
        <vue-markdown :source="announcement.content" class="markdown-body"></vue-markdown>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
  import api from '@oj/apis/apis'

  export default {
    mounted () {
      this.init()
    },
    data () {
      return {
        buttonDisable: false,
        buttonStyle: 'el-icon-refresh',
        model: {
          announcementList : []
        }
      }
    },
    methods: {
      init: function () {
        const contestId = this.$route.params.contestId
        this.buttonDisable = true
        this.buttonStyle = 'el-icon-loading'
        api.getContestAnnouncementList(contestId).then(res => {
          this.model = res.data.data
          this.buttonDisable = false
          this.buttonStyle = 'el-icon-refresh'
        }).catch(_ => {
          this.buttonDisable = false
          this.buttonStyle = 'el-icon-refresh'
        })
      },
      handleRefresh: function () {
        this.init()
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
