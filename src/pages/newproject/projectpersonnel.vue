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
              <b>{{ProjectDoor.inPeopleNum}}</b> 次
            </div>
          </div>
          <div class="ryJoinDiv">
            <p class="ryJoinText">今日出场次数</p>
            <div class="ryJoinRightT">
              <i>{{ProjectDoor.outPeopleNum}}</i> 次
            </div>
          </div>
        </div>
        <div class="ryInfo">
          <div class="ryInfoLeftDiv">
            <div class="ryInfoDiv" v-for="(item,index) in ProjectDoor.peopleList" :key="index">
              <div class="ryInfoLe">
                <img class="ryHeadImg" v-if="item.ActionImage==null" src="/static/img/ryHeadImg.png" alt />
                <img class="ryHeadImg" v-else :src="item.ActionImage" alt />
                <div class="ryInfoleTextDiv">
                  <p class="ryinfoP">{{item.Name}}</p>
                  <p class="ryinfoTime">{{item.AddTime}}</p>
                </div>
              </div>
              <p class="ryState2">{{item.InOrOut==0?"出":"进"}}</p>
            </div>
          </div>

          <!-- <div class="ryJdt">
                        <div class="ryjdtLineBg"></div>
                        <div class="jdtBlue"></div>
          </div>-->
        </div>
      </div>
    </div>
    <div class="loadmore" style="text-align: center;">加载更多</div>
  </div>
</template>


<script>
import "../../assets/style.css";
export default {
  data() {
    return {
      ProjectDoor: {} //获取项目人员进出记录
    };
  },
  async mounted() {
    console.log(this.$route.query.ProjectId); //这样接收
    var that = this;
    // 获取项目人员进出记录
    var rep = await this.$UJAPI.GetDoorPeopleList({
      ProjectId: this.$route.query.ProjectId
    });
    if (rep.ret == 0) {
      this.ProjectDoor = rep.data;
    }
    console.log(this.ProjectDoor);
  }
};
</script>

<style scoped>
.loadmore {
  font-size: 0.47rem;
  padding: 0.4rem;
  color: #999;
}
</style>