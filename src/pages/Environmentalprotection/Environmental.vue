<template>
  <div class="hezi" style=" overflow: hidden;">
    <!-- overflow: hidden防止溢出 -->
    <div class="kuai" style=" overflow: hidden;">
      <p class="dian"></p>
      <div class="right">
        <p class="aa">PM2.5</p>
        <p class="b1">9ug/m³</p>
      </div>
    </div>

    <div class="kuai" style=" overflow: hidden;">
      <p class="dian"></p>
      <div class="right">
        <p class="aa">PM10</p>
        <p class="b1">6ug/m³</p>
      </div>
    </div>
    <div class="kuai" style=" overflow: hidden;">
      <p class="dian"></p>
      <div class="right">
        <p class="aa">噪声</p>
        <p class="b1">9dB</p>
      </div>
    </div>
    <div class="kuai" style=" overflow: hidden;">
      <p class="dian"></p>
      <div class="right">
        <p class="aa">温度</p>
        <p class="b1">28℃</p>
      </div>
    </div>
    <div class="kuai" style=" overflow: hidden;">
      <p class="dian"></p>
      <div class="right">
        <p class="aa">湿度</p>
        <p class="b1">98%</p>
      </div>
    </div>
    <div class="kuai" style=" overflow: hidden;">
      <p class="dian"></p>
      <div class="right">
        <p class="aa">风速</p>
        <p class="b1">3m/s</p>
      </div>
    </div>
    <div class="kuai" style=" overflow: hidden;">
      <p class="dian"></p>
      <div class="right">
        <p class="aa">风向</p>
        <p class="b1">东南风</p>
      </div>
    </div>
    <div class="kuai" style=" overflow: hidden;">
      <p class="dian"></p>
      <div class="right">
        <p class="aa">风级</p>
        <p class="b1">3级</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 定义获取项目详情
      ProjectDetailed :{},
    };
  },
  async mounted() {
    var that=this;
    //获取获取项目详情接口
    var rep=await this.$UJAPI.Project_GetDetailed(
      // Projectid是在UJAPI.js里面的后面接着的，所有获取获取项目详情的时候不用加projectId
      "70057154-a003-4815-b247-0fe887ab4469"
    )
    //请求响应码，调用成功返回0；其他表示调用出错或异常。
    if (rep.ret==0) {
      this.ProjectDetailed=rep.data
    }
    //打印
    console.log( this.ProjectDetailed)
  }
}
</script>

<style scoped>
.hezi .kuai .dian {
  /* 圆点 */
  overflow: hidden;
  width: 0.18rem;
  height: 0.18rem;
  /* 设置高宽的50%为半径 */
  border-radius: 50%;
  margin-top: 0.65rem;
  margin-left: 0.29rem;
  float: left;
  background-color: #00b7ee;
}
.hezi .right {
  width: 9.7rem;
  /* 下边框为0.02厚度＋实线＋颜色 */
  border-bottom: 0.02rem solid #e4dfde;
  margin-right: 0.45rem;
  padding-top: 0.45rem;
  padding-bottom: 0.31rem;
  margin-left: 0.2rem;
}
.hezi .right .aa {
  float: left;
  overflow: hidden;
  font-family: PingFang-SC-Medium;
  font-size: 0.42rem;
  color: #333333;
}
.hezi .right .b1 {
  font-family: PingFang-SC-Medium;
  font-size: 0.38rem;
  /* 左内边距 */
  padding-left: 7.68rem;
  color: #333333;
}
</style>
<style>
page {
  background-color: #ffffff;
}
</style>

