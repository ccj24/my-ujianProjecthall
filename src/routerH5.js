import Vue from 'vue'
import Router from 'vue-router'
import home from './pages/home/index'
import Thelog from './pages/Thelog/index'
import meeting from './pages/meeting/index'
import Projecthall from './pages/Login/Projecthall'
import data from './pages/data/index'
import login from './pages/index/index'
import Environmental from './pages/Environmentalprotection/Environmental.vue'
import personnel from './pages/Environmentalprotection/personnel.vue'



import store from './store'
Vue.use(Router)//使用/注册路由
var routes = [
    {
        path:'/',
        redirect:'pages/Environmentalprotection/personnel'
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
        path: 'pages/home/index',
        name: 'home',
        config: {
            navigationBarTitleText: '主页',
            enablePullDownRefresh: true,
            EnableNav:true,
        },
        alias: '/pages/home/index',
        component: home
    },
   
    {
        path: 'pages/Thelog/index',
        name: 'Thelog',
        config: {
            navigationBarTitleText: '日志',
            enablePullDownRefresh: true,
            EnableNav:true,
        },
        meta: { noAuth: true },
        alias: '/pages/Thelog/index',
        component: Thelog
    },
   
    
    {
        path: 'pages/meeting/index',
        name: 'meeting',
        config: {
            navigationBarTitleText: '会议',
            enablePullDownRefresh: true,
            EnableNav:true,

        },
        meta: { noAuth: true },
        alias: '/pages/meeting/index',
        component: meeting
    },
    {
        path: 'pages/Environmentalprotection/Environmental',
        name: 'Environmental',
        config: {
          navigationBarTitleText: '环保',
          enablePullDownRefresh: false
        },
        meta: { noAuth: true },
        alias: '/pages/Environmentalprotection/Environmental',
        component: Environmental
      },
      {
        path: 'pages/Environmentalprotection/personnel',
        name: 'personnel',
        config: {
          navigationBarTitleText: '人员',
          enablePullDownRefresh: false
        },
        meta: { noAuth: true },
        alias: '/pages/Environmentalprotection/personnel',
        component: personnel
      },
]

let router =new Router({routes:routes})
router.beforeEach((to, from, next) => {
    if (!to.matched.some(record => record.meta.noAuth)) {
        console.log(store.getters.Logined)
        //这里判断用户是否登录，验证store中的token是否已登录
        if (!store.getters.Logined) { // 判断当前的token是否存在
            next({
                path: '/pages/index/index',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
  })
export default router
