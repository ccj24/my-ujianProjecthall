<template>
  <div>
    <!-- <div class="user" v-if="CardInfo!=null">
      <div class="baseinfo">
        <div class="portrait">
          <img :src="CardInfo.model.bcLogo" />
        </div>
        <div class="body">
          <div class="name">{{CardInfo.model.bcName}}</div>
          <div class="post">
            <i class="icon">&#xe756;</i>
            {{CardInfo.model.bcPosition}}
          </div>
          <div class="corp">
            <i class="icon">&#xe636;</i>
            {{CardInfo.model.bcCompay}}
          </div>
          <div class="tool">
            <span class="share">
              <i class="icon">&#xe64e;</i>
            </span>
            <span class="praise">
              <i class="icon">&#xe619;</i>
              {{CardLikeCount}}
            </span>
          </div>
        </div>
      </div>
      <div class="contact">
        <ul>
          <li>
            <i class="icon">&#xe60d;</i>
            <span>{{CardInfo.model.bcTelPhone}}</span>
          </li>
          <li>
            <i class="icon">&#xe60b;</i>
            <span>{{CardInfo.model.bcEmaill}}</span>
          </li>
          <li>
            <i class="icon">&#xe65e;</i>
            <span>{{CardInfo.model.bcAddress}}</span>
          </li>
        </ul>
      </div>
      <div class="brief">
        <p class="title">个人简介</p>
        <span class="content">
          <div v-html="CardInfo.model.bcIntroducation"></div>
        </span>
        <ul class="images">
          <li v-for="(item,index) in CardInfo.images" :key="index">
            <img :src="item.bcbUrl" />
          </li>
        </ul>
      </div>
      <div class="brief other" v-if="otherInfo.length>0">
        <p class="title">其他信息</p>
        <div class="contact">
          <ul>
            <li v-for="(item,index) in otherInfo" :key="index">
              <i class="icon">{{item.bcevTitle}}</i>
              <span>{{item.bcevValue}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="brief enterprise other" v-if="entInfo">
        <p class="title">我的企业</p>
        <div class="ent_name">
          <img class="ent_logo" :src="entInfo.eLogo" />
          <p class>{{entInfo.eName}}</p>
          <img v-if="entInfo.IsCertification" class="auth" src="/static/images/auth.png" />
          <img v-if="entInfo.vipState==1" class="vip" src="/static/images/vip.png" />
        </div>
        <p class="ent_brief">{{entInfo.Brief}}</p>
        <ul class="ent_images" v-if="entImages.length>0">
          <li v-for="(item, index) in entImages" :key="index">
            <img :src="item.Path" />
          </li>
        </ul>
        <div class="ent_video" v-if="entVideos.length>0">
          <video v-for="(item,index) in entVideos" :src="item.Path" :key="index"></video>
        </div>
        <div class="ent_local">
          <i class="icon">&#xe65e;</i>
          <p>{{entInfo.Address}}</p>
        </div>
        <div class="ent_news">
          <div class="title">
            <h5>企业动态</h5>
            <i class="icon">></i>
          </div>
          <ul class="list">
            <li>
              <p class="news_title">北海运营中心开业啦</p>
              <span class="news_date">2月25日 18:40</span>
            </li>
            <li>
              <p class="news_title">北海运营中心开业啦北海运营中心开业啦最多可以放两行字像这样子</p>
              <span class="news_date">2月25日 18:40</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="brief enterprise other not" v-else>
        <p class="title">我的企业</p>
        <p class="tip">该用户尚暂无展示企业</p>
      </div>
      <div class="shop">
        <h5 class="title">推广店铺</h5>
        <div class="shop_head">
          <img class="shop_logo" src="/static/img/homePage_redPacket.png" />
          <div class="shop_info">
            <div class="shop_name">筛网滤布专营店</div>
            <div class="shop_score">
              店铺总综合评分：
              <span>5.0</span>
            </div>
            <div class="shop_other">
              <span class="shop_type">普通金属材料</span>
              <span class="distance">11.2km</span>
            </div>
          </div>
        </div>
        <ul class="shop_goods">
          <li class="shop_goods_item">
            <div class="shop_goods_info">
              <img :src="tmpUrl" />
              <div class="shop_goods_name">商品名称最多可以显示两行文字</div>
            </div>
            <p class="shop_goods_price">¥9999.99</p>
          </li>
          <li class="shop_goods_item">
            <div class="shop_goods_info">
              <img src="/static/img/homePage_redPacket.png" />
              <div class="shop_goods_name">商品名称最多可以显示两行文字</div>
            </div>
            <p class="shop_goods_price">¥9999.99</p>
          </li>
          <li class="shop_goods_item">
            <div class="shop_goods_info">
              <img src="/static/img/homePage_redPacket.png" />
              <div class="shop_goods_name">商品名称最多可以显示两行文字</div>
            </div>
            <p class="shop_goods_price">¥9999.99</p>
          </li>
        </ul>
        <div class="shop_local">
          <i class="icon">&#xe65e;</i>
          <p>西乡塘区罗文大道33号广西建设职业技术学院实训大楼南楼14楼这行字可以显示很长的文...</p>
        </div>
      </div>
    </div> -->
    <canvas canvas-id="myCanvas" id="myCanvas" class="canvas"></canvas>
  <web-view :src="webviewUrl" @message="getPostMessage" @load="load" @error="error" style="width: 414px; height: 672px;"></web-view>
  </div>
</template>
<script>
import { mapState } from "vuex";
import utils from "@/utils/index.js";
export default {
  data() {
    return {
      shareId: "",
      forward: "",
      backjson: "",
      CardInfo: null,
      CardLikeCount: 0,
      otherOfClass: null,
      entInfo: null,
      entImages: [],
      entVideos: [],
      entNews: [],
      tmpUrl: "",
      // Url:"http://192.168.0.85:811/wxtest.html",
      Url: "https://test.ujianchina.net/share.html"
    };
  },
  computed: {
    ...mapState({
      SingleTicket: state => state.User.SingleTicket, //获取当前用户的验证票据
      UserInfo: state => state.User.UserInfo //获取当前用户的登录信息
    }),
    webviewUrl() {
      var parmes = [];

      if (this.shareId) {
        parmes.push(`shareId=${this.shareId}`);
      }
      if (this.forward) {
        parmes.push(`forward=${this.forward}`);
      }
      if (this.UserInfo && !utils.isEmpty(this.UserInfo)) {
        parmes.push(`UserInfo=${encodeURIComponent(JSON.stringify(this.UserInfo))}`);
      }

      if (parmes.length > 0) {
        return `${this.Url}?${parmes.join("&")}`;
      } else return `${this.Url}`;
    },
    //其他联系方式展示扩展
    otherInfo() {
      if (this.otherOfClass == null) return [];
      var _class = this.otherOfClass.find(item => {
        return item.bceName == "更多信息" && item.bceEnable;
      });
      if (this.CardInfo != null && _class != null)
        return this.CardInfo.extendValue.filter(item => {
          return item.businessCardExtendClassId == _class.businessCardExtendClassId;
        });
      else return [];
    },
    //企业展示扩展
    entExtend() {
      if (this.otherOfClass == null) return null;
      var _class = this.otherOfClass.find(item => {
        return item.bceName == "我的企业" && item.bceEnable;
      });
      if (this.CardInfo != null && _class != null)
        return this.CardInfo.extendValue.find(item => {
          return item.businessCardExtendClassId == _class.businessCardExtendClassId;
        });
      else return {};
    }
  },
  methods: {
    async getPostMessage(e) {
      console.log(e);
      this.backjson = e.mp.detail.data[0];
      // if(this.backjson.hdThumbImage)
      // {
      //     this.backjson.imageUrl = await utils.base64src(`data:image/png;base64,${this.backjson.hdThumbImage}`)
      // }
    },
    load(e) {
      console.log(e);
    },
    error(e) {
      console.log(e);
    }
  },
  onShareAppMessage(res) {
    var _result = {
      title: this.backjson.title,
      path: this.backjson.path,
      imageUrl: this.tmpUrl
    };
    // console.log(_result)
    // console.log(_result.imageUrl)
    return _result;
  },
  onLoad(query) {
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    if (query.scene) this.shareId = decodeURIComponent(query.scene);

    wx.showShareMenu({
      withShareTicket: true
      // menus: ['shareAppMessage', 'shareTimeline']
    });
  },
  onShow() {
    wx.hideHomeButton();
  },

  async mounted() {
    var that = this;
    if (this.$route.query && this.$route.query.shareId) {
      this.shareId = this.$route.query.shareId;
    }
    if (this.$route.query && this.$route.query.forward) {
      this.forward = this.$route.query.forward;
    }
    // console.log(this.webviewUrl)
    //获取名片
    var res = await this.$UJAPI.BusinessCard_DetailOfShare(this.shareId);
    if (res.ret == 0) {
      this.CardInfo = res.data;
      this.toast("正在生成名片")
      const ctx = wx.createCanvasContext("myCanvas");
      ctx.drawImage("/static/images/bg.png", 0, 0, 500, 400); //以iPhone 6尺寸大小为标准绘制图片

      var off = 17;
      ctx.setFillStyle("#0e0e0e");
      ctx.font = "22px PingFang-SC-Medium";
      if(that.CardInfo.model.bcCompay.length>18)
        ctx.fillText(that.CardInfo.model.bcCompay.substr(0,18)+'...', 32, 70 + off)
      else
        ctx.fillText(that.CardInfo.model.bcCompay, 32, 70 + off)

      ctx.font = "34px PingFang-SC-Bold";
      if(that.CardInfo.model.bcName.length>12)
      ctx.fillText(that.CardInfo.model.bcName.substr(0,12)+'...', 32, 135 + off);
      else
      ctx.fillText(that.CardInfo.model.bcName, 32, 135 + off);

      ctx.font = "22px PingFang-SC-Medium";
      if(that.CardInfo.model.bcPosition.length>14)
      ctx.fillText(that.CardInfo.model.bcPosition.substr(0,14)+'...', 32, 184 + off);
      else
      ctx.fillText(that.CardInfo.model.bcPosition, 32, 184 + off);

      ctx.font = "20px PingFang-SC-Medium";
      ctx.fillText(that.CardInfo.model.bcTelPhone, 60, 251 + off);
      ctx.fillText(that.CardInfo.model.bcEmaill, 60, 287 + off);
      if(that.CardInfo.model.bcAddress.length>21)
      {
        ctx.fillText(that.CardInfo.model.bcAddress.substring(0,19)+"...", 60, 327 + off);
      }
      else
      {
        ctx.fillText(that.CardInfo.model.bcAddress, 60, 327 + off);
      }  
      wx.getImageInfo({
        src: that.CardInfo.model.bcLogo,
        success: function(res) {
          var avatarurl_width = 105; //绘制的头像宽度
          var avatarurl_heigth = 105; //绘制的头像高度
          var avatarurl_x = 369; //绘制的头像在画布上的位置
          var avatarurl_y = 122; //绘制的头像在画布上的位置
          ctx.save();
          ctx.beginPath(); //开始绘制
          //先画个圆 前两个参数确定了圆心 （x,y） 坐标 第三个参数是圆的半径 四参数是绘图方向 默认是false，即顺时针
          ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.clip(); //画好了圆 剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
          ctx.drawImage(res.path, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片，必须是https图片
          ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下文状态 还可以继续绘制
          ctx.draw();
          ctx.save();
          
          //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
          setTimeout(() => {
            wx.canvasToTempFilePath({
                width: 500,
                height: 400,
                destWidth: 500,
                destHeight: 400,
                canvasId: "myCanvas",
                success: function(res2) {
                  console.log(res2.tempFilePath);
                  that.tmpUrl = res2.tempFilePath;
                  wx.hideToast()
                },
                fail: function(res2) {
                  console.log(res2.errMsg);
                }
                });
          }, 800);
        },
        fail: function(err) {
          console.log(err);
          wx.showToast({
            title: "网络错误请重试",
            icon: "loading"
          });
        }
      });

      // const query = wx.createSelectorQuery()
      // query.select('#myCanvas')
      // .fields({ node: true, size: true })
      //   .exec((res) => {
      //     const _canvas = res[0].node
      //     const ctx = _canvas.getContext('2d')
      //     _canvas.width=500;
      //     _canvas.height=400;
      //     // console.log(dpr);
      //     var img = _canvas.createImage()
      //     img.src='/static/images/bg.png';
      //     img.onload = (res) => {
      //       //img.complete表示图片是否加载完成，结果返回true和false;
      //       //背景底图
      //       var off = 17;
      //       ctx.drawImage(img, 0, 0,500,400);
      //       // 公司名
      //       ctx.font="22px PingFang-SC-Medium"
      //       ctx.fillStyle = '#0e0e0e';
      //       ctx.fillText(that.CardInfo.model.bcCompay, 32, 70+off)
      //       //用户名
      //       ctx.font="34px PingFang-SC-Bold"
      //       ctx.fillStyle = '#0e0e0e';
      //       ctx.fillText(that.CardInfo.model.bcName, 32, 135+off)

      //       //职位
      //       ctx.font="22px PingFang-SC-Medium"
      //       ctx.fillStyle = '#0e0e0e';
      //       ctx.fillText(that.CardInfo.model.bcPosition, 32, 184+off)
      //       //联系方式、邮箱、地址
      //       ctx.font="20px PingFang-SC-Medium"
      //       ctx.fillStyle = '#0e0e0e';
      //       ctx.fillText(that.CardInfo.model.bcTelPhone, 60, 251+off)
      //       ctx.fillText(that.CardInfo.model.bcEmaill, 60, 287+off)
      //       ctx.fillText(that.CardInfo.model.bcAddress, 60, 327+off)

      //       wx.canvasToTempFilePath({
      //               width: 500,
      //               height: 400,
      //               destWidth: 500,
      //               destHeight: 400,
      //               canvasId:"myCanvas",
      //               canvas:_canvas,
      //               success(res) {
      //                 // console.log(res.tempFilePath)
      //                 that.tmpUrl=res.tempFilePath
      //               }
      //       })

      //       //设置头像
      //       // var portraitImg = _canvas.createImage()
      //       // portraitImg.src = that.CardInfo.model.bcLogo;

      //       // portraitImg.onload = (res) => {
      //       // //   var avatarurl_width = 105; //绘制的头像宽度
      //       // //   var avatarurl_heigth = 105; //绘制的头像高度
      //       // //   var avatarurl_x = 369; //绘制的头像在画布上的位置
      //       // //   var avatarurl_y = 122; //绘制的头像在画布上的位置
      //       // //   ctx.save();
      //       // //   ctx.beginPath(); //开始绘制
      //       // //   //先画个圆 前两个参数确定了圆心 （x,y） 坐标 第三个参数是圆的半径 四参数是绘图方向 默认是false，即顺时针
      //       // //   ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI *2, false);
      //       // //   ctx.closePath()
      //       // //   ctx.clip(); //画好了圆 剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
      //       // //   ctx.drawImage(portraitImg, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片，必须是https图片
      //       // //   ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
      //       // //   console.log(wx);
      //       // }

      //   };
      // })

      //获取名片点赞
      // var res2 = await this.$UJAPI.BusinessCard_GetLikeCount(this.CardInfo.model.businessCardId);
      // if (res2.ret == 0) {
      //   this.CardLikeCount = res2.data;
      // }
      // //获取名片扩展信息分类
      // var res3 = await this.$UJAPI.BusinessCard_GetListOfClass();
      // if (res3.ret == 0) {
      //   this.otherOfClass = res3.data;
      // }
      // if (this.entExtend.bcevValue) {
      //   //获取名片展示的企业
      //   var res4 = await this.$UJAPI.Enterprise_GetDetailed(this.entExtend.bcevValue);
      //   if (res4.ret == 0) {
      //     this.entInfo = res4.data;
      //   }
      //   //获取企业展示的图片
      //   if (this.entInfo && this.entInfo.eId) {
      //     var res5 = await this.$UJAPI.EnterpriseMultimedia_Get(this.entInfo.eId, 1);
      //     if (res5.ret == 0) {
      //       this.entImages = res5.data;
      //     }
      //     var res6 = await this.$UJAPI.EnterpriseMultimedia_Get(this.entInfo.eId, 2);
      //     if (res6.ret == 0) {
      //       this.entVideos = res6.data;
      //     }
      //     var res7 = await this.$UJAPI.EnterpriseNews_GetListOfCommon({ eId: this.entInfo.eId, pageIndex: 1, pageSize: 3 });
      //     if (res7.ret == 0) {
      //       this.entNews = res7.data;
      //     }
      //   }
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin borderCrude {
  border-bottom: 0.2rem solid #ecedef;
}
@mixin borderFine {
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
      margin-right: 0.5rem;
      text-indent: 2em;
      font-size: 0.36rem;
    }
    .images {
      margin: 0.82rem 1.2rem 0.9rem 1.13rem;
      font-size: 0;
      li {
        display: inline-block;
        margin-right: 0.07rem;
        img {
          width: 2.75rem;
          height: 2.75rem;
        }
      }
    }
    .contact {
      border: none;
    }
  }
  .other {
    .title {
      padding-right: 0;
      padding-left: 0;
      margin: 0 0.45rem;
    }
  }
  .enterprise {
    .ent_name {
      margin: 0.66rem 0.45rem 0.79rem 0.45rem;
      display: flex;
      .ent_logo {
        width: 1.12rem;
        height: 1.11rem;
        margin-right: 0.21rem;
        margin-left: 0.09rem;
      }
      p {
        margin-top: 0.08rem;
        margin-right: 0.32rem;
        font-size: 0.42rem;
        line-height: 0.38rem;
        color: #050817;
      }
      .auth,
      .vip {
        margin-right: 0.12rem;
        margin-top: 0.08rem;
        width: 0.36rem;
        height: 0.44rem;
      }
    }
    .ent_brief {
      font-size: 0.36rem;
      line-height: 0.48rem;
      letter-spacing: 0rem;
      color: #363636;
      text-indent: 2em;
      margin: 0 0.45rem;
    }
    .ent_images {
      padding: 0.56rem 0.45rem 0.58rem 0.45rem;
      font-size: 0;
      @include borderFine;
      li {
        display: inline-block;
        padding: 0;
        margin-left: 0.06rem;
        img {
          width: 2.3rem;
          height: 2.3rem;
        }
      }
    }
    .ent_video {
      padding: 0.51rem 0.45rem 0.58rem 0.45rem;
      @include borderFine;
      video {
        width: 100%;
        height: 5.04rem;
      }
    }
    .ent_local {
      display: flex;
      padding: 0.51rem 0.45rem 0.58rem 0.45rem;
      i {
        font-size: 0.49rem;
        line-height: 0.56rem;
        color: #999999;
        margin-right: 0.26rem;
      }
      p {
        display: inline-block;
        font-size: 0.44rem;
        line-height: 0.56rem;
        color: #363636;
      }
    }
    .ent_news {
      .title {
        display: flex;
        justify-content: space-between;
        background-color: #f5f5f5;
        border: 0;
        margin: 0;
        padding: 0.21rem 0.51rem;
        h5 {
          font-size: 0.4rem;
          font-weight: bold;
          color: #1a1a1a;
          line-height: 0.76rem;
        }
        i {
          color: #ababab;
        }
      }
      .list {
        li {
          padding: 0.52rem 0.54rem;
          display: flex;
          justify-content: space-between;
          .news_title {
            font-size: 0.44rem;
            line-height: 0.66rem;
            color: #363636;
            flex: 1 1;
          }
          .news_date {
            font-size: 0.32rem;
            line-height: 0.66rem;
            color: #808080;
          }
        }
      }
    }

    .tip {
      font-size: 0.38rem;
      line-height: 0.38rem;
      color: #808080;
      text-align: center;
      padding: 0;
      display: block;
      margin: 0 auto;
      margin-bottom: 0.8rem;
    }
  }
  .enterprise.not {
    .title {
      border: none;
    }
  }
  .shop {
    .title {
      font-size: 0.52rem;
      font-weight: bold;
      color: #1a1a1a;
      margin: 0.65rem 0 0 0.53rem;
    }
    .shop_head {
      margin: 0.6rem 0 0 0.53rem;
      display: flex;
      .shop_logo {
        width: 1.71rem;
        height: 1.71rem;
      }
      .shop_info {
        margin-left: 0.44rem;
        .shop_name {
          letter-spacing: 0.02rem;
          font-size: 0.44rem;
          color: #021218;
        }
        .shop_score {
          // margin-top: 0.26rem;
          color: #9b9b9b;
          font-size: 0.4rem;
          span {
            color: #ff5252;
          }
        }
        .shop_other {
          // margin-top: 0.17rem;
          height: auto;
          display: flex;
          .shop_type {
            font-size: 0.28rem;
            color: #021218;
            padding: 0.12rem 0.13rem;
            letter-spacing: 0.02rem;
            background-color: #fccb5c;
            display: inline-block;
            margin-right: 0.53rem;
          }
          .distance {
            display: inline-block;
            font-size: 0.32rem;
            line-height: 0.7rem;
            color: #021218;
          }
        }
      }
    }
    .shop_goods {
      padding: 0.51rem 0 0.7rem 0.52rem;
      @include borderFine;
      font-size: 0;
      .shop_goods_item {
        display: inline-block;
        margin-right: 0.34rem;
        .shop_goods_info {
          position: relative;
          img {
            width: 3.03rem;
            height: 3.03rem;
          }
          .shop_goods_name {
            position: absolute;
            bottom: 0;
            width: auto;
            min-width: 2.88rem;
            color: #ffffff;
            font-size: 0.36rem;
            padding: 0.2rem 0.09rem;
            background-color: #000000;
            opacity: 0.5;
          }
        }
        .shop_goods_price {
          margin-top: 0.23rem;
          font-size: 0.3rem;
          line-height: 0.7rem;
          letter-spacing: 0.06rem;
          color: #e00201;
        }
      }
    }
    .shop_local {
      margin: 0.45rem 0 2rem 0.53rem;
      display: flex;
      .icon {
        font-size: 0.44rem;
        line-height: 0.56rem;
        margin-right: 0.26rem;
        color: #999999;
      }
      p {
        font-size: 0.44rem;
        line-height: 0.56rem;
        color: #363636;
      }
    }
  }
}

.canvas {
  background: #fff;
  margin: 0 auto;
  width: 500px;
  height: 400px;
  position:absolute;
  top:-500rem;
}
</style>