<template>
  <div v-if="haszimu.length!=0" @touchstart.stop @touchmove.stop @touchend.stop> 
    <!-- 右侧字母 -->
    <scroll-view v-if="isMP" scroll-y class="rightzimu">
      <ul v-if="haszimu.length!=0" id="box" @touchstart="handleTouchStart($event)" @touchmove.stop.prevent="handleTouchMove($event)" @touchend="handleTouchEnd($event)">
        <li v-for="(itemx,index) in haszimu" :key="index" @click.stop="chooseletter($event,itemx,index)" id="theitemx" ref="theitemx">{{itemx}}</li>
      </ul>
    </scroll-view>
      <ul v-else  id="box" class="rightzimu" @touchstart="handleTouchStart($event)" @touchmove.stop.prevent="handleTouchMove($event)" @touchend="handleTouchEnd($event)">
        <li v-for="(itemx,index) in haszimu" :key="index" @click.stop="chooseletter($event,itemx,index)" id="theitemx" ref="theitemx">{{itemx}}</li>
      </ul>
    <!-- 提示字母 -->
    <div v-show="onelettershow" class="oneletter">{{oneletter}}</div>
  </div>
</template>
<script>
export default {
  props: {
    haszimu: Array
  },
  data() {
    return {
      onelettershow: false,
      oneletter: "",
      touchStatus: false,
      boxtop: 0,
      leterheight: 0,
      timer: null
    };
  },
  methods: {
    chooseletter(e, itemx, index) {
      this.$emit("change", index, itemx);
      this.timeletter(itemx);
    },
    timeletter(letter) {
      this.oneletter = letter;
      this.onelettershow = true;
      let _this = this;
      setTimeout(function() {
        _this.onelettershow = false;
      }, 700);
    },
    // 字母滑动效果,人员跟着滑动
    handleTouchStart(e) {
      this.touchStatus = true;
      if (this.isMP) {
        var that = this;
        var query = wx.createSelectorQuery();
        query.select("#box").boundingClientRect();
        query.select("#theitemx").boundingClientRect();
        query.exec(function(res) {
          that.boxtop = res[0].top;
          // 元素高度
          that.leterheight = res[1].height;
        });
      } else {
        // 元素高度
        this.leterheight = this.$refs.theitemx[0].clientHeight;
        //   距离顶部距离
        this.boxtop = document
          .getElementById("box")
          .getBoundingClientRect().top;
      }
    },
    handleTouchMove(e) {
      if (this.touchStatus) {
        //函数节流
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          // H5和小程序的取值不一样
          const touchY = this.isMP
            ? e.mp.changedTouches[0].clientY
            : e.touches[0].clientY;
          const index = Math.floor((touchY - this.boxtop) / this.leterheight);
          if (index >= 0 && index < this.haszimu.length) {
            this.timeletter(this.haszimu[index]);
            this.$emit("change", index, this.haszimu[index]);
          }
        }, 20);
      }
      return;
    },
    handleTouchEnd(e) {
      this.touchStatus = false;
    }
  },
  mounted() {}
};
</script>
<style scoped>
.rightzimu {
  overflow: hidden;
  opacity: 1;
  font-size: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 30%;
  right: 0rem;
  width: 0.6rem;
}
.rightzimu li {
  line-height: 0.8rem;
  text-align: center;
  color: aqua;
}
.oneletter {
  height: 1.5rem;
  width: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  font-size: 0.7rem;
  border-radius: 50%;
  background-color: #ff6c6c;
  color: #fff;
  position: fixed;
  top: 4rem;
  right: 2rem;
}
</style>