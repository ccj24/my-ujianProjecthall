<template>
  <div>
    <!-- 头部按钮 -->
    <div class="halltop">
      <button @click="go({path:'/pages/Login/newproject'})" class="btn" style="background-color: #ffc539;float:left;margin-right:2rem;">新建项目</button>
      <button @click="go({path:'/pages/Login/Addproject'})" style="background-color: #12b7f5;" class="btn">加入项目</button>
    </div>
    <!-- 自建项目 -->
    <div class="Self-built">
      <div class="projectsort" style="overflow: hidden;">
        <img src="/static/images/oneself.png" alt>
        <p style="float:left;">自建项目</p>
        <p @click="go({path:'/pages/Login/selfbuilt-project'})" style="float:right;padding-right: 0.46rem">查看全部</p>
      </div>
      <ul v-for="(item,index) in ProjectList" :key="index">
        <li @click="go({path:'/pages/home/index',isTab: true})" style="overflow: hidden;">
          <p style="float:left;padding-right:1.2rem;">{{item.ProjectName}}</p>
          <img  style="float:right;" src="/static/images/details.png">
        </li>
      </ul>
    </div>

    <!-- 已加项目 -->
    <div class="Self-built">
      <div class="projectsort" style="overflow: hidden;">
        <img src="/static/images/heBuilt.png" alt>
        <p style="float:left;">已加项目</p>
        <p @click="go({path:'/pages/Login/Hebuiltproject'})" style="float:right;padding-right: 0.46rem">查看全部</p>
      </div>
      <ul v-for="(item,index) in othersProjectList" :key="index">
        <li @click="go({path:'/pages/home/index',isTab: true})" style="overflow: hidden;">
          <p style="float:left">{{item.ProjectName}}</p>
          <img style="float:right;" src="/static/images/details.png">
        </li>
      </ul>
    </div>

    <!-- 项目信息 -->
    <div class="Self-built" @click="go({path:'/pages/Login/Projectmessage'})">
      <div class="projectsort" style="overflow: hidden;">
        <img src="/static/images/bubble.png" alt>
        <p style="float:left;">项目信息</p>
        <img class="added" style="float:right;" src="/static/images/details.png">
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      ProjectList: [],
      othersProjectList: []//加入他建项目
    };
  },

  async mounted() {
    console.log("项目主页mounted")
    //自建项目请求
    var rep = await this.$UJAPI.Project_ProjectGetList({
      IsCreate: true,
      PageSize: 4
    });
    if (rep.ret == 0) {
      this.ProjectList = rep.data;
    }
    // 加入他建项目
    var res = await this.$UJAPI.Project_ProjectGetList({
      IsCreate: false,
      PageSize: 4
    });
    if (res.ret == 0) {
      this.othersProjectList = res.data;
    }
  }
};
</script>

<style scoped>
.halltop {
  background-color: #ffffff;
  height: 2rem;
  overflow: hidden;
}
.btn {
  width: 2.96rem;
  margin-top: 0.37rem;
  margin-left: 1.5rem;
  border-radius: 0.16rem;
  color: #ffffff;
  font-size: 0.48rem;
}
.Self-built {
  background-color: #ffffff;
  margin-top: 0.2rem;
  padding-top: 0.29rem;
  padding-bottom: 0.29rem;
  padding-left: 0.2rem;
  font-size: 0.46rem;
}
.Self-built p {
  line-height: 0.6rem;
}
.Self-built img {
  width: 0.6rem;
  height: 0.6rem;
  float: left;
  padding-right: 0.2rem;
  padding-bottom: 0.4rem;
}
.projectsort {
  color: #565656;
}
.Self-built ul {
  padding-top: 0.29rem;
  padding-left: 0.8rem;
  border-top: solid 0.05rem #f2f2f2;
}
.Self-built ul li img {
  height: 0.4rem;
  width: 0.4rem;
}
.added {
  width: 0.4rem !important;
  height: 0.4rem !important;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>
