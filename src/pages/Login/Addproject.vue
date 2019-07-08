<template>
  <div class="Addproject">
    <!-- 获取项目列表 -->
    <div class="searchmessage">
      <input type="number" v-model="isNullInput" @input="getInputValue" />
      <label class="marked">填写项目编号：</label>
      <img class="searchico" src="/static/images/Search.png" />
    </div>
    <!-- 输入框没输入数字的状态 灰色-->
    <button v-if="btnOK" class="btn">搜索项目</button>
    <!-- 输入框输入数字的状态 蓝色-->
    <button v-if="isOK" class="alterbtn" @click="searchproject">搜索项目</button>
    <!-- 提示 -->
    <div class="hint" v-if="hintshow" style=" color: #ffffff;">u建：找不到项目编号对应的项目信息。</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNullInput: null,
      isOK: false,
      btnOK: true,
      ProjectListView: [],
      hintshow: false,
      ProjectId: ""
    };
  },
  methods: {
    getInputValue() {
      //  判断如果输入不为空的话，让按钮的颜色变为蓝色
      if (this.isNullInput != "") {
        this.isOK = true;
        this.btnOK = false;
      }
      //  输入为空的话，让按钮的背景颜色变为灰色
      else {
        this.isOK = false;
        this.btnOK = true;
      }
    },
    // 项目搜索
    async searchproject() {
      var that = this;
      // Project_ProjectGetList 获取项目列表
      var rep = await this.$UJAPI.Project_ProjectGetList({
        ProjectNo: this.isNullInput
      });
      if (rep.ret == 0) {
        this.ProjectListView = rep.data;
        // 判断数组里面是否有 输进项目编号的这个项目  有的话就跳转到项目概况页面  没有就提示
        if (this.ProjectListView.length > 0) {
          // 实现页面跳转
          // this.go({
          //   path: "/pages/Login/Projectsituation",
          //   query: { ProjectListView: this.ProjectListView }
          // });

          this.$router.push({
            path: "/pages/Login/Projectsituation",
            query: { ProjectId: this.ProjectListView[0].ProjectId,Role: this.ProjectListView[0].Role }
          });
        }
        //数组中没有想要的项目 弹窗提示
        else {
          this.hintshow = true;
        }
      }
    }
  }
};
</script>


<style scoped>
.Addproject {
  margin-top: 0.3rem;
}
.searchmessage {
  background-color: #ffffff;
}
.searchmessage input {
  padding-top: 0.6rem;
  padding-left: 3.8rem;
}
.btn {
  margin-top: 0.51rem;
  background-color: #d7d7d7;
  color: #ffffff;
  border-radius: 0.1rem;
  width: 10rem;
  border: none;
}
.alterbtn {
  margin-top: 0.51rem;
  background-color: #12b7f5;
  color: #ffffff;
  border-radius: 0.1rem;
  width: 10rem;
  border: none;
}
.marked {
  position: relative;
  top: -25px;
  padding-left: 0.2rem;
}
.searchico {
  position: relative;
  top: -23px;
  left: 6rem;
  height: 0.6rem;
  width: 0.6rem;
}
.hint {
  margin-top: 2.5rem;
  margin-left: 0.9rem;
  width: 9rem;
  font-size: 0.52rem;
  border-radius: 0.2rem;
  text-align: center;
  line-height: 1rem;
  background-color: black;
}
</style>


<style>
page {
  background-color: #ecf0f1;
}
</style>