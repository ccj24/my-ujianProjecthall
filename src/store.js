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
        CurrentLocation:{}
      },
      // 获取属性的状态
      getters:{
        Logined: state =>{
          return state.SingleTicket&&state.SingleTicket.length>0;
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
        UpdateLocation(state,payload){
          state.CurrentLocation = payload;
        }
      }
    },
    Project:{
      state:{
        ProjectId:null,
        chooseItem:null
      },
      // 更改vuex中的store中的状态的唯一方法是提交
      mutations:{  //定义一个方法，state是Project下面的state，_chooseItem是外面传进来的参数
        setChooseItem(state, _chooseItem) {
          // 变更状态
          state.chooseItem = _chooseItem;
        },
        setProjectId(state, ProjectId) {
          // 变更状态
          state.ProjectId = ProjectId;
        },
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