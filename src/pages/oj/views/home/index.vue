<template>
  <div class="home">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'homepage' }">
          <span>首页</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'about-icpc' }">
          <span>ACM-ICPC概况</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'announcement-list', params : {newsType : 'report'}}">
          <span>新闻通知</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name : 'announcement-list', params : {newsType : 'solution'} }">
          <span>解题报告</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <transition name="fadeInUp" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  .home {
    min-height: 500px;
    .breadcrumb {
      margin: 10px 30px;
      span {
        font-weight: 600 !important;
        color: #666 !important;
      }
    }
  }
</style>
