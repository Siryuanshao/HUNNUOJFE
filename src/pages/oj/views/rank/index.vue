<template>
  <div class="rank-list">
    <el-card>
      <div slot="header">
        <div style="display: inline-block; line-height: 45px;">
          <span style="font-size: 18px; font-weight: 600; color: rgb(73, 80, 96);">ACM Rank List</span>
        </div>
      </div>
      <el-table
        :data="model.rankList"
        stripe
        empty-text="now loading!!!"
        :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
        style="font-size: 12px;">
        <el-table-column
          align="center"
          prop="rank"
          label="#">
        </el-table-column>
        <el-table-column
          align="center"
          label="User ID">
          <template slot-scope="scope">
            <a @click="handleProfile(scope.row.userId)">{{scope.row.userId}}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="User's Name">
        </el-table-column>
        <el-table-column
          align="center"
          prop="whatUp"
          label="What' Up">
        </el-table-column>
        <el-table-column
          align="center"
          prop="accept"
          label="Accepts">
        </el-table-column>
        <el-table-column
          align="center"
          prop="submit"
          label="Submits">
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      v-if="model.userCount"
      style="margin-top: 20px;"
      :current-page.sync="currentPage"
      @current-change="handleRoute"
      :page-size="30"
      background
      layout="prev, pager, next"
      :total="model.userCount">
    </el-pagination>
  </div>
</template>

<script>
  import api from '@oj/apis/apis'

  export default {
    mounted () {
      this.init()
    },
    data: function () {
      return {
        buttonDisable: false,
        buttonStyle: 'el-icon-refresh',
        currentPage: null,
        model: {
          rankList: [],
          userCount: 0
        }
      }
    },
    methods: {
      init: function () {
        this.buttonDisable = true
        this.buttonStyle = 'el-icon-loading'
        this.currentPage = this.$route.query.page ? parseInt(this.$route.query.page) : 1
        api.getRankList(this.currentPage).then(res => {
          this.model = res.data.data
          this.buttonDisable = false
          this.buttonStyle = 'el-icon-refresh'
        }).catch(_ => {
          this.buttonDisable = false
          this.buttonStyle = 'el-icon-refresh'
        })
      },
      handleRoute: function () {
        this.$router.push({
          name: 'rank-list',
          query: { page: this.currentPage }
        })
      },
      handleSearch: function () {
        this.$router.push({
          name: 'rank-list',
          query: { page: "1" }
        })
      },
      handleProfile: function (userId) {
        this.$router.push({
          path: '/user-profile',
          query: { userId: userId }
        })
      }
    },
    watch: {
      '$route': function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rank-list {
    margin: 20px 2%;
  }
</style>
