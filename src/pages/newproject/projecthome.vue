<template>
  <div class="newproject">
    <!-- 项目头部 背景图 -->
    <div class="head" style="overflow: hidden;">
      <img src="/static/images/bg.png" alt />
    </div>
    <!-- 项目名 头像-->
    <div class="projectmessage"></div>
    <!-- 项目红包 -->
    <div class="projectredpacket">
      <div class="RedpacketTop">
        <div class="projecttext">
          项目红包
          <img src="/static/images/details.png" alt />
        </div>
      </div>
    </div>
    <!-- 项目图片 -->
    <div class="projectpicture"></div>
    <!-- 实时数据 -->
    <div class="realtime"></div>
  </div>
</template>
  


<style scoped>
* {
  margin: 0;
  padding: 0;
}
.head img {
  height: 4.86rem;
}
.projectredpacket {
  background-color: #ffffff;
  height: 6.77rem;
  overflow: hidden;
}
.RedpacketTop {
  margin-top: 2.58rem;
  height: 0.7rem;
  border-bottom: #eeeeee 0.05rem solid;
}
.projecttext {
  border-left: 0.11rem solid #12b7f5;
  margin-left: 0.41rem;
  font-size: 0.42rem;
  padding-left: 0.24rem;
  line-height: 0.37rem;
}
.projecttext img {
  width: 0.22rem;
  height: 0.27rem;
  padding-left: 8rem;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>
  