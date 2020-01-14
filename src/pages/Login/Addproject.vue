<template>
  <div class="Addproject">
    <!-- 获取项目列表 -->
    <div class="searchmessage">
      <input v-model="projectNO" type="number"/>
      <label class="marked">填写项目编号：</label>
      <img class="searchico" src="/static/images/Search.png" />
    </div>
    <!-- 输入框没输入数字的状态 灰色-->
    <button v-if="!projectNO" class="btn">搜索项目</button>
    <!-- 输入框输入数字的状态 蓝色-->
    <button v-else class="alterbtn" @click="searchproject">搜索项目</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ProjectListView: [],
      projectNO:null
    };
  },
  methods: {
    // 项目搜索
    async searchproject() {
      var that = this;
      // Project_ProjectGetList 获取项目列表
      var rep = await this.$UJAPI.Project_ProjectGetList({
        ProjectNo: this.projectNO
      });
      if (rep.ret == 0) {
        this.ProjectListView = rep.data;
        // 判断数组里面是否有 输进项目编号的这个项目  有的话就跳转到项目概况页面  没有就提示
        if (this.ProjectListView.length > 0) {
          // 实现页面跳转
          this.$router.push({
            path: "/pages/Login/Projectsituation",
            query: { ProjectId: this.ProjectListView[0].ProjectId,Role: this.ProjectListView[0].Role }
          });
        }
        //数组中没有想要的项目 弹窗提示
        else {
          this.toast("找不到项目编号对应的项目信息。")
        }
      }
    }
  }
};
</script>


<style scoped>
.Addproject {
  padding-top: 0.3rem;
}
.searchmessage {
  background-color: #ffffff;
  position: relative;
  margin-bottom: 0.72rem;
}
.searchmessage input {
  padding-top: 0.52rem;
  padding-left: 3.8rem;
  font-size:0.46rem;
  width: 50%;
}
.btn,.alterbtn {
  background-color: #d7d7d7;
  color: #ffffff;
  border-radius: 0.1rem;
  width: 10rem;
  border: none;
  display: block;
  margin: auto;
  padding: 0.43rem 0;
  font-size: 0.52rem;
}
.alterbtn {
  background-color: #12b7f5;
  color: #ffffff;
}
.marked {
  position: absolute;
  top: 0.52rem;
  padding-left: 0.2rem;
  font-size:0.46rem;
  font-size: 0.5rem;
}
.searchico {
  position: absolute;
  top: 0.52rem;
  right: 0.46rem;
  height: 0.6rem;
  width: 0.6rem;
}

</style>


<style>
page {
  background-color: #ecf0f1;
}
/* body{
  position: fixed;
  top: 0;
  left: 0;
} */
</style>