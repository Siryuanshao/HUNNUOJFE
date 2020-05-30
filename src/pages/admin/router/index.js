import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/general/Login')
  },
  {
    path: '/',
    component: () => import('../views/general/Home'),
    children: [
      {
        path: '/announcements/reports',
        name: 'report-list',
        component: () => import('../views/announcement/AnnouncementList')
      },
      {
        path: '/announcements/solutions',
        name: 'solution-list',
        component: () => import('../views/announcement/AnnouncementList')
      },
      {
        path: '/announcements/create',
        name: 'create-announcement',
        component: () => import('../views/announcement/AnnouncementView')
      },
      {
        path: '/announcements/:newsId/edit',
        name: 'edit-announcement',
        component: () => import('../views/announcement/AnnouncementView')
      },
      {
        path: '/problems',
        name: 'problem-list',
        component: () => import('../views/problem/ProblemList')
      },
      {
        path: '/problems/create',
        name: 'create-problem',
        component: () => import('../views/problem/ProblemView')
      },
      {
        path: '/problems/:problemId/edit',
        name: 'edit-problem',
        component: () => import('../views/problem/ProblemView')
      },
      {
        path: '/contests',
        name: 'contest-list',
        component: () => import('../views/contest/ContestList')
      },
      {
        path: '/contests/create',
        name: 'create-contest',
        component: () => import('../views/contest/ContestView')
      },
      {
        path: '/contests/:contestId/edit',
        name: 'edit-contest',
        component: () => import('../views/contest/ContestView')
      },
      {
        path: '/contests/:contestId/problems',
        name: 'contest-problem-list',
        component: () => import('../views/problem/ContestProblemList')
      },
      {
        path: '/contests/:contestId/problems/create',
        name: 'create-contest-problem',
        component: () => import('../views/problem/ProblemView')
      },
      {
        path: '/contest/:contestId/problems/:problemId/edit',
        name: 'edit-contest-problem',
        component: () => import('../views/problem/ProblemView')
      },
      {
        path: '/contests/:contestId/announcements/',
        name: 'contest-announcement-list',
        component: () => import('../views/announcement/ContestAnnouncementList')
      },
      {
        path: '/contests/:contestId/announcements/create',
        name: 'create-contest-announcement',
        component: () => import('../views/announcement/AnnouncementView')
      },
      {
        path: '/super-admin',
        name: 'super-admin',
        component: () => import('../views/superadmin/SuperAdmin')
      },
    ]
  },
  {
    path: '*', redirect: '/login'
  }
]

const router = new VueRouter({
  routes
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
