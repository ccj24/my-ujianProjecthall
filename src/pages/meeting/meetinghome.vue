<template>
  <div>
    <div class="initiate">
      <span @click="go({path:'/pages/meeting/startMeeting'})">发起会议</span>
    </div>
    <div class="top">
      <div>
        <span :class="{tolerant:checkIndex==0}" @click="checktab(0)">即将召开</span>
      </div>
      <div>
        <span :class="{tolerant:checkIndex==1}" @click="checktab(1)">已结束</span>
      </div>
      <div>
        <span :class="{tolerant:checkIndex==2}" @click="checktab(2)">已取消</span>
      </div>
    </div>
    <div class="meeting" v-for="(item,index) in meetingData" :key="index" @click="meetingParticulars(item.MeetingId)">
      <div class="meeting-top">
        <div class="faqiren">
          <span>发起人 ：</span>
          <span>{{item.CreatorName}}</span>
        </div>
        <span class="week">{{item.week}}</span>
      </div>
      <div class="meeting-two">
        <div class="thetime">
          <div class="time" :class="{timeNr:NotStarted ==false||State==3}">
            <span class="time-one">{{item.month}}月</span>
            <span class="time-two">{{item.day}}</span>
          </div>
          <div
            class="time-three"
            :class="{shijian:NotStarted ==false||State==3}"
          >{{item.hour}}:{{item.minute}}</div>
        </div>
        <div class="content">
          <div class="content-one">
            <div class="manmub">
              <p class="manmub-one">{{item.Title}}</p>
              <p class="manmub-two">本次会议共{{item.Partaker.length}}人</p>
            </div>
            <div v-if="NotStarted ==true" @click.stop>
              <div class="yaoqing" v-if="item.CreatorId==UserInfo.UserId" @click="inviteman(item.MeetingId)">
                <div class="icon yaoqing-one">&#xe726;</div>
                <div class="yaoqing-two">邀请</div>
              </div>
              <div class="yaoqing" v-if="item.PartakeState==0" @click="attend(item.MeetingId)">
                <div class="icon yaoqing-one">&#xe62b;</div>
                <div class="yaoqing-two">出席</div>
              </div>
              <div class="yaoqing chuxi" v-if="item.PartakeState==2&&item.CreatorId!=UserInfo.UserId" style="background-color: #d3d3d3;">确定出席</div>
            </div>
          </div>
          <!-- <div class="personnel">
            <span v-for="(items,indexx) in item.Partaker" :key="indexx">{{items.UserName}},</span>
          </div> -->
          <div class="personnel">
            <div class="personnel-one">
              <div>
                <p style="color: #353535;" :class="{shijian:NotStarted ==false||State==3}">
                  出席
                  <span style="color: #c7c7cd;">（{{item.attendantnum}}人）</span>
                </p>
              </div>
              <span v-for="(items,indexx) in item.attendantname" :key="indexx">{{items}}, </span>
            </div>
            <div class="personnel-one">
              <div>
                <p style="color: #f43531;" :class="{shijian:NotStarted ==false||State==3}">
                  缺席
                  <span style="color: #c7c7cd;">（{{item.absentnum}}人）</span>
                </p>
              </div>
              <span v-for="(items,indexx) in item.absentname" :key="indexx">{{items}}, </span>
            </div>
            <div class="personnel-one">
              <div>
                <p style="color: #ffc539;" :class="{shijian:NotStarted ==false||State==3}">
                  未定
                  <span style="color: #c7c7cd;">（{{item.noaffirmnum}}人）</span>
                </p>
              </div>
              <span v-for="(items,indexx) in item.noaffirmname" :key="indexx">{{items}}, </span>
            </div>
          </div>
          <div class="status" v-if="NotStarted==true" @click.stop>
            <!-- v-if="item.CreatorId==UserInfo.UserId"  -->
            <div v-if="item.CreatorId==UserInfo.UserId" class="icon status-one" style="color: #4bd083; float:left">
              &#xe62c;
              <span>改期</span>
            </div>
            <div v-if="item.CreatorId==UserInfo.UserId" class="icon status-one" style="color: #ff6c6c;" @click="cancellationmeeting(item.MeetingId)">
              &#xe630;
              <span>取消</span>
            </div>
            <div class="icon status-one" style="color: #f43531;" @click="absence(item.MeetingId)">
              &#xe665;
              <span>缺席申请</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 会议纪要 -->
      <div v-if="State==2" class="meeting-three">
        <p>会议纪要</p>
        <div>{{item.Summary}}</div>
      </div>
      <div v-if="State==1" class="meeting-write" @click.stop>
        <div class="icon">&#xe646;</div>
        填写会议纪要
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import utils from "@/utils/index.js";
export default {
  data() {
    return {
      ProjectMeeting_GetList: "",
      checkIndex: 0,
      NotStarted: true,
      State: null
    };
  },
  methods: {
    async checktab(index) {
      this.checkIndex = index;
      if (index == 0) {
        this.NotStarted = true;
        this.State=null
      }
      if (index == 1) {
        this.NotStarted = false;
        this.State=null;
      }
      var rep = await this.$UJAPI.ProjectMeeting_GetList({
        NotStarted: this.NotStarted,
      });
      if (rep.ret == 0) {
        // 这个ProjectLog是data自己定义的
        this.ProjectMeeting_GetList = rep.data;
      } else {
        this.toast("获取数据失败");
      }
      if (index == 2) {
        this.NotStarted=false
        this.State = 3;
        var rep1 = await this.$UJAPI.ProjectMeeting_GetList({
          State: this.State
        });
        if (rep1.ret == 0) {
          // 这个ProjectLog是data自己定义的
          this.ProjectMeeting_GetList = rep1.data;
        } else {
          this.toast("获取数据失败");
        }
      }
    },
    inviteman(MeetingId) {
      this.$router.push({
        path: "/pages/meeting/InviteMembers",
        query: {
          meetingid: MeetingId
        }
      });
    },
    // 确定出席
    async attend(MeetingId) {
      var that = this;
    var rep = await this.$UJAPI.ProjectMeetingMember_SetState({
      meetingid:MeetingId,
      state:2
    });
    // 当ret=0时，代表请求项目日志接口成功，然后把请求回来的数据赋值给ProjectLog。
    if (rep.ret == 0) {
      this.toast("已确认出席");
    } else {
      this.toast("确定失败");
    }
    },
    // 改期
    async cancellationmeeting (MeetingId) {
      var that = this;
    var rep = await this.$UJAPI.ProjectMeeting_Delete(MeetingId);
    // 当ret=0时，代表请求项目日志接口成功，然后把请求回来的数据赋值给ProjectLog。
    if (rep.ret == 0) {
      this.toast("已经取消会议");
    } else {
      this.toast("取消失败");
    }
    },
        // 申请缺席
    async absence (MeetingId) {
      var that = this;
      var rep = await this.$UJAPI.ProjectMeetingMember_SetState({
      meetingid:MeetingId,
      state:1
    });
    // 当ret=0时，代表请求项目日志接口成功，然后把请求回来的数据赋值给ProjectLog。
    if (rep.ret == 0) {
      this.toast("申请缺席成功");
    } else {
      this.toast("申请失败");
    }
    },
    meetingParticulars(MeetingId) {
      this.$router.push({
        path: "/pages/meeting/meetingParticulars",
        query: {
          meetingid: MeetingId
        }
      });
    }
  },
  computed: {
    meetingData() {
      var xingqi = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
      for (let i = 0; i < this.ProjectMeeting_GetList.length; i++) {
        var item = this.ProjectMeeting_GetList[i];
        var time = utils.convertDateFromString(item.MeetingTime);
        item.week = xingqi[time.getDay()];
        item.month =
          time.getMonth() + 1 < 10
            ? "0" + (time.getMonth() + 1)
            : time.getMonth() + 1;
        item.day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
        item.hour =
          time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
        item.minute =
          time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        //判断参加会议状态
        var noaffirmnum = 0;
        var noaffirmname = [];
        var absentnum = 0;
        var absentname = [];
        var attendantnum = 0;
        var attendantname = [];
        for (let y = 0; y < item.Partaker.length; y++) {
          if (item.Partaker[y].State == 0) {
            noaffirmnum++;
            noaffirmname.push(item.Partaker[y].UserName);
          }
          if (item.Partaker[y].State == 1) {
            absentnum++;
            absentname.push(item.Partaker[y].UserName);
          }
          if (item.Partaker[y].State == 2) {
            attendantnum++;
            attendantname.push(item.Partaker[y].UserName);
          }
        }
        item.noaffirmnum = noaffirmnum;
        item.absentnum = absentnum;
        item.noaffirmname = noaffirmname;
        item.attendantnum = attendantnum;
        item.absentname = absentname;
        item.attendantname = attendantname;
      }
      return this.ProjectMeeting_GetList;
    },
    ...mapState({
      UserInfo: state => state.User.UserInfo   //获取当前用户的登录信息
    }),
  },
  async mounted() {
    var that = this;
    var rep = await this.$UJAPI.ProjectMeeting_GetList({
      NotStarted: this.NotStarted
    });
    // 当ret=0时，代表请求项目日志接口成功，然后把请求回来的数据赋值给ProjectLog。
    if (rep.ret == 0) {
      this.ProjectMeeting_GetList = rep.data;
      console.log(this.ProjectMeeting_GetList);
    } else {
      this.toast("获取数据失败");
    }
  }
};
</script>
<style scoped>
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
  color: #999999!important;
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
.personnel-one {
  padding-bottom: 0.25rem;
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
  margin-left: 1.7rem
}
.meeting-write div {
  width: 0.42rem;
  height: 0.43rem;
  border-radius: 50%;
  color: #12b7f5;
  padding-right: 0.14rem
}
</style>