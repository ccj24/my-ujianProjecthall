<template>
  <div>
    <div class="topall">
        <div class="top">
        <span style="margin-left:0.3rem" class="icon" @click="huitui">&#xe645;</span>
        <span class="theright" @click="invite">确认</span>
      </div>
      <div class="top_one">
        <drop :name="project_name" othername="项目" @sendmsg="getmsgone" @theshow="oneshow"></drop>
        <drop :name="Project_section" othername="部门" @sendmsg="getmsgtwo" @theshow="twoshow"></drop>
        <drop :name="position" othername="职位" @sendmsg="getmsgthree" @theshow="threeshow"></drop>
      </div>
    </div>
    
    <!-- 成员排序 -->
    <div class="allmeb">
      <div v-for="(itemx,index) in haszimu" :key="index" ref="thezimu" :id="itemx">
        <p class="thezimu ">{{itemx}}</p>
        <hasmenber :haseman="chooseman" :choosezimu="itemx"></hasmenber>
      </div>
    </div>
    <!-- 右侧字母 -->
    <ul class="rightzimu" v-if="haszimu.length!=0">
      <li v-for="(itemx,index) in haszimu" :key="index" ref="right"
       @click="chooseletter($event,itemx,index)" 
       @touchstart="handleTouchStart(index,$event)"
       @touchmove="handleTouchMove(index,$event)"
       @touchend="handleTouchEnd(index,$event)">{{itemx}}</li>
    </ul>
  </div>
</template>
<script>
import drop from "@/components/drop_down";
import hasmenber from "@/components/hasmenber";
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
      thechooser:0,
      zimu:["A","B","C","D","E","F","G","H","I","J","K","L","M",
      "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",],
      chooseman:[],
      haszimu:[],
      inviteman:[],
      zong_length:0,
      onedistance:0,
    };
  },
  methods: {
    async oneshow() {
      this.thechooser++
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
        this.thechooser++
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
         this.thechooser++
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
        this.thechooser++
      } else {
        this.toast(rep.msg);
      }
      //每次清空部门
       this.Project_section = [];
    },
    async getmsgtwo(date) {
      this.thechooser++
      this.choose=1
      this.twoindex = date;
      // 每次点击部门时候清空职位
      this.position=[]
    },
    getmsgthree(date) {
      this.thechooser++
      this.threeindex=date
      this.choose=2
    },
    huitui() {
      this.replace("/pages/task/addTask");
    },
    chooseletter(e,itemx,index) {
      if(this.isMP) {
        var query = wx.createSelectorQuery(); 
      query.select('#'+itemx).boundingClientRect()
       query.selectViewport().scrollOffset()
      query.exec(function (res) {
     //res就是 所有该标签的元素的信息的数组
    //  console.log(res[1].scrollTop)
    //  console.log(res[0].id)
     console.log(res);
     //取距离顶部高度
     var heigao=res[0].top+res[1].scrollTop-55-48;
    //  控制屏幕滑动距离
        wx.pageScrollTo({
        scrollTop: heigao,
        //  duration是画面滚动时长单位ms
        duration: 300
        });
      })
      }
      else {
      // this.$refs是获取所有节点操作的元素，加上.thezimu就是获取当前的元素
      var juli=this.$refs.thezimu
      // document.documentElement.scrollTop是屏幕滑动距离
      // offsetTop是当前元素距离定位父级的距离
      console.log(juli)
      console.log(juli[index].offsetTop)
      document.documentElement.scrollTop=juli[index].offsetTop
      }
    },
    // 字母滑动效果,人员跟着滑动
    handleTouchStart(index,e) {
    // 小程序获取滑动事件的信息是e.touches[0].clientY
      // this.onedistance =e.changedTouches[0].clientY
      // var thezimu=this.$refs.thezimu
      // this.zong_length=0
      // // 计算出人员所占的高度
      // for(let i=0;i<this.haszimu.length;i++) {
      //   this.zong_length=this.zong_length+thezimu[i].clientHeight
      // }
    },
    handleTouchMove(index,e) {
      var right=this.$refs.right
      // 右侧字母总高度 23是每个字母所占据的高度，因为每一项的高度相同，取其中一项就好
      var right_length=(right[0].clientHeight)*(this.haszimu.length)
      var huadong=e.changedTouches[0].clientY
      var theclientY=huadong-this.onedistance 
      document.documentElement.scrollTop=this.zong_length*(theclientY/right_length)
    },
    handleTouchEnd(index,e) {
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
  watch: {
    thechooser() {
          // 部门人员
     if (this.choose==1) {
        this.haszimu= [];
        var thell=[]
        var theman=[]
      for (let y = 0; y < this.allmember.length; y++) {
        if (
          this.allmember[y].DepartmentId ==this.Project_GetDepKeyword[this.twoindex].KeywordId
        ) {
          theman.push(this.allmember[y]);
        }
      }
      for(let y=0;y<this.zimu.length;y++) {
         for(let i =0; i<theman.length;i++) {
        // 截取名字的第一个字母
        var firstname=theman[i].Spelling.substring(0,1)
        if(firstname==this.zimu[y]) {
          this.haszimu.push(this.zimu[y])
              // 只要符合这个条件的  就结束它
          break;
        } 
      }
      }
      this.chooseman=theman
     }
// 职位人员
     else if (this.choose==2) {
       this.haszimu=[]
       var othertheman = [];
       for(let i=0;i<this.allmember.length;i++) {
         if (this.allmember[i].PostId==this.User_GetPostKeyword[this.threeindex].KeywordId) {
           othertheman.push(this.allmember[i]);
         }
       }
       for(let y=0;y<this.zimu.length;y++) {
         for(let i =0; i<othertheman.length;i++) {
        // 截取名字的第一个字母
        var firstname=othertheman[i].Spelling.substring(0,1)
        if(firstname==this.zimu[y]) {
          this.haszimu.push(this.zimu[y])
              // 只要符合这个条件的  就结束它
          break;
        } 
      }
      }
      this.chooseman= othertheman
     }
    //  项目人员
     else{
       this.haszimu=[]
       for(let y=0;y<this.zimu.length;y++) {
         for(let i =0; i<this.allmember.length;i++) {
        // 截取名字的第一个字母
        var firstname=this.allmember[i].Spelling.substring(0,1)
        if(firstname==this.zimu[y]) {
          this.haszimu.push(this.zimu[y])
          // 只要符合这个条件的  就结束它
          break;
        } 
      }
      }
      this.chooseman= this.allmember
     }
    }
  },
  // 注册组件
  components: {
    drop,
    hasmenber,
  },
  async mounted() {}
};
</script>
<style scoped>
.topall {
  z-index: 99;
  width: 100%;
  position: fixed;
    left: 0;
    top: 0;
    opacity: 1;
}
.top {
  width: 100%;
  height: 1.27rem;
  background-color: #12b7f5;
  line-height: 1.27rem;
  color: #fff;
  font-size: 0.46rem;
}
.theright {
  margin-left: 8.5rem
}
.top_one {
  font-size: 0.43rem;
  color: #c7c7cd;
  display: flex;
  height: 1.44rem;
  line-height: 1.44rem;
  border-bottom: 0.02rem solid #f4f3f4;
  background-color: #fff;
}
.allmeb{
  position: relative;
  top: 2.71rem;
  padding-bottom: 5rem;
}
.thezimu {
  height: 1rem;
  background-color: #e8e8e8;
  font-size: 0.4rem;
  padding-left: 1rem;
  line-height: 1rem;
}
.rightzimu {
  font-size: 0.5rem;
  display: flex;
  flex-direction :column;
  justify-content :center;
  position: fixed;
  top:3.7rem;
  right: 0rem;
  width :0.6rem;
  min-height: 7.5rem;
  /* background-color: #f4f3f2; */
}
.rightzimu li{
  line-height :0.8rem;
  text-align :center;
  color:aqua;
}
</style>