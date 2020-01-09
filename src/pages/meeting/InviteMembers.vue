<template>
  <div>
    <div class="initiate">
      <span @click="invite">确认邀请</span>
    </div>
    <div
      class="user"
      v-for="(item,index) in ProjectMember_Get"
      :key="index"
      :class="{xuanzhong:item.xuanze==true}"
      @click="checked(item,index)"
    >
      <div v-if="item.xuanze" class="icon fuxuankuang" style="color:#12b7f5">&#xe618;</div>
      <div v-else class="icon fuxuankuang">&#xe62d;</div>
      <img :src="item.Portrait" alt />
      <p>{{item.UserName}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ProjectMember_Get: ""
    };
  },
  methods: {
    checked(item, index) {
      item.xuanze = !item.xuanze;
      this.ProjectMember_Get.splice(index, 1, item);
    },

    async invite() {
      var invite = this.$route.query.invite;
      console.log(invite);
      // invite=0时候是有会议后邀请人，invite=1新建会议邀请人，invite=2是指定记录员
      if (invite == 1) {
        var thechooseitem = [];
        for (let i = 0; i < this.ProjectMember_Get.length; i++) {
          var item = this.ProjectMember_Get[i];
          // 选中的人加到一个数组里面，用于后面判断
          if (item.xuanze == true) {
            thechooseitem.push(item);
          }
        }
        if (thechooseitem.length > 0) {
          var object = {};
          for (let k = 0; k < thechooseitem.length; k++) {
            var value = thechooseitem[k].UserName;
            var key = thechooseitem[k].UserId;
            object[key] = value;
          }
          //把选中的存储到vuex里面
          this.$store.commit("setthechooseitem", object);
          this.replace("/pages/meeting/startMeeting");
        } else {
          this.toast("请至少邀请一位成员");
        }
      } else if (invite == 0 || invite == 2) {
        this.thechooseitemNr = [];
        for (let i = 0; i < this.ProjectMember_Get.length; i++) {
          var items = this.ProjectMember_Get[i];
          // 选中的人加到一个数组里面，用于后面判断
          if (items.xuanze == true) {
            this.thechooseitemNr.push(items);
          }
        }
        if (this.thechooseitemNr.length == 1) {
          if (invite == 0) {
            var that = this;
            var rep = await this.$UJAPI.ProjectMeetingMember_Invite({
              meetingid: this.$route.query.meetingid,
              userid: this.thechooseitemNr[0].UserId
            });
            if (rep.ret == 0) {
              this.toast("邀请成员成功");
              this.$router.back();
            } else {
              this.toast(rep.msg);
            }
          } else if (invite == 2) {
            var Recorder = {};
            Recorder.value = this.thechooseitemNr[0].UserName;
            Recorder.key = this.thechooseitemNr[0].UserId;
            //把选中的存储到vuex里面
            this.$store.commit("setthechooseitemNr", Recorder);
            this.replace("/pages/meeting/startMeeting");
          }
        } else {
          this.toast("请选择一位成员");
        }
      }
    }
  },
  async mounted() {
    var that = this;
    var meetingid = this.$route.query.meetingid;
    var invite = this.$route.query.invite;
    // 会议详情
    var nub={}
    var rep1 = await this.$UJAPI.ProjectMeeting_Get({
      ProjectId: this.ProjectId,
      Id: meetingid
    });
    if (rep1.ret == 0) {
      nub = rep1.data;
    } else {
      this.toast(rep1.msg);
    }

    var rep = await this.$UJAPI.ProjectMember_Get({
      ProjectId: this.ProjectId
    });
    if (rep.ret == 0) {
      if (invite==0) {
        for(let i=0;i<rep.data.length;i++) {
          for(let y=0;y<nub.Partaker.length;y++) {
          if (rep.data[i].UserId==nub.Partaker[y].UserId) {
            rep.data.splice(i,1)
          }
        }
        }
        this.ProjectMember_Get=rep.data
      }
      else{this.ProjectMember_Get=rep.data}
    } 
    else {
      this.toast(rep.msg);
    }
    console.log(this.ProjectMember_Get)
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
.user {
  width: 100%;
  height: 1.58rem;
  line-height: 1.58rem;
  font-size: 0.46rem;
  color: #353535;
  background-color: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 0.01rem solid #e8e8e8;
}
.xuanzhong {
  background-color: #e8e8e8;
}
.fuxuankuang {
  font-size: 0.53rem;
  margin-left: 0.27rem;
  margin-right: 0.21rem;
}
.user img {
  width: 1.05rem;
  height: 1.04rem;
  background-color: #000000;
  border-radius: 0.05rem;
  opacity: 1;
  margin-right: 0.28rem;
}
</style>