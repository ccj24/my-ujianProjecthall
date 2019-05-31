<template>
  <div>
    <div class="userMessage">
      <img :src="ProjectLogViewModel.Portrait">
      <ul>
        <li style="color: #353535;">{{ProjectLogViewModel.CreatorName}}</li>
        <li style="color: #8c8c8c;">{{ProjectLogViewModel.DepartmentName}}{{ProjectLogViewModel.PostName}}</li>
      </ul>
    </div>
    <div class="time">
      <img src="/static/images/Clock.png">
      <p>{{ProjectLogViewModel.CreateTimeFormat}}</p>
    </div>
    <div class="Logpicture">
      <img :src="ProjectLogViewModel.Images">
    </div>
    <div class="content">
      {{ProjectLogViewModel.LogContent}}
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
        LogId:this.$route.query.LogId,
    });
    console.log(rep)
    if(rep.ret==0){
     this.ProjectLogViewModel=rep.data;
    }
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
  margin-left: 0.2rem;
  margin-top: 0.5rem;
}
.Logpicture img {
  width: 3.36rem;
  height: 3.34rem;
  margin-right: 0.2rem;
}
.content {
  padding: 0.5rem 0.3rem 0.45rem 0.2rem;
  color: #353535;
  font-size: 0.42rem;
}
</style>
