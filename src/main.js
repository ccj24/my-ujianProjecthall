import Vue from 'vue'
import App from './App'
import MpvueRoterPatch from 'mpvue-router-patch'
import store from './store'
import UJAPI from "./api/UJAPI"
import ShoppingAPI from "./api/ShoppingAPI"
import { debug } from 'util';
import './assets/style.css'; /*引入公共样式*/

// 如果你需要让一个工具函数在每个组件可用，可以把方法挂载到 Vue.prototype上
Vue.prototype.$UJAPI = UJAPI; //在实例中用$UJAPI调用UJAPI封装好的RestAPI
Vue.prototype.$ShoppingAPI = ShoppingAPI; //在实例中用$ShoppingAPI调用ShoppingAPI.js封装好的RestAPI
Vue.prototype.$store = store;
Vue.mixin({
    computed: {
        $route: function () {
            return this.$router.currentRoute
        },
        isMP() {
            return true;
        },
        // 写在这里就可以全局使用
        ProjectId() {
            var pid = this.$store.state.Project.ProjectId || "70057154-a003-4815-b247-0fe887ab4469";
            return pid
        }
    },
    methods: {
        // 这些方法写在这里是为了能全局使用  和单独写在同一个页下面的作用效果的一样
        go: function (path) {
            this.$router.push(path);
        },
        // 这个方法是从项目大厅跳转到主页里面的方法 commit方法将参数发给vuex保存
        goProject(ProjectId) {
            this.$store.commit("setProjectId", ProjectId)
            this.go({ path: '/pages/newproject/homepage'})
        },
        replace: function (path) {
            this.$router.replace(path);
        },
        toast(title) {
            wx.showToast({
                title: title,
                icon: "none"
            });
        },
        modal(title, content, confirm, cancel) {
            wx.showModal({
                title: title,
                content: content,
                success(res) {
                    if (res.confirm) {
                        if (confirm)
                            confirm();
                    } else if (res.cancel) {
                        if (cancel)
                            cancel();
                    }
                }
            })
        },
        //全局wx登录函数,vue生命周期执行时,对于需要登录票据才可进行访问请求的异步操作可以放置到获取登录之后执行
        wx_login(callback) {
            if(!this.$store.getters.Logined)//没有登录尝试登录 
            {
                // 调用wx登录接口
                wx.login({
                    success: obj => {
                        if (obj.errMsg.indexOf("login:ok") > -1) {
                            this.$ShoppingAPI.Account_wxLogin(obj.code).then(rep => {
                                if (rep.ret == 0) {
                                    var _userInfo={
                                        unionid : rep.data.result.unionid,
                                        openid : rep.data.result.openid
                                    };
                                    this.$store.commit("GetUserInfo", _userInfo);
                                    if (rep.data.ticket) {
                                        this.$store.commit("Login", { Ticket: rep.data.ticket }); //存入Ticket
                                        if(rep.data.result.errcode==0)
                                        {
                                            this.$ShoppingAPI.User_Get().then(userinfo => {
                                                if (userinfo.ret == 0) {
                                                    userinfo.data.unionid= rep.data.result.unionid;
                                                    userinfo.data.openid = rep.data.result.openid;
                                                    this.$store.commit("GetUserInfo", userinfo.data);
                                                }
                                            });
                                        }
                                    }
                                    if(callback)
                                        callback();
                                }else
                                {
                                    if(callback)
                                        allback();
                                }
                            });
                        } else {
                            if(callback)
                            callback()
                        }
                    }
                });
            }else
            {
                if(callback)
                    callback();
            }
        }
    },
    onLoad() {
        // debugger;
        // if (this.$initData$) {
        //   Object.assign(this, JSON.parse(this.$initData$))
        // } else {
        //   this.$initData$ = JSON.stringify(this.$data)
        // }
    },
    onUnload() {
        if (this.$options.data)
            Object.assign(this, this.$options.data())
    }
    // created: function () {
    //     if (this.$route)
    //         console.log("进入页面:" + this.$route.path);
    // }
});
Vue.use(MpvueRoterPatch);//在Vue实例中使用$Router访问Vuex
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)


app.$mount()
