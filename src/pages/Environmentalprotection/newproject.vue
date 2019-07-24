<template>
<div>
  <div class="top">
    <img class="top_img" src="http://img.redocn.com/sheying/20181228/daxingzhuangji_9997103.jpg" />
    <div class="message">
      <div class="content">
        <div class="one">
          <div class="one_1">编号:10088</div>
          <div class="one_2">
            <div class="img_1">
              <img src="/static/images/Podium.png" />
            </div>
            <p class="entity">实体施工</p>
          </div>
          <div class="one_3">
            <img class="img_2" src="/static/img/homePage_attestation.png" />
            <div class="jianguan">监管</div>
            <div class="baoxian">保险</div>
          </div>
        </div>
        <div class="title">南宁市园博园项目建筑工程标段东盟馆、游客服务中心、商业街...</div>
        <div class="touxiang">
          <img
            src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1563699260&di=746cade57d938027b6b70f2bf494351e&src=http://pic1.win4000.com/pic/d/d4/181b859948.jpg_195.jpg"
          />
          <div class="manager">项目经理...</div>
          <div class="coefficient">
            <p>工作系数</p>
            <div class="coefficient_1">44%</div>
          </div>
        </div>
        <div class="items">
          <div class="items_one">
            <span>项目成员</span>
            <span class="number">9999人</span>
          </div>
          <div class="items_two">
            <img src="/static/img/homePage_personIcon.png" />
            <span>项目圈</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped>
.top {
  width: 100%;
  height: 6.9rem;
  position: relative;
}
.top_img {
  width: 100%;
  height: 4.86rem;
  /* 图片使用块元素 */
  display: block;
}
.message {
  /* 绝对定位，只需设计message距离上边的50%，
    不需要设计其宽，只要距离左右距离 */
  position: absolute;
  left: 0.19rem;
  right: 0.19rem;
  top: 2.39rem;
  background-color: #ffffff;
  box-shadow: 0rem 0rem 0.24rem 0rem rgba(0, 0, 0, 0.15);
  border-radius: 0.1rem;
}
.content {
  margin-left: 0.52rem;
  margin-right: 0.48rem;
  margin-top: 0.63rem;
  /* 容器内内容防止溢出 */
  overflow: hidden;
}
.one {
  overflow: hidden;
}
.one_1 {
  float: left;
  font-size: 0.3rem;
  line-height: 0.43rem;
  color: #666464;
}
.one_2 {
  float: left;
  overflow: hidden;
  padding-left: 0.74rem;
  /* 在父级设计 align-items即是设计垂直方向的对齐方式*/
  display: flex;
  align-items: center;
}
.img_1 img {
  float: left;
  width: 0.27rem;
  height: 0.27rem;
  background-color: #9c9c9c;
  /* 图片设计为块元素 */
  display: block;
}
.entity {
  font-size: 0.3rem;
  line-height: 0.43rem;
  color: #57bfc1;
  padding-left: 0.08rem;
}
.one_3 {
  overflow: hidden;
  font-size: 0.23rem;
  line-height: 0.41rem;
  padding-left: 0.4rem;
}
.img_2 {
  float: left;
  width: 0.28rem;
  height: 0.33rem;
}
.jianguan {
  float: left;
  background-color: #f1914a;
  border-radius: 0.08rem;
  line-height: 0.32rem;
  margin-left: 0.1rem;
}
.baoxian {
  float: left;
  background-color: #8f82bc;
  border-radius: 0.08rem;
  line-height: 0.32rem;
  margin-left: 0.06rem;
}
.title {
  font-size: 0.46rem;
  line-height: 0.52rem;
  color: #333333;
  margin-top: 0.53rem;
  margin-right: 2.5rem;
}
.touxiang {
  float: right;
  /* 给整体的div盒子定位 */
  position: absolute;
  top: 0.48rem;
  right: 0.48rem;
}
.touxiang img {
  width: 1.94rem;
  height: 1.96rem;
  /* 圆弧度为50% */
  border-radius: 50%;
}
.manager {
  height: 0.4rem;
  background-color: #12b7f5;
  border-radius: 0.1rem;
  font-size: 0.25rem;
  line-height: 0.43rem;
  color: #ffffff;
  /* 设计div水平方向居中 */
  display: flex;
  flex-direction: row; /*这里可以不写，flex布局默认方向横向即row*/
  justify-content: center;
}
.coefficient {
  font-size: 0.26rem;
  line-height: 0.43rem;
  color: #a7a7a7;
  /* 设计div水平方向居中 */
  display: flex;
  flex-direction: row; /*这里可以不写，flex布局默认方向横向即row*/
  justify-content: center;
}
.coefficient_1 {
  float: right;
  color: #4cb2eb;
  padding-left: 0.18rem;
}
.items {
  overflow: hidden;
  margin-top: 0.41rem;
  margin-bottom: 0.58rem;
}
.items_one {
  font-size: 0.34rem;
  line-height: 1.05rem;
  background-color: #ffffff;
  border-radius: 0.15rem;
  border: solid 0.02rem #16b2f2;
  color: #16b2f2;
  float: left;
}
.items span {
  padding-left: 0.23rem;
}
.number {
  padding-right: 0.23rem;
}
.items_two {
  float: left;
  font-size: 0.34rem;
  line-height: 1.05rem;
  background-color: #ffffff;
  border-radius: 0.15rem;
  border: solid 0.02rem #f8a630;
   /* 在父级设计 align-items即是设计垂直方向的对齐方式*/
  display: flex;
  align-items: center;
  color: #f8a630;
  margin-left: 0.49rem;
}
.items_two img {
  width: 0.63rem;
  height: 0.39rem;
  padding-left: 0.3rem;
}
.items_two span {
  padding-right: 0.4rem;
}
</style>