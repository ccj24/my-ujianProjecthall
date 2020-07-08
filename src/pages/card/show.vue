<template>
  <div class="user">
    <div class="baseinfo">
      <div class="portrait">
        <img />
      </div>
      <div class="body">
        <div class="name">用户姓名</div>
        <div class="post">
          <i class="icon">&#xe756;</i>职位
        </div>
        <div class="corp">
          <i class="icon">&#xe636;</i>公司名
        </div>
        <div class="tool">
          <span class="share">
            <i class="icon">&#xe64e;</i>
          </span>
          <span class="praise">
            <i class="icon">&#xe619;</i>131
          </span>
        </div>
      </div>
    </div>
    <div class="contact">
      <ul>
        <li>
          <i class="icon">&#xe60d;</i>
          <span>1514450153</span>
        </li>
        <li>
          <i class="icon">&#xe60b;</i>
          <span>1514450153@qq.com</span>
        </li>
        <li>
          <i class="icon">&#xe65e;</i>
          <span>广西大学罗文大道18号建设职业技术学院</span>
        </li>
      </ul>
    </div>
    <div class="brief">
      <p class="title">个人简介</p>
      <pre class="content">这里是个人简介的内容区域，这里可以让用户自由输入注意几点：
\r\n
1、内容能够换行
2、能插入图片
3、字数500以内就行了</pre>
      <ul class="images">
        <li>
          <img src="/static/img/homePage_redPacket.png" />
        </li>
        <li>
          <img src="/static/img/homePage_redPacket.png" />
        </li>
        <li>
          <img src="/static/img/homePage_redPacket.png" />
        </li>
        <li>
          <img src="/static/img/homePage_redPacket.png" />
        </li>
        <li>
          <img src="/static/img/homePage_redPacket.png" />
        </li>
        <li>
          <img src="/static/img/homePage_redPacket.png" />
        </li>
        <li>
          <img src="/static/img/homePage_redPacket.png" />
        </li>
        <li>
          <img src="/static/img/homePage_redPacket.png" />
        </li>
        <li>
          <img src="/static/img/homePage_redPacket.png" />
        </li>
      </ul>
    </div>
    <div class="brief">
      <p class="title">其他信息</p>
      <div class="contact">
      <ul>
        <li>
          <i class="icon">微信</i>
          <span>1514450153</span>
        </li>
        <li>
          <i class="icon">邮编</i>
          <span>535300</span>
        </li>
      </ul>
      </div>
    </div>
  </div>
  <!-- <web-view :src="webviewUrl" @message="getPostMessage" @load="load" @error="error" style="width: 414px; height: 672px;"></web-view> -->
</template>
<script>
import { mapState } from "vuex";
import utils from "@/utils/index.js";
export default {
  data() {
    return {
      shareId: "",
      backjson: "",
      // Url:"http://192.168.0.85:811/wxtest.html",
      Url: "https://test.ujianchina.net/%E5%90%8D%E7%89%87%E5%8A%9F%E8%83%BD%E7%A8%8B%E5%BA%8F/share.html"
    };
  },
  computed: {
    ...mapState({
      SingleTicket: state => state.User.SingleTicket, //获取当前用户的验证票据
      UserInfo: state => state.User.UserInfo //获取当前用户的登录信息
    }),
    webviewUrl() {
      var parmes = [];
      if (this.backjson) {
        parmes.push(`backjson=${this.backjson}`);
      }
      if (this.shareId) {
        parmes.push(`shareId=${this.shareId}`);
      }
      if (this.UserInfo && !utils.isEmpty(this.UserInfo)) {
        parmes.push(`UserInfo=${encodeURIComponent(JSON.stringify(this.UserInfo))}`);
      }

      if (parmes.length > 0) {
        return `${this.Url}?${parmes.join("&")}`;
      } else return `${this.Url}`;
    }
  },
  methods: {
    getPostMessage(e) {
      console.log(e);
      this.backjson = JSON.stringify(e.mp.detail.data[0]);
    },
    load(e) {
      console.log(e);
    },
    error(e) {
      console.log(e);
    }
  },
  onShareAppMessage() {
    return {};
  },
  onLoad(query) {
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    if (query.scene) this.shareId = decodeURIComponent(query.scene);

    wx.showShareMenu({
      withShareTicket: true
    });
  },

  mounted() {
    if (this.$route.query && this.$route.query.shareId) {
      this.shareId = this.$route.query.shareId;
    }
    console.log(this.webviewUrl);
  }
};
</script>
<style lang="scss" scoped>
@mixin borderCrude {
  border-bottom: 0.2rem solid #ecedef;
}
@mixin borderFine{
    border-bottom: 0.02rem solid #ebebeb;
}
.user {
  .baseinfo {
    display: flex;
    padding: 0.49rem 0 0 0.34rem;
    margin: 0 0.45rem;
    background-color: #fff;
    padding-bottom: 0.71rem;
    @include borderFine;
    .portrait {
      width: 2.35rem;
      height: 2.37rem;
      img {
        width: 2.35rem;
        height: 2.37rem;
      }
    }
    .body {
      position: relative;
      width: 100%;
      color: #1a1a1a;

      margin: 0 0.59rem;
      div {
        display: block;
      }

      .name {
        font-size: 0.52rem;
        margin-top: 0.28rem;
        margin-bottom: 0.55rem;
      }
      .post,
      .corp {
        font-size: 0.38rem;
        i {
          display: inline-block;
          font-size: 0.34rem;
          padding: 0.07rem;
          border-radius: 50%;
          background-color: #12b7f5;
          color: #fff;
          margin-right: 0.16rem;
        }
      }
      .post {
        margin-bottom: 0.28rem;
      }
      .tool {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        .share,
        .praise {
          flex: 0 0 auto;

          border: solid 0.02rem #34394c;
          padding: 0.25rem 0.33rem;
          color: #34394c;
          font-size: 0.36rem;
          i {
            display: inline-block;
          }
        }
        .share {
          margin-right: 0.2rem;
          border-radius: 50%;
        }
        .praise {
          border-radius: 0.4rem;
          i {
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
  .contact {
    background-color: #fff;
    @include borderCrude;
    ul {
      padding-left: 0.76rem;
      padding-bottom: 0.77rem;
      li {
        margin-top: 0.8rem;
        i,
        span {
          display: inline-block;
        }
        i {
          font-size: 0.49rem;
          color: #939393;
          margin-right: 0.43rem;
        }
        span {
          font-size: 0.38rem;
          color: #050817;
        }
      }
    }
  }
  .brief {
    @include borderCrude;
    .title {
      @include borderFine;
      padding: 0.66rem 0 0.8rem 0.53rem;
      font-size: 0.53rem;
      font-weight: bold;
      color: #1a1a1a;
    }
    .content {
      margin: 0.41rem 0.5rem 0 0.5rem;
      font-size: 0.36rem;
    }
    .images {
      margin: 0.82rem 1.2rem 0 1.2rem;
      li {
        display: inline-block;
        margin-right: 0.07;
        img {
          width: 2.75rem;
          height: 2.75rem;
        }
      }
    }
    .contact{
        border: none;
    }
  }
}
</style>