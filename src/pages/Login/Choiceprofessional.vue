<template>
  <div class="Choicecareer">
    <!-- 选择部门 -->
    <div class="selectbranch" @click="go({path:'/pages/Login/choicebranch'})">
      <p style="float:left;">选择部门：</p>
      <p style="float:left;color:#8c8c8c">{{chooseItem!=null?(chooseItem.ParentId==3?"施工单位分包-"+chooseItem.KeywordName:(chooseItem.KeywordId==3?"施工单位总包":chooseItem.KeywordName)):""}}</p>
      <div style="float: right;">
          <i class="icon">&#xe601;</i>
      </div>
    </div>
    <!-- 选择职位 -->
    <div class="selectbranch" @click="selectpost">
      <p style="float:left;">选择职位：</p>
      <p style="float:left;color:#8c8c8c">{{choosePostItem!=null?choosePostItem.KeywordName:""}}</p>
      <div style="float: right;">
          <i class="icon">&#xe601;</i>
      </div>
    </div>
    <!--选择人员 -->
    <div class="selectstaff">
      <p style="float:left;">选择人员：</p>
      <p>{{UserInfo.UserName}}</p>
    </div>
    <!-- 提交申请 -->
    <button v-if="PId" class="submitapplications" @click="putin">提交申请</button>
    <button v-else @click="$router.back()">确认</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PId:null,
    };
  },
  computed: {
    // 保存在state中的部门信息
    chooseItem() {
      return this.$store.state.Project.chooseItem; //返回值给store中的chooseItem
    },
    // 保存在state中的职位信息
    choosePostItem() {
      return this.$store.state.Project.choosePostItem; //返回值给store中的choosePostItem
    },
    // 获取当前用户的登录信息
    UserInfo(){
      return this.$store.state.User.UserInfo
    }
  },
  methods: {
    // 用户申请加入项目use_Apply
    async putin() {
      var that = this;
      var rep = await this.$UJAPI.use_Apply({
        //所属项目唯一标识
        ProjectId: this.PId,
        //参与用户在部门中的职位,数据来至tKeyword表KeywordId
        PostId: this.choosePostItem.KeywordId,
        //参与用户在项目中的哪个部门单位，数据来至tKeyword表KeywordId
        DepartmentId: this.chooseItem.KeywordId
      });
      if (rep.ret == 0) {
        this.toast("您的申请已经提交,请等待通知");
        this.$store.commit("setChooseItem", null);
        this.$store.commit("setChoosePostItem", null);
        //跳转到项目大厅
        this.replace({path:"/pages/Login/Projecthall"});
      }else
      {
        this.toast(rep.msg);
      }
    },
    selectpost(){
      if(this.chooseItem)
        this.go({path:'/pages/Login/Selectposition'});
      else
        this.toast("请选择部门")
    }

  },
  async mounted() {
    var that = this;
    this.PId = this.$route.query.ProjectId;
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
  /* margin-top: 0.6rem; */
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
  display: block;
  margin: auto;
  border: 0;
  line-height: 1rem;
  font-size: 0.5rem;
}
.icon{
  font-size: 0.7rem;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>