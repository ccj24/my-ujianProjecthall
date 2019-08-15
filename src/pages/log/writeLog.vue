<template>
  <div>
    <!-- 点击取消的背景样式 -->
    <div :class="{layout:yincang}"></div>
    <!-- 内容 -->
    <div class="index">
      <div class="topNr">
        <span class="top_one" @click="returnRoom">取消</span>
        <span class="top_two">发表</span>
      </div>
      <!-- 时间 -->
      <div class="day">
        <span>日期:</span>
        <span>2017年8月16号</span>
        <img src="/static/img/time_icon.png" alt />
      </div>
      <div class="content">
        <div class="rich">
          <!-- maxlength设计最大字数 auto-height="ture"是高度随字数增加而增加-->
          <textarea placeholder="不能超过2000字" maxlength="2000" auto-height="ture"></textarea>
        </div>
      </div>
      <div class="rizhi">
        <div class="rizhi_img_box">
          <img class="rizhi_img" src="/static/img/myrizhi.png" />
        </div>
        <div class="rizhi_img_box">
          <img class="rizhi_img" src="/static/images/组30@3x.png" />
        </div>
      </div>
    </div>
    <div class="frame" v-show="conceal">
      <div class="frame_top">确定取消？</div>
      <div class="frame_two">
        <div class="one" style="float:left" @click="go({path:'/pages/log/Logdetails'})">确认</div>
        <div class="two" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 提示框刚刚开始是隐藏状态
      conceal: false,
      yincang: false
    };
  },
  methods: {
    returnRoom() {
      this.conceal = true;
      this.yincang = true;
    },
    cancel() {
      // 点击弹出框的取消后再次隐藏
      this.conceal = false;
      this.yincang = false;
    }
  }
};
</script>
<style scoped>
.index {
  margin: 0;
  background-color: #ffffff;
  z-index: 1;
}
.topNr {
  width: 100%;
  height: 1.28rem;
  background-color: #12b7f5;
  font-size: 0.46rem;
  color: #ffffff;
  line-height: 1.28rem;
  overflow: hidden;
}
.top_one {
  padding-left: 0.4rem;
}
.top_two {
  float: right;
  padding-right: 0.4rem;
}
.day {
  margin-top: 0.38rem;
}
.day span {
  font-size: 0.37rem;
  padding-left: 0.34rem;
}
.day img {
  width: 0.21rem;
  height: 0.12rem;
  padding-left: 1.95rem;
}
.content {
  margin-top: 0.41rem;
}
.rich {
  /* 给高度设置一个最低限制 */
  min-height: 4rem;
  height: auto;
  font-size: 0.46rem;
  /* overflow-y: auto是设计竖方向超出内容形成滚动条显示 */
  /* overflow-y: auto; */
  padding: 0.43rem;
  /* 设计四个边框 */
  outline: 0;
  /* 下面二个都是自动换行的，但是word-wrap如果
  在最后长度不够会自动保留单
  次字体的完整性换行到下一行 */
  word-wrap: break-word;
  word-break: break-all;
}
.rizhi {
  float: left;
  margin-left: 0.31rem;
  margin-bottom: 0.3rem;
}

.rizhi_img_box {
  float: left;
  margin-right: 0.3rem;
  margin-bottom: 0.3rem;
}
.rizhi_img {
  width: 2.27rem;
  height: 2.27rem;
  display: block;
}
.rizhi_img_box:nth-child(4n) {
  margin-right: 0;
}
/* 点击弹出框背景 */
.layout {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color:#353535;
  /* 背景透明度 */
  opacity: 0.5;
  position: fixed;
  z-index: 2;
}
.frame {
  width: 7.79rem;
  height: 3rem;
  font-size: 0.49rem;
  background-color: #ffffff;
  border-radius: 0.36rem;
  opacity: 0.8;
  overflow: hidden;
  /*固定定位 */
  position: fixed;
  top: 5.23rem;
  left: 1.49rem;
  z-index: 3;
}
.frame_top {
  height: 1.74rem;
  text-align: center;
  color: #495f8c;
  line-height: 1.74rem;
  border-bottom: 0.02rem solid #353535;
}
.one {
  width: 50%;
  text-align: center;
  color: aqua;
  line-height: 1.26rem;
  border-right: 0.01rem solid #353535;
}
.two {
  overflow: hidden;
  text-align: center;
  color: aqua;
  line-height: 1.26rem;
}
</style>
