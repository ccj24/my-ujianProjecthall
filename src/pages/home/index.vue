<template>
  <div>
    <div class="userinfo">
      <div class="Projectcircle">
        <img src="/static/images/bg.png">
        <div class="information">
          <div class="sinister">
            <p style="float:left;color: #434343;">项目编号：</p>
            <p style="float:left;color:#858383;">{{ProjectDetailed.ProjectNo==null?'':ProjectDetailed.ProjectNo}}</p>
            <button v-if="ProjectDetailed.IsQcProject" class="approve">质监站认证</button>
          </div>
          <img class="headportrait" src="/static/images/ChatHead.png">
          <!-- v-if="ProjectDetailed.TodayEnterCounter>0" -->
          <div v-if="ProjectDetailed.TodayEnterCounter>0" class="projectright" >
            <img style="width: 0.7rem;height: 0.7rem; float: left;" src="/static/images/ChatHead1.png">
            <p style="float:left">今日进场：</p>
            <p style="color:#f53e10;">{{ProjectDetailed.TodayEnterCounter}}人</p> 
          </div>
           <img class="Projectcircleico" src="/static/images/circle.png" alt>
          <div class="CompanyName">
            <img src="/static/images/approve.png">
            <div class="address">{{ProjectDetailed.ProjectName}}</div>
          </div>
          <div class="projectphase">项目阶段：{{ProjectDetailed.StageDisplay}}</div>
          <div class="schedule">
            <img src="/static/images/schedule.png">
          </div>
        </div>
        <!-- 设备 -->
        <div class="facility">
          <div class="BIM">
            <img src="/static/images/BIM.png">
            <p @click="go({path:'/pages/home/ProjectBIM'})">BIM</p>
          </div>
          <div class="BIM">
            <img src="/static/images/VR.png">
            <p @click="go({path:'/pages/home/ProjectVR'})">VR</p>
          </div>
          <div class="BIM">
            <img src="/static/images/monitor.png">
            <p @click="go({path:'/pages/home/Projectmonitoring'})">监控</p>
          </div>
          <div class="BIM">
            <img src="/static/images/video.png">
            <p @click="go({path:'/pages/home/Aerialphoto'})">航拍</p>
          </div>
          <div @click="go({path:'/pages/home/Projectmember'})" class="BIM membership">
            <p style=" color: #ffffff;">项目成员：{{ProjectDetailed.NumberOfPeople}}人</p>
          </div>
        </div>
        <!-- 红包榜 -->
        <div class="welfare">
          <div class="redpacket">
            <p class="redpacketOne">红包榜</p>
            <p @click="go({path:'/pages/home/Welfarelist'})" style="padding-right: 0.34rem;color: #8c8c8c;">详情</p>
            <img src="/static/images/details.png">
          </div>
          <!-- 项目有打赏的时候 -->
          <div class="crewlist" v-if="RedPacket.length>0">
            <div :class="{'redenvelopes':isredenvelopes,'redenvelopes1':isredenvelopes1}">
              <ul @click="go({path:'/pages/home/details',query:{UserId:item.UserId}})" style=" margin-bottom: 0.43rem;" v-for="(item,index) in RedPacket" :key="index" v-if="item.State==2">
                <li class="serial" :class="{'serial1':index==0,'serial2':index==1,'serial3':index==2,'serial4':index>2,}">{{index+1}}</li>
                <li style="float:left">{{item.UserName}}</li>
                <li style="color: #8c8c8c;">（{{item.eName}}）</li>
              </ul>
            </div>
            <div class="expansion"  v-for="(item,index) in RedPacket" :key="index" v-if="(item.State==2)>1">
              <img v-if="wallet==1" @click="Redenvelopes" src="/static/images/wallet-more.png">
              <img v-if="wallet==2" @click="collectRedenve" src="/static/images/wallet-morex.png">
            </div>
          </div>
          <!-- 项目没有打赏的时候 -->
          <div class="Nocrewlist" style="color: #8c8c8c;text-align: center;padding-bottom: 0.35rem;" v-else>该项目没有打赏</div>
        </div>

        <!-- 项目图片 -->
        <div class="projectprint">
          <div class="redpacket">
            <p class="navigation">项目图片</p>
            <p  @click="go({path:'/pages/home/Projectpicture'})" style="padding-right: 0.34rem;color: #8c8c8c;">查看全部</p>
            <img src="/static/images/details.png">
          </div>
          <div class="showprint">
            <ul @click="go({path:'/pages/home/Logdetails',query:{LogId:item.LogId}})" v-for="(item,index) in Projectpicture" :key="index" class="article">
              <li v-if="item.Images.length>0">
                <img :src="item.Images[0]">
              </li>
              <li class="realtime">{{item.CreateTimeFormat}}</li>
              <li class="linkman">{{item.CreatorName}}</li>
            </ul>
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
      wallet:1,
      isredenvelopes:true,
      isredenvelopes1:false,
      Projectid: null,
      ProjectDetailed: {},
      RedPacket: [],
      Projectpicture:[]
    };
  },
  methods: {
    Redenvelopes(){
      this.isredenvelopes=false;
      this. isredenvelopes1=true;
      this.wallet=2;
    },
    collectRedenve(){
      this.isredenvelopes=true;
      this. isredenvelopes1=false;
      this.wallet=1;
    }
  },

  async mounted() {
    var that = this;
    this.Projectid =
      this.$route.query.ProjectId || "70057154-a003-4815-b247-0fe887ab4469";
    //获取项目详情。用于展示项目详细信息界面。
    var rep = await this.$UJAPI.Project_GetDetailed(this.Projectid);
    if (rep.ret == 0) {
      this.ProjectDetailed = rep.data;
    }
  

    //获取项目红包 石凤叶f2c9bb9a-3749-47f2-ad8e-ea11e3645011
    var res = await this.$UJAPI.Project_ProjectRedPacket({
      Projectid: this.Projectid
    });
    if (res.ret == 0) {
      this.RedPacket = res.data;
    }
  


    //获取项目图片
    var res=await this.$UJAPI.Project_GetList({
       Projectid: "70057154-a003-4815-b247-0fe887ab4469",
       QueryType:4
    })
    if(res.ret==0)
    {
      this.Projectpicture=res.data;
    }
    // console.log(this.Projectpicture)
  }
};
</script>

<style scoped>
.userinfo {
  background-color: #ecf0f1;
}
.Projectcircle img {
  width: 10.8rem;
}
.information {
  width: 10.8rem;
  height:4.82rem;
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
.headportrait {
 position:absolute;
 left: 4.25rem;
  width: 1.72rem !important;
  height: 1.72rem !important;
}
.projectright {
  position:absolute;
  width: 3rem;
  left: 7.54rem;
}
.projectright p {
  font-size: 0.32rem;
}
.Projectcircleico {
  position:absolute;
  left:8.73rem;
  top: 0.53rem;
  width: 1.59rem !important;
  height: 0.67rem;
}
.approve {
  font-size: 0.18rem;
  width: 1.33rem;
  height: 0.37rem;
  color: #ff6b29;
  margin-left: 0.13rem;
  padding: 0 0.1rem 0 0.1rem;
  float: left;
}
.CompanyName {
  position:absolute;
  left:35%; 
   /* margin:0 auto; */
  top: 2.05rem;
}
.address {
  width: 6.6rem;
  font-size: 0.52rem;
}
.CompanyName img {
  width: 0.96rem;
  height: 0.39rem;
  float: left;
  padding-top: 0.1rem;
}
.projectphase {
  font-size: 0.4rem;
  position: relative;
  left: 10%;
  top: 3.1rem;
  color: #434343;
}
.schedule img {
  width: 1.59rem;
  height: 0.67rem;
  position: absolute;
  top: 4.75rem;
  left: 8.73rem;
}
/* 设备  */
.facility {
  margin-bottom: 0.15rem;
  background: #ffffff;
  height: 1.07rem;
}
.BIM {
  float: left;
  width: 18%;
  border-right: solid 0.01rem #e8e8e8;
}
.BIM img {
  height: 0.6rem;
  width: 0.6rem;
  padding: 0.29rem 0.17rem 0.38rem 0.2rem;
  float: left;
}
.BIM p {
  font-size: 0.32rem;
  padding-top: 0.39rem;
  color: #565656;
}
.membership {
  width: 25.4%;
  height: 1.07rem;
  font-size: 0.22rem;
  background-color: #6ed2f8;
  padding-left: 0.1rem;
}
.welfare {
  background-color: #ffffff;
}
.redpacket {
  font-size: 0.42rem;
  line-height: 0.98rem;
  border: solid 0.01rem #e8e8e8;
}
.redpacketOne {
  float: left;
  color: #8c8c8c;
  padding-right: 7.06rem;
  padding-left: 1.08rem;
}
.redpacket img {
  width: 0.16rem;
  height: 0.28rem;
}
.redpacket p {
  float: left;
}
.navigation {
  float: left;
  font-size: 0.46rem !important;
  padding-right: 6.5rem;
  padding-left: 0.26rem;
  color: #353535;
}
.Nocrewlist {
  margin-top: 0.37rem;
  font-size: 0.4rem;
}
.redenvelopes1{
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
.projectprint {
  background-color: #ffffff;
  margin-top: 0.15rem;
  margin-bottom: 0.15rem;
}
.article {
  margin: 0.21rem 0.15rem 0.1rem 0.2rem;
  float: left;
}
.article img {
  width: 2.31rem;
  height: 2.31rem;
}
.linkman {
  font-size: 0.35rem;
  color: #565656;
  text-align: center;
}
.realtime {
  width: 2.31rem;
  height: 0.52rem;
  background-color: #000000;
  opacity: 0.48;
  color: #565656;
  font-size: 0.29rem;
  position: relative;
  text-align: center;
  margin-top: -0.6rem;
}
.showprint {
  height: 9.2rem;
  background-color: #ffffff;
  overflow: hidden;
}
</style>
<style>
page {
  background-color: #ecf0f1;
}
</style>