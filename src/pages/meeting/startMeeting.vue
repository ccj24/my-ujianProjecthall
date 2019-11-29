<template>
  <div>
    <div class="topNr">
      <span class="top_one">取消</span>
      <span class="top_two">确定发起</span>
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
    <div>
        <ul>
            <li></li>
        </ul>
    </div>
  </div>
</template>
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
</style>