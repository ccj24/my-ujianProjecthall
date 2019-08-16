import Vue from 'vue'
import App from './AppH5'
import store from './store'
import router from './routerH5'
import UJAPI from "./api/UJAPI"
import ShoppingAPI from "./api/ShoppingAPI"
import fts from './utils/autorem'
import Toast from './components/Toast';
Vue.use(Toast);

Vue.prototype.$UJAPI = UJAPI; //在实例中用$UJAPI调用UJAPI封装好的RestAPI
Vue.prototype.$ShoppingAPI = ShoppingAPI; //在实例中用$ShoppingAPI调用ShoppingAPI.js封装好的RestAPI
Vue.mixin({
  computed: {
    isMP(){
        return false;
    },
     // 写在这里就可以全局使用
     ProjectId() {
      var pid = this.$store.state.Project.ProjectId || "70057154-a003-4815-b247-0fe887ab4469";
      return pid
    }
  },
  methods: {
      go: function(path) {
        this.$router.push(path);
      },
      toast(title){
        this.$toast.center(title);
      },
      goProject(ProjectId) {
        // 这个方法是从项目大厅跳转到主页里面的方法 commit方法将参数发给vuex保存
                this.$store.commit("setProjectId", ProjectId)
                this.go({ path: '/pages/newproject/homepage',isTab: true})
      },
      modal(title,content,confirm,cancel){
        if(window.confirm(content)){
          if(confirm)
            confirm();
        }else
        {
          if(cancel)
            cancel();
        }
      },
      //全局wx登录函数,H5兼容
      wx_login(callback) {
        if(callback)
        callback();
      }
    }
});
Vue.config.productionTip = false

const app =new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
  });
window.$app=app; //vue实例全局变量
