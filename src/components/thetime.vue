<template>
   <!-- 时间弹框 -->
   <!-- <div class="layout" v-show="shijian" @click="aaa"> -->
      <div class="data" @click.stop>
        <div class="quedingNr">
          <p @click="truea">确定</p>
        </div>
        <div style="display:flex">
        <ul class="list">
          <li
            v-for="(item,index) in theYear"
            :key="index"
            @click="chooseyear(item)"
            :class="{choosedata:item==year}"
          >{{item}}年</li>
        </ul>
        <ul class="list">
          <li
            v-for="(item,index) in theMonth"
            :key="index"
            @click="choosemonth(item)"
            :class="{choosedata:item==month}"
          >{{item}}月</li>
        </ul>
        <ul class="list">
          <li
            v-for="(item,index) in theDay"
            :key="index"
            @click="chooseday(item)"
            :class="{choosedata:item==day}"
          >{{item}}日</li>
        </ul>
        <ul class="list">
          <li
            v-for="(item,index) in theHours"
            :key="index"
            @click="choosehour(item)"
            :class="{choosedata:item==hour}"
          >{{item}}时</li>
        </ul>
        <ul class="list">
          <li
            v-for="(item,index) in theMinute"
            :key="index"
            @click="chooseminute(item)"
            :class="{choosedata:item==minute}"
          >{{item}}分</li>
        </ul>
        </div>
      </div>
  <!-- </div>   -->
</template>
<script>
export default {
    data() {
        return {
            // shijian: true,
            year: "",
            month: "",
            day: "",
            hour: "",
            minute: "",
            second: "00",
            y: new Date().getFullYear(),
            m: (new Date().getMonth() + 1),
            d: new Date().getDate(),
            h: new Date().getHours(),
            min: new Date().getMinutes(),
        }
    },
    methods: {
        // 隐藏时间弹框
    // aaa() {
    //   this.shijian=false
    // },
    truea() {
      var choosetime=null,
      choosetime=this.year+"-"+this.month+"-"+this.day+" "+this.hour+":"+this.minute+":"+this.second;
        // console.log(choosetime)
      if(this.year!=""&&this.month!=""&&this.day!=""&&this.hour!=""&&this.minute!=""){
        // 一个发送数据的方法
        this.$emit("sendmsg",choosetime)
        // this.Thetime(choosetime)
      }
      else{this.toast("请选择正确的时间");}
    },
    chooseyear(item) {
      this.year = item;
    },
    choosemonth(item) {
      this.month = item;
    }, 
    chooseday(item) {
      this.day = item;
    },
    choosehour(item) {
      this.hour = item;
    },
    chooseminute(item) {
      this.minute = item;
    },
    },
    computed: {
         theYear() {
      var Year = [];
      for (let i = this.y; i <= this.y + 20; i++) {
        Year.push(i);
      }
      return Year;
    },
    theMonth() {
      var Month = [];
      if (this.year == this.y) {
        for (let i = this.m; i <= 12; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          Month.push(i);
        }
      } else {
        for (let i = 1; i <= 12; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          Month.push(i);
        }
      }
      return Month;
    },
    theDay() {
      var Day = [];
      // 当年月还没选中时候，页面循环的天数
      if(this.year==""||this.month=="") {
        for (let i = 1; i <=12 ; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          Day.push(i);
        }
      }
      else{
      var monthDays = [];
      if (
        (this.year % 4 == 0 && this.year % 100 != 0) ||this.year % 400 == 0
      ) {
        monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      } else {
        monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      }
      if (this.year == this.y&&this.month == this.m) {
        var Day = [];
        for (let i = this.d; i <=monthDays[this.month-1] ; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          Day.push(i);
        }
      }
      else{
        var Day = [];
        for (let i = 1; i <=monthDays[this.month-1] ; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          Day.push(i);
        }
      }
      }
      return Day;
    },
    theHours() {
      var Hours = [];
      if (this.year == this.y&&this.month == this.m&&this.day == this.d) {
        for (let i = this.h; i <= 23; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          Hours.push(i);
        }
      }else{
        for (let i = 0; i <= 23; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          Hours.push(i);
        }
      }
      return Hours;
    },
    theMinute(){
      var Minute = [];
      if (this.year == this.y&&this.month == this.m&&this.day == this.d&&this.hour == this.h) {
        for (let i = this.min; i <= 60; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          Minute.push(i);
        }
      }else{
        for (let i = 1; i <= 60; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          Minute.push(i);
        }
      }
      return Minute;
    },
    }
}
</script>
<style scoped>
/* 点击弹出框背景 */
.layout {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  /* 背景透明度 */
}
.data {
  width: 100%;
  position: fixed;
  bottom: 0rem;
  overflow: hidden;
  border-top: 0.01rem solid #f4f3f2;
  background-color: #ffffff;
}
.quedingNr {
  width: 100%;
  overflow: hidden;
  margin: 0.3rem 0rem;
  border-bottom: 0.01rem solid #f4f3f2;
}
.quedingNr p {
  height: 1rem;
  width: 1.8rem;
  line-height: 1rem;
  font-size: 0.5rem;
  text-align: center;
  color: #ffffff;
  background-color: #12b7f5;
  border-radius: 0.2rem;
  float: right;
  margin-right: 0.3rem;
  margin-bottom: 0.3rem;
}
.list {
  height: 4rem;
  margin-bottom: 0.5rem;
  font-size: 0.4rem;
  color: #a08484;
  flex: 1;
  float: left;
  text-align: center;
  overflow: hidden;
  overflow-y: scroll;
}
.list li {
  padding-top: 0.1rem;
}
.choosedata {
  color: #000;
  font-weight: bold;
  font-size: 0.5rem;
}
</style>