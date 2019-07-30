<template>
  <div class="index">
    <!-- 顶部收到任务发出任务 -->
    <div class="top">
      <p class="top_rttext" @click="Givereward(ProjectDetailed) ;">打赏</p>
      <div class="top_title2">
        <div :class="{top_title2_fqrw:receive,top_title2_fqrw2:giveout}" @click="SetReceive">打赏排行</div>
        <div :class="{top_title2_fqrw2:receive,top_title2_fqrw:giveout}" @click="SetGet">红包列表</div>
      </div>
    </div>
    <!-- 打赏排行 -->
    <div v-if="givereward" class="Welfarelist" style="margin-top: 2.4rem;">
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
    <!--红包列表 -->
    <div style="margin-top: 2.4rem;" v-if="packetlist">
      <div class="index">
        <!-- content********************************* -->
        <div class="box" v-for="(item,index) in RedPacket" :key="index">
          <div class="time">
            <p>{{item.CreateTime}}</p>
          </div>
          <div class="person">
            <p>
              {{item.UserName}}
              <span>（{{item.eName}}）</span>
            </p>
          </div>
          <div class="hongbao_a">
            <div class="hongbao_box">
              <img class="hongbao" src="/static/img/hongbao1.png" alt />
              <p class="gongxi">{{item.Remarks}}</p>
              <p class="gongxi">
                <span>{{item.State==0?'未领取':'已领取'}}</span>
              </p>
            </div>
            <div class="hongbao_border">
              <p class="hongbao_padding">U建红包</p>
            </div>
          </div>
          <div
            :class="{'redenvelopes':isredenvelopes,'redenvelopes1':isredenvelopes1}"
            v-if="item.RedPacketDetailList.length>0"
          >
            <div class="ling" v-for="(item1,index1) in item.RedPacketDetailList" :key="index1">
              <img class="lingqu" src="/static/img/lingqu.png" />
              <p class="name">
                {{item1.UserName}}
                <span>红包</span>
              </p>
            </div>
          </div>

          <div class="jian">
            <img
              v-if="wallet==1"
              class="jiantou"
              @click="Redenvelopes"
              src="/static/img/jiantou2.png"
              alt
            />
            <img
              v-if="wallet==2"
              class="jiantou1"
              @click="collectRedenve"
              src="/static/images/wallet-morex.png"
            />
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
      wallet: 1,
      isredenvelopes: true,
      isredenvelopes1: false,
      RedPacketDetail: {},
      ProjectDetailed: {},
      packetlist: false,
      givereward: true,
      receive: true,
      giveout: false,
      RedPacket: []
    };
  },
  computed: {
    //  获取保存在vuex中的项目详情数据
    ProjectDetailed() {
      // ProjectDetailed是主页保存去vuex中的项目详情数据
      return this.$store.state.Project.ProjectDetailed;
    }
  },
  methods: {
    // 红包列表中的展开方法
    Redenvelopes() {
      this.isredenvelopes = false;
      this.isredenvelopes1 = true;
      this.wallet = 2;
    },
    // 红包列表中的收缩方法
    collectRedenve() {
      this.isredenvelopes = true;
      this.isredenvelopes1 = false;
      this.wallet = 1;
    },
    // 打赏按钮
    SetReceive() {
      this.receive = !this.receive;
      this.giveout = !this.giveout;
      this.packetlist = false;
      this.givereward = true;
    },
    // 红包列表排行
    SetGet() {
      this.receive = !this.receive;
      this.giveout = !this.giveout;
      this.packetlist = true;
      this.givereward = false;
    },
    // 点击跳转页面到红包详情  将项目详情数据保存到vuex中
    Givereward(ProjectDetailed) {
      this.$router.push({
        path: "/pages/newproject/givereward"
      });
      //store用Mutation定义修改 ,然后用store.commit('xx') 触发 setProjectDetailed保存的方法
      this.$store.commit("setProjectDetailed", ProjectDetailed);
    }
  },
  async mounted() {
    this.ProjectDetailed = this.$store.state.Project.ProjectDetailed;

    var that = this;

    //获取项目红包
    var res = await this.$UJAPI.Project_ProjectRedPacket({
      Projectid: this.ProjectDetailed.ProjectId
    });
    if (res.ret == 0) {
      this.RedPacket = res.data;
    }
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
.timelist {
  padding-top: 0.47rem;
  font-size: 0.35rem;
  color: #cecece;
}
.namefirm {
  font-size: 0.43rem;
  padding-top: 0.36rem;
  text-align: center;
}
.redenvelopes1 {
  font-size: 0.4rem;
}
.redenvelopes {
  max-height: 11.5rem;
  overflow: hidden;
}
.index .top .top_rttext {
  float: right;
  font-size: 0.45rem;
  color: #ffffff;
  line-height: 1.33rem;
  padding-right: 0.4rem;
}
.index .top .top_title {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 0.51rem;
  text-align: center;
  line-height: 1.33rem;
  color: #ffffff;
  z-index: -1;
}

.index .top .top_title2 {
  border: solid 0.02rem #ffffff;
  border-radius: 0.1rem;
  line-height: 0.87rem;
  font-size: 0.41rem;
  overflow: hidden;
  position: absolute;
  top: 0.23rem;
  left: 2.75rem;
  z-index: -1;
}
.index .top .top_title2 .top_title2_fqrw,
.index .top .top_title2 .top_title2_fqrw2 {
  color: #12b7f5;
  background-color: #ffffff;
  border-radius: 0.1rem 0 0 0.1rem;
  float: left;
  padding-left: 0.51rem;
  padding-right: 0.23rem;
}

.index .top .top_title2 .top_title2_fqrw2 {
  color: #ffffff;
  background-color: #12b7f5;
  padding-left: 0.23rem;
  padding-right: 0.51rem;
}
.index .content .renwu .renwu_title,
.index .content2 .renwu .renwu_title,
.index .content3 .renwu .renwu_title {
  background-color: #ffffff;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
}

.index .content .renwu .renwu_title .renwu_bt,
.index .content .renwu .renwu_title .renwu_bt2,
.index .content2 .renwu .renwu_title .renwu_bt,
.index .content2 .renwu .renwu_title .renwu_bt2,
.index .content3 .renwu .renwu_title .renwu_bt,
.index .content3 .renwu .renwu_title .renwu_bt2 {
  color: #12b7f5;
  font-size: 0.48rem;
  width: 50%;
  text-align: center;
  line-height: 1.38rem;
  border-bottom: 0.03rem solid #12b7f5;
  float: left;
}

.index .content .renwu .renwu_title .renwu_bt2,
.index .content2 .renwu .renwu_title .renwu_bt2,
.index .content3 .renwu .renwu_title .renwu_bt2 {
  color: #363636;
  border: 0;
}

.index .content .renwu .renwu_content,
.index .content2 .renwu .renwu_content,
.index .content3 .renwu .renwu_content {
  margin-bottom: 0.4rem;
  overflow: auto;
  padding-top: 1.33rem;
}

.index .content .renwu .renwu_content .renwu_nr,
.index .content2 .renwu .renwu_content .renwu_nr,
.index .content3 .renwu .renwu_content .renwu_nr {
  background-color: #ffffff;
  margin-top: 0.4rem;
  padding: 0 0.48rem;
  padding-bottom: 0.3rem;
}

.index .content .renwu .renwu_content .renwu_nr .renwu_nr_header,
.index .content2 .renwu .renwu_content .renwu_nr .renwu_nr_header,
.index .content3 .renwu .renwu_content .renwu_nr .renwu_nr_header {
  overflow: hidden;
  padding: 0.58rem 0;
}

.index .content .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_img,
.index .content2 .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_img,
.index .content3 .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_img {
  width: 1.58rem;
  height: 1.58rem;
  float: left;
  margin-right: 0.57rem;
  border-radius: 0.1rem;
}

.index .content .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_nr_info,
.index
  .content2
  .renwu
  .renwu_content
  .renwu_nr
  .renwu_nr_header
  .renwu_nr_info,
.index
  .content3
  .renwu
  .renwu_content
  .renwu_nr
  .renwu_nr_header
  .renwu_nr_info {
  float: left;
  color: #363636;
  font-size: 0.45rem;
  height: 1.58rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.index .content .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_hint,
.index .content2 .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_hint,
.index .content3 .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_hint {
  float: right;
  color: #12b7f5;
  font-size: 0.42rem;
}
.index .box {
  padding: 0 0 1.28rem 0;
}

.index .box .time {
  padding: 0.23rem 0 0.25rem;
  text-align: center;
  font-size: 0.35rem;
  color: #cecece;
}

.index .box .person {
  font-size: 0.43rem;
  color: #353535;
  text-align: center;
  padding-bottom: 0.24rem;
}

.index .box .person span {
  color: #8c8c8c;
}

.index .box .hongbao_a {
  overflow: hidden;
}

.index .box .hongbao_a .hongbao_box {
  border-radius: 0.1rem 0.1rem 0 0;
  background: #fa9d3b;
  width: 6.25rem;
  height: 1.82rem;
  margin-left: 23%;
}

.index .box .hongbao_a .hongbao_box .hongbao {
  padding: 0.18rem 0 0 0.29rem;
  width: 0.94rem;
  height: 1.2rem;
  float: left;
}

.index .box .hongbao_a .hongbao_box .gongxi {
  overflow: hidden;
  padding: 0.14rem 0 0 0.22rem;
  width: 4.8rem;
  font-size: 0.43rem;
  color: #ffffff;
  float: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.index .box .hongbao_a .hongbao_box .gongxi span {
  font-size: 0.32rem;
}

.index .box .hongbao_a .hongbao_border {
  width: 6.25rem;
  margin-left: 23%;
  border-radius: 0 0 0.1rem 0.1rem;
  background: #ffffff;
}

.index .box .hongbao_a .hongbao_border .hongbao_padding {
  font-size: 0.32rem;
  height: 0.53rem;
  color: #8c8c8c;
  padding: 0.08rem 0 0.11rem 0.37rem;
}

.index .box .ling {
  margin-top: 0.4rem;
  margin-left: 33%;
  width: 3.94rem;
  height: 0.65rem;
  background: #cecece;
  border-radius: 0.1rem;
  overflow: hidden;
  padding: 0.14rem 0 0 0;
}

.index .box .ling .lingqu {
  padding-left: 0.28rem;
  width: 0.39rem;
  height: 47;
  float: left;
}

.index .box .ling .name {
  font-size: 0.35rem;
  float: left;
  padding-left: 0.17rem;
  color: #ffffff;
}

.index .box .ling .name span {
  color: #fa9d3b;
}

.index .box .jian {
  text-align: center;
}

.index .box .jian .jiantou {
  width: 0.91rem;
  height: 0.63rem;
}
.jiantou1 {
  width: 0.51rem;
  height: 0.43rem;
}
.index .content .renwu .renwu_content .renwu_nr .rewu_nr_qita,
.index .content2 .renwu .renwu_content .renwu_nr .rewu_nr_qita,
.index .content3 .renwu .renwu_content .renwu_nr .rewu_nr_qita {
  color: #363636;
  font-size: 0.42rem;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>