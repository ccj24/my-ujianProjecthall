<template>
  <!-- 我的日志***所有 -->
  <div>
    <div class="write">
      <p @click="go({path:'/pages/log/writeLog'})">写日志</p>
    </div>
    <div class="top">
      <div class="top_one" :class="{top_oneNr:checkIndex==0}" @click="checktab(0)">
        <p>所有</p>
      </div>
      <div class="top_one" :class="{top_oneNr:checkIndex==1}" @click="checktab(1)">
        <p>未通过</p>
      </div>
      <div class="top_one" :class="{top_oneNr:checkIndex==2}" @click="checktab(2)">
        <p>待审核</p>
      </div>
      <!-- <div v-for="(item,index) in tabList" :key="index" class="top_one" :class="{top_oneNr:checkIndex==item.index}" @click="checktab(item.index)">
        <p>{{item.tabname+" " +item.index}}</p>
      </div>-->
    </div>
    <!-- 日志内容 -->
    <div class="particulars" v-for="(item,index) in ProjectLog" :key="index" @click="goaudit(item.LogId)">
      <div class="particulars_one">
        <img :src="item.Portrait">
        <div class="information">
          <p class="name">{{item.CreatorName}}</p>
          <div class="bumen">
            <span>{{item.DepartmentName}}</span>
            <span>{{item.PostName}}</span>
          </div>
          <span class="zhuangtai" v-if="item.Audit==0">待审核</span>
          <span class="zhuangtai" v-if="item.Audit==1">通过</span>
          <span class="zhuangtai" v-if="item.Audit==-1">未通过</span>
        </div>
      </div>
      <div class="content">
        <p>{{item.LogContent}}</p>
        <div class="picture">
          <img v-for="(items,indexs) in item.Images" :key="indexs" :src="items" @click.stop="yulan(items)" />        
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
      checkIndex: 0,
      ProjectLog :{},//定义日志
    };
  },
  async mounted() {
    var that=this;
    //获取日志接口
    var rep = await this.$UJAPI.Project_GetList({
      Projectid: this.ProjectId,
      // 我的日志，QueryType:2
      QueryType:2,
    })
    if (rep.ret==0) {
      this.ProjectLog=rep.data
    }
    console.log(this.ProjectLog)
  },
  methods: {
      // 预览图片
    yulan(items) {
      var arr = Array(items);
      wx.previewImage({
        current: items,
        urls: arr
      });
    },
    goaudit(LogId) {
      this.commentbox = false;
      // 传参
      this.$router.push({
        path: "/pages/log/LogDetails",
        query: {
          LogId: LogId
        }
      });
    },
    // writeLog() {
    //   this.$router.push({
    //     path: "/pages/log/writeLog",
    //     query: {
    //       LogId: null
    //     }
    //   });
    // },
     async checktab(index) {
      this.checkIndex = index;
      // 触发不同的事件，返回不同的数据
      let Audit;
      if(index==0)
      {
        Audit=null;
        
      }
      else if(index==1)
      {
        Audit=-1;
        
      }
      else if (index==2)
      {
        Audit=0;
      }
      var rep = await this.$UJAPI.Project_GetList({
          Projectid: this.ProjectId,
          Audit:Audit,
          // 我的日志，QueryType:2
          QueryType:2,
        })
        if (rep.ret==0) {
          this.ProjectLog=rep.data
        }
    },
  },
}
</script>
<style>
page {
  background-color: #f9f9f9
}
</style>
<style scoped>
.write {
  width: 100%;
  height: 1.28rem;;
  background-color: #12b7f5;
  font-size: 0.46rem;
	color: #ffffff;
}
.write p {
  float: right;
  line-height: 1.28rem;
  padding-right: 0.3rem;
}
.top {
  width: 100%;
  /* height: 1.28rem; */
  background-color: #ffffff;
  box-shadow: 0rem 0.01rem 0rem 0rem #e8e8e8;
  overflow: hidden;
}
.top_one {
  height: 100%;
  width: 33.3%;
  text-align: center;
  color: #353535;
  float: left;
  
}
.top_oneNr {
  border-bottom: 0.05rem solid #12b7f5;
  color: #12b7f5;
}
.top_one p {
  font-size: 0.43rem;
  line-height: 1.28rem;
}

.particulars {
  margin-top: 0.29rem;
  padding-left: 0.28rem;
  background-color: #ffffff;
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
