<template>
  <div>
    <div class="topNr">
      <span class="top_one" @click="quxiao">取消</span>
      <span class="top_two" @click="queding">确定发起</span>
    </div>
    <div class="headline">
      <textarea placeholder="会议名称" auto-height="ture" v-model="Title"></textarea>
    </div>
    <div class="remark">
      <textarea placeholder="备注" auto-height="ture" v-model="Remarks"></textarea>
    </div>
    <div class="geliqu"></div>
    <div class="bottom">
      <ul>
        <li class="Li" @click="thedate">
          <span class="icon" style="color: #12b7f5;">&#xe6c7;</span>
          <span v-if="choosetime!=null" class="aaa">时间 {{choosetime}}</span>
          <span v-else class="aaa">时间</span>
        </li>
        <li class="Li" @click="invite">
          <span class="icon" style="color: #12b7f5;float:left">&#xe61c;</span>
          <span class="aaa" style="float:left">邀请会议成员</span>
          <span v-if="Members==null"></span>
          <div v-else class="chengyuan">
            <span v-for="(value,key,index) in Members" :key="index">{{value}} </span>
          </div>
          <span class="icon youbiao">&#xe601;</span>
        </li>
        <li class="Li" @click="inviteRegistrar">
          <span class="icon" style="color: #12b7f5;">&#xe62e;</span>
          <span class="aaa">指定会议记录员</span>
          <div style="float: right">
            <span v-if="RecorderName==null" class="jiluyuan"></span>
            <span v-else class="jiluyuan">{{RecorderName.value}}</span>
            <span class="icon youbiao">&#xe601;</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 时间组件弹框 -->
    <div class="layoutBr" v-show="shijian" @click="aaa">
      <!--Thetime是子组件里点击所调用的函数  -->
      <thetime @sendmsg="theDate" ></thetime>
    </div>
    <!-- 点击发布的背景样式 -->
    <div v-show="conceal" class="layout">
      <div class="frame">
        <div class="frame_top">确定发起该会议？</div>
        <div class="frame_two">
          <div class="one" style="float:left" @click="affirm">确认</div>
          <div class="two" @click="cancel">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import thetime from "@/components/thetime";
export default {
  data() {
    return {
      conceal: false,
      shijian: false,
      Title:"",
      Remarks:"",
      choosetime:""
    };
  },
  methods: {
    // 邀请成员
    invite() {
      //每次进去先清空，以获取最新的数据
      this.$store.commit("setmeetingTitle", null);
      this.$store.commit("setmeetingTitle", this.Title);
      this.$store.commit("setmeetingRemarks", null);
      this.$store.commit("setmeetingRemarks", this.Remarks);
      this.$router.push({
        path: "/pages/meeting/InviteMembers",
        query: {
          invite: 1
        }
      });
    },
    //邀请记录员
    inviteRegistrar() {
      this.$store.commit("setmeetingTitle", null);
      this.$store.commit("setmeetingTitle", this.Title);
      this.$store.commit("setmeetingRemarks", null);
      this.$store.commit("setmeetingRemarks", this.Remarks);
      this.$router.push({
        path: "/pages/meeting/InviteMembers",
        query: {
          invite: 2
        }
      });
    },
    queding() {
      this.conceal = true;
    },
    cancel() {
      this.conceal = false;
    },
    async affirm() {
      if (this.Title!=null&&this.Remarks!=null&&this.choosetime!=null&&this.$store.state.Project.thechooseitem!=null&&this.$store.state.Project.thechooseitemNr.key!=null) {
        var that = this;
        var rep = await this.$UJAPI.ProjectMeeting_Add({
        ProjectId:this.ProjectId,
        Title:this.Title,
        Remarks:this.Remarks,
        MeetingTime:this.choosetime,
        Recorder:this.$store.state.Project.thechooseitemNr.key,
        Partaker:this.$store.state.Project.thechooseitem
    });
    if (rep.ret == 0) {
      this.toast("发布会议成功");
      this.replace("/pages/meeting/meetinghome")
    } else {
      this.toast(rep.msg);
    }
      }
      else{this.toast("请补全会议信息");}  
    },
    quxiao() {
      this.replace("/pages/meeting/meetinghome")
    },
    thedate() {
      this.shijian = true;
    },
    // 隐藏时间弹框
    aaa() {
      this.shijian=false
    },
    // time是子组件方法所附带的参数
    theDate(time) {
      this.choosetime=time
      this.shijian=false
      // 传时间存储在vuex中
      this.$store.commit("setmeetingTime", this.choosetime);
    }
  },
  computed: {
    //邀请的返回人员
    //传回去： this.$store.commit("setthechooseitemNr", Recorder);
    Members() {
       console.log(this.$store.state.Project.thechooseitem)
       return this.$store.state.Project.thechooseitem;
    },
    //邀请的记录员
    RecorderName() {
      console.log(this.$store.state.Project.thechooseitemNr)
       return this.$store.state.Project.thechooseitemNr;
    },
  },
    // 注册组件
  components: {
    thetime
  },
  async mounted() {
    this.Title=this.$store.state.Project.meetingTitle;
    this.Remarks=this.$store.state.Project.meetingRemarks;
    this.choosetime=this.$store.state.Project.meetingTime;
  }
};
</script>
<style scoped>
.topNr {
  width: 100%;
  height: 1.28rem;
  background-color: #12b7f5;
  font-size: 0.46rem;
  color: #ffffff;
  line-height: 1.28rem;
  overflow: hidden;
}
.top_one {
  padding-left: 0.4rem;
}
.top_two {
  float: right;
  padding-right: 0.4rem;
}
.headline {
  padding: 0.35rem 0.25rem;
  border-bottom: 0.02rem solid #f4f3f2;
  height: 0.7rem !important;
  /* line-height: 1.28rem !important; */
  overflow: hidden;
}
.headline textarea {
  font-size: 0.46rem;
  color: #999999;
}
.remark {
  padding: 0.36rem 0.25rem;
  border-bottom: 0.02rem solid #f4f3f2;
}
.remark textarea {
  font-size: 0.46rem;
  color: #999999;
  min-height: 4.76rem;
}
.geliqu {
  height: 0.54rem;
  background-color: #f4f3f2;
}
.Li {
  height: 1.31rem;
  background-color: #ffffff;
  border-bottom: solid 0.01rem #e8e8e8;
  line-height: 1.31rem;
  overflow: hidden;
  font-size: 0.49rem;
  line-height: 1.31rem;
  padding: 0 0.33rem;
}
.chengyuan {
  font-size: 0.43rem;
  color: #ababab;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 0.26rem;
  float: left;
  width: 4.7rem;
}
.youbiao {
  font-size: 0.54rem;
  color: #999999;
  float: right;
}
.jiluyuan {
  font-size: 0.43rem;
  color: #ababab;
}
.aaa {
  color: #353535;
  margin-left: 0.45rem;
}
/* 点击弹出框背景 */
.layout {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9;
  /* 背景透明度 */
}
.layoutBr{
   position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.frame {
  width: 7.79rem;
  height: 3rem;
  font-size: 0.49rem;
  background-color: #ffffff;
  border-radius: 0.36rem;
  opacity: 1;
  overflow: hidden;
  /*固定定位 */
  position: fixed;
  top: 5.23rem;
  left: 1.49rem;
  z-index: 99;
}
.frame_top {
  height: 1.74rem;
  text-align: center;
  color: #353535;
  line-height: 1.74rem;
  border-bottom: 0.02rem solid #353535;
}
.one {
  width: 50%;
  text-align: center;
  color: #12b7f5;
  line-height: 1.26rem;
  border-right: 0.01rem solid #353535;
}
.two {
  overflow: hidden;
  text-align: center;
  color: #12b7f5;
  line-height: 1.26rem;
}
</style>