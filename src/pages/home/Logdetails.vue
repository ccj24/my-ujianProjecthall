<template>
  <div>
    <!-- 日志联系人 -->
    <div class="userMessage">
      <img :src="ProjectLogViewModel.Portrait">
      <ul>
        <li style="color: #353535;">{{ProjectLogViewModel.CreatorName}}</li>
        <li style="color: #8c8c8c;">{{ProjectLogViewModel.DepartmentName}}{{ProjectLogViewModel.PostName}}</li>
      </ul>
    </div>
    <!-- 发表日志的时间 -->
    <div class="time">
      <img src="/static/images/Clock.png">
      <p>{{ProjectLogViewModel.CreateTimeFormat}}</p>
    </div>

    <!-- 日志凭证 -->
    <div class="Logpicture" v-for="(item,index) in ProjectLogViewModel.Images" :key="index">
      <img :src="item">
    </div>

    <!-- 日志内容 -->
    <div class="content">{{ProjectLogViewModel.LogContent}}</div>

    <!-- 发表评论 -->
    <div class="comment">
      <img src alt>
      <p>评论</p>
    </div>

    <!-- 评论集合  v-if="ProjectLogViewModel.CommentList.length>0"-->
    <div class="commentdetails">
      <div style="margin-bottom: 0.2rem;" v-for="(item,index) in ProjectLogViewModel.CommentList" :key="index">
        <p>{{item.Commentator_R}}:{{item.CommentContent}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ProjectLogViewModel: {}
    };
  },
  computed: {},
  async mounted() {
    var that = this;
    var rep = await this.$UJAPI.Project_ProjectLog({
      LogId: this.$route.query.LogId
    });
    if (rep.ret == 0) {
      this.ProjectLogViewModel = rep.data;
    }
    console.log(this.ProjectLogViewModel.CommentList);
  }
};
</script>


<style scoped>
.userMessage {
  border-bottom: solid 0.01rem #e8e8e8;
  height: 1.5rem;
  font-size: 0.42rem;
}
.userMessage img {
  height: 1rem;
  width: 1rem;
  margin: 0.25rem 0.2rem 0 0.2rem;
  float: left;
  overflow: hidden;
}
.userMessage ul {
  padding-top: 0.3rem;
  float: left;
  overflow: hidden;
}
.time {
  padding-top: 0.6rem;
  color: #565656;
}
.time p {
  line-height: 0.53rem;
  font-size: 0.46rem;
}
.time img {
  width: 0.53rem;
  height: 0.53rem;
  float: left;
  overflow: hidden;
  margin: 0 0.5rem 0 0.2rem;
}
.Logpicture {
  width: 10.8rem;
  margin-left: 0.2rem;
  margin-top: 0.5rem;
}
.Logpicture img {
  width: 3.36rem;
  height: 3.34rem;
  margin-right: 0.2rem;
  float: left;
  margin-bottom: 0.2rem;
  overflow: hidden;
}
.content {
  padding: 0.5rem 0.3rem 0.45rem 0.2rem;
  color: #353535;
  font-size: 0.42rem;
  clear: both;
}
.comment {
  float: right;
  overflow: hidden;
  width: 2rem;
}
.comment p {
  line-height: 0.5rem;
}
.comment img {
  width: 0.5rem;
  height: 0.5rem;
  float: left;
  background-color: blue;
}
.commentdetails {
  clear: both;
  font-size: 0.42rem;
  padding-left: 0.2rem;
  background-color: #ecf0f1;
  margin-top: 0.1rem;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
</style>
