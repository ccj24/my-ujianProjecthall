<template>
  <div class="Welfarelist">
    <div
      @click="go({path:'/pages/home/details',query:{UserId:item.UserId}})"
      class="crewlist"
      v-for="(item,index) in RedPacket"
      :key="index"
    >
      <ul style=" margin-bottom: 0.43rem;">
        <li
          class="serial"
          :class="{'serial1':index==0,'serial2':index==1,'serial3':index==2,'serial4':index>2,}"
        >{{index+1}}</li>
        <li :class="{eName:item.eName}">{{item.UserName}}</li>
        <li style="color:  #12b7f5;" v-if="item.eName">({{item.eName}})</li>
      </ul>
      <div class="time">
        <div class="left" style="float:left;overflow: hidden;width:60%;">
          <img src="/static/images/Clock.png" />
          <p style="color:#c7c7cd;">有效期：{{item.ExpireTime}}</p>
        </div>
        <div class="left" style="float: right;overflow: hidden;width:40%;">
          <img src="/static/images/money.png" />
          <p style="color:#88dbfa;">金额：{{item.TotalMoney}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      RedPacket: []
    };
  },
  async mounted() {
    var that = this;

    //获取项目红包
    var res = await this.$UJAPI.Project_ProjectRedPacket({
      Projectid: this.$route.query.ProjectId
    });
    if (res.ret == 0) {
      this.RedPacket = res.data;
    }
    // console.log(this.RedPacket)
  }
};
</script>

<style scoped>
.crewlist {
  margin-bottom: 0.3rem;
  background-color: #ffffff;
  font-size: 0.45rem;
  overflow: hidden;
}
.crewlist ul {
  padding-top: 0.3rem;
  border-bottom: dashed 0.01rem #8c8c8c;
  padding-bottom: 0.37rem;
}
.crewlist .serial {
  margin-right: 0.39rem;
  width: 0.55rem;
  float: left;
  overflow: hidden;
  margin-left: 0.33rem;
  height: 0.53rem;
  color: #ffffff;
  text-align: center;
  background-color: #ff6c6c;
}
.time .left {
  margin-bottom: 0.5rem;
}
.time img {
  width: 0.53rem;
  height: 0.53rem;
  float: left;
  overflow: hidden;
  margin: 0 0.2rem 0 0.2rem;
}
.time p {
  line-height: 0.53rem;
  font-size: 0.4rem;
}
.crewlist .serial1 {
  background-color: #ff6c6c;
}
.crewlist .serial2 {
  background-color: #ffc539;
}
.crewlist .serial3 {
  background-color: #88dbfa;
}
.crewlist .serial4 {
  background-color: #8eb9f5;
}
.eName {
  float: left;
  overflow: hidden;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>