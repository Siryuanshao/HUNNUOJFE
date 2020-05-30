<template>
  <div>
    <template v-if="model.sectionName">
      <el-card class="news-card">
        <div slot="header">
          <div style="margin:-18px -20px; padding:10px 20px; background: #f5f5f5; color: rgb(73, 80, 96);">
            <span>{{model.sectionName}}</span>
            <a @click="handleRoute" style="display: inline; float: right; color: rgb(73, 80, 96);">more..</a>
          </div>
        </div>
        <ul class="news-block">
          <li v-for="(message,index) in model.messages" :key="index">
            <el-row :gutter="20">
              <el-col :span="17">
                <div class="news-title">
                  <a @click="goAnnouncement(message)">{{message.title}}</a>
                </div>
              </el-col>
              <el-col :span="7">
                {{message.updateTime}}
              </el-col>
            </el-row>
          </li>
        </ul>
      </el-card>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      newsType: {
        type: String,
        default: ''
      },
      model: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      handleRoute: function () {
        if (this.newsType) {
          this.$router.push({
            name: 'announcement-list',
            params: {newsType : this.newsType}
          })
        }
      },
      goAnnouncement: function (message) {
        this.$router.push({
          name: 'announcement-detail',
          params: { newsId: message.newsId }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .news-card {
    border-radius: 10px;
    width: 100%;
    .news-block {
      margin-top: -10px;
      padding-left: 0;
      li {
        padding-top: 10px;
        list-style: none;
        padding-bottom: 15px;
        font-size: 12px;
        border-bottom: 1px solid rgba(187, 187, 187, 0.5);
        &:last-child {
          border-bottom: none;
        }
        .news-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
