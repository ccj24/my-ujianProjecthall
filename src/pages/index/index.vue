<template>
  <div class="container">
    <img class="logo" :class="{logoHide:logoHide}" src="/static/images/logo108.png" mode="widthFix">
    <p>U建商城</p>
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover">
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>
    <div v-if="!userInfo.nickName" class="authorize">
      <p>申请获得你的公开信息(昵称、头像等)</p>
      <button open-type="getUserInfo" @getuserinfo="getUserInfoData">授权登录</button>
    </div>
    <!-- <button v-if="userInfo.nickName" @click="opensetting">打开授权设置</button> -->
    <login v-if="userInfo.nickName" :userInfo="userInfo"></login>
  </div>
</template>

<script>
import card from "@/components/card";
import login from "@/components/login";
export default {
  data() {
    return {
      userInfo: {
        Account: "",
        PassWord: "",
        avatarUrl: "",
        nickName: "",
        unionid: "",
        openid: ""
      },
      logoHide: false
    };
  },
  components: {
    card,
    login
  },

  methods: {
    opensetting() {
      wx.openSetting(); //调起客户端小程序设置界面
    },
    // 获取用户登录授权
    getUserInfoData(obj) {
      if (obj.mp.detail.errMsg.indexOf("getUserInfo:ok") != -1) {
        this.userInfo.nickName = obj.mp.detail.userInfo.nickName;
        this.userInfo.avatarUrl = obj.mp.detail.userInfo.avatarUrl;
        this.logoHide = true;
      } else {
        // 提示框窗口
        wx.showModal({
          title: "警告", //提示的标题
          content: "您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!", //提示的内容
          showCancel: false, //是否取消按钮
          confirmText: "返回授权", //取消按钮的文字
          success(res) {
            //接口成功回调的函数
            if (res.confirm) {
              console.log("点击了“返回授权”");
            }
          }
        });
      }
    },
     wx_login() {
       var that =this;
      // 调用wx登录接口
         wx.login({
         async success(obj){
          if (obj.code) {
            //微信登录  (用户在首次绑定账号后   既可以自动登录)
            // .then((data)=>{ })里的data是指接口成功返回的数据,包含请求头,请求体,等信息;
            // .then(data => {}) 这个 data 就是你请求url的返回结果。

            var rep = await that.$ShoppingAPI.Account_wxLogin(obj.code);

              if (rep.ret == 0) {
                that.userInfo.unionid = rep.data.result.unionid;
                that.userInfo.openid = rep.data.result.openid;
                if (rep.data.ticket) {
                  if(that.$store.state.User.SingleTicket)
                  {
                    console.log("已有登录票据");
                  }else
                  {
                    console.log("没有登录票据,重新获取并写入vuex");
                    that.$store.commit("Login", { Ticket: rep.data.ticket }); //存入Ticket
                    //有票据之后就可以获取用户信息
                    var userinfo =  await  that.$ShoppingAPI.User_Get();
                    if (userinfo.ret == 0) {
                        userinfo.data.unionid = rep.data.result.unionid;
                        userinfo.data.openid = rep.data.result.openid;
                          // commit：同步操作，写法：this.$store.commit('mutations方法名',值)
                        that.$store.commit("GetUserInfo", userinfo.data);
                        that.$router.push({ path: "/pages/Login/Projecthall" });
                    }
                  }
                }
            }
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    }
  },
  mounted() {
    if(this.isMp)
    {
      // 检查是否授权
      wx.getSetting({
        success: res => {
          if (res.authSetting["scope.userInfo"]) {
          } else {
            wx.getUserInfo({
              success(res) {
                this.userInfo.nickName = res.userInfo.nickName;
                this.userInfo.avatarUrl = res.userInfo.avatarUrl;
              }
            });
          }
        }
      });
    }

  },
  created() {

    //1. 调用wx.login
    if(this.isMp)
     this.wx_login();

  }
};
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  transition: height 0.5s;
  -moz-transition: height 0.5s; /* Firefox 4 */
  -webkit-transition: height 0.5s; /* Safari and Chrome */
  -o-transition: height 0.5s; /* Opera */
}
.logoHide {
  width: 0px;
  height: 0px;
}
.authorize {
  text-align: center;
  width: 100%;
  button {
    color: #12b7f5;
    border: 1px solid #12b7f5;
    border-radius: 10px;
    padding: 0px;
    width: 50%;
  }
  p {
    margin: 10px 0 5px 0;
    font-size: 12px;
    color: #7f8699;
  }
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
