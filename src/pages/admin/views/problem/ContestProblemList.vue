<template>
  <Panel title="Contest Problem List">
    <el-table
      v-loading="loading"
      element-loading-text="loading"
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
        fixed="right"
        width="250"
        label="Operation">
        <template slot-scope="scope">
          <icon-btn name="Go Edit" icon="el-icon-edit-outline" @click.native="goContestProblemEdit(scope.row.problemId)"></icon-btn>
        </template>
      </el-table-column>
    </el-table>
    <div class="panel-options">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="goCreateContestProblem">Create</el-button>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addProblemDialogVisible">Add From Public Problem</el-button>
    </div>
    <el-dialog
      title="Add From Public Problem"
      :visible.sync="showDialog"
      width="25%">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="problemId" required>
          <el-input type="Number" v-model="form.problemId" placeholder="Problem ID"></el-input>
        </el-form-item>
        <el-form-item prop="mappingId" required>
          <el-input type="Number" v-model="form.mappingId" placeholder="Mapping ID"></el-input>
        </el-form-item>
        <el-form-item prop="aliasTitle" required>
          <el-input v-model="form.aliasTitle" placeholder="Alias Title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="addProblemFromPublic('form')">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </Panel>
</template>

<script>
  import api from '@admin/apis/apis'

  export default {
    data () {
      return {
        model : {
          problemList : []
        },
        form: {
          problemId: '',
          contestId: '',
          mappingId: '',
          aliasTitle: ''
        },
        rules: {
          problemId: [
            { required: true, trigger: 'blur' }
          ],
          mappingId: [
            { required: true, trigger: 'blur' }
          ],
          aliasTitle: [
            { required: true, trigger: 'blur' }
          ]
        },
        loading: false,
        contestId: '',
        showDialog: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init() {
        this.contestId = this.form.contestId = this.$route.params.contestId
        this.getContestProblemList()
      },
      getContestProblemList () {
        this.loading = true
        api.getContestProblemList(this.contestId).then(res => {
          this.model = res.data.data
          this.loading = false
        }).catch(_ => {

        })
      },
      goContestProblemEdit (problemId) {
        this.$router.push({name: 'edit-contest-problem', params: {problemId: problemId, contestId: this.contestId}})
      },
      goCreateContestProblem () {
        this.$router.push({name: 'create-contest-problem', params: {contestId: this.contestId}})
      },
      addProblemDialogVisible() {
        this.showDialog = true
      },
      addProblemFromPublic(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            api.addProblemFromPublic(this.form).then(res => {
              this.$message.success("Upload problem successfully")
              this.getContestProblemList()
              this.showDialog = false
            }).catch(_ => {

            })
          }else{
            return false
          }
        })
      }
    },
    watch: {
      '$route': function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.init()
        }
      }
    }
  }
</script>

<style>

</style>
