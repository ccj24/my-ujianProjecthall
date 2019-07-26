<template>
  <div class="index">
    <div class="content">
      <div class="jiankong">
        <div class="projectlist">
          <ul v-for="(item,index) in ProjectMonitoringVideo" :key="index">
            <li>
              <video controls>
                <source src="item.MonitoringVideoURL" type="video/mp4" />
                <source src="movie.ogg" type="video/ogg" />
              </video>
            </li>
            <li style="margin-bottom: 0.5rem">{{item.Title}}</li>
          </ul>
        </div>

        <div class="jk_tishidiv"  style="z-index:1;">
          <div class="jk_tishi_head">
            <img class="jk_close" src="img/jk_close.png" alt />
            <p>U建将为您提供更专业的工程监控服务，如您有此需求，欢迎按照下方操作与我们联系，我们将会在最短的时间内进行回复，并竭力提供最优良的服务。</p>
          </div>
          <div class="jk_tishi_ft">
            <div class="jk_phone_div">
              <img class="jk_phone" src="img/jk_phone.png" alt />
              <p class="phonep">电话联系</p>
            </div>
            <div class="jk_phone_div">
              <img class="jk_msg" src="img/jk_message.png" alt />
              <p class="msgp">发送留言</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showexplain: true,
      ProjectMonitoringVideo: []
    };
  },
  methods: {
    clickexplain() {
      this.showexplain = false;
    }
  },
  async mounted() {
    var that = this;
    var rep = await this.$UJAPI.Project_MonitoringVideo({
      Projectid: this.$route.query.ProjectId
    });
    if (rep.ret == 0) {
      this.ProjectMonitoringVideo = rep.data;
    }
    
  }
};
</script>


<style scoped>
.index .content .jiankong,
.index .content2 .jiankong,
.index .content3 .jiankong {
  background-color: #ffffff;
  position: static;
  left: 0;
  right: 0;
  bottom: 0;
  top: 1.28rem;
  margin-top: 0.4rem;
  overflow: auto;
  min-height: calc(100% + size(1));
  margin-bottom: 5.2rem;
}
.projectlist {
  width: 100%;
  overflow: hidden;
  margin-top: 0.4rem;
  margin-left: 0.4rem;
}
.projectlist ul {
  float: left;
  /* overflow: hidden; */
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.projectlist video {
  height: 4.5rem;
  width: 4rem;
  margin-top: 0.1rem;
}
.projectlist li {
  font-size: 0.4rem;
  text-align: center;
}
.index .content .jiankong .jk_div .jk_xuhao,
.index .content2 .jiankong .jk_div .jk_xuhao,
.index .content3 .jiankong .jk_div .jk_xuhao {
  color: #1288f5;
  font-size: 0.48rem;
  line-height: 0.48rem;
  text-align: center;
  border: 0.02rem solid #1288f5;
  border-radius: 1rem;
  width: 0.43rem;
  height: 0.43rem;
  margin-right: 0.19rem;
  float: left;
  margin-top: 0.11rem;
}

.index .content .jiankong .jk_div .jk_name,
.index .content2 .jiankong .jk_div .jk_name,
.index .content3 .jiankong .jk_div .jk_name {
  color: #353535;
  font-size: 0.48rem;
  float: left;
}

.index .content .jiankong .jk_div .jk_next,
.index .content2 .jiankong .jk_div .jk_next,
.index .content3 .jiankong .jk_div .jk_next {
  float: right;
  width: 0.16rem;
  height: 0.33rem;
  margin-top: 0.15rem;
}

.index .content .jiankong .jk_tishidiv,
.index .content2 .jiankong .jk_tishidiv,
.index .content3 .jiankong .jk_tishidiv {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
}

.index .content .jiankong .jk_tishidiv .jk_tishi_head,
.index .content2 .jiankong .jk_tishidiv .jk_tishi_head,
.index .content3 .jiankong .jk_tishidiv .jk_tishi_head {
  padding: 0.64rem 0.33rem 0.32rem 0.33rem;
  border-top: 0.01rem solid #e8e8e8;
  border-bottom: 0.01rem solid #e8e8e8;
}

.index .content .jiankong .jk_tishidiv .jk_tishi_head .jk_close,
.index .content2 .jiankong .jk_tishidiv .jk_tishi_head .jk_close,
.index .content3 .jiankong .jk_tishidiv .jk_tishi_head .jk_close {
  position: absolute;
  right: 0.35rem;
  top: 0.2rem;
  width: 0.37rem;
  height: 0.37rem;
}

.index .content .jiankong .jk_tishidiv .jk_tishi_head p,
.index .content2 .jiankong .jk_tishidiv .jk_tishi_head p,
.index .content3 .jiankong .jk_tishidiv .jk_tishi_head p {
  line-height: 0.65rem;
  font-size: 0.41rem;
  color: #8c8c8c;
}

.index .content .jiankong .jk_tishidiv .jk_tishi_ft,
.index .content2 .jiankong .jk_tishidiv .jk_tishi_ft,
.index .content3 .jiankong .jk_tishidiv .jk_tishi_ft {
  padding: 0.21rem 0;
  overflow: hidden;
}

.index .content .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div:last-child,
.index .content2 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div:last-child,
.index .content3 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div:last-child {
  border: 0;
}

.index .content .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div,
.index .content2 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div,
.index .content3 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div {
  overflow: hidden;
  border-right: solid 0.02rem #e8e8e8;
  width: 49%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  float: left;
}

.index .content .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .jk_phone,
.index .content2 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .jk_phone,
.index .content3 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .jk_phone {
  float: left;
  width: 0.43rem;
  height: 0.43rem;
  margin-right: 0.18rem;
  margin-top: 0.24rem;
}

.index .content .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .jk_msg,
.index .content2 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .jk_msg,
.index .content3 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .jk_msg {
  float: left;
  width: 0.54rem;
  height: 0.46rem;
  margin-right: 0.18rem;
  margin-top: 0.19rem;
}

.index .content .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .phonep,
.index .content .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .msgp,
.index .content2 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .phonep,
.index .content2 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .msgp,
.index .content3 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .phonep,
.index .content3 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .msgp {
  color: #12b7f5;
  font-size: 0.42rem;
  float: left;
  line-height: 0.9rem;
}

.index .content .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .msgp,
.index .content2 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .msgp,
.index .content3 .jiankong .jk_tishidiv .jk_tishi_ft .jk_phone_div .msgp {
  color: #ff6c6c;
}
</style>
