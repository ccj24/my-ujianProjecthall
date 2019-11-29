import Vue from 'vue';
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import ShoppingAPI from "./api/ShoppingAPI"
import { debug } from 'util';

Vue.use(Vuex);
export default new Vuex.Store({//store对象
  modules: {
    User: {
      // 存储对象或属性定义
      state: {
        UserInfo: {},
        SingleTicket: "",
        CurrentLocation: {}
      },
      // 获取属性的状态
      getters: {
        Logined: state => {
          return state.SingleTicket && state.SingleTicket.length > 0;
        }
      },
      // 设置属性状态
      mutations: {
        Login(state, payload) {
          // 变更状态
          state.SingleTicket = payload.Ticket;
        },
        GetUserInfo(state, UserInfo) {
          state.UserInfo = UserInfo;
        },
        UpdateLocation(state, payload) {
          state.CurrentLocation = payload;
        }
      }
    },
    Project: {
      state: {
        ProjectDetailedView: null,//定义项目详情
        ProjectId: null,
        chooseItem: null,      //创建项目时 保存选中的部门
        choosePostItem: null,  //创建项目时 保存选中的部门下的职位
        ProjectDetailed: null,  //定义一个项目详情
      },
      // 更改vuex中的store中的状态的唯一方法是提交mutations，vuex中的mutations非常类似事件，
      // 每个mutation都有一个类似字符串的的事件和一个回调函数，这个回调函数就是我们需要更改的地方
      mutations: {  //定义一个方法，state是Project下面的state，_chooseItem是外面传进来的参数
        setChooseItem(state, _chooseItem) {
          // 变更状态
          state.chooseItem = _chooseItem;
        },
        // 这个方法是保存项目大厅 跳转到主页的ProjectId
        setProjectId(state, ProjectId) {
          // 变更状态
          state.ProjectId = ProjectId;
        },
        setChoosePostItem(state, _choosePostItem) {
          // 变更状态
          state.choosePostItem = _choosePostItem;
        },
        // 定义项目详情一个回调函数
        setProjectDetailedView(state, _ProjectDetailedView) {
          // 更变状态  改变原来的值
          state.ProjectDetailedView = _ProjectDetailedView;
        },
        // 定义项目详情一个回调函数  这个函数用于将主页的数据传输到红包页面
        setProjectDetailed(state, _ProjectDetailed) {
          // 更变状态  改变原来的值
          state.ProjectDetailed = _ProjectDetailed;
        }
      }
    }
  }, plugins: [//vuex持久化
    mpvue_Mode === 'WX' ? createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => { }
      }
    }) : createPersistedState()
  ]
})