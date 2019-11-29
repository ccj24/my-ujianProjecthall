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
        <img class="img" src="/static/images/expired.png" alt />
      </div>
      <div class="top-two">
        <p>{{ProjectMeeting_Get.Title}}</p>
        <div>备注: {{ProjectMeeting_Get.Remarks}}</div>
      </div>
      <div class="top-three">会议记录员：{{ProjectMeeting_Get.RecorderName}}</div>
    </div>
    <div class="personnelmub">
      <div class="munber">本次会议共：{{ProjectMeeting_Get.attendantnum+ProjectMeeting_Get.attendantnum}}人</div>
      <div class="personnel">
        <div>
          <div class="personnel-one">
            <p style="color: #353535;">
              出席
              <span style="color: #c7c7cd;">（{{ProjectMeeting_Get.attendantnum}} 人）</span>
            </p>
          </div>
          <span v-for="(item,index) in ProjectMeeting_Get.attendantname" :key="index">{{item}}, </span>
        </div>
        <div>
          <div class="personnel-one">
            <p style="color: #f43531;">
              缺席
              <span style="color: #c7c7cd;">（{{ProjectMeeting_Get.absentnum}} 人）</span>
            </p>
          </div>
          <span v-for="(item,index) in ProjectMeeting_Get.absentname" :key="index">{{item}}, </span>
        </div>
        <div>
          <div class="personnel-one">
            <p style="color: #ffc539;">
              未定
              <span style="color: #c7c7cd;">（{{ProjectMeeting_Get.noaffirmnum}} 人）</span>
            </p>
          </div>
          <span v-for="(item,index) in ProjectMeeting_Get.noaffirmname" :key="index">{{item}}, </span>
        </div>
      </div>
    </div>
    <div class="meeting_summary">
        <p style="color: #8c8c8c;">会议纪要</p>
        <div>{{ProjectMeeting_Get.Summary}}</div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            ProjectMeeting_Get:""
        }
    },
    methods: {

    },
    computed : {

    },
    async mounted() {
        var that = this;
    var rep = await this.$UJAPI.ProjectMeeting_Get({
      Id:this.$route.query.meetingid,
      ProjectId:this.ProjectId
    });
    if (rep.ret == 0) {
      this.ProjectMeeting_Get = rep.data;

      var noaffirmnum = 0;
        var noaffirmname = [];
        var absentnum = 0;
        var absentname = [];
        var attendantnum = 0;
        var attendantname = [];
        var item = that.ProjectMeeting_Get
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
        console.log(this.ProjectMeeting_Get);
    } else {
      this.toast("获取数据失败");
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
.img {
  width: 1.45rem;
  height: 0.86rem;
  margin-left: 2rem;
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
  line-height: 1.3rem;
  font-size: 0.4rem;
  color: #999999;
  border-bottom: 0.02rem solid #e8e8e8;
}
.personnel {
  font-size: 0.37rem;
  color: #999999;
  overflow: hidden;
  padding: 0.59rem 0.1rem;
}
.personnel-one {
  padding:0.23rem 0;
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
</style>