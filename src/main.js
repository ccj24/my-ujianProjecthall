import Vue from 'vue'
import App from './App'
import MpvueRoterPatch from 'mpvue-router-patch'
import store from './store'
import UJAPI from "./api/UJAPI"
import ShoppingAPI from "./api/ShoppingAPI"
import { debug } from 'util';
// 如果你需要让一个工具函数在每个组件可用，可以把方法挂载到 Vue.prototype上
Vue.prototype.$UJAPI = UJAPI; //在实例中用$UJAPI调用UJAPI封装好的RestAPI
Vue.prototype.$ShoppingAPI = ShoppingAPI; //在实例中用$ShoppingAPI调用ShoppingAPI.js封装好的RestAPI
Vue.prototype.$store = store;
Vue.mixin({
    computed: {
        $route: function () {
            return this.$router.currentRoute
        },
        isMP(){
            return true;
        }
    },
    methods: {
        go: function (path) {
            this.$router.push(path);
        },
        replace: function (path) {
            this.$router.replace(path);
        },
        toast(title){
            wx.showToast({
                title: title,
                icon: "none"
              });
        },
        modal(title,content,confirm,cancel){
            wx.showModal({
                title: title,
                content: content,
                success (res) {
                  if (res.confirm) {
                    if(confirm)
                        confirm();
                  } else if (res.cancel) {
                    if(cancel)
                        cancel();
                  }
                }
              })
        }
    },
    onLoad () {
        // debugger;
        // if (this.$initData$) {
        //   Object.assign(this, JSON.parse(this.$initData$))
        // } else {
        //   this.$initData$ = JSON.stringify(this.$data)
        // }
    },
    onUnload(){
        if( this.$options.data)
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
