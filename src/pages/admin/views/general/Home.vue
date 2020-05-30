<template>
  <div class="container">
    <SideMenu></SideMenu>
    <ul id="header">
      <li @click="handleCommand('logout')" style="margin-left: 20px; cursor: pointer;">Logout</li>
      <li>{{profile.userName}}</li>
    </ul>
    <div class="content-app">
      <transition name="fadeInUp" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import SideMenu from '@admin/components/SideMenu'
  import api from '@admin/apis/apis'

  export default {
    data () {
      return {

      }
    },
    components: {
      SideMenu
    },
    computed : {
      ...mapState([
        'modalStatus', 'profile'
      ])
    },
    methods: {
      handleCommand (command) {
        if (command === 'logout') {
          api.logout().then(() => {
            this.$router.push({name: 'login'})
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .container {
    overflow: auto;
    font-weight: 400;
    height: 100%;
    -webkit-font-smoothing: antialiased;
    background-color: #EDECEC;
    overflow-y: scroll;
    min-width: 1000px;
  }
  #header {
    list-style-type: none;
    margin: 0;
    overflow: hidden;
    text-align: right;
    padding-left: 210px;
    padding-right: 30px;
    line-height: 50px;
    height: 50px;
    color: #333333;
    background: #fff;
    .screen-full {
      margin-right: 8px;
    }
    li {
      float: right;
    }
  }
  .content-app {
    padding-top: 1px;
    padding-left: 205px;
  }
</style>
