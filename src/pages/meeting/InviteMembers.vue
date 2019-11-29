<template>
  <div>
    <div class="initiate">
      <span @click="invite">确认邀请</span>
    </div>
    <div
      class="user"
      v-for="(item,index) in this.ProjectMember_Get"
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
      ProjectMember_Get: "",
    };
  },
  methods: {
    checked(item, index) {
      item.xuanze = !item.xuanze;
      this.ProjectMember_Get.splice(index, 1, item);
    },
    async invite() {
      for (let i = 0; i < this.ProjectMember_Get.length; i++) {
        var item=this.ProjectMember_Get[i]
        if (item.xuanze == true) {
          var that = this;
          var rep = await this.$UJAPI.ProjectMeetingMember_Invite({
            meetingid: this.$route.query.meetingid,
            userid: item.UserId
          });
          if (rep.ret == 0) {
            this.toast("邀请成员成功");
          } else {
            // this.toast("邀请成员失败");
          }

        }
      }
      this.$router.back();
    }
  },
  async mounted() {
    var that = this;
    var rep = await this.$UJAPI.ProjectMember_Get({
      ProjectId: this.ProjectId
    });
    if (rep.ret == 0) {
      // 这个ProjectLog是data自己定义的
      this.ProjectMember_Get = rep.data;
      console.log(this.ProjectMember_Get);
    } else {
      this.toast("获取成员数据失败");
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