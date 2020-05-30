<template>
  <Panel title="Problem List">
    <div slot="header">
      <el-input
        v-model="keyword"
        prefix-icon="el-icon-search"
        @keyup.enter.native="currentChange"
        placeholder="Keywords">
      </el-input>
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="loading"
      ref="table"
      :data="model.problemList">
      <el-table-column
        prop="problemId"
        width="150"
        label="Display ID">
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title">
      </el-table-column>
      <el-table-column
        prop="source"
        label="Source">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="250"
        label="Operation">
        <template slot-scope="scope">
          <icon-btn name="Go Edit" icon="el-icon-edit-outline" @click.native="goEdit(scope.row.problemId)"></icon-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="model.problemCount"
      style="margin-top: 20px;"
      :current-page.sync="currentPage"
      background
      layout="prev, pager, next"
      @current-change="currentChange"
      :page-size="30"
      :total="model.problemCount">
    </el-pagination>
  </Panel>
</template>

<script>
  import api from '@admin/apis/apis'

  export default {
    data () {
      return {
        currentPage: null,
        model : {
          problemList: [],
          problemCount: 0
        },
        keyword: '',
        loading: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init() {
        this.getProblemList()
      },
      // 切换页码回调
      currentChange () {
        this.getProblemList(this.currentPage)
      },
      getProblemList (page) {
        this.loading = true
        api.getProblemList(this.keyword, page).then(res => {
          this.model = res.data.data
          this.loading = false
        }).catch(_ => {

        })
      },
      goEdit (problemId) {
        this.$router.push({name: 'edit-problem', params: {problemId}})
      }
    },
    watch: {
      '$route' : function (newVal, oldVal) {
        if(newVal !== oldVal) {
          this.init()
        }
      }
    }
  }
</script>

<style>

</style>
