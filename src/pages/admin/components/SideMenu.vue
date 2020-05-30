<template>
  <el-menu
    class="vertical_menu"
    @select="handleRoute">
    <div class="logo">
      <img src="../../../assets/admin.svg" alt="oj admin"/>
    </div>
    <el-submenu index="Announcement">
      <template slot="title"><i class="el-icon-menu"></i>Announcement</template>
      <el-menu-item index="report-list">Report List</el-menu-item>
      <el-menu-item index="solution-list">Solution List</el-menu-item>
      <el-menu-item index="create-announcement">Create Announcement</el-menu-item>
    </el-submenu>
    <el-submenu index="problem">
      <template slot="title"><i class="el-icon-s-claim"></i>Problem</template>
      <el-menu-item index="problem-list"><span>Problem List</span></el-menu-item>
      <el-menu-item index="create-problem"><span>Create Problem</span></el-menu-item>
    </el-submenu>
    <el-submenu index="contest">
      <template slot="title"><i class="el-icon-date"></i>Contest</template>
      <el-menu-item index="contest-list"><span>Contest List</span></el-menu-item>
      <el-menu-item index="create-contest"><span>Create Contest</span></el-menu-item>
    </el-submenu>
    <el-menu-item v-if="isSuperAdminRole" index="super-admin"><i class="el-icon-user"></i><span>Super Admin</span></el-menu-item>
  </el-menu>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    mounted() {
      if(!this.modalStatus || !this.isAdminRole) {
        if(this.modalStatus && !this.isAdminRole) {
          this.$message.error("User have not permission")
        }
        this.$router.push({name : 'login'})
      }
    },
    computed : {
      ...mapState([
        'modalStatus'
      ]),
      ...mapGetters([
        'isAdminRole', 'isSuperAdminRole'
      ])
    },
    methods: {
      handleRoute: function (route) {
        this.$router.push({
          name : route
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .vertical_menu {
    overflow: auto;
    width: 205px;
    height: 100%;
    position: fixed !important;
    z-index: 100;
    top: 0;
    bottom: 0;
    left: 0;
    .logo {
      margin: 20px 0;
      text-align: center;
      img {
        background-color: #fff;
        border-radius: 50%;
        border: 3px solid #fff;
        width: 75px;
        height: 75px;
      }
    }
  }
</style>
