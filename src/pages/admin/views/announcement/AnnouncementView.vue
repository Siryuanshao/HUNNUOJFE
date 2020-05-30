<template>
  <panel :title="title">
    <el-form label-position="top" :model="model" ref="form" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Announcement Title" prop="title" required>
            <el-input
              v-model="model.title"
              placeholder="News Title" class="title-input">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="mode === 'create'" label="Contest Type" prop="newsType" required>
            <template v-if="!model.contestId">
              <el-select v-model="model.newsType" placeholder="Please select" style="width: 100%;">
                <el-option label="Report" value="report"></el-option>
                <el-option label="Solution" value="solution"></el-option>
              </el-select>
            </template>
            <template v-else>
              <el-select v-model="model.newsType" placeholder="Please select" style="width: 100%;">
                <el-option label="Contest" value="contest"></el-option>
              </el-select>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Announcement Content" prop="content" required>
        <markdown-editor refId="content" v-model="model.content"></markdown-editor>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click.native="submitAnnouncement('form')">Save</el-button>
  </panel>
</template>

<script>
  import api from '@admin/apis/apis'

  export default {
    mounted() {
      this.init();
    },
    data() {
      return {
        title : '',
        mode : '',
        newsId : '',
        model: {
          newsType: null,
          contestId: null,
          title: '',
          content: '',
        },
        rules: {
          title: [
            { required: true, trigger: 'blur' },
          ],
          newsType: [
            { required: true, trigger: 'blur' },
          ],
          content : [
            { required: true, trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      init() {
        this.newsId = this.$route.params.newsId
        this.model.contestId = this.$route.params.contestId
        this.$refs['form'].resetFields()
        if(this.$route.name.startsWith("edit")) {
          this.mode = 'edit'
          this.title = 'Edit Announcement'
          api.getAnnouncementDetail(this.newsId).then(res => {
            this.model = res.data.data
          }).catch()
        }else{
          this.mode = 'create'
          this.title = 'Create Announcement'
        }
      },
      submitAnnouncement (formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            let funcName = this.mode === 'edit' ? 'updateAnnouncement' : 'createAnnouncement'
            api[funcName](this.model).then(res=> {
              this.$message.success("Upload announcement successfully")
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
