<template>
  <Panel :title="title">
    <el-form ref="form" :model="model" :rules="rules" label-position="top" label-width="70px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item v-if="!model.contestId && model.contestId !== -1" prop="problemId" label="Problem ID" required>
            <el-input type="Number" placeholder="Problem ID(Recommended auto increment)" v-model="model.problemId"></el-input>
          </el-form-item>
          <el-form-item v-else prop="problemId" label="Contest Problem ID" required>
            <el-input type="Number" placeholder="Problem ID(Number, Auto mapping to A, B, C...)" v-model="model.problemId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="title" label="Title" required>
            <el-input placeholder="Title" v-model="model.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="timeLimit" label="Time Limit(ms)">
            <el-input type="Number" placeholder="Time Limit(ms)" v-model="model.timeLimit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="memoryLimit" label="Memory Limit(kB)">
            <el-input type="Number" placeholder="Memory Limit(kB)" v-model="model.memoryLimit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="isSpj" label="Special Judge">
            <el-checkbox v-model="model.isSpj">Use Special Judge</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="description" label="Problem Description">
        <markdown-editor refId="description" v-model="model.description"></markdown-editor>
      </el-form-item>
      <el-form-item prop="inputDesc" label="Input Description">
        <markdown-editor refId="inputDesc" v-model="model.inputDesc"></markdown-editor>
      </el-form-item>
      <el-form-item prop="outputDesc" label="Output Description">
        <markdown-editor refId="outputDesc" v-model="model.outputDesc"></markdown-editor>
      </el-form-item>
      <el-form-item prop="inputSample" label="Input Sample" required>
        <el-input type="textarea" :rows="5" v-model="model.inputSample"></el-input>
      </el-form-item>
      <el-form-item prop="outputSample" label="Output Sample" required>
        <el-input type="textarea" :rows="5" v-model="model.outputSample"></el-input>
      </el-form-item>
      <el-form-item prop="hint" label="Hint">
        <el-input type="textarea" :rows="5" v-model="model.hint"></el-input>
      </el-form-item>
      <el-form-item v-if="!model.contestId && model.contestId !== -1" prop="source" label="Source">
        <el-input placeholder="Source" v-model="model.source"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="submit('form')">Save</el-button>
      </el-form-item>
    </el-form>
  </Panel>
</template>

<script>
  import api from '@admin/apis/apis'

  export default {
    data () {
      return {
        rules: {
          problemId: {required: true, trigger: 'blur'},
          title: {required: true, trigger: 'blur'},
          description: {required: true, trigger: 'blur'},
          inputDesc: {required: true, trigger: 'blur'},
          outputDesc : {required: true, trigger: 'blur'},
          inputSample: {required: true, trigger: 'blur'},
          outputSample: {required: true, trigger: 'blur'},
        },
        mode: '',
        model: {
          problemId : null,
          contestId: null,
          title: '',
          timeLimit: null,
          memoryLimit: null,
          isSpj: false,
          description: '',
          inputDesc: '',
          outputDesc: '',
          inputSample: '',
          outputSample: '',
          hint: '',
          source: ''
        },
        testCaseUploaded: false,
        title: '',
        routeName: ''
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init : function() {
        this.routeName = this.$route.name
        this.title =  {
          'edit-problem': 'Edit Problem',
          'edit-contest-problem': 'Edit Contest Problem',
          'create-problem' : 'Create Problem',
          'create-contest-problem' : 'Create Contest Problem'
        }[this.routeName]

        this.$refs['form'].resetFields()

        if(this.$route.params.problemId) this.model.problemId = this.$route.params.problemId
        if(this.$route.params.contestId) this.model.contestId = this.$route.params.contestId

        if (this.routeName.startsWith('edit')) {
          this.mode = 'edit'
          let funcName = {'edit-problem': 'getProblemDetail', 'edit-contest-problem': 'getContestProblemDetail'}[this.routeName]
          api[funcName](this.model.problemId, this.model.contestId).then(res => {
            this.model = res.data.data
            this.testCaseUploaded = true
          })
        } else {
          this.mode = 'create'
        }
      },
      submit (formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            let funcName = this.mode === 'edit' ? 'updateProblem' : 'createProblem'
            api[funcName](this.model).then(res=> {
              this.$message.success("Upload problem successfully")
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
    watch : {
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

