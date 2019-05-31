<template>
  <div>
    <div class="userMessage" v-for="(item,index) in memberlist" :key="index">
      <img :src="item.Portrait">
      <ul>
        <li style="color: #353535;">{{item.UserName}}</li>
        <li style="color: #8c8c8c;">岗位：{{item.PostName}}</li>
      </ul>
      <div class="coefficient">
        <p :class="{'serial1':50<item.Ratio<60,'serial2':60<item.Ratio<80,'serial3':80<item.Ratio<100,}">个人系数{{item.Ratio}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ProjectMemberList: [],
    ModelResponse: {}
  }, //接收父组件传过来的值
  data() {
    return {};
  },
  computed: {
    memberlist() {
      let _memberlist = [];
      for (let index = 0; index < this.ProjectMemberList.length; index++) {
        const element = this.ProjectMemberList[index];
        if (element.DepartmentId == this.ModelResponse.KeywordId) {
          var str = Number(element.Ratio * 100).toFixed(0);
          str += "%";
          element.Ratio=str;
          _memberlist.push(element);
        }
      }
      return _memberlist;
    }
  },
  async mounted() {
   
  }
};
</script>


<style scoped>
.nape {
  padding-left: 0.35rem;
  line-height: 1.5rem;
}
.userMessage {
  border-top: solid 0.1rem #fafafa;
  height: 1.5rem;
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
.serial1{
    color: #ffa800;
}
.serial2{
    color: #59cf8b;
}
.serial3{
    color: #12b7f5;
}

</style>
