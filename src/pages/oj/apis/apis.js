import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'

export default {
  login: function (userId, password) {
    return ajax('post', 'login', {
      data: {
        userId,
        password
      }
    })
  },
  getInfo: function () {
    return ajax('get', 'info')
  },
  logout: function () {
    return ajax('get', 'logout')
  },
  register: function (userId, userName, password) {
    return ajax('post', 'register', {
      data: {
        userId,
        userName,
        password
      }
    })
  },
  forgetPassword: function (userId, email) {
    return ajax('post', 'forgetPassword', {
      data: {
        userId,
        email
      }
    })
  },
  getUserProfile: function (userId) {
    return ajax('get', 'profile', {
      params: {
        userId
      }
    })
  },
  updateUserProfile: function (userName, school, grade, whatUp, sex) {
    return ajax('post', 'updateProfile', {
      data: {
        userName,
        school,
        grade,
        whatUp,
        sex
      }
    })
  },
  updateUserPassword: function (oldPassword, newPassword) {
    return ajax('post', 'updatePassword', {
      data: {
        oldPassword,
        newPassword
      }
    })
  },
  updateUserEmail: function (currentPassword, newEmail) {
    return ajax('post', 'updateEmail', {
      data: {
        currentPassword,
        newEmail
      }
    })
  },
  getHomePage: function () {
    return ajax('get', 'homePage')
  },
  getAnnouncementList: function (newsType, page) {
    return ajax('get', 'announcementList', {
      params: {
        newsType,
        page
      }
    })
  },
  getAnnouncementDetail: function (newsId) {
    return ajax('get', 'announcementDetail', {
      params: {
        newsId
      }
    })
  },
  getRankList: function (page) {
    return ajax('get', 'rankList', {
      params: {
        page
      }
    })
  },
  getProblemList: function (description, page) {
    return ajax('get', 'problemList', {
      params: {
        description,
        page
      }
    })
  },
  getProblemDetail: function (problemId) {
    return ajax('get', 'problemDetail', {
      params: {
        problemId
      }
    })
  },
  getProblemSummary: function (problemId, language, page) {
    return ajax('get', 'problemSummary', {
      params: {
        problemId,
        language,
        page
      }
    })
  },
  getSubmissionList: function (userId, problemId, result, language, page) {
    return ajax('get', 'submissionList', {
      params: {
        problemId,
        userId,
        result,
        language,
        page
      }
    })
  },
  getSubmissionDetail: function (runId) {
    return ajax('get', 'submissionDetail', {
      params: {
        runId
      }
    })
  },
  getContestList: function (description, page) {
    return ajax('get', 'contestList', {
      params: {
        description,
        page
      }
    })
  },
  getContestDetail : function(contestId) {
    return ajax('get', 'contestDetail', {
      params : {
        contestId
      }
    })
  },
  getContestProblemDetail(problemId, contestId) {
    return ajax('get', 'contest/problemDetail', {
      params: {
        problemId,
        contestId
      }
    })
  },
  getContestRankList: function (contestId) {
    return ajax('get', 'contest/rankList', {
      params: {
        contestId
      }
    })
  },
  getContestProblemList: function (contestId) {
    return ajax('get', 'contest/problem', {
      params: {
        contestId
      }
    })
  },
  getContestAnnouncementList: function (contestId) {
    return ajax('get', 'contest/announcement', {
      params: {
        contestId
      }
    })
  },
  getContestSubmissionList: function (userId, problemId, contestId, result, language, page) {
    return ajax('get', 'contest/submission', {
      params: {
        problemId,
        contestId,
        userId,
        result,
        language,
        page
      }
    })
  },
  checkUserIfExist: function (userId) {
    return ajax('get', 'checkUserIfExist', {
      params: {
        userId
      }
    })
  }
}


function ajax (method, url, options) {
  let params, data
  if (options != null) {
    params = options.params || {}
    data = options.data || {}
  } else {
    params = data = {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      data
    }).then((res) => {
      if (res.data.error) {
        if (res.data.err_info !== "session非法") {
          Vue.prototype.$message.error(res.data.err_info)
        } else {
          Vue.prototype.$message.warning(res.data.err_info)
        }
        reject(res)
      } else {
        resolve(res)
      }
    }, (res) => {
      Vue.prototype.$message.error('API request failed, please refresh later')
      reject(res)
    })
  })
}
