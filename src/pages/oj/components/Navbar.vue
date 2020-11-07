<template>
  <div class="header">
    <el-menu
      mode="horizontal"
      @select="handleRoute"
      text-color="#666"
      active-text-color="rgb(17, 128, 128)">
      <div class="header-logo">
        <span>HUNNU Online Judge</span>
      </div>
      <el-menu-item index="homepage"><i class="el-icon-s-home"></i>Home</el-menu-item>
      <el-menu-item index="problem-list"><i class="el-icon-s-opportunity"></i>Problems</el-menu-item>
      <el-menu-item index="submission-list"><i class="el-icon-s-marketing"></i>Status</el-menu-item>
      <el-menu-item index="contest-list"><i class="el-icon-trophy-1"></i>Contest</el-menu-item>
      <el-menu-item index="rank-list"><i class="el-icon-s-data"></i>ACM Rank</el-menu-item>
      <el-menu-item index="faqs"><i class="el-icon-question"></i>FAQs</el-menu-item>
      <li class="header-userInfo">
        <template v-if="!modalStatus">
          <div class="header-userInfo-notLogin">
            <el-button type="primary" @click="handleRoute('login')">Login</el-button>
            <el-button type="success" @click="handleRoute('register')">Register</el-button>
          </div>
        </template>
        <template v-else>
          <el-dropdown trigger="hover">
					<span class="el-dropdown-link header-userInfo-login">
            <img :src="profile.avatar"/>
            <i class="el-icon-caret-bottom" style="color: #666666"></i>
					</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleRoute('user-profile')">Profile</el-dropdown-item>
              <el-dropdown-item @click.native="handleRoute('profile-settings')">Update</el-dropdown-item>
              <el-dropdown-item divided @click.native="handleLogout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </li>
    </el-menu>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import api from '@oj/apis/apis'
  import storage from 'Utils/storage'
  import { STORAGE_KEY } from 'Utils/constants'

  export default {
    mounted () {
      if (storage.get(STORAGE_KEY.AUTHENTICATE)) {
        this.getProfile()
      }
    },
    computed: {
      ...mapState([
        'modalStatus', 'profile'
      ])
    },
    methods: {
      ...mapMutations([
        'clearProfile'
      ]),
      ...mapActions([
        'getProfile'
      ]),
      handleLogout: function () {
        this.$confirm('Confirm Logout?', 'Tips', {
        }).then(_ => {
          api.logout().then(_ => {
            this.$router.replace({name : 'homepage'}).catch(_ => {})
            this.clearProfile()
          })
        }).catch(_ => {

        })
      },
      handleRoute: function (route) {
        this.$router.push({
          name : route
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header{
    height: 60px;
    width: 100%;
    min-width: 1200px;
    box-shadow: 0px 0px 5px #888888;
    &-logo {
      margin: 0px 2%;
      font-size: 20px;
      line-height: 60px;
      float: left;
      color: #666;
    }
    &-userInfo {
      position: absolute;
      right: 10px;
      float: right;
      margin-right: 15px;
      line-height: 60px;
      height: 60px;
      &-notLogin {

      }
      &-login {
        font-size: 15px;
        cursor: pointer;
        color: #fff;
        img {
          float: left;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px;
        }
      }
    }
  }
</style>
