<template>
  <div class="setting-container">
    <el-card>
      <el-row type="flex">
        <el-col :span="4">
          <el-menu
            default-active="profile-settings"
            @select="handleRoute"
            text-color="#666">
            <div class="avatar-editor">
              <img :src="profile.avatar"/>
            </div>
            <el-divider></el-divider>
            <el-menu-item index="profile-settings" style="text-align: center;">Profile</el-menu-item>
            <el-menu-item index="account-settings" style="text-align: center;">Account</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data: function () {
      return {

      }
    },
    computed: {
      ...mapState([
        'profile'
      ])
    },
    methods: {
      handleRoute: function (route) {
        this.$router.push({name : route})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .setting-container {
    width: 90%;
    min-height: 800px;
    margin: 20px auto;
    .avatar-editor {
      text-align: center;
      img {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        box-shadow: 0 0 1px 0;
      }
    }
  }
</style>
