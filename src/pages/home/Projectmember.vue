<template>
  <div class="Projectmember">
    <div class="chooseway">
      <button class="btn post" :class="{post1:postsort,spell:spellsort}" @click="Cutpostsort">岗位排序</button>
      <button class="btn" :class="{post1:spellsort,spell:postsort}" @click="Cutspellsort">拼音排序</button>
    </div>
    <!-- 岗位排序 -->
    <div v-if="postsort">
      <div class="crewlist" v-for="(item,index) in mode" :key="index">
        <div class="nape">{{item.KeywordName}}</div>
        <Child :ProjectMemberList="ProjectMemberList" :ModelResponse="item"></Child>
      </div>
    </div>

    <!-- 拼音排序 -->
    <div v-if="spellsort">
      <!-- 右侧字母 -->
      <div class="LetterFixation">
        <p v-for="(item,index) in filtrate" :key="index">{{item}}</p>
      </div>
      <div v-for="(item1,index1) in filtrate" :key="index1">
        <p class="letter">{{item1}}</p>
        <!-- ProjectMemberList和item1为传给子组件的参数 -->
        <!-- 使用组件spellChild 列表组件-->
        <spellChild :ProjectMemberList="ProjectMemberList" :spell="item1"></spellChild>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import spellChild from "@/components/spellChild";
import Child from "@/components/MemberChild";
export default {
  data() {
    return {
      Letters: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
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
    //筛选项目成员中人员的拼音的首字母  是否出现在列表中
    filtrate() {
      // 定义一个新的数组  把符合的项赋给新的数组
      let _Letters = [];
      // 循环26个拼音
      for (let index = 0; index < this.Letters.length; index++) {
        const element = this.Letters[index];
        // 循环项目成员
        for (let index = 0; index < this.ProjectMemberList.length; index++) {
          const member = this.ProjectMemberList[index];
          // 判断项目成员的 姓名拼音第一个字母是否在26个字母中出现
          if (member.Spelling[0] == element) {
            _Letters.push(element);
            // 只要符合这个条件的  就结束它
            break;
          }
        }
      }

      return _Letters;
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

  // 注册组件
  components: {
    Child,
    spellChild
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
.letter {
  font-size: 0.37rem;
  color: #353535;
  padding-left: 0.29rem;
  padding-top: 0.24rem;
}
.LetterFixation {
  position: fixed;
  right: 0.1rem;
  top: 3.67rem;
  bottom: 0;
  font-size: 0.29rem;
}
.LetterFixation p {
  padding-bottom: 0.1rem;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>