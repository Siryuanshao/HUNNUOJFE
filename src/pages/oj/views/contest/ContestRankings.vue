<template>
  <div class="contest-rank">
    <el-card>
      <div slot="header">
        <div style="display: inline-block; line-height: 45px;">
          <el-page-header @back="goContest" content="Contest RankList" style="line-height: 45px;"></el-page-header>
        </div>
        <div style="float: right; line-height: 45px; margin-right: 10px;">
          <div style="display: inline-block;">
            <el-button type="primary" :disabled="buttonDisable" @click="handleRefresh">
              <i :class="buttonStyle"></i>
              <span>Refresh</span>
            </el-button>
          </div>
        </div>
      </div>
      <el-table
        v-if="model.rankList"
        :data="model.rankList"
        stripe
        border
        empty-text="now loading!!!"
        :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
        :cell-style="computeCellStyle"
        :style="computeFormWidth">
        <el-table-column
          align="center"
          label="#"
          width="100"
          prop="rank">
        </el-table-column>
        <el-table-column
          align="center"
          width="200"
          label="User">
          <template slot-scope="scope">
            <span @click="handleProfile(scope.row.userId)" class="linker">{{scope.row.userId}}</span><br/>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="Accept"
          width="100"
          prop="accept">
        </el-table-column>
        <el-table-column
          align="center"
          label="Penalty"
          width="100"
          prop="penalty">
        </el-table-column>
        <el-table-column
          v-for="(problemId, index) in model.problemSet"
          :key="index"
          align="center"
          width="100"
          :label="problemId | mappingToCharacter">
          <template slot-scope="scope">
            <template v-if="scope.row.progress[index].rankStatus">
              <span>{{scope.row.progress[index].tryTime}}</span><br />
              <span>{{scope.row.progress[index].acceptTime}}</span>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
        model: {
          problemSet: null,
          rankList: null
        },
      }
    },
    computed: {
      computeFormWidth: function() {
        return 'font-size: 12px; width: ' + (5 + this.model.problemSet.length) * 100 + 'px;'
      }
    },
    methods: {
      init: function () {
        let contestId = this.$route.params.contestId
        this.buttonDisable = true
        this.buttonStyle = 'el-icon-loading'
        api.getContestRankList(contestId).then(res => {
          this.model = res.data.data
          this.buttonDisable = false
          this.buttonStyle = 'el-icon-refresh'
        }).catch(_ => {
          this.buttonDisable = false
          this.buttonStyle = 'el-icon-refresh'
        })
      },
      computeCellStyle: function (position) {
        let columnIndex = position.columnIndex - 4
        let rowIndex = position.rowIndex
        if (!this.model.problemSet || columnIndex < 0) return ''
        else {
          let rankStatus = this.model.rankList[rowIndex].progress[columnIndex].rankStatus
          if(rankStatus === 0) return ''
          else if(rankStatus === 1) return 'background-color : rgb(84, 171, 236)'
          else if (rankStatus === 2) return 'background-color : rgb(131, 233, 137)'
          else return 'background-color : rgb(239, 133, 134)'
        }
      },
      handleProfile: function (userId) {
        this.$router.push({
          name: 'user-profile',
          query: { userId: userId }
        })
      },
      handleRefresh: function () {
        this.init()
      },
      goContest: function () {
        let cid = this.$route.params.contestId
        this.$router.push({
          name: 'contest-problem-list',
          params: {
            contestId: cid
          }
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
  .contest-rank {
    margin: 20px 2%;
    span.linker {
      color: #337ab7;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>

