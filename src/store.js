import Vue from 'vue';
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import ShoppingAPI from "./api/ShoppingAPI"
import { debug } from 'util';

Vue.use(Vuex);
export default new Vuex.Store({//store对象
  modules: {
    User: {
      state: {
        UserInfo: {},
        SingleTicket: "E5BA3562E36EB943C0F2862F17035C9A79F6EDB6B3A481A9274879F38C4D9911A5E11B5420130E4F7D72CF2261379B554FB162D5C084999A67F1BA4AE73623F99ADD95B00D8B1A54E27B0A37C725001F62E54B2981F597C391D9E62508C4BCBF249715E34C6ED0F8549E63F3013DAF9667523AF2A207629325AA46F8629A65490B113582C2500D4DE16D26AD1D2921C95EC70683",
        CurrentLocation:{}
      },
      getters:{
        Logined: state =>{
          return state.SingleTicket&&state.SingleTicket.length>0;
        }
      },
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
    ShoppingCar: {
      state: {
        List: [
          // {
          //   sId:'',
          //   sName:'店铺名',
          //   goods:[
          //     {
          //       sId:'店铺标识',
          //       gId:'商品Id',
          //       gName:'商品名称',
          //       ItemId:'规格Id',
          //       ItemName:'规格名',
          //       Image:'商品首图',
          //       Number:'购物数量',
          //       Price:'单价',
          //       Stock:'库存',
          //     }
          //   ],
          //   Logistics: {
          //     Order_Address_Id
          //     LogisticsId: 0,
          //     Name: "双方协商",
          //     DistributionMode: {
          //       DistributionModeId: 1,
          //       DistributionModeText: "小轿车"
          //     },
          //     FreightInfo: {
          //       Freight: 1.0,
          //       distance: {
          //         text: "2.1公里",
          //         value: 2.1
          //       },
          //       duration: {
          //         text: "2小时",
          //         value: 2
          //       }
          //     }
          //   }
          // }
        ]
      },
      getters: {
        ///获取店铺购物车清单
        getShoppingCarBysId: state => (sId) => {
          return state.List.find(item => item.sId == sId);
        },
        ///获取店铺购物车清单总额
        getShoppingCarAmountBysId: state => (sId) => {
          var sum = 0
          var shoppingCar = state.List.find(item => item.sId == sId);
          if (shoppingCar && shoppingCar.goods.length > 0)
            shoppingCar.goods.forEach(element => {
              sum += element.Price* element.Number;
            });
          return sum;
        },
        ///获取店铺购物车清单商品总数量
        getShoppingCarCountBysId: state => (sId) => {
          var count = 0;
          var shoppingCar = state.List.find(item => item.sId == sId);
          if (shoppingCar && shoppingCar.goods.length > 0)
            shoppingCar.goods.forEach(element => {
              count += element.Number;
            });
          return count;
        },
        ///获取店铺购物车清单中某个商品数量
        getShoppingCarNumberByItemId: state => (sId,ItemId) => {
          var count = 0;
          var shoppingCar = state.List.find(item => item.sId == sId);
          if (shoppingCar && shoppingCar.goods.length > 0)
          {
            var goodItem = shoppingCar.goods.find(element => {
              return element.ItemId==ItemId;
            });
            return goodItem?goodItem.Number:0;
          }
          return count;
        }
      },
      mutations: {
        ShoppingCarPush(state, good) {//购买店铺商品放入购物车
          var shoppingcar = state.List.filter(item => item.sId == good.sId)[0];//先查找该店铺的购物车
          if (shoppingcar)//有购物
          {
            //查找购物清单是否有该商品
            var nowItem = shoppingcar.goods.find(item => item.ItemId == good.ItemId);
            if (nowItem) {
              //有商品替更新数量等信息
              var index = shoppingcar.goods.indexOf(nowItem);
              if (good.Number == 0)
                shoppingcar.goods.splice(index, 1);//数量0移除该商品
              else
                shoppingcar.goods.splice(index, 1, good);//更新
            } else {
              if (good.Number > 0)
                //无商品直接放入店铺购物车
                shoppingcar.goods.push(good);
            }
            var index = state.List.indexOf(shoppingcar);
            state.List.splice(index, 1, shoppingcar);//更新店铺购物车
          } else//没有购物
          {
            if (good.Number > 0)
              //push一个店铺购物车,并且放入商品
              state.List.push({ sId: good.sId,sName:good.sName, goods: [good] });
          }
        },
        ShoppingCarEmpty(state,good){//清空某店铺购物车清单
          var shoppingcar = state.List.filter(item => item.sId == good.sId)[0];//先查找该店铺的购物车
          if(shoppingcar)
          {
            var index = state.List.indexOf(shoppingcar);
            state.List.splice(index, 1);//清除该店铺购物清单
          }
        },
        SelectLogistics(state,payload){
          var shoppingcar = state.List.filter(item => item.sId == payload.sId)[0];//先查找该店铺的购物车
          if(shoppingcar)
          {
            shoppingcar.Logistics=payload.Logistics;
            var index = state.List.indexOf(shoppingcar);
            state.List.splice(index, 1,shoppingcar);//清除该店铺购物清单
          }
        }
      }
    },
    UserAddress:{
      state:{
        UserAddressList:[],
      },
      getters:{
        UserAddressBysId: state => (Order_Address_Id) => {
          return state.UserAddressList.find(item => item.Order_Address_Id == Order_Address_Id);
        }
      },
      mutations:{
        GetUserAddressList(state,payload){
          state.UserAddressList=payload;
        },
        AddUserAddress(state,UserAddress){
          state.UserAddressList.push(UserAddress);
        },
        DeleteUserAddress(state,id){
          var finditem = state.UserAddressList.filter(item => item.Order_Address_Id == id)[0];//先查找项
          if(finditem)
          {
            var index = state.UserAddressList.indexOf(finditem);
            state.UserAddressList.splice(index, 1);//清除该项
          }
        },
        EditUserAddress(state,item){
          var finditem = state.UserAddressList.filter(item => item.Order_Address_Id == item.Order_Address_Id)[0];//先查找项
          if(finditem)
          {
            var index = state.UserAddressList.indexOf(finditem);
            state.UserAddressList.splice(index, 1,item);//更换该项
          }
        },
        SetDefault(state,item){
          state.UserAddressList.forEach((i,index)=>{
              if(i.IsDefault)
              i.IsDefault=false;
          });

          var finditem = state.UserAddressList.filter(i => i.Order_Address_Id == item.Order_Address_Id)[0];//先查找项
          if(finditem)
          {
            finditem.IsDefault=true;
            var index = state.UserAddressList.indexOf(finditem);
            state.UserAddressList.splice(index, 1,item);//更换该项
          }
        }
      },
      actions: {
        async GetUserAddressList (context) {
          var rep = await ShoppingAPI.OrderAddress_Get();
          if(rep.ret==0)
            context.commit('GetUserAddressList',rep.data);
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