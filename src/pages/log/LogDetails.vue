<template>
  <div>
    <div class="particulars">
      <div class="particulars_one">
        <img :src="ProjectLog.Portrait" />
        <div class="information">
          <p class="name">{{ProjectLog.CreatorName}}</p>
          <div class="bumen">
            <p>{{ProjectLog.DepartmentName}}</p>
            <p>{{ProjectLog.PostName}}</p>
          </div>
          <div v-if="ProjectLog.Audit==-1">
          <span class="nopass">未通过</span>
          <div class="bianji" @click="compile()">编辑</div>
          </div>
        </div>
      </div> 
      <div v-if="ProjectLog.Audit==-1" class="fenge"></div>
      <!-- 不通过理由 -->
      <div class="liyou" v-if="ProjectLog.Audit==-1">
        <p>备注信息</p>
        <span>{{ProjectLog.AuditMsg}}</span>
      </div>
      <div class="particulars_bottom">
        <div class="title">
          <p>{{ProjectLog.ProjectName}}</p>
        </div>
        <div class="time">
          <!-- <div class="tubiao"></div> -->
          <img src="/static/images/Clock@3x.png" alt="">
          <div class="riqi">{{ProjectLog.CreateTimeFormat}}</div>
        </div>
        <div class="photo">
          <!-- index是一个索引 -->
          <img v-for="(item,index) in  ProjectLog.Images "  :key="index"  :src="item" @click="yulan(item,index)" />
          <!-- 预览图片，切换图片 -->
        <BigImg :clickhit="clickhit" :indexx="index" :tupian="tupian"></BigImg>
        </div>
        <div class="input">
          {{ProjectLog.LogContent}}
        </div>
        <!-- 评语 -->
        <div class="remark">
          <div class="remark_box" v-for="(itemx,indexx) in ProjectLog.CommentList" :key="indexx">
            <span class="remark_name">{{itemx.Commentator_R}}
              <span v-if="itemx.ReplyId !=null">回复 {{itemx.ReplyName}}</span>:
            </span>
            <span class="remark_word">{{itemx.CommentContent}}</span>
            <span class="remark_time">{{itemx.CommentTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BigImg from "@/components/BigImg";
export default {
  data() {
    return {
      ProjectLog :{},//项目日志（名字自己命名）
      tupian:[],
      index:0,
      clickhit:0
    };
  },
  methods: {
     // 预览图片
    yulan(item,index) {
      this.index=index;
      this.clickhit++;
    },
    compile() {
      this.$router.push({
        path: "/pages/log/writeLog",
        query: {
          LogId: this.ProjectLog.LogId,
        }
      });
    }
  },
       // 注册组件
  components: {
    BigImg
  },
  // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  async mounted() {
    var that=this;
    //rep代表请求获取项目日志详情接口数据
    var rep=await this.$UJAPI.Project_ProjectLog({
      // logid当前所点击的日志Id
      LogId:this.$route.query.LogId,
      Projectid: this.ProjectId
    })
    // 当ret=0时，代表请求项目日志接口成功，然后把请求回来的数据赋值给ProjectLog。
   if (rep.ret==0) {
    //  this就是整个vue，比如下访问return下面定义的东西，不加this则访问不到
     this.ProjectLog=rep.data
     this.tupian=this.ProjectLog.Images
   }
   else{
     this.toast(rep.msg)
   }
  }
};
</script>
<style scoped>
.particulars_one {
  margin-left: 0.29rem;
  margin-top: 0.46rem;
  margin-bottom: 0.46rem;
  overflow: hidden;
}
.particulars_one img {
  width: 1.06rem;
  height: 1.06rem;
  background-color: #000000;
  border-radius: 0.05rem;
  float: left;
}
.information {
  /* height: 1.06rem; */
  margin-left: 1.32rem;
  padding-top: 0rem;
  position: relative;
}
.name {
  font-size: 0.46rem;
  color: #353535;
}
.bumen {
  overflow: hidden;
}
.bumen p {
  float: left;
  font-size: 0.37rem;
  color: #353535;
  padding-right: 0.5rem;
}
.nopass {
  font-size: 0.37rem;
  color: #353535;
  position: absolute;
  top: 0.33rem;
  left: 6.1rem;
}
.bianji {
  width: 1.34rem;
	height: 0.87rem;
  text-align: center;
  line-height: 0.87rem;
  font-size: 0.37rem;
  color: #ffffff;
	background-color: #12b7f5;
	border-radius: 0.1rem;
    position: absolute;
  top: 0.1rem;
  left: 7.5rem;
}
.fenge {
  width: 100%;
	height: 0.29rem;
  background-color: #f4f3f2;
}

.liyou {
  margin-top: 0.3rem;
  padding: 0.37rem 0.3rem 0.5rem;
}
.liyou p {
  font-size: 0.4rem;
  color: #dd2727;
  height: 0.8rem;
}
.liyou span {
  font-size: 0.43rem;
  color: #353535;
}
.particulars_bottom {
  width: 100%;
  border-top: 0.01rem solid #e8e8e8;
}
.title {
  margin-top: 0.73rem;
  margin-left: 0.25rem;
  overflow: hidden;
}
.title p {
  font-size: 0.49rem;
  color: #353535;
  float: left;
  padding-left: 0.1rem;
}
.time {
  margin-left: 0.35rem;
  margin-top: 0.26rem;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.time img {
  width: 0.33rem;
  height: 0.33rem;
  /* background-color: #999999; */
  float: left;
}
.riqi {
  font-size: 0.35rem;
  color: #565656;
  padding-left: 0.27rem;
}
.photo {
  overflow: hidden;
  margin-top: 0.71rem;
  margin-left: 0.27rem;
}
.photo img {
  float: left;
  width: 3.4rem;
  height: 3.37rem;
  padding-right: 0.02rem;
}
.photo img:nth-child(3n) {
  padding-right: 0rem;
}
.input {
  font-size: 0.43rem;
  line-height: 0.63rem;
  color: #353535;
  margin: 0.39rem 0.39rem auto 0.39rem;
}

.remark {
  margin: 0.36rem;
  background-color: #f2f2f2;
}
.remark_box {
  margin: 0.1rem 0.27rem 0rem 0.27rem;
  padding: 0;
  overflow: hidden;
  display: block;
}
.remark_name {
  font-size: 0.36rem;
  color: #2a5892;
  padding-right: 0.15rem;
}
.remark_word {
  font-size: 0.36rem;
  color: #404040;
}
.remark_time {
  font-size: 0.36rem;
  color: #8d8d8d;
  float: right;
  padding-top: 0.18rem;
}
</style>