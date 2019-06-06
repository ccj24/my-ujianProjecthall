<template>
  <div>
    <div class="Projecthall">
      <ul>
        <li>
          <p>*</p>
          <input type="text" placeholder="填写项目名称(长度5~50)">
        </li>
        <li>
          <p>*</p>
          <input @click="SelectSite" type="text" placeholder="项目所属省市县">
        </li>
        <li>
          <p>*</p>
          <input type="text" placeholder="项目详细地址)">
        </li>
        <li>
          <p>*</p>
          <input type="text" placeholder="姓名">
        </li>
        <li>
          <p>*</p>
          <input type="text" placeholder="选择职业">
        </li>
        <li>
          <p>*</p>
          <input type="text" placeholder="证明材料">
        </li>
      </ul>
      <!-- 注 -->
      <div class="infuse">注：*为必填</div>
      <!-- 说明 -->
      <div class="explain">请提供该项目真实性的相关材料照片，如“项目实地照片、项目名片、项目产权材料等”上述材料之一即可</div>
      <!-- 底部按钮 -->
      <div class="btm">
        <button class="btn">提交审核</button>
      </div>
    </div>

    <!-- 点击弹窗 -->
    <div class="message-box-wrapper" @click="checktanchuceng" v-if="ShowSite">
      <div class="address">
        <div>这里是显示地址</div>
      </div>
    </div>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      ShowSite: false
    };
  },
  methods: {
    SelectSite() {
      this.ShowSite = true;
    },
    checktanchuceng() {
      if ((this.ShowSite = true)) {
        this.ShowSite = false;
      }
    }
  }
};
</script>
 

<style scoped>
.Projecthall {
  background-color: #ffffff;
  margin-top: 1rem;
  margin-left: 0.5rem;
}
.Projecthall p {
  font-size: 0.82rem;
  float: left;
  color: red;
}

.Projecthall input {
  width: 90%;
  border-bottom: 0.01rem solid #d7c1c1;
  padding-bottom: 0.1rem;
  font-size: 0.42rem;
}
.Projecthall li {
  margin-top: 0.6rem;
}
.infuse {
  padding-top: 1rem;
  color: red;
  font-size: 0.42rem;
}
.explain {
  padding-top: 1rem;
  color: red;
  font-size: 0.42rem;
}
.btm {
  margin-top: 2.5rem;
}
.btn {
  background-color: #12b7f5;
  color: #ffffff;
  width: 95%;
  border-radius: 0.2rem;
}

/* 先定位 才能设置四个值得属性 居中定位 取消订单弹出框 */
.message-box-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.message-box-wrapper::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle; /*让行级元素垂直居中*/
}
.address {
  height: 6.5rem;
  background-color: #ffffff;
  position: relative;
  top: 11.4rem;
}
</style>
