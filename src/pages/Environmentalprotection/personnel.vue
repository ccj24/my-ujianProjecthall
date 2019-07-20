<template>
  <div class="da">
    <div class="hezi1">
      <p class="title left">
        <b>实时在场人数</b>
      </p>
      <div class="title_value right">
        <span>26</span>
        <span class="ren">人</span>
      </div>
    </div>
    <div class="two">
      <div class="stage" style="float:left">
        <p class="stage1">585</p>
        <p class="two2">今日出场</p>
      </div>
      <div class="worker" style="float:left">
        <p class="worker1">598</p>
        <p class="two2">劳工总数</p>
      </div>
      <div class="enter" style="float:left">
        <p class="enter1">588</p>
        <p class="two2">今日进场</p>
      </div>
    </div>
    <div class="three">
      <div class="attendee">
        <div class="attendee-top">
          <p class="attendee-top1">
            <b>实时在场</b>
          </p>
          <p class="attendee-top2">
            30/360
            <span class="attendee-top3">人</span>
          </p>
        </div>
        <div class="attendee-bottom">
          <div class="neirong">
            <div class="attendee-bottom-a">
              <p class="attendee-bottom-a1">水电工班组</p>
              <p class="attendee-bottom-a2">20/140</p>
            </div>
            <div class="attendee-bottom-b">
              <p class="attendee-bottom-a1">水电工班组</p>
              <p class="attendee-bottom-a2">20/140</p>
            </div>
            <div class="attendee-bottom-b">
              <p class="attendee-bottom-a1">水电工班组</p>
              <p class="attendee-bottom-a2">10110</p>
            </div>
          </div>
        </div>
      </div>
      <div class="attendee">
        <div class="attendee-top">
          <p class="attendee-top1">
            <b>今日出场</b>
          </p>
          <p class="attendee-top2">
            30/360
            <span class="attendee-top3">人</span>
          </p>
        </div>
        <div class="attendee-bottom">
          <div class="neirong">
            <div class="attendee-bottom-a">
              <p class="attendee-bottom-a1">水电工班组</p>
              <p class="attendee-bottom-a2">20/140</p>
            </div>
            <div class="attendee-bottom-b">
              <p class="attendee-bottom-a1">钢筋工班组</p>
              <p class="attendee-bottom-a2">20/140</p>
            </div>
            <div class="attendee-bottom-b">
              <p class="attendee-bottom-a1">水泥工班组</p>
              <p class="attendee-bottom-a2">20/140</p>
            </div>
          </div>
        </div>
      </div>
      <div class="attendee">
        <div class="attendee-top">
          <p class="attendee-top1">
            <b>今日进场</b>
          </p>
          <p class="attendee-top2">
            30/360
            <span class="attendee-top3">人</span>
          </p>
        </div>
        <div class="attendee-bottom">
          <div class="neirong">
            <div class="attendee-bottom-a">
              <p class="attendee-bottom-a1">水电工班组</p>
              <p class="attendee-bottom-a2">20/140</p>
            </div>
            <div class="attendee-bottom-b">
              <p class="attendee-bottom-a1">水电工班组</p>
              <p class="attendee-bottom-a2">20/140</p>
            </div>
            <div class="attendee-bottom-b">
              <p class="attendee-bottom-a1">水电工班组</p>
              <p class="attendee-bottom-a2">20/140</p>
            </div>
          </div>
        </div>
      </div>
      <div class="attendee">
        <div class="attendee-top">
          <p class="attendee-top1">
            <b>劳工总数</b>
          </p>
          <p class="attendee-top2">
            30/360
            <span class="attendee-top3">人</span>
          </p>
        </div>
        <div class="attendee-bottom" style>
          <div class="neirong">
            <div class="attendee-bottom-a">
              <p class="attendee-bottom-a1">水电工班组</p>
              <p class="attendee-bottom-a2">20/140</p>
            </div>
            <div class="attendee-bottom-b">
              <p class="attendee-bottom-a1">水电工班组</p>
              <p class="attendee-bottom-a2">20/140</p>
            </div>
            <div class="attendee-bottom-b">
              <p class="attendee-bottom-a1">水电工班组</p>
              <p class="attendee-bottom-a2">20/140</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.da {
  margin: 0;
  padding: 0;
}
.hezi1 {
  width: 100%;
  height: 1.56rem;
  background-color: #ffffff;
  border-bottom: 0.02rem solid #eeeeee;
  line-height: 1.56rem;
}
.hezi1 .title {
  /* 左内边距 */
  padding-left: 0.42rem;
  font-size: 0.44rem;
  line-height: 0.44rem;
  color: #333333;
  line-height: 1.56rem;
}
.hezi1 .title_value {
  font-family: PingFang-SC-Bold;
  font-size: 0.8rem;
  margin-right: 0.56rem;
  /* height: 0.6rem; */
  color: #6bb15d;
  /* margin-top: 0.61rem; */
  line-height: 1.56rem;
}
.hezi1 .title_value .ren {
  /* <!--设计块元素，让其26和人在同一行显示 --> */
  display: inline-block;
  font-size: 0.44rem;
  color: #333333;
}
.two {
  background-color: #ffffff;
  height: 1.81rem;
  /* 清除上一块浮动缓存 */
  clear: both;
  border-bottom: 0.1rem solid #eeeeee;
}
/* 把第二部分分成三个小部分，每部分占宽30%，同样代码合并 */
.two .stage,
.worker,
.enter {
  /* 分成三快，每块看着一个div */
  width: 33.3%;
}
.two .stage .stage1 {
  font-family: PingFang-SC-Bold;
  font-size: 0.58rem;
  color: #f15464;
  padding-left: 1.29rem;
}
/* 每一小块代码下面的css相同，合并 */
.two2 {
  font-family: PingFang-SC-Medium;
  font-size: 0.32rem;
  color: #b3b3b3;
  padding-left: 1.17rem;
  /* 这样是让上下内容间保持距离 */
  padding-top: 0.31rem;
}
.two .worker .worker1 {
  font-family: PingFang-SC-Bold;
  font-size: 0.58rem;
  color: #5e69fd;
  padding-left: 1.29rem;
}
.two .enter .enter1 {
  font-family: PingFang-SC-Bold;
  font-size: 0.58rem;
  color: #f3bf0e;
  padding-left: 1.29rem;
}
.three {
  clear: both;
}
.attendee {
  width: 100%;
  height: 4.3rem;
}
.attendee-top {
  /* 使得div之间内外边距默认为0 */
  margin: 0rem;
  padding: 0rem;
  width: 10.77rem;
  height: 0.38rem;
  /* 在同一行排列 */
  display: inline-block;
}
.attendee-top1 {
  float: left;
  font-family: PingFang-SC-Bold;
  font-size: 0.4rem;
  color: #333333;
  /* 分别设计上右下左的内边距 */
  padding: 0.64rem 0rem 0rem 0.42rem;
  display: block;
}
.attendee-top2 {
  font-family: PingFang-SC-Medium;
  font-size: 0.4rem;
  color: #00b7ee;
  display: block;
  padding-top: 0.65rem;
  padding-left: 8.41rem;
}
.attendee-top3 {
  color: black;
}
.attendee-bottom {
  /* 设计宽度占总宽度的大概93%左右 */
  width: 93%;
  height: 2.9rem;
  background-color: rgba(0, 0, 0, 0.05);
  /* opacity: 0.05; */
  margin-left: 0.36rem;
  padding-top: 0.38rem;
}
.neirong {
  font-family: PingFang-SC-Medium;
  font-size: 0.36rem;
  /* 行高 */
  line-height: 0.7rem;
  color: #333333;
  /* 到上，右，下，左边的外边距 */
  margin: -0.2rem 0.53rem 0.52rem 0.44rem;
}
.attendee-bottom-a1 {
  float: left;
  overflow: hidden;
}
.attendee-bottom-a2 {
  display: inline-block;
  padding-left: 5.96rem;
}
/* 设计第二第三行到上一行的距离 */
.attendee-bottom-b {
  margin-top: 0.36rem;
}
</style>