<template>
  <div class="index">
    <div class="content">
      <div class="renwu">
        <div class="renwu_title">
          <p :class="{renwu_bt:setnotchecked,renwu_bt2:setchecked}" @click="notchecked">未完成</p>
          <p :class="{renwu_bt2:setnotchecked,renwu_bt:setchecked}" @click="checked">已结束</p>
        </div>
        <!-- 任务未完成的时候 -->
        <div class="renwu_content" v-if="setnotchecked==true && setchecked==false">
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
        <!-- 任务完成了的时候 -->
        <div class="renwu_content" v-if="setnotchecked==false && setchecked==true">
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
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      setnotchecked: true,
      setchecked: false,
      UnfinishedTaskInfo: [], //未完成的
      FulfillTaskInfo: [] //已经完成的
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
  }
};
</script>


<style scoped>
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
