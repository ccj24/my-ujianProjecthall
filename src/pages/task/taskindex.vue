<template>
  <div class="index">
    <!-- 顶部收到任务发出任务 -->
    <div class="top">
      <p class="top_rttext">发起任务</p>
      <div class="top_title2">
        <div :class="{top_title2_fqrw:receive,top_title2_fqrw2:giveout}" @click="SetReceive">收到任务</div>
        <div :class="{top_title2_fqrw2:receive,top_title2_fqrw:giveout}" @click="SetGet">发出任务</div>
      </div>
    </div>
    <div class="content" style="margin-top: 2.3rem;">
      <!-- 内容 -->
      <div class="renwu">
        <div class="renwu_title">
          <p :class="{renwu_bt:setnotchecked,renwu_bt2:setchecked}" @click="notchecked">未完成</p>
          <p :class="{renwu_bt2:setnotchecked,renwu_bt:setchecked}" @click="checked">已结束</p>
        </div>
        <!-- 发出任务 未完成的时候 -->
        <div class="renwu_content" v-if="setnotchecked==true && setchecked==false && giveout==true">
          <div class="renwu_nr" v-for="(item,index) in UnfinishedTaskInfo" :key="index">
            <div class="renwu_nr_header">
              <img class="renwu_img" :src="item.Portrait" alt />
              <div class="renwu_nr_info">
                <p>{{item.UserName}}</p>
                <p>{{item.CreateTime}}</p>
              </div>
              <p class="renwu_hint" v-if="item.State==1">已过期</p>
              <p class="renwu_hint" v-else-if="item.State==0">待答复</p>
            </div>
            <div class="rewu_nr_qita">{{item.TaskContent}}</div>
          </div>
        </div>
        <!-- 收到任务 未完成的时候 -->
        <div class="renwu_content" v-if="setnotchecked==true && setchecked==false && receive==true">
          <div class="renwu_nr" v-for="(item,index) in UnfinishedTaskInfoView" :key="index">
            <div class="renwu_nr_header">
              <img class="renwu_img" :src="item.Portrait" alt />
              <div class="renwu_nr_info">
                <p>{{item.UserName}}</p>
                <p>{{item.CreateTime}}</p>
              </div>
              <p class="renwu_hint" v-if="item.State==1">已过期</p>
              <p class="renwu_hint" v-else-if="item.State==0">待答复</p>
            </div>
            <div class="rewu_nr_qita">{{item.TaskContent}}</div>
          </div>
        </div>
        <!-- 发出任务 完成了的时候 -->
        <div class="renwu_content" v-if="setnotchecked==false && setchecked==true && giveout==true">
          <div class="renwu_nr" v-for="(item,index) in FulfillTaskInfo" :key="index">
            <div class="renwu_nr_header">
              <img class="renwu_img" :src="item.Portrait" alt />
              <div class="renwu_nr_info">
                <p>{{item.UserName}}</p>
                <p>{{item.CreateTime}}</p>
              </div>
              <p class="renwu_hint" v-if="item.State==1">已过期</p>
              <p class="renwu_hint" v-else-if="item.State==0">待答复</p>
            </div>
            <div class="rewu_nr_qita">{{item.TaskContent}}</div>
          </div>
        </div>
        <!-- 收到任务 完成了的时候 -->
        <div class="renwu_content" v-if="setnotchecked==false && setchecked==true && receive==true">
          <div class="renwu_nr" v-for="(item,index) in FulfillTaskInfoView" :key="index">
            <div class="renwu_nr_header">
              <img class="renwu_img" :src="item.Portrait" alt />
              <div class="renwu_nr_info">
                <p>{{item.UserName}}</p>
                <p>{{item.CreateTime}}</p>
              </div>
              <p class="renwu_hint" v-if="item.State==1">已过期</p>
              <p class="renwu_hint" v-else-if="item.State==0">待答复</p>
            </div>
            <div class="rewu_nr_qita">{{item.TaskContent}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      receive: true,
      giveout: false,
      setnotchecked: true,
      setchecked: false,
      UnfinishedTaskInfo: [], //未完成的
      FulfillTaskInfo: [], //已经完成的
      UnfinishedTaskInfoView: [], //获取用户收到 未完成的
      FulfillTaskInfoView: [] //获取用户收到的  已经完成的
    };
  },
  methods: {
    notchecked() {
      this.setnotchecked = !this.setnotchecked;
      this.setchecked = !this.setchecked;
    },
    checked() {
      this.setnotchecked = !this.setnotchecked;
      this.setchecked = !this.setchecked;
    },
    SetReceive() {
      this.receive = !this.receive;
      this.giveout = !this.giveout;
    },
    SetGet() {
      this.receive = !this.receive;
      this.giveout = !this.giveout;
    }
  },
  async mounted() {
    var that = this;
    // 任务没有完成的接口
    var rep = await this.$UJAPI.Task_List({
      state: 0 //0-未完成(包涵未过期和不限答复时间)
    });
    if (rep.ret == 0) {
      this.UnfinishedTaskInfo = rep.data;
    }
    //  任务完成的接口
    var rep = await this.$UJAPI.Task_List({
      state: 1 //1已结束(包括已答复和已过期)
    });
    if (rep.ret == 0) {
      this.FulfillTaskInfo = rep.data;
    }
    // 获取用户收到需要答复的任务
    // 1、0-未完成(包涵未过期和不限答复时间)
    var rep = await this.$UJAPI.Task_GetReplyTaskList({
      state: 0
    });
    if (rep.ret == 0) {
      this.UnfinishedTaskInfoView = rep.data;
    }
    // 2、1已结束(包括已答复和已过期)
    var rep = await this.$UJAPI.Task_GetReplyTaskList({
      state: 1
    });
    if (rep.ret == 0) {
      this.FulfillTaskInfoView = rep.data;
    }
  }
};
</script>


<style scoped>
.index .top .top_rttext {
  float: right;
  font-size: 0.45rem;
  color: #ffffff;
  line-height: 1.33rem;
  padding-right: 0.4rem;
}
.index .top .top_title {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 0.51rem;
  text-align: center;
  line-height: 1.33rem;
  color: #ffffff;
  z-index: -1;
}

.index .top .top_title2 {
  border: solid 0.02rem #ffffff;
  border-radius: 0.1rem;
  line-height: 0.87rem;
  font-size: 0.41rem;
  overflow: hidden;
  position: absolute;
  top: 0.23rem;
  left: 2.75rem;
  z-index: -1;
}
.index .top .top_title2 .top_title2_fqrw,
.index .top .top_title2 .top_title2_fqrw2 {
  color: #12b7f5;
  background-color: #ffffff;
  border-radius: 0.1rem 0 0 0.1rem;
  float: left;
  padding-left: 0.51rem;
  padding-right: 0.23rem;
}

.index .top .top_title2 .top_title2_fqrw2 {
  color: #ffffff;
  background-color: #12b7f5;
  padding-left: 0.23rem;
  padding-right: 0.51rem;
}
.index .content .renwu .renwu_title,
.index .content2 .renwu .renwu_title,
.index .content3 .renwu .renwu_title {
  background-color: #ffffff;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
}

.index .content .renwu .renwu_title .renwu_bt,
.index .content .renwu .renwu_title .renwu_bt2,
.index .content2 .renwu .renwu_title .renwu_bt,
.index .content2 .renwu .renwu_title .renwu_bt2,
.index .content3 .renwu .renwu_title .renwu_bt,
.index .content3 .renwu .renwu_title .renwu_bt2 {
  color: #12b7f5;
  font-size: 0.48rem;
  width: 50%;
  text-align: center;
  line-height: 1.38rem;
  border-bottom: 0.03rem solid #12b7f5;
  float: left;
}

.index .content .renwu .renwu_title .renwu_bt2,
.index .content2 .renwu .renwu_title .renwu_bt2,
.index .content3 .renwu .renwu_title .renwu_bt2 {
  color: #363636;
  border: 0;
}

.index .content .renwu .renwu_content,
.index .content2 .renwu .renwu_content,
.index .content3 .renwu .renwu_content {
  margin-bottom: 0.4rem;
  overflow: auto;
  padding-top: 1.33rem;
}

.index .content .renwu .renwu_content .renwu_nr,
.index .content2 .renwu .renwu_content .renwu_nr,
.index .content3 .renwu .renwu_content .renwu_nr {
  background-color: #ffffff;
  margin-top: 0.4rem;
  padding: 0 0.48rem;
  padding-bottom: 0.3rem;
}

.index .content .renwu .renwu_content .renwu_nr .renwu_nr_header,
.index .content2 .renwu .renwu_content .renwu_nr .renwu_nr_header,
.index .content3 .renwu .renwu_content .renwu_nr .renwu_nr_header {
  overflow: hidden;
  padding: 0.58rem 0;
}

.index .content .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_img,
.index .content2 .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_img,
.index .content3 .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_img {
  width: 1.58rem;
  height: 1.58rem;
  float: left;
  margin-right: 0.57rem;
  border-radius: 0.1rem;
}

.index .content .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_nr_info,
.index
  .content2
  .renwu
  .renwu_content
  .renwu_nr
  .renwu_nr_header
  .renwu_nr_info,
.index
  .content3
  .renwu
  .renwu_content
  .renwu_nr
  .renwu_nr_header
  .renwu_nr_info {
  float: left;
  color: #363636;
  font-size: 0.45rem;
  height: 1.58rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.index .content .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_hint,
.index .content2 .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_hint,
.index .content3 .renwu .renwu_content .renwu_nr .renwu_nr_header .renwu_hint {
  float: right;
  color: #12b7f5;
  font-size: 0.42rem;
}

.index .content .renwu .renwu_content .renwu_nr .rewu_nr_qita,
.index .content2 .renwu .renwu_content .renwu_nr .rewu_nr_qita,
.index .content3 .renwu .renwu_content .renwu_nr .rewu_nr_qita {
  color: #363636;
  font-size: 0.42rem;
}
</style>
