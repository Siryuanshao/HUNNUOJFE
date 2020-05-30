<template>
  <el-card>
    <div slot="header">
      <div style="display: inline-block; line-height: 45px;">
        <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">Contest DashBoard</span>
      </div>
    </div>
    <div>
      <h2>{{model.title}}</h2>
      <p style="color: #666">Running : {{model.startTime}} ~ {{model.endTime}}</p>
      <vue-markdown :source="model.ext" class="markdown-body"></vue-markdown>
    </div>
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
        model: {
          contestId : '',
          title : '',
          type : '',
          startTime : '',
          endTime : '',
          ext : ''
        }
      }
    },
    methods: {
      init: function () {
        const contestId = this.$route.params.contestId
        api.getContestDetail(contestId).then(res => {
          this.model = res.data.data
        }).catch(_ => {

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
