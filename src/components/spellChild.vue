<template>
  <div>
    <div class="userMessage" v-for="(item,index) in memberlist" :key="index">
      <img :src="item.Portrait" />
      <ul>
        <li style="">{{item.UserName}}</li>
        <li style="color: #8c8c8c;">部门：{{item.DepartmentName}}</li>
        <li style="color: #8c8c8c;">职位：{{item.PostName}}</li>
      </ul>
      <div class="coefficient">
        <p
          style="padding-right: 0.7rem;"
          :class="{'serial1':50<item.Ratio<60,'serial2':60<item.Ratio<80,'serial3':80<item.Ratio<100,}"
        >工作系数{{item.Ratio*100+"%"}}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    ProjectMemberList: {},
    spell: "",
    othername:Array
  }, //接收父组件传过来的值
  data() {
    return {};
  },
  computed: {
    memberlist() {
      // 定义一个新的数组  存放筛选后的数组
      let _memberlist = [];
      // 循环项目成员的数组
      for (let index = 0; index < this.ProjectMemberList.length; index++) {
        const element = this.ProjectMemberList[index];
        // 判断传过来的字母是否和项目成员里面的Spelling首字母相同
        if (element.Spelling[0] == this.spell) {
          //把符合的项插入新的数组
          _memberlist.push(element);
        }
        else if(this.spell=="#") {
          _memberlist=this.othername
        }
      }
      // 最后返回给新的数组
      return _memberlist;
    }
  },

  mounted() {
  }
};
</script>


<style scoped>
.nape {
  padding-left: 0.35rem;
  line-height: 1.5rem;
}
.userMessage {
  background-color: #ffffff;
  border-top: solid 0.01rem #e8e8e8;
  height: 2rem;
  font-size: 0.36rem;
}
.userMessage img {
  height: 1rem;
  width: 1rem;
  margin: 0.25rem 0.2rem 0 0.2rem;
  float: left;
  overflow: hidden;
}
.userMessage ul {
  padding-top: 0.3rem;
  float: left;
  overflow: hidden;
}
.coefficient {
  float: right;
  padding-top: 0.3rem;
  padding-right: 0.2rem;
  overflow: hidden;
}
.serial1 {
  color: #ffa800;
}
.serial2 {
  color: #59cf8b;
}
.serial3 {
  color: #12b7f5;
}
</style>
