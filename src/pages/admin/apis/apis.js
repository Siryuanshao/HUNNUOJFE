import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = '/api'

export default {
  login (userId, password) {
    return ajax('post', 'login', {
      data: {
        userId,
        password
      }
    })
  },
  logout () {
    return ajax('get', 'logout')
  },
  getInfo () {
    return ajax('get', 'info')
  },
  createAnnouncement (data) {
    return ajax('post', 'admin/createAnnouncement', {
      data
    })
  },
  updateAnnouncement (data) {
    return ajax('post', 'admin/updateAnnouncement',  {
      data
    })
  },
  getAnnouncementList (newsType, page) {
    return ajax('get', 'announcementList', {
      params: {
        newsType,
        page
      }
    })
  },
  getAnnouncementDetail(newsId) {
    return ajax('get', 'announcementDetail', {
      params : {
        newsId
      }
    })
  },
  createProblem (data) {
    return ajax('post', 'admin/createProblem', {
      data
    })
  },
  updateProblem (data) {
    return ajax('post', 'admin/updateProblem', {
      data
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
  createContest (data) {
    return ajax('post', 'admin/createContest', {
      data
    })
  },
  addProblemFromPublic (data) {
    return ajax('post', 'admin/addProblemFromPublic', {
      data
    })
  },
  updateContest (data) {
    return ajax('post', 'admin/updateContest',  {
      data
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
  getContestProblemList (contestId) {
    return ajax('get', 'contest/problem', {
      params : {
        contestId
      }
    })
  },
  getContestProblemDetail(problemId, contestId) {
    return ajax('get', 'contest/problemDetail', {
      params : {
        problemId,
        contestId
      }
    })
  },
  getContestAnnouncementList (contestId) {
    return ajax('get', 'contest/announcement', {
      params: {
        contestId
      }
    })
  },
  rejudgeSubmission (runId) {
    return ajax('post', 'admin/rejudge', {
      data: {
        runId
      }
    })
  },
  updateUserRole (userId, userType) {
    return ajax('post', 'admin/updateUserRole', {
      data: {
        userId,
        userType
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
      // API正常返回(status=20x), 是否错误通过有无error判断
      if (res.data.error) {
        Vue.prototype.$message.error(res.data.err_info)
        reject(res)
      } else {
        resolve(res)
      }
    }, (res) => {
      // API请求异常，一般为Server error 或 network error
      Vue.prototype.$message.error('API request failed, please refresh later')
      reject(res)
    })
  })
}
