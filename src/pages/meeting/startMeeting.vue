<template>
  <div>
    <div class="topNr">
      <span class="top_one" @click="quxiao">取消</span>
      <span class="top_two" @click="queding">确定发起</span>
    </div>
    <div class="headline">
      <textarea
        placeholder="会议名称"
        auto-height="ture"
      ></textarea>
    </div>
    <div class="remark">
      <textarea
        placeholder="备注"
        auto-height="ture"
      ></textarea>
    </div>
    <div class="geliqu"></div>
    <div class="bottom">
        <ul>
            <li class="Li">
                <span class="icon" style="color: #12b7f5;">&#xe6c7;</span>
                <span class="aaa">时间</span>
            </li>
            <li class="Li" @click="invite">
                <span class="icon" style="color: #12b7f5;float:left">&#xe61c;</span>
                <span class="aaa" style="float:left">邀请会议成员</span>
                <div class="chengyuan">
                    <span>石凤</span>
                    <span>石凤</span>
                    <span>石凤</span>
                    <span>石凤</span>
                    <span>石凤</span>
                    <span>石凤</span>
                    <span>石凤</span>
                    <span>石凤</span>
                </div>
                <span class="icon youbiao">&#xe601;</span>
            </li>
            <li class="Li">
                <span class="icon" style="color: #12b7f5;">&#xe62e;</span>
                <span class="aaa">指定会议记录员</span>
                <div style="float: right">
                    <span class="jiluyuan">王思聪</span>
                    <span class="icon youbiao">&#xe601;</span>
                </div>  
            </li>
        </ul>
    </div>
    <!-- 点击发布的背景样式 -->
    <div v-show="conceal" class="layout">
    <div class="frame">
      <div class="frame_top">确定发起该会议？</div>
      <div class="frame_two">
        <div class="one" style="float:left" @click="affirm">确认</div>
        <div class="two" @click="cancel">取消</div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            conceal: false,
        }
    },
    methods :{
        // 邀请成员
        invite() {

        },
        queding() {
            this.conceal=true;
        },
        cancel() {
            this.conceal=false;
        },
        affirm() {

        },
        quxiao() {
            this.$router.back();
        }
    },
 }
</script>
<style scoped>
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
.headline {
    padding: 0rem 0.25rem;
    border-bottom: 0.02rem solid #f4f3f2;
}
.headline textarea {
    font-size: 0.46rem;
    color: #999999;
    height: 1.28rem;
    line-height: 1.28rem;
}
.remark {
    padding: 0.36rem 0.25rem;
    border-bottom: 0.02rem solid #f4f3f2;
}
.remark textarea {
    font-size: 0.46rem;
    color: #999999;
    min-height: 4.76rem;
}
.geliqu {
    height: 0.54rem;
    background-color: #f4f3f2;
}
.Li {
    height: 1.31rem;
	background-color: #ffffff;
    border-bottom: solid 0.01rem #e8e8e8;
    line-height: 1.31rem;
    overflow: hidden;
    font-size: 0.49rem;
    line-height: 1.31rem;
    padding: 0 0.33rem;
}
.chengyuan {
    font-size: 0.43rem;
    color: #ababab;
    text-overflow: ellipsis;
    white-space: nowrap; 
    overflow: hidden;
    margin-left: 0.26rem;
    float:left;
    width: 4.7rem;
}
.youbiao {
    font-size: 0.54rem;
    color: #999999;
    float: right;
}
.jiluyuan {
    font-size: 0.43rem;
    color: #ababab;
}
.aaa {
    color: #353535;
    margin-left: 0.45rem;
}
/* 点击弹出框背景 */
.layout {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #353535;
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
  color: #353535;
  line-height: 1.74rem;
  border-bottom: 0.02rem solid #353535;
}
.one {
  width: 50%;
  text-align: center;
  color: #12b7f5;
  line-height: 1.26rem;
  border-right: 0.01rem solid #353535;
}
.two {
  overflow: hidden;
  text-align: center;
  color: #12b7f5;
  line-height: 1.26rem;
}
</style>