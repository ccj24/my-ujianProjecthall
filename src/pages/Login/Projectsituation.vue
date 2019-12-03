<template>
  <div>
    <!-- 项目概括 -->
    <div class="userinfo">
      <div class="Projectcircle">
        <img src="/static/images/bg.png">

        <div class="information">
          <div class="sinister">
            <p style="float:left;color: #434343;">项目编号：</p>
            <p style="float:left;color:#858383;">{{ProjectDetailed.ProjectNo}}</p>
          </div>
          <div class="CompanyName">
            <img src="/static/images/approve.png">
            <div class="address">{{ProjectDetailed.ProjectName}}</div>
          </div>
          <div class="projectphase">项目阶段：{{ProjectDetailed.StageDisplay}}</div>
          <div class="projectmember">项目成员：{{ProjectDetailed.NumberOfPeople}}</div>
        </div>
        <!-- 按钮 -->
        <div class="existprojectcenter">
          <button v-if="Role>0" @click="goProject(ProjectDetailed.ProjectId)" class="Addproject">进入项目</button>
          <button v-else @click="go({path:'/pages/Login/Choiceprofessional',query:{ProjectId:ProjectDetailed.ProjectId}})" class="Addproject">加入项目</button>
        </div>

        <!-- 红包榜 -->
        <!-- <div class="welfare">
          <div class="redpacket">
            <p class="redpacketOne">红包榜</p>
            <p
              @click="go({path:'/pages/home/Welfarelist'})"
              style="padding-right: 0.34rem;color: #8c8c8c;"
            >我要打赏</p>
          </div>
          <div class="crewlist" v-if="RedPacket.length>0">
            <div :class="{'redenvelopes':isredenvelopes,'redenvelopes1':isredenvelopes1}">
              <ul
                @click="go({path:'/pages/home/details',query:{UserId:item.UserId}})"
                style=" margin-bottom: 0.43rem;"
                v-for="(item,index) in RedPacket"
                :key="index"
                v-if="item.State==2"
              >
                <li
                  class="serial"
                  :class="{'serial1':index==0,'serial2':index==1,'serial3':index==2,'serial4':index>2,}"
                >{{index+1}}</li>
                <li style="float:left">{{item.UserName}}</li>
                <li style="color: #8c8c8c;">（{{item.eName}}）</li>
              </ul>
            </div>
            <div
              class="expansion"
              v-for="(item,index) in RedPacket"
              :key="index"
              v-if="(item.State==2)>1"
            >
              <img v-if="wallet==1" @click="Redenvelopes" src="/static/images/wallet-more.png" />
              <img v-if="wallet==2" @click="collectRedenve" src="/static/images/wallet-morex.png" />
            </div>
          </div>
          <div v-else class="Nocrewlist" style="color: #8c8c8c;text-align: center;padding-bottom: 0.35rem;">该项目没有打赏</div>
        </div>-->
      </div>
    </div>
    <!-- <div class="fixed">
      <p style="color:#8c8c8c;padding-top:0.5rem;padding-left: 0.2rem;float: left">您尚未对项目进行打赏</p>
      <button class="fixedbut">全部排名</button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      wallet: 1,
      isredenvelopes: true,
      isredenvelopes1: false,
      Projectid: null,
      ProjectDetailed: {},
      Role: "",
      RedPacket: []
    };
  },
  methods: {
    Redenvelopes() {
      this.isredenvelopes = false;
      this.isredenvelopes1 = true;
      this.wallet = 2;
    },
    collectRedenve() {
      this.isredenvelopes = true;
      this.isredenvelopes1 = false;
      this.wallet = 1;
    }
  },

  async mounted() {
    // 页面之间的跳转this.$route.query不能在return里面赋值
    this.Role = this.$route.query.Role;
    var that = this;
    //获取项目详情。用于展示项目详细信息界面。
    var rep = await this.$UJAPI.Project_GetDetailed(
      this.$route.query.ProjectId
    );
    if (rep.ret == 0) {
      this.ProjectDetailed = rep.data;
    }

    //获取项目红包 石凤叶f2c9bb9a-3749-47f2-ad8e-ea11e3645011
    // var res = await this.$UJAPI.Project_ProjectRedPacket({
    //   Projectid: this.$route.query.ProjectId
    // });
    // if (res.ret == 0) {
    //   this.RedPacket = res.data;
    // }
  }
};
</script>

<style scoped>
.userinfo {
  background-color: #ecf0f1;
}
.Projectcircle{
  position: relative;
}
.Projectcircle img {
  width: 10.8rem;
  height: 5rem;
}
.information {
  width: 10.8rem;
  height: 2.82rem;
  margin: 0.26rem 0.2rem 0 0.24rem;
  position: absolute;
  top: 0.1rem;
}
.sinister {
  position: relative;
}
.sinister p {
  font-size: 0.32rem;
}

.Projectcircleico {
  position: absolute;
  left: 8.73rem;
  top: 0.53rem;
  width: 1.59rem !important;
  height: 0.67rem;
}

.CompanyName {
  position: absolute;
  left: 25%;
  top: 1.05rem;
}
.address {
  width: 6.6rem;
  font-size: 0.52rem;
}
.CompanyName img {
  width: 1.36rem;
  height: 0.69rem;
  float: left;
  padding-top: 0.1rem;
}
.projectphase {
  font-size: 0.4rem;
  position: relative;
  left: 10%;
  top: 2.1rem;
  color: #434343;
}

/* 红包榜 */
.welfare {
  background-color: #ffffff;
  margin: 0;
  padding: 0;
}
.redpacket {
  margin: 0;
  font-size: 0.42rem;
  line-height: 0.98rem;
  border: solid 0.01rem #e8e8e8;
}
.redpacketOne {
  float: left;
  color: #8c8c8c;
  padding-right: 6.56rem;
  padding-left: 1.08rem;
}
.redpacket img {
  width: 0.16rem;
  height: 0.28rem;
}
.redpacket p {
  float: left;
}

.Nocrewlist {
  margin-top: 0.37rem;
  font-size: 0.4rem;
}
.redenvelopes1 {
  font-size: 0.4rem;
}
.redenvelopes {
  max-height: 2.2rem;
  min-height: 1rem;
  overflow: hidden;
}
.crewlist {
  margin-top: 0.37rem;
  font-size: 0.4rem;
}
.crewlist .serial {
  margin-right: 0.39rem;
  width: 0.55rem;
  float: left;
  margin-left: 0.33rem;
  height: 0.53rem;
  text-align: center;
  color: #ffffff;
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
.expansion {
  text-align: center;
}
.expansion img {
  width: 0.72rem;
  height: 0.43rem;
}
.projectmember {
  font-size: 0.36rem;
  position: absolute;
  top: 3.5rem;
  right: 1.5rem;
}
.existprojectcenter {
  background-color: #ffffff;
  padding-top: 0.5rem;
}
.Addproject {
  height: 1.4rem;
  width: 5rem;
  background-color: #12b7f5;
  text-align: center;
  border-radius: 0.09rem;
  color: #ffffff;
  font-size: 0.52rem;
  display: block;
  margin: auto;
  margin-top: 0.3rem; 
  border: 0;
  
}
.fixed {
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 50px;
  background-color: #d7d7d7;
  z-index: 9999;
}
.fixedbut {
  height: 40px;
  width: 150px;
  margin-top: 5px;
  border: none;
}
</style>
<style>
page {
  background-color: #ecf0f1;
}
</style>