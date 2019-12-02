<template>
  <div class="Projectmessage">
    <!-- 项目消息 -->
    <div class="inform" v-for="(item,index) in MemberApplyLog" :key="index">
      <p style="color: #353535;">{{item.ProjectName}}</p>
      <div style="color:#c7c7cd;overflow: hidden;padding-top: 0.2rem;">
        <p v-if="item.Type==1">
          <span style="float:left;overflow: hidden;color: #12b7f5;"></span>
          <span style="float:left;overflow: hidden;">您申请加入项目</span>
        </p>
        <p v-else-if="item.Type==2">
          <span style="float:left;overflow: hidden;color: #12b7f5;">{{item.UserName}}·</span>
          <span style="float:left;overflow: hidden;">邀请您加入项目</span>
        </p>
        <p v-else-if="item.Type==3">
          <span style="float:left;overflow: hidden;color: #12b7f5;">{{item.UserName}}·</span>
          <span style="float:left;overflow: hidden;">申请加入项目</span>
        </p>
        <p v-else-if="item.Type==4">
          <span style="float:left;overflow: hidden;">邀请·</span>
          <span style="float:left;overflow: hidden;color: #12b7f5;">{{item.UserName}}·</span>
          <span style="float:left;overflow: hidden;">加入项目</span>
        </p>
        <p style="float:right;padding-right: 0.3rem" v-if="item.State==0&&(item.Type==2||item.Type==3)">
          <button class="stn pass" style="float:left;" @click="PassSetState(item)">接受</button>
          <button class="stn refuse" @click="RefuseSetState(item)">拒绝</button>
        </p>
        <!-- 判断当item.State==1 状态为通过 -->
        <p style="float:right;padding-right: 0.3rem;" v-else-if="item.State==1">已通过</p>
        <!-- 判断当item.State==2 状态为已拒绝 -->
        <p style="float:right;padding-right: 0.3rem;" v-else-if="item.State==2">已拒绝</p>
      </div>
      <div style="color:#c7c7cd;padding-top: 0.2rem;">
        <p style="float:left;padding-right: 1.2rem;overflow: hidden;">部门：{{item.DepartmentName}}</p>
        <p>职位：{{item.PostName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MemberApplyLog: []
    };
  },
  methods:{
    // 项目成员申请通过
   async PassSetState(item){
      var that=this;
      var rep=await this.$UJAPI.ProjectMemberApply_SetState({
        State:1,
        Id:item.Id
      })
      // 请求接口成功，直接改变State的值，让界面显示点击按钮后执行的后果 点击接收后的按钮  界面改变State值  显示同意
      if(rep.ret==0){
        item.State=1
      }
    },
  // 项目成员申请拒绝
    async RefuseSetState(item){
      var that=this;
      var rep=await this.$UJAPI.ProjectMemberApply_SetState({
        State:2,
        Id:item.Id
      })
      // 请求接口成功，直接改变State的值，让界面显示点击按钮后执行的后果 点击拒绝后的按钮  界面改变State值  显示已拒绝
       if(rep.ret==0){
        item.State=2
      }
    },
  },
  async mounted() {
    // 获取与用户有关的申请记录。包括他人申请加入你管理的项目，你申请加入别人的项目
    var rep = await this.$UJAPI.Project_MemberApply({
      PageIndex: 1,
    });
    if (rep.ret == 0) {
      this.MemberApplyLog = rep.data;
    }
  }
};
</script>


<style scoped>
.inform {
  font-size: 0.46rem;
  padding-top: 0.29rem;
  padding-left: 0.2rem;
  border-bottom: solid 0.04rem #e8e8e8;
  padding-bottom: 0.2rem;
}
.stn {
  width: 1.65rem;
  height: 0.86rem;
  font-size: 0.37rem;
  border-radius: 0.1rem;
  color: #ffffff;
}
.pass {
  background-color: #12b7f5;
  margin-right: 0.2rem;
}
.refuse {
  background-color: #ff3b30;
  border: none;
}
</style>
