<template>
  <Panel :title="title">
    <el-form :model="model" label-position="top" :rules="rules" ref="form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="title" label="Title" required>
            <el-input v-model="model.title" placeholder="Title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="type" label="Contest Type" required>
            <el-select v-model="model.type" placeholder="Please select" style="width: 100%;">
              <el-option :key="0" label="Public" :value="0"></el-option>
              <el-option :key="1" label="Private" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="startTime" label="Start Time" required>
            <el-date-picker
              v-model="model.startTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="Start Time"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="endTime" label="End Time" required>
            <el-date-picker
              v-model="model.endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="End Time"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="ext" label="Ext">
        <markdown-editor refId="ext" v-model="model.ext"></markdown-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="saveContest('form')">save</el-button>
      </el-form-item>
    </el-form>
  </Panel>
</template>

<script>
  import api from '@admin/apis/apis'

  export default {
    mounted () {
      this.init()
    },
    data () {
      return {
        mode : '',
        title: '',
        model : {
          contestId : '',
          title : '',
          type : '',
          startTime : '',
          endTime : '',
          ext : ''
        },
        rules: {
          title: [
            { required: true, trigger: 'blur' }
          ],
          type: [
            { required: true, trigger: 'blur' }
          ],
          startTime: [
            { required: true, trigger: 'blur' }
          ],
          endTime: [
            { required: true, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init() {
        if (this.$route.name === 'edit-contest') {
          this.mode = 'edit'
          this.title = 'Edit Contest'
          this.$refs['form'].resetFields()
          api.getContestDetail(this.$route.params.contestId).then(res => {
            this.model = res.data.data
          }).catch(_ => {

          })
        }else{
          this.mode = 'create'
          this.title = 'Create Contest'
        }
      },
      saveContest (formName) {
        this.$refs[formName].validate((valid) =>{
          if(valid) {
            let funcName = this.mode === 'edit' ? 'updateContest' : 'createContest'
            api[funcName](this.model).then(res => {
              this.$message.success('Upload contest successfully')
              if(this.mode === 'create') {
                this.$refs[formName].resetFields()
              }
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
