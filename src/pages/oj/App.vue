<template>
  <div id="app">
    <NavBar></NavBar>
    <transition name="fadeInUp" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="footer">
      <p>
        Hunan Normal University Online Judge {{version}}<br />
        Design & Developer : <a href="https://github.com/Siryuanshao" target="_blank">Siryuanshao</a><br/>
        OpenSource Project & Bug Report: <a href="https://github.com/Siryuanshao/HUNNUOJDOCS" target="_blank">Online Judge</a><br/>
        [THANKS TO] <a href="https://github.com/QingdaoU/OnlineJudge" target="_blank">qduoj</a>,
        <a href="https://cn.vuejs.org/" target="_blank">vue</a>,
        <a href="https://element.eleme.cn/#/zh-CN" target="_blank">element-ui</a>
      </p>
    </div>
  </div>
</template>

<script>
  import NavBar from '@oj/components/Navbar'
  export default {
    components: { NavBar },
    mounted() {
      this.year = new Date().getFullYear()
    },
    data() {
      return {
        year : '',
        version : '0.1.0'
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 1.5;
    background-image: url(../../assets/background.png);
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }
  .footer {
    margin-top: 40px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 12px;
    color: #666;
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
