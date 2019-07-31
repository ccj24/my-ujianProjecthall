<template>
  <div class="index">
    <div class="content">
      <div class="homePage">
        <div class="hpBannerDiv">
          <!-- 背景图片 -->
          <img class="homePage_banner" :src="ProjectDetailed.Photos" alt />
          <div class="hpPersonal">
            <div class="hpPersonLeft">
              <div class="hpPersonState">
                <p
                  class="hpPersonSerial"
                >编号：{{ProjectDetailed.ProjectNo==null?'':ProjectDetailed.ProjectNo}}</p>
                <div class="hpExecutionDiv">
                  <img class="hpExecutionIcon" src="/static/img/homePage_execution.png" alt />
                  <p class="hpExecutionP">{{ProjectDetailed.StageDisplay}}</p>
                </div>
                <div class="hpExecutionDiv">
                  <!-- 已认证 -->
                  <div v-if="ProjectDetailed.AuditInfo!=null && ProjectDetailed.Audit">
                    <img class="hpAttestationIcon" src="/static/img/homePage_attestation.png" alt />
                    <div class="hpAttestationBox">监管</div>
                    <div class="hpAttestationBox2">保险</div>
                  </div>

                  <!-- 认证失败 -->
                  <div v-if="ProjectDetailed.AuditInfo!=null && !ProjectDetailed.Audit">
                    <img
                      class="hpAttestationIcon"
                      src="/static/img/homePage_attestationLose.png"
                      alt
                    />
                    <p class="hpExecutionP_lose">认证失败</p>
                  </div>

                  <!-- 未认证 -->
                  <div v-if="ProjectDetailed.AuditInfo==null ">
                    <img class="hpAttestationIcon" src="/static/img/homePage_attestationNo.png" alt />
                    <p class="hpExecutionP_no">未认证</p>
                  </div>

                  <!-- 认证中 -->
                  <div
                    v-if="ProjectDetailed.AuditInfo!=null && !ProjectDetailed.Audit&&ProjectDetailed.AuditInfo.ResultMsg.length==0"
                  >
                    <img
                      class="hpAttestationIcon"
                      src="/static/img/homePage_attestationIng.png"
                      alt
                    />
                    <p class="hpExecutionP_ing">认证中</p>
                  </div>
                </div>
              </div>
              <div class="hpPersonTitle">{{ProjectDetailed.ProjectName}}</div>
              <div class="hpPersonBtns">
                <div
                  class="hpPersonBtn1"
                  @click="go({path:'/pages/home/Projectmember',query:{ProjectId:ProjectDetailed.ProjectId}})"
                >
                  项目成员
                  <b>{{ProjectDetailed.NumberOfPeople}}人</b>
                </div>

                <div class="hpPersonBtn2">
                  <img class="hpPersonBtnicon" src="/static/img/homePage_personIcon.png" alt />
                  <p class="hpPersonBtn2p">项目圈</p>
                </div>
              </div>
            </div>
            <div class="hpPersonRight">
              <div class="hpPersonHeadImgDiv">
                <img class="hpPersonHeadImg" :src="UserInfo.Portrait" alt />
                <div
                  v-for="(item,index) in ProjectMemberList"
                  :key="index"
                  class="hpPersonHeadBox"
                >{{item.PostName}}</div>
              </div>
              <p class="hpPersonWorkNum">
                工作系数：
                <b>{{ProjectDetailed.Ratio*100+"%"}}</b>
              </p>
            </div>
          </div>
        </div>
        <!-- 项目红包 -->
        <div class="redPacket">
          <div class="rpTop">
            <div class="rpTopleft">
              <div class="rpTopsquare"></div>
              <p class="rpTopTitle">项目红包</p>
            </div>
            <img
              @click="ClickDetailed(ProjectDetailed)"
              class="rpTopnextRight"
              src="/static/img/homePage_nextRight.png"
              alt
            />
          </div>
          <div class="rpContent">
            <div class="rpBg">
              <!-- 发红包 获取红包和红包排行接口数据为null时-->
              <div v-if="RedPacket.length==0 && Exceptionalranking.length==0">
                <img class="rpIcon" src="/static/img/homePage_redPacketNo.png" alt />
                <div class="rpTextDiv">
                  <div class="rpText3">还没有红包，快来发一个吧</div>
                </div>
                <div class="rpRight">
                  <div class="rpBtn">
                    <P class="rpBtnP" @click="ClickDetailed(ProjectDetailed)">发红包</P>
                    <img class="rpDot1" src="/static/img/homePage_redPacketDot1.png" alt />
                    <img class="rpDot2" src="/static/img/homePage_redPacketDot2.png" alt />
                    <img class="rpDot3" src="/static/img/homePage_redPacketDot3.png" alt />
                  </div>
                </div>
              </div>

              <!-- 有红包的操作 获取项目红包-->
              <div v-if="RedPacket.length>0">
                <img class="rpIcon" src="/static/img/homePage_redPacket.png" alt />
                <div class="rpTextDiv" v-for="(item,index) in RedPacket" :key="index">
                  <div class="rpText">
                    {{item.UserName}}
                    <b>{{item.Remarks}}</b>
                  </div>
                  <div class="rpText2">{{item.GiverUserInfo.CorpName}}</div>
                </div>
                <div class="rpRight">
                  <div class="rpBtn">
                    <P class="rpBtnP">领红包</P>
                    <img class="rpDot1" src="/static/img/homePage_redPacketDot1.png" alt />
                    <img class="rpDot2" src="/static/img/homePage_redPacketDot2.png" alt />
                    <img class="rpDot3" src="/static/img/homePage_redPacketDot3.png" alt />
                  </div>
                </div>
              </div>
            </div>

            <!-- 当没有红包领取的时候显示 红包排行 -->
            <div class="redlistSort" v-if="Exceptionalranking.length>0">
              <div class="redlistBg1">
                <img src="/static/img/NO.2.png" />
                <div style class="resortNr" v-if="Exceptionalranking.length>1">
                  <p class="redsortName">{{Exceptionalranking[1].UserName}}</p>
                  <div class="resortPrice">
                    ￥
                    <i style="display: inline-block;">{{Exceptionalranking[1].Money}}</i>
                  </div>
                  <p class="resortText">{{Exceptionalranking[1].CorpName}}</p>
                </div>
                <p v-else class="noresort">暂无</p>
              </div>

              <div class="redlistBg2">
                <img src="/static/img/NO.1.png" />
                <div v-if="Exceptionalranking.length>0" class="resortNr">
                  <div class="no1Info">
                    <p class="redsortName">{{Exceptionalranking[0].UserName}}</p>
                    <div class="resortPrice">
                      ￥
                      <i style="display: inline-block;">{{Exceptionalranking[0].Money}}</i>
                    </div>
                  </div>
                  <p class="resortText">{{Exceptionalranking[0].CorpName}}</p>
                </div>
                <p v-else class="noresort">暂无</p>
              </div>

              <div class="redlistBg3">
                <img src="/static/img/NO.3.png" />
                <div class="resortNr" v-if="Exceptionalranking.length>2">
                  <p class="redsortName">{{Exceptionalranking[2].UserName}}</p>
                  <div class="resortPrice">
                    ￥
                    <i style="display: inline-block;">{{Exceptionalranking[2].Money}}</i>
                  </div>
                  <p class="resortText">{{Exceptionalranking[2].CorpName}}</p>
                </div>
                <p v-else class="noresort">暂无</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 任务  会议 日志 资料 -->
        <div class="hpIcons">
          <div class="hpIconDiv" @click="go({path:'/pages/task/taskindex'})">
            <img class="hpIcon" src="/static/img/homePage_Icon1.png" alt />
            <p class="hpIconP">任务</p>
            <div class="redDot"></div>
          </div>
          <div class="hpIconDiv">
            <img class="hpIcon" src="/static/img/homePage_Icon2.png" alt />
            <p class="hpIconP">会议</p>
          </div>
          <div class="hpIconDiv">
            <img class="hpIcon" src="/static/img/homePage_Icon3.png" alt />
            <p class="hpIconP">日志</p>
          </div>
          <div class="hpIconDiv">
            <img class="hpIcon" src="/static/img/homePage_Icon4.png" alt />
            <p class="hpIconP">资料</p>
          </div>
        </div>
        <!-- 项目图片 -->
        <div class="hpImgs">
          <div class="hpDemoTop">
            <div class="hpDemoTopleft">
              <div class="hpDemoTopSquare"></div>
              <p class="hpDemoTopTitle">项目图片</p>
            </div>
            <div
              class="hpDemoTopRight"
              @click="go({path:'/pages/home/Projectpicture',query:{ProjectId:ProjectDetailed.ProjectId}})"
            >
              <p class="hpDemoTopRightP">查看全部</p>
              <img class="hpDemoTopNextRight" src="/static/img/homePage_nextRight.png" alt />
            </div>
          </div>
          <div class="hpImgNr">
            <div class="hpImgNrDemo" v-for="(item,index) in Projectpicture" :key="index">
              <div
                class="hpImgDivs"
                @click="go({path:'/pages/home/Logdetails',query:{LogId:item.LogId}})"
              >
                <img class="hpImg" :src="item.Images[0]" />
                <div class="hpImgDate">{{item.CreateTimeFormat}}</div>
              </div>
              <p class="hpImgName">{{item.CreatorName}}</p>
            </div>
          </div>
        </div>
        <!-- 实时数据 -->
        <div class="hpImgs">
          <div class="hpDemoTop">
            <div class="hpDemoTopleft">
              <div class="hpDemoTopSquare"></div>
              <p class="hpDemoTopTitle">实时数据</p>
            </div>
          </div>
          <div class="hpReal">
            <div class="hpRealDemo">
              <div v-for="(item,index) in ProjectDetailed.liveData" :key="index" class="hpRealLeft">
                <div class="hpRealIconDiv">
                  <img
                    @click="liveDataLinkUrl(item)"
                    class="hpRealICON"
                    :src="item.liveDataTypeIcon"
                    alt
                  />
                  <p class="hpRealIconP">{{item.liveDataTypeName}}</p>
                </div>
                <div class="hpRealNR">
                  <div v-for="(item1,index1) in item.listInfo" :key="index1">
                    <p
                      class="hpRealCount"
                      v-if="item.liveListType==1"
                    >{{item1.txtTitle+item1.txtNum+item1.txtUnit}}</p>
                    <img class="hpRealImg" v-else-if="item.liveListType==2" :src="item1.imgUrl" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 获取项目首页店铺(广告) -->
        <div class="need">
          <div class="neetHint">————— &nbsp;&nbsp;&nbsp;您可能需要&nbsp;&nbsp;&nbsp; —————</div>
          <!-- 店铺信息 -->
          <div v-for="(item,index) in AdvertProjectHome" :key="index">
            <div class="needDiv">
              <p class="needShopName">{{item.shop.sName}}</p>
              <div class="needAboutShop">
                <div class="needShopScore">
                  店铺评分：
                  <b>{{item.shop.scoreAvg}}</b>
                </div>
                <div class="needShopScore">
                  主营：
                  <i>{{item.shop.mainTypeName}}</i>
                </div>
                <p class="needSpace">255.99km</p>
              </div>
              <div class="needShopImgs">
                <img
                  v-for="(item1,index1) in item.shop.shopImg"
                  :key="index1"
                  class="needShopImg"
                  :src="item1.ImgUrl"
                />
              </div>
            </div>
            <!-- 商品信息 -->
            <div class="needDiv" v-for="(item2,index2) in item.goods" :key="index2">
              <div class="needLeft">
                <div class="needLeftTitle">
                  {{item2.gName}}
                  <b>￥{{item2.minPrice}}</b>
                  <i>/{{item2.gUnit}}</i>
                </div>
              </div>
              <img class="needRightImg" :src="item2.ImgUrl" alt />
            </div>
          </div>

          <!-- 获取项目首页需求推荐(广告) -->
          <div class="needDiv">
            <div class="needList" v-for="(item,index) in AdvertProjectDemand" :key="index">
              <div class="needlistDot"></div>
              <p class="needlistP">{{item.adTitle}}</p>
            </div>
          </div>
          <div class="needIslike">————— &nbsp;&nbsp;&nbsp;没有喜欢的？试试发布需求&nbsp;&nbsp;&nbsp; —————</div>
          <div class="needBtn">发布需求</div>
        </div>
      </div>
    </div>
    <backHome></backHome>
  </div>
</template>

<script>
import "../../assets/style.css"; //引入公共的css文件
import backHome from "@/components/backHome";
export default {
  components: {
    backHome
  },
  data() {
    return {
      ProjectDetailed: {}, //获取项目详情
      RedPacket: [], //获取项目红包
      Projectpicture: [], //获取项目图片
      UserInfo: {}, //获取当前用户的登录信息
      ProjectMemberList: [], //获取项目成员列表
      AdvertProjectHome: [], // 获取项目首页店铺(广告)
      AdvertProjectDemand: [], //获取项目首页需求推荐(广告)
      Exceptionalranking: [] //获取项目打赏排行
    };
  },

  methods: {
    liveDataLinkUrl(item) {
      //  人员页面跳转
      if (item.liveDataType == 1) {
        this.$router.push({
          path: "/pages/newproject/projectpersonnel",
          query: { ProjectId: this.ProjectDetailed.ProjectId }
        });
      }
      //  环保页面跳转liveDataType==2
      else if (item.liveDataType == 2) {
        this.$router.push({
          path: "/pages/newproject/Environmental"
          // query: { ProjectDetailed:item }
        });
        //store用Mutation定义修改 ,然后用store.commit('xx') 触发
        this.$store.commit("setProjectDetailedView", item);
      }
      //  监控页面跳转liveDataType==5
      else if (item.liveDataType == 5) {
        this.$router.push({
          path: "/pages/newproject/monitoring",
          query: { ProjectId: this.ProjectDetailed.ProjectId }
        });
      }
      //  BIM页面跳转liveDataType==6
      else if (item.liveDataType == 6) {
        this.$router.push({
          path: "/pages/newproject/ProjectBIM",
          query: { ProjectId: this.ProjectDetailed.ProjectId }
        });
      }
      //  航拍页面跳转liveDataType==8
      else if (item.liveDataType == 8) {
        this.$router.push({
          path: "/pages/newproject/Aerialphoto",
          query: { ProjectId: this.ProjectDetailed.ProjectId }
        });
      }
    },
    // 点击跳转页面到红包详情  将项目详情数据保存到vuex中
    ClickDetailed(ProjectDetailed) {
      this.$router.push({
        path: "/pages/home/Welfarelist"
      });
      //store用Mutation定义修改 ,然后用store.commit('xx') 触发 setProjectDetailed保存的方法
      this.$store.commit("setProjectDetailed", ProjectDetailed);
    }
  },
  async mounted() {
    var that = this;
    //获取项目详情。用于展示项目详细信息界面。
    var rep = await this.$UJAPI.Project_GetDetailed(this.ProjectId);
    if (rep.ret == 0) {
      this.ProjectDetailed = rep.data;
    }

    //获取项目红包 石凤叶f2c9bb9a-3749-47f2-ad8e-ea11e3645011
    var res = await this.$UJAPI.Project_ProjectRedPacket({
      Projectid: this.ProjectId,
      searchCat: 1
    });
    if (res.ret == 0) {
      this.RedPacket = res.data;
    }

    // 获取项目打赏排名
    var rep = await this.$UJAPI.ProjectRedPacketRank({
      Projectid: this.ProjectId
    });
    if (rep.ret == 0) {
      this.Exceptionalranking = rep.data;
    }

    //获取项目图片 获取项目日志列表
    var res = await this.$UJAPI.Project_GetList({
      Projectid: this.ProjectId,
      QueryType: 4
    });
    if (res.ret == 0) {
      this.Projectpicture = res.data;
    }
   console.log(this.Projectpicture)
    // 获取当前登录人的信息
    var rep = await this.$UJAPI.User_Get();
    if (rep.ret == 0) {
      this.UserInfo = rep.data;
    }

    // 获取项目成员列表
    var rep = await this.$UJAPI.Project_ProjectMember({
      Projectid: this.ProjectId,
      UserId: "a327307c-b133-4663-96f4-7462292b872c"
    });
    if (rep.ret == 0) {
      this.ProjectMemberList = rep.data;
    }

    // 获取项目首页店铺(广告)
    var rep = await this.$UJAPI.Advert_ShopList();
    if (rep.ret == 0) {
      this.AdvertProjectHome = rep.data;
    }

    // 获取项目首页需求推荐(广告)
    var rep = await this.$UJAPI.Advert_DemandValList();
    if (rep.ret == 0) {
      this.AdvertProjectDemand = rep.data;
    }
  }
};
</script>


