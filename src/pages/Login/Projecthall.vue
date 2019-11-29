<template>
  <div>
    <!-- 头部按钮 -->
    <div class="halltop">
      <button
        @click="go({path:'/pages/Login/newproject'})"
        class="btn"
        style="background-color: #ffc539;"
      >新建项目</button>
      <button
        @click="go({path:'/pages/Login/Addproject'})"
        style="background-color: #12b7f5;margin-left:0.3rem;"
        class="btn"
      >加入项目</button>
    </div>
    <!-- 自建项目 -->
    <div class="Self-built">
      <div class="projectsort" style="overflow: hidden;">
        <img src="/static/images/oneself.png" alt />
        <p style="float:left;">自建项目</p>
        <p
          @click="go({path:'/pages/Login/selfbuilt-project'})"
          style="float:right;padding-right: 0.46rem"
        >查看全部</p>
      </div>
      
      <div v-if="ProjectList.length>0">
        <ul v-for="(item,index) in ProjectList" :key="index" v-if="index<5">
          <li @click="goProject(item.ProjectId)" style="overflow: hidden;">
            <p class="projectname" style="float:left;">{{item.ProjectName}}</p>
            <img class="skipico" style="float:right;" src="/static/images/details.png" />
          </li>
        </ul>
      </div>
      <div v-else class="hint">您暂时没有自建项目</div>
    </div>

    <!-- 已加项目 -->
    <div class="Self-built">
      <div class="projectsort" style="overflow: hidden;">
        <img src="/static/images/heBuilt.png" alt />
        <p style="float:left;">已加项目</p>
        <p
          @click="go({path:'/pages/Login/Hebuiltproject'})"
          style="float:right;padding-right: 0.46rem"
        >查看全部</p>
      </div>
      <div v-if="othersProjectList.length>0">
        <ul v-for="(item,index) in othersProjectList" :key="index" v-if="index<5">
          <li @click="goProject(item.ProjectId)" style="overflow: hidden;">
            <p class="projectname" style="float:left">{{item.ProjectName}}</p>
            <img class="skipico" style="float:right;" src="/static/images/details.png" />
          </li>
        </ul>
      </div>
      <div v-else class="hint">您暂无加入的项目！</div>
    </div>

    <!-- 项目信息 -->
    <div class="Self-built" @click="go({path:'/pages/Login/Projectmessage'})">
      <div class="projectsort" style="overflow: hidden;">
        <img src="/static/images/bubble.png" alt />
        <p style="float:left;">项目信息</p>
        <div style="float:right;">
          <!-- 用户项目申请数NewProjectRemind 大于0时候显示 -->
          <div
            class="messagequantity"
            v-if="UserRemind.NewProjectRemind>0"
          >{{UserRemind.NewProjectRemind}}</div>
          <img class="added" src="/static/images/details.png" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      UserRemind: "",
      ProjectList: [],
      othersProjectList: [] //加入他建项目
    };
  },
  methods:{
    show(item){
      this.$router.push({path:'/pages/home/index',isTab: true});
    }
  },

  // 把请求放在onShow 事件 这样让回退也会触发改变值
  async onShow() {
  },

   mounted() {
      this.wx_login( async ()=>{
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
        PageIndex: 1,
        PageSize: 4
      });
      if (res.ret == 0) {
        this.othersProjectList = res.data;
      }

      // 获取用户消息提醒总数
        var res2 = await this.$UJAPI.User_GetUserRemind({});
        if (res2.ret == 0) {
          this.UserRemind = res2.data;
        }
    }) 
  }
};
</script>

<style scoped>
.halltop {
  background-color: #ffffff;
  /* height: 2rem; */
  overflow: hidden;
  text-align: center;
  font-size: 0px;
  padding-top: 0.3rem;
}
.btn::after{
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
}
.btn {
  width: 2.96rem;
  /* margin-top: 0.37rem;
  margin-left: 1.5rem; */
  border-radius: 0.16rem;
  color: #ffffff;
  font-size: 0.48rem;
  border: none;
  display: inline-block;
  line-height:1rem;
}
.Self-built {
  color: #12b7f5;
  background-color: #ffffff;
  /* margin-top: 0.2rem; */
  padding-top: 0.62rem;
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
  margin-top: 0.2rem;
  width: 0.3rem !important;
  height: 0.3rem !important;
  margin-right: 0.41rem;
}
.messagequantity {
  float: left;
  font-size: 0.4rem;
  width: 0.6rem;
  height: 0.6rem;
  background-color: #ff0000;
  color: #e9e8e8;
  border-radius: 50%;
  text-align: center;
  padding-top: 0.1rem;
  margin-right: 0.2rem;
}
.hint {
  padding-top: 1.2rem;
  height: 2.5rem;
  text-align: center;
  color: #c7c7cd;
}
.skipico {
  height: 0.3rem  !important;
  width: 0.3rem  !important;
}
.projectname {
  width: 9rem;
  /* 文字超出一行，省略超出部分，显示'...' */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>
