<template>
  <div class="Projectmember">
    <div class="chooseway">
      <button class="btn post" :class="{post1:postsort,spell:spellsort}" @click="Cutpostsort">岗位排序</button>
      <button class="btn" :class="{post1:spellsort,spell:postsort}" @click="Cutspellsort">拼音排序</button>
    </div>
    <div v-if="postsort">
      <div class="crewlist" v-for="(item,index) in mode" :key="index">
        <!-- <div @click="go({path:'/pages/home/details',query:{UserId:item1.UserId}})" v-for="(item1,index1) in ProjectMemberList" :key="index1"> -->
        <div class="nape">{{item.KeywordName}}</div>
        <Child :ProjectMemberList="ProjectMemberList" :ModelResponse="item"></Child>
        <!-- </div> -->
      </div>
    </div>

    <div v-if="spellsort">这里是拼音排序</div>
  </div>
</template>

<script>
import Child from "@/components/MemberChild";
export default {
  data() {
    return {
      spellsort: false,
      postsort: true,
      ModelResponse: [], //获取各部门
      ProjectMemberList: [] //项目成员
    };
  },
  methods: {
    Cutspellsort() {
      this.spellsort = true;
      this.postsort = false;
    },
    Cutpostsort() {
      this.spellsort = false;
      this.postsort = true;
    }
  },
  computed: {
    mode() {
      let _ModelResponse = [];
      for (let index = 0; index < this.ModelResponse.length; index++) {
        const element = this.ModelResponse[index];
        if (element.Depth == 1) {
          _ModelResponse.push(element);
        }
      }
      return _ModelResponse;
    },
    //小数转为百分之比
    coefficient() {}
  },
  async mounted() {
    var that = this;
    // 获取项目成员列表
    // this.$route.query.ProjectId
    var res = await this.$UJAPI.Project_ProjectMember({
      Projectid: this.$route.query.ProjectId
    });
    if (res.ret == 0) {
      this.ProjectMemberList = res.data;
    }
    // 获取部门
    var rep = await this.$UJAPI.Project_GetDepKeyword();
    if (rep.ret == 0) {
      this.ModelResponse = rep.data;
    }
  },
  components: {
    Child
  }
};
</script>

<style scoped>
.chooseway {
  height: 1.5rem;
  background-color: #ffffff;
}
.btn {
  margin: 0 auto;
  width: 3rem;
  float: left;
  height: 1rem;
  margin-top: 0.2rem;
  font-size: 0.4rem;
}
.post {
  margin-left: 20%;
}
.post1 {
  background-color: #f4f3f2;
}
.spell {
  background-color: #ffffff;
}
.crewlist {
  margin-top: 0.2rem;
  background-color: #ffffff;
}
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
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>