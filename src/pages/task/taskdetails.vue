<template>
  <div>
    <div>
      <div class="top">
        <p>最迟答复时间：{{task_Get.repytime}}</p>
        <div class="neirong">{{task_Get.TaskContent}}</div>
        <div class="theimg">
          <img @click="yulan(item,index)" v-for="(item,index) in task_Get.TaskImages" :key="index" :src="item.ImageUrl" alt />
        </div>
      </div>
      <div v-if="IsReply==0" class="name">
        <span>发起人</span>
        <img :src="UserInfo.Portrait" alt />
        <div>
          <p class="nameone">{{UserInfo.UserName}}</p>
          <p>{{task_Get.CreateTime}}</p>
        </div>
      </div>
      <div v-if="IsReply==1" class="name">
        <span>发起人</span>
        <img :src="task_Get.Portrait" alt />
        <div>
          <p class="nameone">{{task_Get.UserName}}</p>
          <p>{{task_Get.CreateTime}}</p>
        </div>
      </div>
      
      <div class="bottom">
        <div v-if="task_Get.State==1">
          <p>
            <span v-if="IsReply==0">{{task_Get.UserName}}：</span>
            <span v-if="IsReply==1">{{UserInfo.UserName}}：</span>
            {{task_Get.ReplyContent}}
          </p>
          <div class="bottomimg">
            <img @click="look(index)" v-for="(item, index ) in task_Get.ReplyImages" :key="index" :src="item.ImageUrl" alt />
          </div>
        </div>
        <div v-else>暂无答复</div>
      </div>
    </div>
    <!-- 预览图片，切换图片 -->
      <BigImg :clickhit="clickhit" :indexx="theindex" :tupian="tupian"></BigImg>  
  </div>
</template>
<script>
import BigImg from "@/components/BigImg";
import { mapState } from "vuex";
export default {
  data() {
    return {
      task_Get: {},
      morentime: "1900-01-01",
      IsReply:1,
      clickhit:0,
      theindex:0,
      tupian:[],
      img:[]
    };
  },
  methods: {
    yulan(item,index) {
      this.theindex=index;
        this.clickhit++;
    },
    look(index) {
      this.theindex=index;
        this.clickhit++;
       this.tupian=this.img
    }
  },
   // 注册组件
  components: {
    BigImg,
  }, 
  computed:{
       ...mapState({
      UserInfo: state => state.User.UserInfo//获取当前用户的登录信息
    }),
  },
  async mounted() {
      console.log(this.UserInfo)
    var TaskId = this.$route.query.TaskId;
    this.IsReply = this.$route.query.IsReply;
    var ProjectId = this.$route.query.ProjectId;
    var that = this;
    var rep2 = await this.$UJAPI.task_Get({
      TaskId: TaskId,
      IsReply: this.IsReply,
      ProjectId: ProjectId
    });
    if (rep2.ret == 0) {
      this.task_Get = rep2.data;
      console.log(this.task_Get);
      for(let i=0;i<this.task_Get.TaskImages.length;i++) {
        this.tupian.push(this.task_Get.TaskImages[i].ImageUrl)
      }
      for(let i=0;i<this.task_Get.ReplyImages.length;i++) {
        this.img.push(this.task_Get.ReplyImages[i].ImageUrl)
      }
      if ((this.task_Get.PlanReplyTime == this.morentime)) {
        this.task_Get.repytime = "无限时";
      } else {
        var thetime = new Date(this.task_Get.PlanReplyTime);
        this.task_Get.repytime =
          thetime.getFullYear() +
          "年" +
          thetime.getMonth() +
          1 +
          "月" +
          thetime.getDate() +
          "号" +
          thetime.getHours() +
          "时" +
          thetime.getMinutes() +
          "分";
      }
    } else {
      this.toast(rep2.msg);
    }
  }
};
</script>
<style scoped>
.top {
  padding: 0.38rem 0.27rem;
}
.top p {
  color: #999999;
  font-size: 0.4rem;
}
.neirong {
  font-size: 0.5rem;
  color: #565656;
  margin-top: 0.78rem;
}
.theimg {
  margin-top: 1.9rem;
}
.theimg img {
  width: 3.2rem;
  height: 3.2rem;
  display: block;
  margin-right: 0.2rem;
  margin-top: 0.2rem;
  float: left;
}
.name {
  width: 10.79rem;
  height: 1.85rem;
  background-color: #ffffff;
  border-top: 0.02rem solid #e8e8e8;
  border-bottom: 0.02rem solid #e8e8e8;
  font-size: 0.37rem;
  color: #565656;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-top: 0.67rem;
  padding: 0 0.28rem;
}
.name img {
  width: 1.04rem;
  height: 1.04rem;
  border-radius: 0.07rem;
  margin: 0 0.28rem;
}
.nameone {
  padding-bottom: 0.22rem;
}
.bottom {
  width: 100%;
  min-height: 4rem;
  background-color: #f4f3f2;
  font-size: 0.43rem;
  color: #353535;
  padding: 0.7rem 0.3rem;
}
.bottom span {
  color: #2d68ae;
  margin-right: 0.3rem;
}
.bottomimg img {
  width: 2.4rem;
  height: 2.4rem;
  margin-top: 0.2rem;
  margin-right: 0.16rem;
  float: left;
}
</style>