<template>
  <div class="Choicecareer">
    <!-- 选择部门 -->
    <div class="selectbranch" @click="go({path:'/pages/Login/choicebranch'})">
      <p style="float:left;">选择部门</p>
      <div style="float: right;">
        <p style="float:left;">{{chooseItem!=null?chooseItem.KeywordName:""}}</p>
        <img src="/static/images/details.png" alt />
      </div>
    </div>
    <!-- 选择职位 -->
    <div class="selectbranch" @click="go({path:'/pages/Login/Selectposition'})">
      <p style="float:left;padding-right:0.2rem;">选择职位:</p>
      <p style="float:left;color:#8c8c8c">工程部经理</p>
      <div style="float: right;">
        <img src="/static/images/details.png" alt />
      </div>
    </div>
    <!--选择人员 -->
    <div class="selectstaff">
      <p style="float:left;padding-right:0.2rem;">选择人员:</p>
      <p>{{UserInfo.UserName}}</p>
    </div>
    <!-- 提交申请 -->
    <button class="submitapplications">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ModelResponse: [] ,//获取各部门
      UserInfo: ""
    };
  },
  computed: {
     chooseItem(){
     debugger;
      return this.$store.state.Project.chooseItem;//返回值给store中的chooseItem
    }
  },
  async mounted() {
    var that = this;
    // 获取当前用户的登录信息
    var rep = await this.$UJAPI.User_Get({});
    if (rep.ret == 0) {
      this.UserInfo = rep.data;
    }

    // 获取部门
    var rep = await this.$UJAPI.Project_GetDepKeyword();
    if (rep.ret == 0) {
      this.ModelResponse = rep.data;
    }

  }
};
</script>


<style scoped>
.selectbranch {
  background-color: #ffffff;
  line-height: 1.5rem;
  padding-left: 0.19rem;
  margin-top: 0.21rem;
  overflow: hidden;
  font-size: 0.48rem;
}

.selectbranch img {
  width: 0.43rem;
  height: 0.43rem;
  margin-top: 0.6rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
.selectstaff {
  background-color: #ffffff;
  line-height: 1.5rem;
  padding-left: 0.19rem;
  overflow: hidden;
  font-size: 0.48rem;
  color: #8c8c8c;
  border-top: solid 0.01rem #e8e8e8;
}
.submitapplications {
  background-color: #12b7f5;
  border-radius: 0.2rem;
  color: #ffffff;
  margin-top: 0.9rem;
  width: 10rem;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>