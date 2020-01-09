<template>
  <div class="indexBr">
    <!-- 顶部收到任务发出任务 -->
    <div class="top">
      <div class="top_title2">
        <div class="top_title2_fqrw2" :class="{top_title2_fqrw:oneindex==0}" @click="SetGet(0)">收到任务</div>
        <div class="top_title2_fqrw2" :class="{top_title2_fqrw:oneindex==1}" @click="SetGet(1)">发出任务</div>
      </div>
      <p class="top_rttext" @click="addTask">发起任务</p>
      <div v-show="add" @click="offadd" class="top_add">
        <!-- 箭头 -->
        <div class="to_top"></div>
        <div class="top_aa" @click.stop>
          <div @click="addrenwu(0)" class="top_name"><span class="icon" style="background-color: #12b7f5 ;color:#fff;border-radius: 0.5rem;border:#12b7f5">&#xe61b;</span>联系单</div>
          <div @click="addrenwu(1)" class="top_name"><span class="icon" style="color: #12b7f5">&#xe666;</span>签证单</div>
          <div @click="addrenwu(2)" class="top_name"><span class="icon" style="color: #12b7f5">&#xe61e;</span>任务单</div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- 内容 -->
      <div class="renwu">
        <div class="renwu_title">
          <p class="renwu_bt1" :class="{renwu_bt2:twoindex==0}" @click="checked(0)">未完成</p>
          <p class="renwu_bt1" :class="{renwu_bt2:twoindex==1}" @click="checked(1)">已结束</p>
        </div>
        <!-- 发出任务 未完成的时候 -->
        <div class="renwu_content">
          <div @click="taskdetails(item,index)" class="renwu_nr" v-for="(item,index) in finishedTaskInfo" :key="index">
            <div class="renwu_nr_dan">
              <div style="float: left;">
              <div v-if="item.TaskTypeId==2" class="icon tubiao" style="color: #ffc539;">&#xe666;</div>
              <div v-if="item.TaskTypeId==3" class="icon tubiao" style="color: #ff6c6c;">&#xe61e;</div>
              <div v-if="item.TaskTypeId==1" class="icon tubiao" style="color: #4bd083;">&#xe61b;</div>
              {{item.TaskTypeName}}</div>
              <span v-if="twoindex==0" style="float: right;"><span v-if="item.PlanReplyTime!=shijian">剩余 </span><span style="color: #353535;">{{item.thetime}}</span></span>
              <span v-if="twoindex==1" style="float: right;">{{item.PlanReplyTime}}</span>
            </div>
            <div class="renwu_nr_header">
              <img class="renwu_img" :src="item.Portrait" alt />
              <div class="renwu_nr_info">
                <p class="thename">{{item.UserName}}</p>
                <p>所属项目：{{item.ProjectName}}</p>
              </div>
              <p @click.stop class="renwu_hint" style="color: #8c8c8c;" v-if="item.State==0&&item.PlanReplyTime!=shijian&&item.thePlanReplyTime<nowtime">已过期</p>
              <p @click.stop class="renwu_hint" v-else-if="item.State==0&&oneindex==0" @click="answer(item)">去答复</p>
              <p @click.stop class="renwu_hint" v-else-if="item.State==0&&oneindex==1">待答复</p>
              <p @click.stop class="renwu_hint" style="color: #ffc539;" v-else-if="item.State==1">已完成</p>
            </div>
            <div class="rewu_nr_qita">{{item.TaskContent}}</div>
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
      TaskInfo:[],
      nowtime:new Date(),
      add:false,
      oneindex:0,
      twoindex:0,
      state:0,
      shijian:"1900-01-01 00:00:00",
      IsReply:1
    };
  },
  methods: {
    taskdetails(item,index){
      this.$router.push({
        path: "/pages/task/taskdetails",
        query: {
          TaskId:item.TaskId,
          IsReply:this.IsReply,
          ProjectId:item.ProjectId
        }
      });
    },
    answer(item) {
      this.$router.push({
        path: "/pages/task/answer",
        query: {
          TaskId:item.TaskId,
        }
      });
    },
    addTask() {
      this.add=true;
    },
    offadd() {
      this.add=false;
    },
    SetGet(b) {
      this.oneindex=b
      if (this.oneindex==0) {
        this.IsReply=1
      }
      else if (this.oneindex==1) {
        this.IsReply=0
      }
      this.theTaskInfo(this.twoindex)
    },
    checked(a) {
      this.twoindex=a
      if (this.twoindex==0) {
        this.state=0
        this.theTaskInfo( this.state)
      }
      else{
        this.state=1
        this.theTaskInfo( this.state)
      }
    },
    addrenwu(k) {
      var TaskTypeId
      if (k==0) {
        TaskTypeId=1
      }
      else if (k==1) {
        TaskTypeId=2
      }
      else {
        TaskTypeId=3
      }
       //把null的存到vuex里面
      this.$store.commit("taskman", null);
      this.$store.commit("thetime", {});
      this.$store.commit("TaskContent",null);
      this.$store.commit("theImages", []);
      this.$store.commit("theTaskTypeId", TaskTypeId);
      this.$router.push({
        path: "/pages/task/addTask",
        query: {
          TaskTypeId:TaskTypeId
        }
        });
    },
    // 定义一个方法，附带参数K
    async theTaskInfo(k) {
      var that = this;
      if (this.oneindex==0) {
        // 收到的任务
        var rep2 = await this.$UJAPI.Task_GetReplyTaskList({
          state: k
        });
        if (rep2.ret == 0) {
          this.TaskInfo = rep2.data;
        }
        else {
          this.toast(rep2.msg);
        }
      }
      else{
        // 用户发起的任务
        var rep = await this.$UJAPI.Task_List({
          state: k
        });
        if (rep.ret == 0) {
          this.TaskInfo = rep.data;
        }
        else {
          this.toast(rep.msg);
        }
      }
    }
  },
  computed:{
    finishedTaskInfo() {
      for(let i=0;i<this.TaskInfo.length;i++) {
        this.TaskInfo[i].thePlanReplyTime=new Date(this.TaskInfo[i].PlanReplyTime)
        // 差距多少分钟
          var daytime=(new Date(this.TaskInfo[i].PlanReplyTime)-this.nowtime)/1000/60
        if (this.TaskInfo[i].PlanReplyTime==this.shijian) {
          this.TaskInfo[i].thetime="无限制"
        }
        else {
          
          if (daytime<60) {
            this.TaskInfo[i].thetime=Math.floor(daytime)+"分钟"
          }
          else if (daytime>60&&daytime<1440) {
            this.TaskInfo[i].thetime=Math.floor(daytime/60)+"小时"
          }
          else{
            this.TaskInfo[i].thetime=Math.floor(daytime/60/60)+"天"
          }
        }
      }
      console.log(this.TaskInfo)
      return this.TaskInfo
    },
  },
  async mounted() {
    // 初始调用接口
    this.checked(this.twoindex)
  }
};
</script>
<style scoped>
.top {
  height: 1.28rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #12b7f5;
  /* justify-content: center */
}
.top_add {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
}
/*箭头向上*/
.to_top {
    width: 0;
    height: 0;
    border-bottom: 10px solid #fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: relative;
    top:1rem;
    left: 9rem;
}
.top_aa {
  float: right;
  margin-right: 0.2rem;
  margin-top: 1rem;
  background-color: #ffffff;
  opacity: 1;
}
.top_name {
  font-size: 0.43rem;
  color: #353535;
  margin: 0.48rem 0.7rem 0;
  padding-bottom: 0.48rem;
  border-bottom: 0.02rem solid #e8e8e8;
}
.top_name span{
  font-size: 0.53rem;
  margin-right: 0.25rem;
}
.indexBr .top .top_rttext {
  font-size: 0.45rem;
  color: #ffffff;
  line-height: 1.33rem;
  margin-left: 1.4rem
}

.indexBr .top .top_title2 {
  border: solid 0.02rem #ffffff;
  border-radius: 0.2rem;
  line-height: 0.87rem;
  font-size: 0.41rem;
  overflow: hidden;
  margin-left: 2.77rem;
}
 .top_title2_fqrw {
  color: #12b7f5!important;
  background-color: #ffffff!important;
}

.top_title2_fqrw2 {
  float: left;
  color: #ffffff;
  background-color: #12b7f5;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
.renwu_title {
  background-color: #ffffff;
  overflow: hidden;
}

.renwu_bt2 {
  color: #12b7f5!important;
  border-bottom: 0.03rem solid #12b7f5!important;
}
.renwu_bt1{
  float: left;
  color: #363636;
  border: 0;
  font-size: 0.48rem;
  width: 50%;
  text-align: center;
  line-height: 1.38rem;
}
.renwu_content {
  margin-bottom: 0.4rem;
  overflow: auto;
  /* padding-top: 1.33rem; */
}
.renwu_nr {
  background-color: #ffffff;
  /* margin-top: 0.4rem; */
  padding: 0 0.48rem;
  padding-bottom: 0.3rem;
  border-top: 0.29rem solid #f4f3f2;
}
.renwu_nr_dan {
  height: 1.28rem;
  line-height: 1.28rem;
  font-size: 0.4rem;
  color: #8c8c8c;
  overflow: hidden;
  border-bottom: 0.02rem solid #f2f2f2;
}
.tubiao {
  font-size: 0.55rem;
  float: left;
  margin-right: 0.23rem
}
.renwu_nr_header {
  overflow: hidden;
  padding: 0.58rem 0;
}
.renwu_img {
  width: 1.58rem;
  height: 1.58rem;
  float: left;
  margin-right: 0.57rem;
  border-radius: 0.1rem;
}
.renwu_nr_info {
  float: left;
  color: #999999;
  font-size: 0.37rem;
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
.thename{
  color: #000000;
  font-size: 0.49rem;
  margin-bottom: 0.2rem
}
 .renwu_hint {
  float: right;
  color: #12b7f5;
  font-size: 0.42rem;
}
.rewu_nr_qita {
  color: #363636;
  font-size: 0.42rem;
  margin-left: 2.2rem;
	border-radius: 0.06rem;
  border: 0.02rem solid #e8e8e8;
  padding: 0.3rem;
}
</style>
