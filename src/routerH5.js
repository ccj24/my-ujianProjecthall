import Vue from 'vue'
import Router from 'vue-router'
import home from './pages/newproject/homepage'
import meeting from './pages/meeting/index'
import Projecthall from './pages/Login/Projecthall'
import data from './pages/data/index'
import login from './pages/index/indexH5'
import auditLog from './pages/log/auditLog'
import journal from './pages/log/journal'
import myLog from './pages/log/myLog'
import writeLog from './pages/log/writeLog'
import LogDetails from './pages/log/LogDetails'
import toAudit from './pages/log/toAudit'
import Welfarelist from './pages/home/Welfarelist'
import Addproject from './pages/Login/Addproject'
import Projectmessage from './pages/Login/Projectmessage'
import Hebuiltproject from './pages/Login/Hebuiltproject'
import selfbuiltproject from './pages/Login/selfbuilt-project'
import newproject from './pages/Login/newproject'


import store from './store'
Vue.use(Router)//使用/注册路由
var routes = [
  {
    path: '/',
    redirect: 'pages/Login/Projecthall'
  },
  {
    path: 'pages/Login/Projecthall',
    name: 'Projecthall',
    config: {
      navigationBarTitleText: '项目大厅',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    alias: '/pages/Login/Projecthall',
    component: Projecthall
  },
  {
    path: 'pages/index/index',
    name: 'login',
    config: {
      navigationBarTitleText: '授权登录',
      enablePullDownRefresh: false
    },
    meta: { noAuth: true },
    alias: '/pages/index/index',
    component: login
  },

  {
    path: 'pages/data/index',
    name: 'data',
    config: {
      enablePullDownRefresh: true
    },
    alias: '/pages/data/index',
    component: data
  },

  {
    path: 'pages/newproject/homepage',
    name: 'home',
    config: {
      navigationBarTitleText: '主页',
      enablePullDownRefresh: true,
      EnableNav: true,
    },
    alias: '/pages/newproject/homepage',
    component: home
  },
  {
    path: 'pages/meeting/index',
    name: 'meeting',
    config: {
      navigationBarTitleText: '会议',
      enablePullDownRefresh: true,
      EnableNav: true,

    },
    meta: { noAuth: true },
    alias: '/pages/meeting/index',
    component: meeting
  },
  {
    path: 'pages/log/auditLog',
    name: 'auditLog',
    config: {
      navigationBarTitleText: '详情',
      enablePullDownRefresh: false
    },
    alias: '/pages/log/auditLog',
    component: auditLog
  },
  {
    path: 'pages/log/journal',
    name: 'journal',
    config: {
      navigationBarTitleText: '日志',
      enablePullDownRefresh: false
    },
    alias: '/pages/log/journal',
    component: journal
  },
  {
    path: 'pages/log/myLog',
    name: 'myLog',
    config: {
      navigationBarTitleText: '我的日志',
      enablePullDownRefresh: false
    },
    alias: '/pages/log/myLog',
    component: myLog
  },
  {
    path: 'pages/log/writeLog',
    name: 'writeLog',
    config: {
      navigationBarTitleText: '写日志',
      enablePullDownRefresh: false
    },
    alias: '/pages/log/writeLog',
    component: writeLog
  },
  {
    path: 'pages/home/Welfarelist',
    name: 'home-Welfarelist',
    config: {
      navigationBarTitleText: '红包详情',
      enablePullDownRefresh: true,
    },
    alias: '/pages/home/Welfarelist',
    component: Welfarelist
  },
  {
    path: 'pages/log/LogDetails',
    name: 'LogDetails',
    config: {
      navigationBarTitleText: '日志详情',
      enablePullDownRefresh: false
    },
    alias: '/pages/log/LogDetails',
    component: LogDetails
  },
  {
    path: 'pages/log/toAudit',
    name: 'toAudit',
    config: {
      navigationBarTitleText: '待审核',
      enablePullDownRefresh: false
    },
    alias: '/pages/log/toAudit',
    component: toAudit
  },
  {
    path: 'pages/Login/Addproject',
    name: 'Addproject',
    config: {
      navigationBarTitleText: '加入项目',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    alias: '/pages/Login/Addproject',
    component: Addproject
  },
  {
    path: 'pages/Login/Projectmessage',
    name: 'Projectmessage',
    config: {
      navigationBarTitleText: '项目消息',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    alias: '/pages/Login/Projectmessage',
    component: Projectmessage
  },
  {
    path: 'pages/Login/Hebuiltproject',
    name: 'Hebuiltproject',
    config: {
      navigationBarTitleText: '已加入项目',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    alias: '/pages/Login/Hebuiltproject',
    component: Hebuiltproject
  },

  {
    path: 'pages/Login/selfbuilt-project',
    name: 'selfbuilt-project',
    config: {
      navigationBarTitleText: '自建项目',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    alias: '/pages/Login/selfbuilt-project',
    component: selfbuiltproject
  },

  {
    path: 'pages/Login/newproject',
    name: 'Loginnewproject',
    config: {
      navigationBarTitleText: '新建项目',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    alias: '/pages/Login/newproject',
    component: newproject
  },

]


let router = new Router({ routes: routes })
router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.noAuth)) {
    // console.log(store.getters.Logined)
    //这里判断用户是否登录，验证store中的token是否已登录
    if (!store.getters.Logined) { // 判断当前的token是否存在
      // next({
      //     path: '/pages/index/index',
      //     query: { redirect: to.fullPath }
      // })
      router.replace({
        path: '/pages/index/index',
        query: { redirect: to.fullPath }
      });
    } else {
      next() // 确保一定要调用 next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
export default router
