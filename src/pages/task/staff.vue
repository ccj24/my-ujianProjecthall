<template>
  <div>
    <div class="topall" id="top">
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
      <div v-for="(itemx,index) in haszimu" :key="index" ref="thezimu" :id="itemx=='#'?'_':itemx ">
        <p class="thezimu ">{{itemx}}</p>
        <hasmenber :haseman="chooseman" :Specialman="Specialman" :choosezimu="itemx"></hasmenber>
      </div>
    </div>
    <rightletter :haszimu="haszimu" @change="valuation"></rightletter>
  </div>
</template>
<script>
import drop from "@/components/drop_down";
import hasmenber from "@/components/hasmenber";
import rightletter from "@/components/rightletter";
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
      "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      chooseman:[],
      Specialman:[],
      haszimu:[],
      inviteman:[],
      oneletter:"",
      chooseindex:0,
      onelettershow:false,
    };
  },
  methods: {
    async oneshow() {
      // this.thechooser++
      //   项目
      var theproject_name=[]
      var that = this;
      var rep = await this.$UJAPI.Project_ProjectGetList({
        IsCreate: null
      });
      if (rep.ret == 0) {
        this.Project_ProjectGetList = rep.data;
        for (let i = 0; i < this.Project_ProjectGetList.length; i++) {
          theproject_name.push(this.Project_ProjectGetList[i].ProjectName);
        }
        this.project_name=theproject_name
      } else {
        this.toast(rep.msg);
      }
    },
    async twoshow() {
      if (this.oneindex!=null) {
        // this.thechooser++
        var theProject_section=[]
      //   部门
      if (this.project_name.length!=0) {
        var rep1 = await this.$UJAPI.Project_GetDepKeyword({
        ParentId: 0
      });
      if (rep1.ret == 0) {
        this.Project_GetDepKeyword = rep1.data;
        for (let i = 0; i < this.Project_GetDepKeyword.length; i++) {
          theProject_section.push(this.Project_GetDepKeyword[i].KeywordName);
        }
        this.Project_section=theProject_section
      } else {
        this.toast(rep.msg);
      }
      }
      }
    },
    async threeshow() {
       //   职位
       if (this.twoindex!=null) {
        //  this.thechooser++
        var theposition=[]
      var that = this;
      var rep1 = await this.$UJAPI.User_GetPostKeyword({
        ParentId: this.Project_GetDepKeyword[this.twoindex].KeywordId
      });
      if (rep1.ret == 0) {
        this.User_GetPostKeyword = rep1.data;
        for (let i = 0; i < this.User_GetPostKeyword.length; i++) {
          theposition.push(this.User_GetPostKeyword[i].KeywordName);
        }
        this.position=theposition
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
       this.position=[]
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
    // 选中字母赋值
    valuation(k,e) {
      this.chooseindex=k
      this.oneletter=e
    },
    invite() {
      var invitee=[]
      for(let i=0;i<this.allmember.length;i++) {
        if(this.allmember[i].xuanze==true)
        invitee.push(this.allmember[i]);
      }
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
    },
    // 同样代码优化
    chooseletter(personnel) {
      var otherman=[]
      for(let y=0;y<this.zimu.length;y++) {
         for(let i =0; i<personnel.length;i++) {
        // 截取名字的第一个字母
        var firstname=personnel[i].Spelling.substring(0,1)
        
        if(firstname==this.zimu[y]) {
          this.haszimu.push(this.zimu[y])
          // 只要符合这个条件的  就结束它
          break;  
        } 
      }
      }
      for(let i =0; i<personnel.length;i++) {
        var nameASCII=(personnel[i].Spelling.substring(0,1)).charCodeAt()
        if(nameASCII<65||nameASCII>90) {
         otherman.push (personnel[i])
        }
      }
      if(otherman.length>0) {
        this.haszimu.push("#")
      }
      this.Specialman=otherman
    }
  },
  watch: {
    thechooser() {
          // 部门人员
     if (this.choose==1) {
        this.haszimu= [];
        var theman=[]
      for (let y = 0; y < this.allmember.length; y++) {
        if (
          this.allmember[y].DepartmentId ==this.Project_GetDepKeyword[this.twoindex].KeywordId
        ) {
          theman.push(this.allmember[y]);
        }
      } 
      // 调用方法
      this.chooseletter(theman) 
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
      // 调用方法
      this.chooseletter(othertheman) 
      this.chooseman= othertheman
     }
    //  项目人员
     else{
       this.chooseman= this.allmember
       this.haszimu=[]
       // 调用方法
      this.chooseletter(this.allmember) 
     }
    },
    // 监听字母变化
  oneletter() {
      if(this.oneletter) {
        console.log("watch")
        if(this.isMP) {
          // debugger
          console.log(this.oneletter)
            var query = wx.createSelectorQuery(); 
            // 因为#特殊字符绑定的iD会冲突
            query.select('#'+(this.oneletter=='#'?'_':this.oneletter)).boundingClientRect()
            query.select('#top').boundingClientRect()
            query.selectViewport().scrollOffset()
            query.exec(function (res) {
          //res就是 所有该标签的元素的信息的数组
          //取距离顶部高度
          console.log(res)
          var Sliding=res[0].top+res[2].scrollTop-res[1].height
          //  控制屏幕滑动距离
          wx.pageScrollTo({
          scrollTop:Sliding,
          // //  duration是画面滚动时长单位ms
          // duration: 20
          });
      })
        }
        else{
          const elment = this.$refs.thezimu[this.chooseindex].offsetTop
           window.pageYOffset =elment
           document.documentElement.scrollTop =elment
           
           document.body.scrollTop =elment
        }
      }
    }
  },
  // 注册组件
  components: {
    drop,
    hasmenber,
    rightletter,
  },
  computed:{
    // aa() {
    //   var otherman=this.allmember.slice()
    //   for (let i=0;i<this.allmember.length;i++) {
    //      for (let i=0;y<otherman.length;i++) {
        
    //   }
    //   }
    // }
  },
  async mounted() {

  }
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
  top:40%;
  right: 0rem;
  width :0.6rem;
  /* min-height: 7.5rem; */
  /* background-color: #f4f3f2; */
}
.rightzimu li{
  line-height :0.8rem;
  text-align :center;
  color:aqua;
}
.oneletter {
  height: 1.5rem;
  width: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  font-size: 0.7rem;
  border-radius: 50%;
  background-color: #ff6c6c;
  color:#fff;
  position: fixed;
  top: 4rem;
  right: 2rem;
}
</style>