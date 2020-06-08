export const USER_TYPE = {
  REGULAR: 'Regular',
  ADMIN: 'Admin',
  SUPER_ADMIN : 'SuperAdmin'
}

export const MODAL_TYPE = {
  OFFLINE: 0,
  ONLINE: 1
}

export const STORAGE_KEY = {
  AUTHENTICATE: 'authenticate'
}

export const JUDGE_OPTIONS = {
  STATUS_HASH: ['Pending', 'Judging', 'Accepted', 'Presentation Error', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Output Limit Exceeded', 'Compile Error', 'System Error'],
  SHORT_NAME : ['PD', 'JD', 'AC', 'PE', 'WA', 'RE', 'TLE', 'MLE', 'OLE', 'CE', 'SE'],
  STATUS_COLOR_HASH : ['info', 'info', 'success', 'warning', 'danger', 'warning', 'warning', 'warning', 'warning', 'warning', 'warning'],
  LANGUAGE_HASH: ['C', 'C++', 'Java'],
  STATUS_COLOR: {
    primary: [],
    success: ['Accepted'],
    info: ['Pending', 'Judging'],
    warning: ['Presentation Error', 'Runtime Error', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Output Limit Exceeded', 'Compile Error', 'System Error'],
    danger: ['Wrong Answer']
  }
}

export const SEX_TYPE = {
  SEX_SET: ['Male', 'Female', 'Secret']
}

export const PROBLEM_STATUS = {
  STATUS_SET : ['', 'el-icon-check', 'el-icon-close'],
  STATUS_COLOR_SET: ['', 'color: #007F7E; font-size: 18px;', 'color: #d81e06; font-size: 18px;']
}

export const CONTEST_STATUS = {
  STATUS_SET: ['Pending', 'Running', 'Ending'],
  STATUS_COLOR_SET: ['primary', 'success', 'info'],
  TYPE_SET: ['PUBLIC', 'PRIVATE']
}
