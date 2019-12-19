<template>
  <div>
    <div class="top">
      <div class="top-one">
        <span class="faqiren">发起人</span>
        <img class="touxiang" :src="ProjectMeeting_Get.Portrait" alt />
        <div class="name-time">
          <p class="name">{{ProjectMeeting_Get.CreatorName}}</p>
          <p class="time">{{ProjectMeeting_Get.MeetingTime}}</p>
        </div>
      </div>
      <div class="top-two">
        <p>{{ProjectMeeting_Get.Title}}</p>
        <div>备注: {{ProjectMeeting_Get.Remarks}}</div>
      </div>
      <div class="top-three">会议记录员：{{ProjectMeeting_Get.RecorderName}}</div>
    </div>
    <div class="personnelmub">
      <div class="munber">
         <div class="munber-one" style="float:left;color: #999999;">本次会议共：{{mannub}}人</div>
         <div class="anniu">
           <span class="zhuangtai" :class="{zhuangtai_one:ProjectMeeting_Get.PartakeState==2}" @click="goMat">出席</span>
           <span class="zhuangtai" :class="{zhuangtai_one:ProjectMeeting_Get.PartakeState==1}" @click="absent">缺席</span>
         </div>
      </div>
      <div class="personnel">
        <themeetingman :partaket="Partaker" :checkIndex=0></themeetingman>
      </div>
    </div>
    <div class="meeting_summary" v-if="ProjectMeeting_Get.State==2">
        <p style="color: #8c8c8c;">会议纪要</p>
        <div>{{ProjectMeeting_Get.Summary}}</div>
        <img v-for="(item,index) in ProjectMeeting_Get.MeetingPhotos" :key="index" :src="item" alt="">
    </div>
  </div>
</template>
<script>
import themeetingman from "@/components/meetingman";
export default {
    data() {
        return {
            ProjectMeeting_Get:"",
            mannub:"",
            Partaker:[]
        }
    },
    methods: {
      async goMat() {
        var that = this;
        var rep = await this.$UJAPI.ProjectMeetingMember_SetState({
        meetingid: this.ProjectMeeting_Get.MeetingId,
        state: 2
      });
      if (rep.ret == 0) {
        this.toast("已确认出席");
        this.ProjectMeeting_Get.PartakeState=2
      } else {
        this.toast(rep.msg);
      }
      },
      async absent() {
        var that = this;
      var rep = await this.$UJAPI.ProjectMeetingMember_SetState({
        meetingid: this.ProjectMeeting_Get.MeetingId,
        state: 1
      });
      if (rep.ret == 0) {
        this.toast("申请缺席成功");
        this.ProjectMeeting_Get.PartakeState=1
      } else {
        this.toast(rep.msg);
      }
      }
    },
      // 注册组件
  components: {
    themeetingman
  },
    computed : {

    },
    async mounted() {
        var that = this;
        var meetingid=this.$route.query.meetingid
    var rep = await this.$UJAPI.ProjectMeeting_Get({
      Id:meetingid,
      ProjectId:this.ProjectId,
    });
    if (rep.ret == 0) {
      this.toast("获取会议详情成功");
      this.ProjectMeeting_Get = rep.data;
      this.mannub=this.ProjectMeeting_Get.Partaker.length
      this.Partaker=this.ProjectMeeting_Get.Partaker
     } else {
      this.toast(rep.msg);
    }
    }
}
</script>
<style scoped>
.top {
  padding: 0.52rem 0.71rem 0.58rem 0.28rem;
  overflow: hidden;
  border-bottom: 0.13rem solid #f4f3f2;
}
.top-one {
  display: flex;
  align-items: center;
}
.faqiren {
  font-size: 0.35rem;
  color: #565656;
}
.touxiang {
  width: 1.02rem;
  height: 1.02rem;
  background-color: #ff961a;
  border-radius: 0.07rem;
  margin-left: 0.21rem;
  margin-right: 0.21rem;
}
.name {
  font-size: 0.4rem;
  color: #353535;
}
.time {
  font-size: 0.35rem;
  color: #565656;
}
.top-two p {
  font-size: 0.49rem;
  color: #353535;
  margin-top: 0.72rem;
}
.top-two div {
  font-size: 0.4rem;
  color: #353535;
  margin-top: 0.53rem;
}
.top-three {
  font-size: 0.4rem;
  color: #999999;
  float: right;
  margin-top: 2.5rem;
}
.personnelmub {
  margin: 0rem 0.3rem;
}
.munber {
  height: 1.3rem;
  font-size: 0.4rem;
  border-bottom: 0.02rem solid #e8e8e8;
  overflow: hidden;
  display: flex;
  align-items: center
}
.anniu {
  margin-left: 3rem;
}
.zhuangtai {
  padding: 0.1rem 0.4rem;
  color: #12b7f5;
  border: 0.02rem solid #12b7f5;
  border-radius: 0.2rem;
  margin-left: 0.1rem
}
.zhuangtai_one {
  color: #fff;
  border: 0.02rem solid #999999;
  background-color: #999999;
}
.personnel {
  font-size: 0.37rem;
  color: #999999;
  overflow: hidden;
  padding: 0.59rem 0.1rem;
}
.meeting_summary {
    padding: 0.4rem 0.36rem;
    font-size: 0.4rem;
    border-top: 0.13rem solid #f4f3f2;
}
.meeting_summary div {
    color: #353535;
    margin-top: 0.49rem;
}
.meeting_summary img {
    float: left;
    width: 2.27rem;
    height: 2.27rem;
    padding-right: 0.25rem;
    padding-top: 0.3rem;
    display: block;
}
</style>