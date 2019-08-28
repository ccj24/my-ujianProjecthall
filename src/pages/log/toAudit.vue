<template>
  <!-- 日志内容 -->
  <div>
    <div class="particulars" v-for="(item,index) in ProjectLog" :key="index">
      <div class="particulars_one">
        <img :src="item.Portrait" />
        <div class="information">
          <p class="name">{{item.CreatorName}}</p>
          <div class="bumen">
            <span>{{item.DepartmentId}}</span>
            <span>{{item.PostId}}</span>
          </div>
          <span class="zhuangtai" style="color: #12b7f5;" @click="goaudit(item.LogId)">去审核></span>
        </div>
      </div>
      <div class="content">
        <p>{{item.LogContent}}</p>
        <div class="picture">
          <img v-for="(items,indexs) in ProjectLog.Images" :key="indexs" :src="items" />
        </div>
        <div class="time">{{item.CreateTime}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ProjectLog: {} //定义日志
    };
  },
  async mounted() {
    var that = this;
    //获取日志接口
    var rep = await this.$UJAPI.Project_GetList({
      Projectid: this.ProjectId,
      // 待审核日志，QueryType:3
      QueryType: 3,
      // Audit:0,
    });
    if (rep.ret == 0) {
      this.ProjectLog = rep.data;
    }
    console.log(this.ProjectLog);
  },
  methods: {
    goaudit(LogId) {
      // 传参
      this.$router.push({
        path: "/pages/log/auditLog",
        query: {
          LogId: LogId
        }
      });
    }
  }
};
</script>
<style scoped>
.particulars {
  padding-left: 0.28rem;
  background-color: #ffffff;
  margin-bottom: 0.29rem;
}
.particulars_one {
  overflow: hidden;
  padding-top: 0.33rem;
}
.particulars_one img {
  width: 1.18rem;
  height: 1.18rem;
  background-color: #000000;
  border-radius: 0.05rem;
  float: left;
}
.information {
  margin-left: 1.32rem;
  overflow: hidden;
  position: relative;
}
.name {
  font-size: 0.46rem;
  color: #353535;
}
.bumen {
  overflow: hidden;
}
.bumen span {
  font-size: 0.37rem;
  color: #353535;
  padding-right: 0.5rem;
}
.zhuangtai {
  font-size: 0.37rem;
  color: #353535;
  position: absolute;
  right: 0.7rem;
  top: 0.36rem;
}
.content {
  margin-top: 0.88rem;
  overflow: hidden;
}
.content p {
  font-size: 0.43rem;
  line-height: 0.44rem;
  color: #353535;
  margin-right: 0.61rem;
}
.picture {
  padding-top: 0.33rem;
}
.picture img {
  width: 3.38rem;
  height: 3.37rem;
  padding-left: 0.03rem;
}
.time {
  font-size: 0.37rem;
  line-height: 1.09rem;
  color: #8c8c8c;
  float: right;
  padding-right: 0.28rem;
}
</style>