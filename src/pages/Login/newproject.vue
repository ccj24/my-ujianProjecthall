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
          <input type="text" placeholder="项目详细地址">
        </li>
        <li>
          <p>*</p>
          <input type="text" placeholder="姓名">
        </li>
        <li
          @click="go({path:'/pages/Login/Choiceprofessional'})"
          style="overflow: hidden;"
        >
          <p>*</p>
          <samp>选择职业</samp>
          <img
            style="width: 0.7rem;height: 0.8rem;float: right;padding-right: 0.5rem;"
            src="/static/images/details.png"
            alt
          >
        </li>
        <li style="overflow: hidden;">
          <p>*</p>
          <samp style=" width: 79%;">项目证明材料</samp>
          <div class="prove" style="float: right;">
            <img src="/static/images/Photo.png">
            <p>上传</p>
          </div>
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
    <div class="message-box-wrapper" @click.stop="checktanchuceng" v-if="ShowSite">
      <div class="address" @click.stop>
        <div class="roof">
          <p style="float: right;" @click="accomplish">完成</p>
        </div>
        <div class="drop-down" style="display:inline;">
          <ul style=" overflow: auto;overflow-x:scroll,">
            <li>广西</li>
            <li>广东</li>
            <li>云南</li>
            <li style="border-bottom: 0.01rem solid #d7c1c1;border-top: 0.01rem solid #d7c1c1;">北京</li>
            <li>香港</li>
            <li>上海</li>
            <li>深圳</li>
            <li>浙江</li>
            <li>江苏</li>
            <li>广西</li>
            <li>广东</li>
            <li>云南</li>
            <li>北京</li>
            <li>香港</li>
          </ul>
          <ul style="overflow: auto;">
            <li>广西</li>
            <li>广东</li>
            <li>云南</li>
            <li style="border-bottom: 0.01rem solid #d7c1c1;border-top: 0.01rem solid #d7c1c1;">北京</li>
            <li>香港</li>
            <li>上海</li>
            <li>深圳</li>
            <li>浙江</li>
            <li>江苏</li>
            <li>广西</li>
            <li>广东</li>
            <li>云南</li>
            <li>北京</li>
            <li>香港</li>
          </ul>
          <ul style="overflow: auto;">
            <li>广西</li>
            <li>广东</li>
            <li>云南</li>
            <li style="border-bottom: 0.01rem solid #d7c1c1;border-top: 0.01rem solid #d7c1c1;">北京</li>
            <li>香港</li>
            <li>上海</li>
            <li>深圳</li>
            <li>浙江</li>
            <li>江苏</li>
            <li>广西</li>
            <li>广东</li>
            <li>云南</li>
            <li>北京</li>
            <li>香港</li>
          </ul>
        </div>
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
    },
    accomplish() {
      this.ShowSite = false;
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
  padding-bottom: 0.1rem;
  font-size: 0.42rem;
}
.Projecthall li samp {
  font-size: 0.42rem;
  line-height: 0.82rem;
  width: 90%;
  padding-bottom: 0.1rem;
  float: left;
}
.Projecthall li {
  margin-top: 0.6rem;
  border-bottom: 0.01rem solid #d7c1c1
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
  margin-top: 1.5rem;
}
.btn {
  background-color: #12b7f5;
  color: #ffffff;
  width: 95%;
  border-radius: 0.2rem;
}
.prove img {
  width: 0.53rem;
  height: 0.38rem;
  float: left;
  margin-top: 0.2rem
}
.prove p {
  font-size: 0.42rem;
  color: #12b7f5;
  padding-right: 0.5rem;
  padding-top: 0.15rem;
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
  top: 10.4rem;
}
.roof {
  border-bottom: #d7c1c1 solid 0.01rem;
  padding-bottom: 0.1rem;
  padding-top: 0.2rem;
  overflow: hidden;
}
.roof p {
  padding-right: 0.4rem;
  color: #12b7f5;
}
.drop-down li {
  padding-bottom: 0.2rem;
  padding-left: 1.5rem;
}
.drop-down ul {
  float: left;
  height: 5rem;
  color: #d7c1c1;
  width: 33%;
}
</style>
