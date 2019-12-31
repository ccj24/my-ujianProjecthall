<template>
  <div>
    <!-- 小程序  v-if="isMP"-->
    <!-- 预览图片，切换图片 web-->
    <div v-if="!isMP&&isshow" class="fangda" @click="recover">
      <div v-if="index!=0" class="icon zuoyou left" @click="Left" @click.stop>&#xe602;</div>
      <ul class="img_ul" :style="styleObj" @touchstart="start($event)" @touchmove="move($event)" @touchend="end($event)">
        <li class="lii" v-for="(item,indexs) in tupian" :key="indexs">
          <img :src="item" class="theimg" alt>
          <div>{{index+1}}/{{tupian.length}}</div>
        </li>
      </ul>
      <div v-if="index!=tupian.length-1" class="icon zuoyou right" @click="Right" @click.stop>&#xe601;</div>
    </div>
  </div>
</template>
<script>
export default {
  // 父组件接收的值
  props: {
    indexx: Number,
    tupian: Array,
    clickhit:Number,
  },
  data() {
    return {
      isshow:false,
      index: "",
      start_x: 0,
      move_x: 0,
      deviation: 0,
      clientWidth: 0,
      // 样式对象
      styleObj: {
        left: ""
      }
    };
  },
  methods: {
    recover() {
      // 隐藏时候的调用方法
      this.isshow=false;
      // this.$emit("sendmsg");
    },
    // web
    //  样式方法
    left() {
      this.styleObj.left =
        this.deviation / this.clientWidth * 100 - this.index * 100 + "%";
      this.index = this.index;
    },
    Left() {
      this.index--;
      this.left();
    },
    Right() {
      this.index++;
      this.left();
    },
    start(e) {
      this.start_x = e.touches[0].pageX;
    },
    move(e) {
      this.move_x = e.changedTouches[0].pageX;
      // 滑动的差
      this.deviation = this.move_x - this.start_x;
      this.left();
    },
    end(e) {
      if (this.index == 0 && this.deviation > 0) {
        this.toast("已经是第一张图片啦");
        this.deviation = 0;
        this.left();
      } else if (this.index == this.tupian.length - 1 && this.deviation < 0) {
        this.toast("已经是最后一张图片啦");
        this.deviation = 0;
        this.left();
      } else {
        // Math.abs求绝对值 this.deviation>0右滑
        if (Math.abs(this.deviation) > 100) {
          if (this.deviation >= 0) {
            this.deviation = 0;
            this.index--;
            this.left();
          }
          // 左滑
          else {
            this.deviation = 0;
            this.index++;
            this.left();
          }
        } else {
          this.deviation = 0;
          this.left();
        }
      }
    }
  },
  watch:{
    clickhit(newval,oldval){
      let that = this;
        if(this.clickhit>0)
        {
          that.isshow=true;
          if(this.isMP)
          {
            wx.previewImage({
              current: this.tupian[this.indexx],
              urls: this.tupian,
              complete(){
                that.isshow=false;
              }
            });
          }
          else{
            that.clientWidth = document.documentElement.clientWidth;
           // 从新赋值到新定义的index，避免直接操作修改props的值
           that.index=that.indexx
           that.styleObj.left =that.deviation / that.clientWidth * 100 - that.index * 100 + "%";
          }
        }
    }
  },
  mounted() {
    // console.log(this.tupian)
    // if (!this.isMP) {
    //   // 屏幕宽
      
    // }
  }
};
</script>
<style scoped>
/* 点击图片放大的背景样式 */
.fangda {
  width: 100%;
  height: 100%;
  /* position: absolute; */
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 1);
  z-index: 999;
  overflow: hidden;
}
.theimg {
  /* position: relative; */
  float: left;
  width: 100%;
  min-width: 100%;
  /* position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
}
.lii {
  overflow: hidden;
  float: left;
  min-width: 100%;
}
.lii div {
  position: fixed;
  left: 45%;
  bottom: 0.3rem;
  color: #fff;
  font-size: 0.8rem;
}
.img_ul {
  list-style: none;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center; /* 垂直居中 */
  flex-direction: row; /* 子元素横向排列 */
  /* justify-content: center; */
  position: absolute;
}
/* .nub {
  font-size: 0.5rem;
  color: #fff;
  position: relative;
  bottom: 0.3rem;
} */
.zuoyou {
  color: #fff;
  height: 1.5rem;
  width: 0.8rem;
  text-align: center;
  line-height: 1.5rem;
  font-size: 0.8rem;
  background-color: #4c4c4c;
  z-index: 1001;
}
.left {
  position: absolute;
  top: 50%;
  left: 0.5rem;
}
.right {
  position: absolute;
  top: 50%;
  right: 0.5rem;
}
</style>