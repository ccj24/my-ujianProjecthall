<template>
  <div>
    <div class="initiate">
      <span @click="addmeeting">发起会议</span>
    </div>
    <div class="top">
      <div @click="checktab(0)">
        <span :class="{tolerant:checkIndex==0}">即将召开</span>
      </div>
      <div @click="checktab(1)">
        <span :class="{tolerant:checkIndex==1}">已结束</span>
      </div>
      <div @click="checktab(2)">
        <span :class="{tolerant:checkIndex==2}">已取消</span>
      </div>
    </div>
    <div
      class="meeting"
      v-for="(item,index) in meetingData"
      :key="index"
      @click="meetingParticulars(item.MeetingId)"
    >
      <div class="meeting-top">
        <div class="faqiren">
          <span>发起人 ：</span>
          <span>{{item.CreatorName}}</span>
        </div>
        <span class="week">{{item.week}}</span>
      </div>
      <div class="meeting-two">
        <div class="thetime">
          <div class="time" :class="[{timeNr:checkIndex!=0},{timeBB:checkIndex==0&&index%2==1}]">
            <span class="time-one">{{item.month}}月</span>
            <span class="time-two">{{item.day}}</span>
          </div>
          <div
            class="time-three"
            :class="{shijian:checkIndex!=0}"
          >{{item.hour}}:{{item.minute}}</div>
        </div>
        <div class="content">
          <div class="content-one">
            <div class="manmub">
              <p class="manmub-one">{{item.Title}}</p>
              <p class="manmub-two">本次会议共{{item.Partaker.length}}人</p>
            </div>
            <div v-if="checkIndex==0" @click.stop>
              <div
                class="yaoqing"
                v-if="item.CreatorId==UserInfo.UserId"
                @click="inviteman(item.MeetingId)"
              >
                <div class="icon yaoqing-one">&#xe726;</div>
                <div class="yaoqing-two">邀请</div>
              </div>
              <div class="yaoqing" v-if="item.PartakeState==0||item.PartakeState==1" @click="attend(item.MeetingId,item,index)">
                <div class="icon yaoqing-one">&#xe62b;</div>
                <div class="yaoqing-two">出席</div>
              </div>
              <div
                class="yaoqing chuxi"
                v-if="item.PartakeState==2&&item.CreatorId!=UserInfo.UserId"
                style="background-color: #d3d3d3;"
              >确定出席</div>
            </div>
          </div>
          <div class="personnel">
            <themeetingman :partaket="item.Partaker" :checkIndex="checkIndex"></themeetingman>
          </div>
          <div class="status" v-if="checkIndex==0" @click.stop>
            <!-- v-if="item.CreatorId==UserInfo.UserId"  -->
            <div
              v-if="item.CreatorId==UserInfo.UserId"
              class="icon status-one"
              style="color: #4bd083; float:left"
              @click="changetime(item ,index)"
            >
              &#xe62c;
              <span>改期</span>
            </div>
            <div
              v-if="item.CreatorId==UserInfo.UserId"
              class="icon status-one"
              style="color: #ff6c6c;"
              @click="cancellationmeeting(item.MeetingId,index)"
            >
              &#xe630;
              <span>取消</span>
            </div>
            <div v-if="item.PartakeState!=1" class="icon status-one" style="color: #f43531;" @click="absence(item.MeetingId,item,index)">
              &#xe665;
              <span>缺席申请</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 会议纪要 -->
      <div v-if="checkIndex==1&&item.State==2" class="meeting-three">
        <p>会议纪要</p>
        <div>{{item.Summary}}</div>
      </div>
      <div
        v-if="item.State==1 && checkIndex==1"
        class="meeting-write"
        @click.stop
        @click="writeSummary(item.MeetingId)"
      >
        <div class="icon">&#xe646;</div>填写会议纪要
      </div>
    </div>
    <div class="layout" v-show="shijian" @click="aaa">
      <thetime @sendmsg="getmsg" @click.stop></thetime>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import utils from "@/utils/index.js";
import thetime from "@/components/thetime";
import themeetingman from "@/components/meetingman";
export default {
  data() {
    return {
      ProjectMeeting_GetList: "",
      checkIndex: 0,
      NotStarted: true,
      // 组件传过来的数据
      meetingid: "",
      shijian: false,
      time:null,
      chooseitem:{},
      bb:null,
      NotStarted:true,
      State:null,
    };
  },
  methods: {
    aaa() {
      this.shijian = false;
    },
    // 点击子组件触发的方法
    async getmsg(data) {
      this.shijian = true;
      var rep = await this.$UJAPI.ChangeMeetingTime({
        meetingid: this.meetingid,
        meetingtime: data
      });
      if (rep.ret == 0) {
        this.toast("改期会议成功");
        this.shijian=false;
        // 页面数据处理
        this.chooseitem.MeetingTime=data
        this.ProjectMeeting_GetList.splice(this.bb, 1, this.chooseitem);
      } else {
        this.toast(rep.msg);
      }
    },
    async checktab(index) {
      this.checkIndex = index;
      if (index == 0) {
        this.NotStarted = true;
        this.State = null;
      }
      else if (index == 1) {
        this.NotStarted = false;
        this.State = null;
      }
      else if (index == 2) {
        this.NotStarted = null;
        this.State = 3;
      }
      var rep1 = await this.$UJAPI.ProjectMeeting_GetList({
          State:this.State,
          NotStarted:this.NotStarted,
          ProjectId:this.ProjectId,
        });
        if (rep1.ret == 0) {
          // 这个ProjectLog是data自己定义的
          this.ProjectMeeting_GetList = rep1.data;
          console.log(this.ProjectMeeting_GetList)
        } else {
          this.toast(rep1.msg);
        }
    },
    inviteman(MeetingId) {
      this.$router.push({
        path: "/pages/meeting/InviteMembers",
        query: {
          meetingid: MeetingId,
          // invite: 用于判断是哪一个功能页面也要的邀请
          invite: 0,
        }
      });
    },
    writeSummary(MeetingId) {
      this.$router.push({
        path: "/pages/meeting/writeSummary",
        query: {
          meetingid: MeetingId
        }
      });
    },
    // 确定出席
    async attend(MeetingId,item,index) {
      var that = this;
      var rep = await this.$UJAPI.ProjectMeetingMember_SetState({
        meetingid: MeetingId,
        state: 2
      });
      if (rep.ret == 0) {
        this.toast("已确认出席");
        item.PartakeState=2
        for(let i=0;i<item.Partaker.length;i++) {
          if (item.Partaker[i].UserId==this.UserInfo.UserId) {
          item.Partaker[i].State=2
        }
        }
        this.ProjectMeeting_GetList.splice(index,1,item)
      } else {
        this.toast(rep.msg);
      }
    },
    // 取消
    async cancellationmeeting(MeetingId ,index) {
      var that = this;
      var rep = await this.$UJAPI.ProjectMeeting_Delete(MeetingId);
      if (rep.ret == 0) {
        this.toast("已经取消会议");
        // 页面数据显示处理
        this.ProjectMeeting_GetList.splice(index,1)
      } else {
        this.toast(rep.msg);
      }
    },
    changetime(item,index) {
      this.shijian = true;
      this.meetingid = item.MeetingId;
      this.chooseitem=item;
      this.bb=index
    },
    // 申请缺席
    async absence(MeetingId,item,index) {
      var that = this;
      var rep = await this.$UJAPI.ProjectMeetingMember_SetState({
        meetingid: MeetingId,
        state: 1
      });
      if (rep.ret == 0) {
        this.toast("申请缺席成功");
        item.PartakeState=1
        for(let i=0;i<item.Partaker.length;i++) {
          if (item.Partaker[i].UserId==this.UserInfo.UserId) {
          item.Partaker[i].State=1
        }
        }
        this.ProjectMeeting_GetList.splice(index,1,item)
      } else {
        this.toast(rep.msg);
      }
    },
    meetingParticulars(MeetingId) {
      this.$router.push({
        path: "/pages/meeting/meetingParticulars",
        query: {
          meetingid: MeetingId,
          NotStarted:this.NotStarted
        }
      });
    },
    addmeeting() {
      // 每次会议每一项进去都清空
      this.$store.commit("setmeetingTime", null);
      this.$store.commit("setmeetingRemarks", null);
      this.$store.commit("setmeetingTitle", null);
      this.$store.commit("setthechooseitemNr", null);
      this.$store.commit("setthechooseitem", null);
      this.replace("/pages/meeting/startMeeting");
    },
    async init () {
      var that = this;
    var rep = await this.$UJAPI.ProjectMeeting_GetList({
      NotStarted: this.NotStarted,
      ProjectId:this.ProjectId,
      State:this.State
    });
    if (rep.ret == 0) {
      this.ProjectMeeting_GetList = rep.data;
    } else {
      this.toast(rep.msg);
    }
    }
  },
      // 把请求放在onShow 事件 这样让回退也会触发改变值
  async onShow() {},
  onPullDownRefresh(){
    this.init();
    wx.stopPullDownRefresh();
  },
  computed: {
    meetingData() {
      var xingqi = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
      for (let i = 0; i < this.ProjectMeeting_GetList.length; i++) {
        var item = this.ProjectMeeting_GetList[i];
        this. time = utils.convertDateFromString(item.MeetingTime);
        item.week = xingqi[this. time .getDay()];
        item.month =
          this. time .getMonth() + 1 < 10
            ? "0" + (this. time .getMonth() + 1)
            : this. time .getMonth() + 1;
        item.day = this. time .getDate() < 10 ? "0" + this. time .getDate() : this. time .getDate();
        item.hour =
          this. time .getHours() < 10 ? "0" + this. time .getHours() : this. time .getHours();
        item.minute =
          this. time .getMinutes() < 10 ? "0" + this. time .getMinutes() : this. time .getMinutes();
      }
      return this.ProjectMeeting_GetList;
    },
    ...mapState({
      UserInfo: state => state.User.UserInfo //获取当前用户的登录信息
    })
  },
  // 注册组件
  components: {
    thetime,
    themeetingman
  },
  async mounted() {
    this.init()
  }
};
</script>
<style scoped>
/* 点击弹出框背景 */
.layout {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.initiate {
  width: 100%;
  height: 1.28rem;
  font-size: 0.46rem;
  line-height: 1.28rem;
  color: #ffffff;
  background-color: #12b7f5;
}
.initiate span {
  float: right;
  margin-right: 0.3rem;
}
.top {
  width: 100%;
  height: 1.28rem;
  background-color: #ffffff;
  color: #353535;
  box-shadow: 0rem 0.01rem 0rem 0rem #e8e8e8;
  display: flex;
  line-height: 1.28rem;
}
.top div {
  flex: 1;
  font-size: 0.43rem;
  text-align: center;
  padding: 0 0.8rem;
}
.tolerant {
  color: #12b7f5;
  padding-bottom: 0.3rem;
  border-bottom: 0.07rem solid #12b7f5;
}
.jiange {
  height: 0.29rem;
  width: 100%;
  background-color: #f4f3f2;
}
.meeting {
  background-color: #ffffff;
  padding-left: 0.29rem;
  border-top: 0.29rem solid #f2f3f4;
  margin-bottom: 0.62rem;
}
.meeting-top {
  height: 1.28rem;
  line-height: 1.28rem;
  overflow: hidden;
  border-bottom: 0.02rem solid #f2f2f2;
}
.faqiren {
  font-size: 0.43rem;
  float: left;
  color: #999999;
}
.week {
  font-size: 0.37rem;
  color: #999999;
  float: right;
  margin-right: 0.3rem;
}
.meeting-two {
  padding-top: 0.36rem;
}
.thetime {
  overflow: hidden;
  float: left;
}
.time {
  width: 1.31rem;
  height: 1.31rem;
  background-color: #12b7f5;
  border-radius: 0.12rem;
  /* border: solid 0.04rem #12b7f5; */
  color: #fff;
  overflow: hidden;
  position: relative;
}
.timeNr {
  background-color: #999999;
}
.timeBB{
  background-color: #ffc539;
}
.time-one {
  font-size: 0.37rem;
  color: #fff;
  position: absolute;
  top: 0.1rem;
  left: 0.28rem;
}
.time-two {
  color: #fff;
  font-size: 0.72rem;
  position: absolute;
  bottom: 0rem;
  left: 0.28rem;
}
.time-three {
  color: #495f8c;
  font-size: 0.43rem;
  margin-top: 0.28rem;
}
.shijian {
  color: #999999 !important;
}
.content {
  margin-left: 1.7rem;
  overflow: hidden;
}
.content-one {
  overflow: hidden;
  padding-bottom: 0.36rem;
}
.manmub {
  overflow: hidden;
  float: left;
  width: 6rem;
}
.manmub-one {
  font-size: 0.49rem;
  color: #000000;
}
.manmub-two {
  font-size: 0.37rem;
  color: #999999;
  padding-top: 0.19rem;
}
.yaoqing {
  width: 2.14rem;
  height: 0.82rem;
  background-color: #12b7f5;
  border-radius: 0.06rem;
  color: #fff;
  float: right;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-right: 0.28rem;
  margin-top: 0.24rem;
  font-size: 0.37rem;
}
.chuxi {
  display: flex;
  justify-content: center;
}
.yaoqing-one {
  font-size: 0.43rem;
  float: left;
  margin-left: 0.43rem;
  padding-right: 0.12rem;
}
.yaoqing-two {
  font-size: 0.37rem;
}
.personnel {
  width: 7.8rem;
  border-radius: 0.04rem;
  border: solid 0.02rem #e8e8e8;
  font-size: 0.37rem;
  color: #999999;
  overflow: hidden;
  padding: 0.32rem;
}
.status {
  font-size: 0.4rem;
  margin-top: 0.56rem;
}
.status-one {
  float: left;
  margin-right: 0.72rem;
}
.status span {
  color: #353535;
}
.meeting-three {
  margin-top: 0.7rem;
  padding-right: 0.56rem;
}
.meeting-three p {
  font-size: 0.43rem;
  color: #999999;
}
.meeting-three div {
  margin-top: 0.63rem;
  font-size: 0.35rem;
  color: #999999;
}
.meeting-write {
  color: #999999;
  font-size: 0.4rem;
  display: flex;
  align-items: center;
  margin-top: 0.58rem;
  margin-left: 1.7rem;
}
.meeting-write div {
  width: 0.42rem;
  height: 0.43rem;
  border-radius: 50%;
  color: #12b7f5;
  padding-right: 0.14rem;
}
</style>