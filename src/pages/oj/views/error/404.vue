<template>
  <div class="error404">
    <div style="background-color: #ffffff; padding: 20px;">
      <div slot="header" class="header404">
        <span style="font-weight: 600; color: rgb(241, 158, 194)">Error（艾拉），没听清楚，请再说一遍</span>
      </div>
      <div class="i_love_isla">
        <img src="../../../../assets/animation/isla.webp" />
      </div>
      <div class="footer404">
        <div style="width: 47%; float: left; display: inline-block;">
          <el-button type="primary" @click="goHome" style="width: 100%;">Go Home</el-button>
        </div>
        <div style="width: 47%; float: right; display: inline-block;">
          <el-button type="warning" @click="gotBack" style="width: 100%;">Go Back</el-button>
        </div>
        <div style="clear: both;"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goHome: function () {
        this.$router.replace({name : 'homepage'})
      },
      gotBack: function () {
        this.$router.go(-1)
      }
    }
  }

</script>

<style lang="scss" scoped>
  .error404 {
    margin: 20px 20%;
    .header404 {
      font-size: 30px;
      text-align: center;
    }
    .i_love_isla {
      text-align: center;
      img {
        border-radius: 10px;
        height: 500px;
      }
    }
    .footer404 {
      margin: 20px auto;
      width: 400px;
    }
  }
</style>
