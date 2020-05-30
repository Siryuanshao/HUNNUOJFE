<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    background-color: #324157;
  }
  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(0, 30px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  .fadeInUp-enter-active {
    animation: fadeInUp .8s;
  }
</style>
