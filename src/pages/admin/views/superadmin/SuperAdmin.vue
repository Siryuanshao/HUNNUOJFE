<template>
  <Panel title="Super Admin Role">
    <el-form inline>
      <el-form-item label="Rejudge Submission">
        <el-input v-model="runId" placeholder="Run ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="rejudgeSubmission">submit</el-button>
      </el-form-item>
    </el-form>
    <el-form inline>
      <el-form-item label="Assign User Role">
        <el-input v-model="userId" placeholder="User ID"></el-input>
      </el-form-item>
      <el-select v-model="userType" placeholder="User Role">
        <el-option label="admin" value="Admin"></el-option>
        <el-option label="regular" value="Regular"></el-option>
      </el-select>
      <el-form-item style="margin-left: 10px;">
        <el-button type="primary" @click="updateUserRole">submit</el-button>
      </el-form-item>
    </el-form>
  </Panel>
</template>

<script>
  import api from '@admin/apis/apis'

  export default {
    data () {
      return {
        runId: '',
        userId: '',
        userType: '',
      }
    },
    methods: {
      rejudgeSubmission() {
        if(this.runId) {
          api.rejudgeSubmission(this.runId).then(res => {
            this.$message.success('rejudge submission successfully')
            this.runId = ''
          }).catch(_ => {

          })
        }
      },
      updateUserRole() {
        if(this.userId && this.userType) {
          api.updateUserRole(this.userId, this.userType).then(res => {
            this.$message.success('Update user role successfully')
            this.userId = this.userType = ''
          }).catch(_ => {

          })
        }
      }
    }
  }
</script>

<style>

</style>
