<template>
  <div style="overflow: hidden;">
    <div class="top">
      <span class="icon" @click="huitui">&#xe645;</span>
      <span style="margin-left:8.5rem" @click="invite">确认</span>
    </div>
    <div class="top_one">
      <drop :name="project_name" othername="项目" @sendmsg="getmsgone" @theshow="oneshow"></drop>
      <drop :name="Project_section" othername="部门" @sendmsg="getmsgtwo" @theshow="twoshow"></drop>
      <drop :name="position" othername="职位" @sendmsg="getmsgthree" @theshow="threeshow"></drop>
    </div>
    <!-- 成员排序 -->
    <div>
      <div class="user" v-for="(item,index) in theallmember" :key="index" @click="checked(item,index)">
        <div v-if="item.xuanze==true" class="icon fuxuankuang" style="color:#12b7f5">&#xe618;</div>
        <div v-else class="icon fuxuankuang">&#xe62d;</div>
        <img :src="item.Portrait" alt />
        <p>{{item.UserName}}</p>
        <span>{{"职位："+item.PostName}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import drop from "@/components/drop_down";
export default {
  data() {
    return {
      Project_ProjectGetList: [],
      project_name: [],
      Project_GetDepKeyword: [],
      Project_section: [],
      User_GetPostKeyword: [],
      position: [],
      oneindex: null,
      twoindex: null,
      threeindex:null,
      allmember: [],
      choose:0,
    };
  },
  methods: {
    async oneshow() {
      //   项目
      this.project_name=[]
      var that = this;
      var rep = await this.$UJAPI.Project_ProjectGetList({
        IsCreate: null
      });
      if (rep.ret == 0) {
        this.Project_ProjectGetList = rep.data;
        for (let i = 0; i < this.Project_ProjectGetList.length; i++) {
          this.project_name.push(this.Project_ProjectGetList[i].ProjectName);
        }
      } else {
        this.toast(rep.msg);
      }
    },
    async twoshow() {
      if (this.oneindex!=null) {
        this.Project_section=[]
      //   部门
      if (this.project_name.length!=0) {
        var rep1 = await this.$UJAPI.Project_GetDepKeyword({
        ParentId: null
      });
      if (rep1.ret == 0) {
        this.Project_GetDepKeyword = rep1.data;
        for (let i = 0; i < this.Project_GetDepKeyword.length; i++) {
          this.Project_section.push(this.Project_GetDepKeyword[i].KeywordName);
        }
      } else {
        this.toast(rep.msg);
      }
      }
      }
    },
    async threeshow() {
       //   职位
       if (this.twoindex!=null) {
         this.position=[]
      var that = this;
      var rep1 = await this.$UJAPI.User_GetPostKeyword({
        ParentId: this.Project_GetDepKeyword[this.twoindex].KeywordId
      });
      if (rep1.ret == 0) {
        this.User_GetPostKeyword = rep1.data;
        for (let i = 0; i < this.User_GetPostKeyword.length; i++) {
          this.position.push(this.User_GetPostKeyword[i].KeywordName);
        }
      } else {
        this.toast(rep.msg);
      }
       }
    },
    async getmsgone(date) {
      this.choose=0
      this.oneindex = date;
       var ProjectId = this.Project_ProjectGetList[this.oneindex].ProjectId;
      var rep = await this.$UJAPI.ProjectMember_Get({
        ProjectId: ProjectId
      });
      if (rep.ret == 0) {
        this.allmember = rep.data;
      } else {
        this.toast(rep.msg);
      }
      //每次清空部门
       this.Project_section = [];
    },
    async getmsgtwo(date) {
      this.choose=1
      this.twoindex = date;
      // 每次点击部门时候清空职位
      this.position=[]
    },
    getmsgthree(date) {
      this.threeindex=date
      this.choose=2
    },
    checked(item, index) {
      item.xuanze = !item.xuanze;
      for(let i=0;i<this.allmember.length;i++) {
        if (this.allmember[i].UserId==item.UserId) {
          this.allmember.splice(i, 1,item)
          break
        }
      }     
    },
    huitui() {
      this.replace("/pages/task/addTask");
    },
    invite() {
      var invitee=[]
      console.log(this.allmember)
      for(let i=0;i<this.allmember.length;i++) {
        if(this.allmember[i].xuanze==true)
        invitee.push(this.allmember[i]);
      }
      console.log(invitee)
      if (invitee.length==0) {
        this.toast("还没邀请人员喔");
      }
      else{
        //把选中的存储到vuex里面
          this.$store.commit("taskman", invitee);
          this.$router.push({
        path: "/pages/task/addTask",
        query: {
          ProjectId: this.Project_ProjectGetList[this.oneindex].ProjectId
        }
      });
      }
    }
  },
  computed: {
    theallmember() {
          // 部门人员
     if (this.choose==1) {
        var theman = [];
      for (let y = 0; y < this.allmember.length; y++) {
        if (
          this.allmember[y].DepartmentId ==this.Project_GetDepKeyword[this.twoindex].KeywordId
        ) {
          theman.push(this.allmember[y]);
        }
      }
      return theman
     }
// 职位人员
     else if (this.choose==2) {
       var othertheman = [];
       for(let i=0;i<this.allmember.length;i++) {
         if (this.allmember[i].PostId==this.User_GetPostKeyword[this.threeindex].KeywordId) {
           othertheman.push(this.allmember[i]);
         }
       }
      return othertheman
     }
    //  项目人员
     else{
      return this.allmember
     }
     
    }
  },
  // 注册组件
  components: {
    drop
  },
  async mounted() {}
};
</script>
<style scoped>
.top {
  width: 100%;
  height: 1.27rem;
  background-color: #12b7f5;
  line-height: 1.27rem;
  color: #fff;
  font-size: 0.46rem;
  padding: 0 0.3rem;
}
.top_one {
  font-size: 0.43rem;
  color: #c7c7cd;
  display: flex;
  height: 1.44rem;
  line-height: 1.44rem;
  border-bottom: 0.02rem solid #f4f3f4;
}
.user {
  width: 100%;
  height: 1.58rem;
  line-height: 1.58rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 0.01rem solid #e8e8e8;
  font-size: 0.46rem;
  color: #353535;
  overflow: hidden;
  /* 省略号 */
  text-overflow: ellipsis;
  /* 一行 */
  white-space: nowrap;
}
.xuanzhong {
  background-color: #e8e8e8;
}
.fuxuankuang {
  font-size: 0.53rem;
  margin-left: 0.27rem;
  margin-right: 0.21rem;
}
.user img {
  width: 1.05rem;
  height: 1.05rem;
  background-color: #000000;
  border-radius: 0.05rem;
  opacity: 1;
  margin-right: 0.28rem;
}
.user span {
  font-size: 0.37rem;
  color: #c9c9c9;
  margin-left: 0.57rem;
  margin-right: 0.3rem;
  overflow: hidden;
  /* 省略号 */
  text-overflow: ellipsis;
}
</style>