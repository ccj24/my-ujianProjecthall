<template>
  <div class="index">
    <div class="content">
      <div class="renYuan">
        <input class="souSuo" placeholder="2019-06-14" type="date" />
        <!-- <div class="souSuoDiv"></div> -->

        <div class="ryJoin">
          <div class="ryJoinDiv">
            <p class="ryJoinText">今日进场次数</p>
            <div class="ryJoinRightT">
              <b>588</b> 次
            </div>
          </div>
          <div class="ryJoinDiv">
            <p class="ryJoinText">今日出场次数</p>
            <div class="ryJoinRightT">
              <i>588</i> 次
            </div>
          </div>
        </div>
        <div class="ryInfo">
          <div class="ryInfoLeftDiv">
            <div class="ryInfoDiv">
              <div class="ryInfoLe">
                <img class="ryHeadImg" src="/static/img/ryHeadImg.png" alt />
                <div class="ryInfoleTextDiv">
                  <p class="ryinfoP">公孙乌龙</p>
                  <p class="ryinfoTime">2019-06-14 18:50:45</p>
                </div>
              </div>
              <p class="ryState2">出</p>
            </div>
            <div class="ryInfoDiv">
              <div class="ryInfoLe">
                <img class="ryHeadImg" src="/static/img/ryHeadImg.png" alt />
                <div class="ryInfoleTextDiv">
                  <p class="ryinfoP">公孙乌龙</p>
                  <p class="ryinfoTime">2019-06-14 18:50:45</p>
                </div>
              </div>
              <p class="ryState">进</p>
            </div>
            <div class="ryInfoDiv">
              <div class="ryInfoLe">
                <img class="ryHeadImg" src="/static/img/ryHeadImg.png" alt />
                <div class="ryInfoleTextDiv">
                  <p class="ryinfoP">公孙乌龙</p>
                  <p class="ryinfoTime">2019-06-14 18:50:45</p>
                </div>
              </div>
              <p class="ryState2">出</p>
            </div>
            <div class="ryInfoDiv">
              <div class="ryInfoLe">
                <img class="ryHeadImg" src="/static/img/ryHeadImg.png" alt />
                <div class="ryInfoleTextDiv">
                  <p class="ryinfoP">公孙乌龙</p>
                  <p class="ryinfoTime">2019-06-14 18:50:45</p>
                </div>
              </div>
              <p class="ryState">进</p>
            </div>
          </div>

          <!-- <div class="ryJdt">
                        <div class="ryjdtLineBg"></div>
                        <div class="jdtBlue"></div>
          </div>-->
        </div>
      </div>
    </div>
    <div class="loadmore">加载更多</div>
  </div>
</template>


<script>
import "../../assets/style.css";
export default {
  data() {
    return {
      ProjectDoor:{},//获取项目人员进出记录
    };
  },
  async mounted() {

    console.log(this.$route.query.ProjectId); //这样接收
    var that=this;
    // 获取项目人员进出记录
    var rep=await this.$UJAPI.GetDoorPeopleList({
      ProjectId:this.$route.query.ProjectId
    })
    if (rep.ret==0) {
      this.ProjectDoor=rep.data;
    }
    console.log( this.ProjectDoor)
  }
};
</script>

<style scoped>
</style>