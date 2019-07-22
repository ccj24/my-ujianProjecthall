<template>
  <!-- 项目图片 -->
  <div class="projectprint">
    <div class="showprint">
      <ul
        @click="go({path:'/pages/home/Logdetails',query:{LogId:item.LogId}})"
        class="article"
        v-for="(item,index) in Projectpicture"
        :key="index"
      >
        <li v-if="item.Images.length>0">
          <img :src="item.Images[0]" />
        </li>
        <li class="realtime">{{item.CreateTimeFormat}}</li>
        <li class="linkman">{{item.CreatorName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Projectid: null,
      Projectpicture: []
    };
  },

  async mounted() {
    //获取项目图片
    var that = this;
    // this.$route.query.ProjectId接收项目id传过来的参数
    var res = await this.$UJAPI.Project_GetList({
      Projectid: this.$route.query.ProjectId,
      QueryType: 4
    });
    if (res.ret == 0) {
      this.Projectpicture = res.data;
    }
   
  }
};
</script>


<style scoped>
.projectprint {
  background-color: #ffffff;
  margin-top: 0.15rem;
  margin-bottom: 0.15rem;
}
.article {
  margin: 0.21rem 0.15rem 0.1rem 0.2rem;
  float: left;
}
.article img {
  width: 3.28rem;
  height: 3.28rem;
}
.linkman {
  font-size: 0.42rem;
  color: #565656;
  text-align: center;
}
.realtime {
  width: 3.28rem;
  height: 0.56rem;
  background-color: #000000;
  opacity: 0.48;
  color: #565656;
  font-size: 0.36rem;
  position: relative;
  text-align: center;
  margin-top: -0.7rem;
}
.showprint {
  background-color: #ffffff;
  overflow: hidden;
}
</style>
