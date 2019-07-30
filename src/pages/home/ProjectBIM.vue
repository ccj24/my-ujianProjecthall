<template>
  <!-- 项目图片 -->
  <div class="projectprint">
    <div class="showprint">
      <!--  v-for="(itemm,index) in ProjectBIMVideo" :key="index" -->
      <ul class="article"  v-for="(item,index) in ProjectBIMVideo" :key="index">
        <li>
          <video controls>
            <source :src="item.BIMVideoURL" type="video/mp4">
          </video>
        </li>
        <li class="linkman">{{item.Title}}</li>
      </ul>
    </div>
    <!-- 资金计划 -->
    <div class="fundplan">
      <div class="Modelroaming">
        <div style=" display:inline;float:left;width: 4.8rem">
          <img src="/static/images/Podium.png">
          <p>模型漫游</p>
        </div>
        <div style="float: right;width: 4.8rem; display:inline;">
          <img src="/static/images/preferences.png">
          <p>部队检索</p>
        </div>
      </div>
      <div class="projectprint">
        <div class="redpacket">
          <p class="navigation">资金计划</p>
          <p style="padding-right: 0.34rem;">更多</p>
          <img src="/static/images/details.png">
        </div>
        <div class="fundplanlist">
          <ul>
            <li style="float:left">139.5万元</li>
            <li style="float:right;">6月15日</li>
          </ul>
          <ul>
            <li style="float:left">93.3万元</li>
            <li style="float:right;">6月17日</li>
          </ul>
          <ul>
            <li style="float:left">254.6万元</li>
            <li style="float:right;">7月09日</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 物质计划 -->
    <div class="fundplan">
      <div class="projectprint">
        <div class="redpacket">
          <p class="navigation">物质计划</p>
          <p style="padding-right: 0.34rem;">更多</p>
          <img src="/static/images/details.png">
        </div>
        <div class="fundplanlist">
          <ul>
            <li style="float:left">钢筋:15吨</li>
            <li style="float:right;">7月12日</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ProjectBIMVideo: []
    };
  },
  async mounted() {
    var that = this;
    var rep = await this.$UJAPI.Project_BIMVideo({
      Projectid: "70057154-a003-4815-b247-0fe887ab4469"
    });
    if (rep.ret == 0) {
      this.ProjectBIMVideo = rep.data;
    }
   
  }
};
</script>


<style scoped>
.projectprint {
  margin-top: 0.15rem;
  margin-bottom: 0.15rem;
}
.article {
  margin: 0.15rem 0.25rem 0.1rem 0.3rem;
  float: left;
}
.article video {
  width: 4.8rem;
  height: 3.28rem;
}
.linkman {
  font-size: 0.42rem;
  color: #565656;
  text-align: center;
}
.redpacket img {
  width: 0.16rem;
  height: 0.28rem;
}
.redpacket p {
  float: left;
  color: #8c8c8c;
}
.redpacket {
  font-size: 0.42rem;
  line-height: 0.98rem;
  border: solid 0.01rem #e8e8e8;
}
.navigation {
  float: left;
  font-size: 0.46rem !important;
  padding-right: 7.1rem;
  padding-left: 0.26rem;
}
.showprint {
  background-color: #ffffff;
  overflow: hidden;
}
.fundplan {
  font-size: 0.42rem;
  color: #565656;
  background-color: #ffffff;
  margin-top: 0.3rem;
}
.Modelroaming img {
  width: 0.5rem;
  height: 0.5rem;
  float: left;
  padding-right: 0.2rem;
}
.Modelroaming {
  padding: 0.3rem 0.5rem 0.9rem 1.5rem;
}
.fundplanlist ul {
  border-bottom: solid 0.01rem #e8e8e8;
  overflow: hidden;
  padding: 0.25rem 0.3rem 0.25rem 0.26rem;
}
</style>
<style>
page {
  background-color: #ecf0f1;
}
</style>