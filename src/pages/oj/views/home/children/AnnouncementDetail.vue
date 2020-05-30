<template>
  <div class="announcement-detail">
    <el-card>
      <div slot="header">
        <h2>{{model.title}}</h2>
        <p class="announcement-header">
          <span style="color: #666;">Create Time : {{model.createTime}}</span>
          <span style="margin-left: 20px; color: #666;">Update Time : {{model.updateTime}}</span>
          <span style="margin-left: 20px; color: #666;">Creator : {{model.creator}}</span>
        </p>
      </div>
      <div class="announcement-content">
        <vue-markdown :source="model.content" class="markdown-body"></vue-markdown>
      </div>
    </el-card>
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
        model: {
          title: '',
          createTime: '',
          updateTime: '',
          creator: '',
          content: ''
        }
      }
    },
    methods: {
      init: function () {
        let newsId = this.$route.params.newsId
        api.getAnnouncementDetail(newsId).then(res => {
          this.model = res.data.data
        }).catch(_ => {

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
  .announcement-detail {
    margin: 20px 2%;
    .announcement-header {
      display: block;
      margin-top: 5px;
      margin-bottom: 10px;
      color: #737373;
    }
    .announcement-content {
      font-size: 15px;
    }
  }
</style>
