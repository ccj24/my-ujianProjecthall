<template>
  <div>
    <div class="title">
      <span class="title1">未完成</span>
      <span class="title2">已结束</span>
    </div>
    <!-- 设计分隔线 -->
    <div class="divide"></div>
    <div class="content">
      <div class="picture"></div>
      <div class="name">
        <p class="a">姓名</p>
        <p class="b">已过期</p>
        <p class="c">2019/02/10</p>
        <p class="d">相关的其他内容</p>
      </div>
    </div>
     <!-- 设计分隔线 -->
    <div class="divide"></div>
    <div class="content">
      <div class="picture"></div>
      <div class="name">
        <p class="a">姓名</p>
        <p class="b">已过期</p>
        <p class="c">2019/02/10</p>
        <p class="d">相关的其他内容</p>
      </div>
    </div>
         <!-- 设计分隔线 -->
    <div class="divide"></div>
  </div>
</template>
<style scoped>
.title {
  width: 100%;
  height: 1.31rem;
  font-family: PingFang-SC-Medium;
  font-size: 0.43rem;
  line-height: 0.7rem;
  letter-spacing: 0.02rem;
  text-align: center;
  font-weight:bold;
  /* 设计文字垂直居中，即是上下居中 */
  line-height: 1.31rem;
}
.title1 {
  float: left;
  width: 50%;
  height: 100%;
  color: #12b7f5;
  border-bottom: 0.04rem solid #12b7f5;
}
.title2 {
  height: 100%;
  display: inline-block;
  width: 50%;
  color: #363636;
}
.divide {
  width: 100%;
  height: 0.4rem;
  background-color: #f8f8f8;
}
.content {
  width: 100%;
  height: 3.37rem;
  /* 设计这个盒子相对定位作为定位的参照物， */
  position: relative;
}
.picture {
  width: 1.58rem;
  height: 1.58rem;
  background-color: #363636;
  margin-left: 0.48rem;
  position: absolute;
  top: 0.57rem;
}
.name {
  font-family: PingFang-SC-Medium;
  font-size: 0.4rem;
  line-height: 1.07rem;
}
.a {
  position: absolute;
  top: 0.57rem;
  left: 2.63rem;
}
.b {
  color: #12b7f5;
  position: absolute;
  top: 0.57rem;
  left: 9.27rem;
}
.c {
  position: absolute;
  top: 1.5rem;
  left: 2.63rem;
}
.d {
  position: absolute;
  top: 2.32rem;
  left: 0.33rem;
}
</style>

