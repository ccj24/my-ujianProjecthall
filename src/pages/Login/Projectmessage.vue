<template>
  <div class="Projectmessage">
    <!-- 项目消息 -->
    <div class="inform" v-for="(item,index) in MemberApplyLog" :key="index">
      <p style="color: #353535;">{{item.ProjectName}}</p>
      <div style="color:#c7c7cd;overflow: hidden;padding-top: 0.2rem;">
        <p style="float:left;overflow: hidden;">你申请加入</p>
        <p style="float:right;padding-right: 0.3rem;">{{['未处理', '通过', '拒绝','已过期'][item.State]}}</p>
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
  async mounted() {
    // 获取与用户有关的申请记录。包括他人申请加入你管理的项目，你申请加入别人的项目
    var rep = await this.$UJAPI.Project_MemberApply({
      PageIndex:2,
      PageSize:7
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
</style>
