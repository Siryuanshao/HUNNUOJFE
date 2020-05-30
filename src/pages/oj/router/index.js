import Vue from 'vue'
import VueRouter from 'vue-router'
import storage from 'Utils/storage'
import { STORAGE_KEY } from 'Utils/constants'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

Vue.prototype.$Loading = NProgress

const routes = [
  {
    path: '/',
    component: () => import('../views/home/index'),
    children: [
      { name : 'homepage', path: '', component: () => import('../views/home/children/HomePage') },
      { name : 'about-icpc', path: 'about-icpc', component: () => import('../views/home/children/AboutICPC') },
      { name : 'announcement-list', path: 'announcements/type/:newsType', component: () => import('../views/home/children/AnnouncementList') },
      { name : 'announcement-detail', path: 'announcements/:newsId', component: () => import('../views/home/children/AnnouncementDetail') }
    ]
  },
  {
    name: 'problem-list',
    path: '/problems',
    component: () => import('../views/problem/ProblemList')
  },
  {
    name: 'problem-detail',
    path: '/problems/:problemId',
    component: () => import('../views/problem/ProblemDetail')
  },
  {
    name: 'problem-summary',
    path: '/problems/:problemId/summary',
    component: () => import('../views/problem/ProblemSummary')
  },
  {
    name: 'submission-list',
    path: '/submissions',
    component: () => import('../views/submission/SubmissionList')
  },
  {
    name: 'submission-detail',
    path: '/submissions/:submissionId',
    component: () => import('../views/submission/SubmissionDetail'),
    meta: { requiredAuth: true }
  },
  {
    name: 'contest-list',
    path: '/contests',
    component: () => import('../views/contest/ContestList')
  },
  {
    path: '/contests/:contestId',
    component: () => import('../views/contest/ContestDetail'),
    children: [
      {name: 'contest-dashboard', path: '', component: () => import('../views/contest/children/ContestDashboard') },
      {name: 'contest-announcement-list', path: 'announcements', component: () => import('../views/contest/children/ContestAnnouncements') },
      {name: 'contest-problem-list', path: 'problems', component: () => import('../views/contest/children/ContestProblems') },
    ]
  },
  {
    name: 'contest-problem-detail',
    path: '/contests/:contestId/problems/:problemId',
    component: () => import('../views/contest/ContestProblemView')
  },
  {
    name: 'contest-submission-list',
    path: '/contests/:contestId/submissions',
    component: () => import('../views/contest/ContestSubmissions')
  },
  {
    name: 'contest-ranking',
    path: '/contests/:contestId/rankings',
    component: () => import('../views/contest/ContestRankings')
  },
  {
    name: 'rank-list',
    path: '/ranks',
    component: () => import('../views/rank/index')
  },
  {
    name: 'faqs',
    path: '/faqs',
    component: () => import('../views/about/faqs')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/manage/Login')
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../views/manage/Register')
  },
  {
    name: 'forget-password',
    path: '/forget-password',
    component: () => import('../views/manage/ForgetPassword')
  },
  {
    name: 'user-profile',
    path: '/user-profile',
    component: () => import('../views/profile/index')
  },
  {
    path: '/settings',
    component: () => import('../views/settings/index'),
    meta: { requiredAuth: true },
    children: [
      { name : 'profile-settings', path: 'profile-settings', component: () => import('../views/settings/children/ProfileSettings') },
      { name : 'account-settings', path: 'account-settings', component: () => import('../views/settings/children/AccountSettings') }
    ]
  },
  {
    name: '404',
    path: '*',
    component: () => import('../views/error/404')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  Vue.prototype.$Loading.start()
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (!storage.get(STORAGE_KEY.AUTHENTICATE)) {
      Vue.prototype.$message.warning('Please login first')
      Vue.prototype.$Loading.done()
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  Vue.prototype.$Loading.done()
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch((err) => err)
}

export default router
