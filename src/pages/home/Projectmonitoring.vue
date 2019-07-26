<template>
  <div class="project">
    <div class="projectlist">
      <ul v-for="(item,index) in ProjectMonitoringVideo" :key="index">
        <li>
          <video controls>
            <source :src="item.MonitoringVideoURL" type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
          </video>
        </li>
        <li>{{item.Title}}</li>
      </ul>
    </div>
    <div v-if="showexplain" class="explain">
      <img @click="clickexplain" src="/static/images/off.png" alt />
      <p>u建将为你提供更专业的720全景服务，如有需要，欢迎照下面操作与我们联系。我们将在最短时间内进行回复。并且竭力提供最优良的服务</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showexplain: true,
      ProjectMonitoringVideo: []
    };
  },
  methods: {
    clickexplain() {
      this.showexplain = false;
    }
  },
  async mounted() {
    var that = this;
    var rep = await this.$UJAPI.Project_MonitoringVideo({
      Projectid: this.$route.query.ProjectId
    });
    if (rep.ret == 0) {
      this.ProjectMonitoringVideo = rep.data;
    }
    
  }
};
</script>

<style scoped>
.projectlist {
  width: 100%;
  overflow: hidden;
  margin-top: 0.4rem;
  margin-left: 0.4rem;
}
.projectlist ul {
  float: left;
  /* overflow: hidden; */
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.projectlist video {
  height: 4.5rem;
  width: 4rem;
  margin-top: 0.1rem;
}
.projectlist li {
  font-size: 0.4rem;
  text-align: center;
}
.explain {
  margin-top: 0.8rem;
  border-top: #e8e8e8 solid 0.01rem;
  border-bottom: #e8e8e8 solid 0.01rem;
}
.explain img {
  width: 0.8rem;
  height: 0.8rem;
  float: right;
  padding-top: 0.2rem;
  padding-right: 0.2rem;
  padding-bottom: 0.2rem;
  overflow: hidden;
}
.explain p {
  float: left;
  color: #8c8c8c;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding-bottom: 0.3rem;
}
</style>
