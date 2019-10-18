<template>
  <div>
    <div class="index">
      <div v-if="isMP" class="nr">
        <!-- 输入手机号码 -->
        <div class="tel">
          <i class="icon">&#xe60d;</i>
          <input type="tel" placeholder="请输入手机号码" v-model="userInfo.Account">
        </div>
        <!-- 输入验证码 -->
        <div class="message">
          <div class="emal">
            <i class="icon">&#xe60b;</i>
            <input type="number" placeholder="请输入验证码" v-model="VerificationCode">
          </div>
          <p class="yzm" :class="{action:codeAction}" @click="countDown">{{countDownStr}}</p>
        </div>
        <!-- 登录按钮 -->
        <div class="btn" :class="{action:loginAction}" @click="login">立即登录</div>
        <!-- 底部提示文字 -->
        <div class="fttext">
          <p>欢迎使用U建,</p>
          <p>请您输入手机号码进入项目大厅</p>
        </div>
      </div>
      <div v-else class="nr">
        <!-- 输入手机号码 -->
        <div class="tel">
          <i class="icon">&#xe60d;</i>
          <input type="tel" placeholder="请输入手机号码" v-model="userInfo.Account">
        </div>
        <!-- 输入密码 -->
        <div class="pwd">
          <i class="icon">&#xe75c;</i>
          <input type="password" placeholder="请输入密码" v-model="userInfo.PassWord">
        </div>
        <!-- 登录按钮 -->
        <div class="btn" :class="{action:loginAction}" @click="login2">立即登录</div>
        <!-- 底部提示文字 -->
        <div class="fttext">
          <p>欢迎使用U建,</p>
          <p>请您输入手机号码进入项目大厅</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  props: {
    userInfo: Object
  },
  
  data() {
    return {
      countDownStr: "获取验证码",
      sendTime: 0,
      VerificationCode: ""
    };
  },
  computed: {
    codeAction() {
      // 要求返回来的手机号码位数==11位
      return this.userInfo.Account && this.userInfo.Account.length == 11;
    },
    loginAction() {
      return this.VerificationCode && this.VerificationCode.length > 0;
    },
  },
  methods: {
    async countDown() {
      if (this.sendTime == 0 && this.codeAction) {
        var rep = await this.$ShoppingAPI.Account_ValidationCode({
          Phone: this.userInfo.Account
        });
        if (rep.ret == 0) {
          this.sendTime = 60;
          this.countDownStr = this.sendTime + "s后可重发";
          var clock = setInterval(() => {
            this.sendTime--;
            if (this.sendTime <= 0) {
              this.countDownStr = "点击发送验证码";
              this.sendTime = 0;
              clearInterval(clock);
            } else {
              this.countDownStr = this.sendTime + "s后可重发";
            }
          }, 1000);
        }
      }
    },
    async login2() {
      var req = await this.$ShoppingAPI.Account_Login({
        Account: this.userInfo.Account, //账号
        PassWord: this.userInfo.PassWord //密码
      });

      if (req.ret == 0) {
        this.$store.commit("Login", { Ticket: req.data }); //存入Ticket
        var userinfo = await this.$ShoppingAPI.User_Get();
        this.$store.commit("GetUserInfo", userinfo.data);
        if (this.$route.query.redirect)
          // 切换至 tabBar页面
          this.$router.push({ path: this.$route.query.redirect, isTab: true });
        // 切换至 tabBar页面
        else this.$router.push({ path: "/pages/Login/Projecthall" });
      } else {
        this.toast("登录失败");
      }
    },

    async login() {
      if (!this.codeAction) {
        this.toast("请输入手机号码");
        return;
      }
      if (!this.loginAction) {
        this.toast("请输入验证码");
        return;
      }
      var req = await this.$ShoppingAPI.Account_SimpleLogin({
        Phone: this.userInfo.Account,
        unionid: this.userInfo.unionid,
        openid: this.userInfo.openid,
        UserName: this.userInfo.nickName,
        VerificationCode: this.VerificationCode
      });

      if (req.ret == 0) {
        this.$store.commit("Login", { Ticket: req.data }); //存入Ticket
        var userinfo = await this.$ShoppingAPI.User_Get();
        userinfo.data.unionid = this.userInfo.unionid;
        userinfo.data.openid = this.userInfo.openid;
        this.$store.commit("GetUserInfo", userinfo.data);
        if (this.$route.query.redirect)
          // 切换至 tabBar页面
          this.$router.push({ path: this.$route.query.redirect, isTab: true });
        // 切换至 tabBar页面
        else this.$router.push({ path: "/pages/Login/Projecthall" });
      } else {
        this.toast("登录失败");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.index .nr {
  margin-top: 1.5rem;
  /*input提示文字颜色*/
  /*输入手机号码*/
  /*输入验证码*/
  /*立即登录按钮*/
  /*底部提示文字*/
  .tel,
  .pwd {
    width: 8rem;
    height: 1.4rem;
    margin-left: 1.4rem;
    border-radius: 0.7rem;
    background-color: #ffffff;
    box-shadow: 0 0.03rem 0.21rem 0 rgba(51, 150, 254, 0.35);
    i {
      width: 0.44rem;
      height: 0.69rem;
      margin-top: 0.35rem;
      margin-left: 0.65rem;
      margin-right: 0.47rem;
      float: left;
      font-size: 22px;
      color: #93e4fc;
    }

    input {
      border: none;
      width: 5rem;
      height: 0.7rem;
      float: left;
      margin-top: 0.35rem;
      color: #999999;
    }
  }
  .pwd {
    margin-top: 0.64rem;
  }
}

.index .nr ::-webkit-input-placeholder {
  color: #999999;
}

.index .nr ::-o--input-placeholder {
  color: #999999;
}

.index .nr ::-moz-input-placeholder {
  color: #999999;
}

.index .nr ::-ms-input-placeholder {
  color: #999999;
}

.index .nr .message {
  width: 10.8rem;
  height: 1.4rem;
  margin-top: 0.64rem;
  /*验证码文字*/
}

.index .nr .message .emal {
  width: 5.5rem;
  height: 1.4rem;
  margin-left: 1.4rem;
  border-radius: 0.7rem;
  background-color: #ffffff;
  box-shadow: 0 0.03rem 0.21rem 0 rgba(51, 150, 254, 0.35);
  float: left;
}

.index .nr .message .emal i {
  width: 0.56rem;
  height: 0.43rem;
  margin-left: 0.65rem;
  margin-right: 0.35rem;
  margin-top: 0.49rem;
  float: left;
  font-size: 22px;
  color: #93e4fc;
}
.index {
  input {
    font-size: 0.4rem;
  }
}

.index .nr .message .emal input {
  border: none;
  width: 2.8rem;
  height: 0.7rem;
  color: #999999;
  float: left;
  margin-top: 0.35rem;
}

.index .nr .message .yzm {
  color: #3396fe;
  font-size: 0.4rem;
  margin-left: 0.52rem;
  float: left;
  line-height: 1.4rem;
}

.index .nr .btn {
  width: 8rem;
  height: 1.21rem;
  margin-top: 1.04rem;
  margin-left: 1.4rem;
  background-image: linear-gradient(-20deg, #3396fe 0%, #65c1fd 100%),
    linear-gradient(#ffffff, #ffffff);
  background-blend-mode: normal, normal;
  box-shadow: 0 0.03rem 0.21rem 0 rgba(51, 150, 254, 0.35);
  border-radius: 0.6rem;
  font-size: 0.5rem;
  line-height: 1.21rem;
  color: #ffffff;
  text-align: center;
}

.index .nr .btn p {
  font-size: 0.5rem;
  line-height: 1.21rem;
  color: #ffffff;
  text-align: center;
}

.index .nr .fttext {
  margin-top: 0.9rem;
}

.index .nr .fttext p {
  letter-spacing: 0.01rem;
  color: #12b7f5;
  font-size: 0.4rem;
  opacity: 0.6;
  line-height: 0.9rem;
  text-align: center;
}
</style>

