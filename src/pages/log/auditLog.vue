<template>
  <div>
    <div class="particulars">
      <div class="particulars_one">
        <img :src="ProjectLog.Portrait" />
        <div class="information">
          <p class="name">{{ProjectLog.CreatorName}}</p>
          <div class="bumen">
            <p>{{ProjectLog.DepartmentName}}</p>
            <p>{{ProjectLog.PostName}}</p>
          </div>
        </div>
      </div>

      <div class="particulars_bottom">
        <div class="title">
          <p>{{ProjectLog.LogTitle}}</p>
        </div>
        <div class="time">
          <!-- <div class="tubiao"></div> -->
          <img src="/static/images/Clock@3x.png" alt />
          <div class="riqi">{{ProjectLog.CreateTimeFormat}}</div>
        </div>
        <div class="photo">
          <!-- index是一个索引 -->
          <img v-for="(item,index) in  ProjectLog.Images " :key="index" :src="item" />
        </div>
        <div class="input">{{ProjectLog.LogContent}}</div>
      </div>
    </div>
    <div class="pass">
      <div class="passNr" style="float:left" @click="pass">
        <img src="/static/images/dan.png" alt />
        <span style="color: #12b7f5;">通过</span>
      </div>
      <div class="passNr" @click="nopass">
        <img src="/static/images/off.png" alt />
        <span style="color: red;">不通过</span>
      </div>
    </div>
    <div>
      <!-- 确定框 -->
      <div class="frame" v-show="conceal">
        <div class="frame_top">确定通过？</div>
        <div class="frame_two">
          <div class="one" style="float:left" @click="affirm">确认</div>
          <div class="two" @click="cancel">取消</div>
        </div>
      </div>
    </div>
    <!-- 点击取消的遮罩层 -->
    <div :class="{layout:zhezhaoceng}" @click="lose"></div>
    <!-- 不通过原因 -->
    <div class="reason" v-show="reason" @click.stop>
      <radio-group class="radio-group" bindchange="radioChange">
        <radio class="radio" color="#12b7f5" v-for="(item,index) in reasonContent" :key="index">
          {{item.content}}
        </radio>
      </radio-group>
      <div class="comment_box">
        <div class="comment">
          <textarea v-model="CommentContent" maxlength="1000" auto-focus="’true’"></textarea>
        </div>
        <div class="ture" @click="review">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ProjectLog: {}, //项目日志（名字自己命名）
      LogId: {},
      conceal: false,
      zhezhaoceng: false,
      reason: false,
      reasonContent:[
        {content:"内容不够详细，有缺漏！"},
        {content:"图片搭错了"},
        {content:"写得太凌乱，没有主题"},
        {content:"重新细心检查过"},
      ]
    };
  },
  methods: {
    // 点击通过
    pass() {
      this.conceal = true;
      this.zhezhaoceng = true;
    },
    async affirm() {
      var that = this;
      var rep = await this.$UJAPI.ProjectLog_SetAudit({
        LogId: this.$route.query.LogId,
        Audit: 1
      });
      if (rep.ret == 0) {
        //成功执行的代码
        this.toast("审核成功");
        this.$router.back();
      } else {
        //失败执行的代码
        this.toast("审核失败");
        this.$router.back();
      }
    },
    cancel() {
      this.conceal = false;
      this.zhezhaoceng = false;
      this.$router.back();
    },
    // 点击不通过
    async nopass() {
      // var that = this;
      // var rep = await this.$UJAPI.ProjectLog_SetAudit({
      //   LogId: this.$route.query.LogId,
      //   Audit: -1
      // });
      // if (rep.ret == 0) {
      //   //成功执行的代码
      //   this.toast("确认不通过");
      //   this.$router.back();
      // } else {
      //   //失败执行的代码
      //   this.toast("审核失败");
      //   this.$router.back();
      // }
      this.reason = true;
      this.zhezhaoceng = true;
    },
    lose() {
      this.reason = false
      this.zhezhaoceng = false;
    }
  },
  // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  async mounted() {
    console.log(this.$route.query.LogId);
    var that = this;
    //获取日志接口
    var rep = await this.$UJAPI.Project_ProjectLog({
      // LogId:1944,
      LogId: this.$route.query.LogId,
      Projectid: this.ProjectId,
      // 待审核，QueryType:3
      QueryType: 3,
      Audit: 0
    });
    if (rep.ret == 0) {
      this.ProjectLog = rep.data;
    }
    console.log(this.ProjectLog);
  }
};
</script>

<style scoped>
.particulars_one {
  margin-left: 0.29rem;
  margin-top: 0.46rem;
}
.particulars_one img {
  width: 1.06rem;
  height: 1.06rem;
  background-color: #000000;
  border-radius: 0.05rem;
  float: left;
}
.information {
  height: 1.06rem;
  margin-left: 1.32rem;
  padding-top: 0rem;
}
.name {
  font-size: 0.46rem;
  color: #353535;
}
.bumen {
  overflow: hidden;
}
.bumen p {
  float: left;
  font-size: 0.37rem;
  color: #353535;
  padding-right: 0.5rem;
}
.particulars_bottom {
  width: 100%;
  margin-top: 0.46rem;
  border-top: 0.01rem solid #e8e8e8;
}
.title {
  margin-top: 0.73rem;
  margin-left: 0.25rem;
  overflow: hidden;
}
.title p {
  font-size: 0.49rem;
  color: #353535;
  float: left;
  padding-left: 0.1rem;
}
.time {
  margin-left: 0.35rem;
  margin-top: 0.26rem;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.time img {
  width: 0.33rem;
  height: 0.33rem;
  /* background-color: #999999; */
  float: left;
}
.riqi {
  font-size: 0.35rem;
  color: #565656;
  padding-left: 0.27rem;
}
.photo {
  overflow: hidden;
  margin-top: 0.71rem;
  margin-left: 0.27rem;
}
.photo img {
  float: left;
  width: 3.4rem;
  height: 3.37rem;
  padding-right: 0.02rem;
}
.photo img:nth-child(3n) {
  padding-right: 0rem;
}
.input {
  font-size: 0.43rem;
  line-height: 0.63rem;
  color: #353535;
  margin: 0.39rem 0.39rem auto 0.39rem;
}
.pass img {
  width: 0.4rem;
  height: 0.4rem;
  padding-right: 0.26rem;
}
.pass {
  width: 100%;
  height: 1.42rem;
  background-color: #fcfcfc;
  box-shadow: 0rem -0.01rem 0rem 0rem #d9d9d9;
  font-size: 0.4rem;
  overflow: hidden;
  position: fixed;
  bottom: 0;
}
.passNr {
  width: 50%;
  line-height: 1.42rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.frame {
  width: 7.79rem;
  height: 3rem;
  font-size: 0.49rem;
  background-color: #ffffff;
  border-radius: 0.36rem;
  opacity: 0.8;
  overflow: hidden;
  /*固定定位 */
  position: fixed;
  top: 5.23rem;
  left: 1.49rem;
  z-index: 3;
}
.frame_top {
  height: 1.74rem;
  text-align: center;
  color: #353535;
  line-height: 1.74rem;
  border-bottom: 0.02rem solid #353535;
}
.one {
  width: 50%;
  text-align: center;
  color: #12b7f5;
  line-height: 1.26rem;
  border-right: 0.01rem solid #353535;
}
.two {
  overflow: hidden;
  text-align: center;
  color: #12b7f5;
  line-height: 1.26rem;
}
.layout {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #353535;
  /* 背景透明度 */
  opacity: 0.5;
  position: fixed;
  z-index: 2;
}
.reason {
  width: 100%;
  position: fixed;
  bottom: 0rem;
  background-color: #fff;
  z-index: 2;
}
.hang {
  display: flex;
  align-items: center;
}
.radio {
  width: 100%;
  height: 1.5rem;
  color: #353535;
  font-size: 0.43rem;
  border-bottom: solid 0.03rem #aaa9a9;
  display: flex;
  align-items: center;
}

.content {
  font-size: 0.43rem;
  color: #353535;
  margin-left: 0.3rem;
}
.comment_box {
  display: flex;
  align-items: center;
}
.comment {
  margin: 0.2rem 0 0.2rem 0.3rem;
  float: left;
}
.comment textarea {
  padding: 0.2rem;
  width: 8rem;
  max-height: 1.2rem;
  font-size: 0.4rem;
  word-wrap: break-word;
  word-break: break-all;
  overflow-y: auto;
  border-radius: 0.15rem;
  border: 0.02rem solid #898989;
}
.ture {
  width: 2rem;
  font-size: 0.46rem;
  color: #12b7f5;
  text-align: center;
}
</style>
<style>
page {
  background-color: #ffffff;
}
/* 选中框大小 */
radio .wx-radio-input{
  height: 0.5rem;
  width: 0.5rem;
  margin-left: 0.5rem
}
</style>

