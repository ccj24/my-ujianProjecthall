<template>
  <div class="index">
    <div class="content">
      <div class="writeRizhi">
        <div class="content_time">
          <p class="time_txt">日期：</p>
          <!-- <div class="dateinput">
            <input type="date" class="myDate" />
            <img class="time_icon" src="/static/img/time_icon.png" />
          </div> -->
          <!-- <picker 
          mode='data' 
          value='{{selectedProduceDate}}'
          start='{{startProduceDate}}'
          end='{{endProduceDate}}'
          fields='day'
          bindchange='dataChange'>
          <view>选择日前{{selectedProduceDate}}</view>
          </picker> -->
          
        </div>
        <!-- contenteditable="true"设计这是一个可编辑的 -->
        <div class="rich">
          <!-- maxlength设计最大字数 auto-height="ture"是高度随字数增加而增加-->
          <textarea placeholder="不能超过2000字" maxlength="2000" auto-height="ture"></textarea>
          </div>
        <div class="rizhi_box">
          <div class="rizhi">
            <div class="rizhi_img_box">
              <img class="rizhi_img" src="/static/img/myrizhi.png" />
            </div>
            <div class="rizhi_img_box">
              <img class="rizhi_img" src="/static/images/组30@3x.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// export default {
//   data() {
//     return {
//             selectDay:''
//         }
//     },
//     created() {
//         this.initData({});
//     },
//     methods: {
//         dataSearch() {
//       this.getListByDay();
//     },
//     async initData(data) {
//       //获取当前时间
//       var now   = new Date();
//       var monthn = now.getMonth()+1;
//       var yearn  = now.getFullYear();
//       var dayn = now.getDate();
//       this.selectDay = yearn+"-"+monthn+"-"+dayn;

//       this.selectUser = parseInt(sessionStorage.getItem("userid"));
//       this.getListByDay();
//     },
//     async getListByDay(data) {

//     }
//   }
// }
</script>
<style>
body {
  background: #f8f8f8;
}
.index .content {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  min-height: calc(100% + size(1));
}

.index .content .writeRizhi {
  background: #ffffff;
  /*焦点时内容为空*/
}

.index .content .writeRizhi .content_time {
  font-size: 0.37rem;
  padding: 0.37rem 0.33rem;
  overflow: hidden;
  border-bottom: 1px solid #e8e8e8;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.index .content .writeRizhi .content_time .time_txt {
  color: #999999;
  float: left;
  line-height: 0.85rem;
}

.index .content .writeRizhi .content_time .dateinput {
  float: left;
  position: relative;
}

.index .content .writeRizhi .content_time .dateinput .myDate {
  border: 0;
  width: 7.5rem;
  height: 0.85rem;
  outline: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  /*去掉系统自带点击事件阴影*/
  -webkit-touch-callout: none;
  -webkit-appearance: none;
  /*消除输入框和按钮的原生外观*/
  background-color: transparent;
  /*去掉原生背景色*/
  line-height: 0.85rem;
  padding: 0;
}

.index .content .writeRizhi .content_time .dateinput .time_icon {
  position: absolute;
  top: 0.34rem;
  right: 3rem;
  width: 0.42rem;
  height: 0.21rem;
  display: block;
}

.index .content .writeRizhi .rich {
  /* 给高度设置一个最低限制 */
  min-height: 2rem;
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

.index .content .writeRizhi .rich:empty:before {

  color: #999999; 
}

.index .content .writeRizhi .rich:focus:before {
  content: none;
}

.index .content .writeRizhi .rizhi_box {
  overflow: hidden;
  padding: 0 0.37rem;
}

.index .content .writeRizhi .rizhi_box .rizhi {
  float: left;
  margin-bottom: 0.3rem;
}

.index .content .writeRizhi .rizhi_box .rizhi .rizhi_img_box {
  float: left;
  margin-right: 0.3rem;
  margin-bottom: 0.3rem;
}

.index .content .writeRizhi .rizhi_box .rizhi .rizhi_img_box .rizhi_img {
  width: 2.27rem;
  height: 2.27rem;
  display: block;
}

.index .content .writeRizhi .rizhi_box .rizhi .rizhi_img_box:nth-child(4n) {
  margin-right: 0;
}
</style>
