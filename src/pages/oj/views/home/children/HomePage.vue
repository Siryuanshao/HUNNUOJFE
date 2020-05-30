<template>
  <div class="homepage">
    <div class="carousel">
      <el-carousel height="300px" type="card">
        <el-carousel-item v-for="(carousel, index) in model.carousels" :key="index">
          <div v-html="carousel"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="news-section">
      <el-row :gutter="60">
        <el-col :span="12">
          <NewsCard newsType="report" :model="model.reports"></NewsCard>
        </el-col>
        <el-col :span="12">
          <NewsCard newsType="solution" :model="model.solutions"></NewsCard>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import NewsCard from '@oj/components/NewsCard'
  import api from '@oj/apis/apis'

  export default {
    components: { NewsCard },
    mounted () {
      this.init()
    },
    data: function () {
      return {
        model: {
          carousels: [],
          reports: {},
          solutions: {}
        }
      }
    },
    methods: {
      init () {
        api.getHomePage().then(res => {
          this.model = res.data.data
        }).catch(_ => {

        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .homepage{
    margin: auto;
    width: 80%;
    .carousel {
      margin: 80px auto;
    }
    .news-section {
      margin: 20px auto;
      .el-row {
        margin-bottom: 40px;
      }
    }
  }
</style>
