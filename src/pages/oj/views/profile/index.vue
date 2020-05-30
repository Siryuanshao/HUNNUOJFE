<template>
  <el-row>
    <el-col :span="12">
      <div class="profile">
        <div class="profile-photo">
          <img v-if="model.avatar" :src="model.avatar"/>
        </div>
        <el-card class="profile-main">
          <div class="profile-main-id">
            <span style="color: #666;">ID : {{model.userId}}</span>
          </div>
          <div class="profile-main-name">
            <template v-if="model.sex === 0">
              <i class="el-icon-male" style="color: rgb(30, 144, 255);"></i>
            </template>
            <template v-else-if="model.sex === 1">
              <i class="el-icon-female" style="color: rgb(255, 182, 193);"></i>
            </template>
            <template v-else>
              <i class="el-icon-user-solid"></i>
            </template>
            <span style="color: #999;">{{model.userName}}</span>
          </div>
          <div v-if="model.whatUp" class="profile-main-sign">
            <p><span>{{model.whatUp}}</span></p>
          </div>
          <div class="divider"></div>
          <el-row class="profile-main-submission">
            <el-col :span="6" class="flex-block">
              <p>Rank</p>
              <span class="emphasis">{{model.rank}}</span>
            </el-col>
            <el-col :span="6" class="flex-block">
              <p>Accept</p>
              <span class="emphasis">{{model.accept}}</span>
            </el-col>
            <el-col :span="6" class="flex-block">
              <p>Attempt</p>
              <span class="emphasis">{{model.attempt}}</span>
            </el-col>
            <el-col :span="6" class="flex-block">
              <p>Submit</p>
              <span class="emphasis">{{model.submit}}</span>
            </el-col>
          </el-row>
          <div class="profile-main-content">
            <div style="margin: auto;">
              <el-row>
                <el-col :span="12">
                  <img src="../../../../assets/profile/createtime.svg" /><span>create time:</span>
                </el-col>
                <el-col :span="12">
                  <span>{{model.createTime}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <img src="../../../../assets/profile/lastlogin.svg" /><span>last login:</span>
                </el-col>
                <el-col :span="12">
                  <span>{{model.lastLogin}}</span>
                </el-col>
              </el-row>
              <el-row v-if="model.school">
                <el-col :span="12">
                  <img src="../../../../assets/profile/school.svg" /><span>school:</span>
                </el-col>
                <el-col :span="12">
                  <span>{{model.school}}</span>
                </el-col>
              </el-row>
              <el-row v-if="model.grade">
                <el-col :span="12">
                  <img src="../../../../assets/profile/grade.svg" /><span>grade:</span>
                </el-col>
                <el-col :span="12">
                  <span>{{model.grade}}</span>
                </el-col>
              </el-row>
              <el-row v-if="model.email">
                <el-col :span="12">
                  <img src="../../../../assets/profile/email.svg" /><span>email:</span>
                </el-col>
                <el-col :span="12">
                  <span>{{model.email}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="problem-list">
        <el-card>
          <h3>List of Solved problems</h3>
          <div class="btn">
            <div class="problem-list-btn" v-for="(problemID,index) in model.solveList" :key="index">
              <el-button @click="handleProblem(problemID)" style="width: 80px; font-size: 12px;">{{problemID}}</el-button>
            </div>
          </div>
          <h3>List of Unsolved problems</h3>
          <div class="btn">
            <div class="problem-list-btn" v-for="(problemID,index) in model.attemptList" :key="index">
              <el-button @click="handleProblem(problemID)" style="width: 80px; font-size: 12px;">{{problemID}}</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import api from '@oj/apis/apis'

  export default {
    mounted () {
      this.init()
    },
    data: function () {
      return {
        model: {
          userId : '',
          userName : '',
          createTime: '',
          lastLogin: '',
          school: '',
          grade: '',
          email: '',
          avatar: '',
          sex: '',
          whatUp: '',
          rank: '',
          accept: '',
          attempt: '',
          submit: '',
          solveList: [],
          attemptList: []
        }
      }
    },
    methods: {
      init: function () {
        let userId = this.$route.query.userId
        api.getUserProfile(userId).then(res => {
          this.model = res.data.data
        }).catch(_ => {

        })
      },
      handleProblem: function (problemId) {
        this.$router.push({
          name: 'problem-detail',
          params: { problemId: problemId }
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
  .profile {
    position: relative;
    margin: 150px 75px 60px 125px;
    &-photo {
      position: absolute;
      top: -60px;
      left: 50%;
      transform: translate(-50%);
      z-index: 1;
      img {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        box-shadow: 0 0 1px 0;
      }
    }
    &-main {
      .divider {
        border-bottom: 1px solid #999;
        margin-bottom: 1px;
      }
      &-id {
        margin-top: 60px;
        text-align: center;
        font-size: 20px;
        line-height: 30px;
        font-weight: 600;
      }
      &-sign {
        text-align: center;
        p {
          font-size: 14px;
          line-height: 26px;
          img {
            vertical-align: middle;
            width: 25px;
          }
        }
      }
      &-name {
        margin-top: 10px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 20px;
        line-height: 30px;
        font-weight: 600;
      }
      &-content {
        margin-top: 30px;
        .el-row {
          margin: 10px;
          span {
            font-size: 13px;
            line-height: 18px;
            vertical-align: middle;
          }
          img {
            height: 18px;
            margin-right: 5px;
            vertical-align: middle;
          }
        }
      }
      &-submission {
        margin-top: 30px;
        .flex-block {
          color: #666;
          text-align: center;
          border-left: 1px solid #999999;
          &:first-child {
            border-left: 0px;
          }
          p {
            font-size: 14px;
            line-height: 21px;
          }
          .emphasis {
            color: #337ab7;
            font-size: 20px;
            font-weight: 600;
          }
        }
      }
    }
  }
  .problem-list {
    margin: 150px 125px 60px 0px;
    .btn {
      margin-top: 15px;
      .problem-list-btn {
        display: inline-block;
        margin: 5px;
      }
    }
  }
</style>
