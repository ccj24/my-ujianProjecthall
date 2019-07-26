<template>
  <div class="redlistBg1">
    <div class="resortNr">
      <p class="redsortName">李青梅啊</p>
      <div class="resortPrice">
        ￥
        <i>2222</i>.00
      </div>
      <p class="resortText">广西建工集团装饰工程建设安全公55555555555555555555555555...</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.redlistBg1 {
  float: left;
  width: size(209);
  height: size(277);
  background-image: url(../img/NO.2.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  margin-right: size(10);
  overflow: hidden;
}
.resortNr {
  height: size(180);
  margin-top: size(88);
  padding-bottom: size(12);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.redsortName {
  color: #ffc4e5;
  font-size: fontSize(32);
  text-align: center;
}
.esortPricer {
  color: #ffffff;
  font-size: fontSize(28);
  text-align: center;
}
.resortPrice i {
  font-style: normal;
  font-size: fontSize(36);
  font-weight: 3000;
}
// b {
//   font-weight: normal;
//   font-size: fontSize(23);
// }

.resortText {
  padding: 0 size(16);
  font-size: fontSize(14);
  color: #ffbbf4;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.noresort {
  font-size: fontSize(36);
  color: #ffc4e5;
  text-align: center;
  margin-top: size(120);
}
</style>
