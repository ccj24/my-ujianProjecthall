<template>
  <div class="choicebranch">
    <!--某个部门对应的职位-->
    <div class="branchlist">
      <ul>
        <li @click="choose(item)" v-for="(item,index) in PostKeyword" :key="index">
          <img
            v-if="choosePostItem&&choosePostItem.KeywordId==item.KeywordId"
            style="float:left"
            src="/static/images/dan.png"
          />
          <img v-else style="float:left" src="/static/images/noxuan.png" />
          <p>{{item.KeywordName}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      PostKeyword: []
    };
  },

  computed: {
    choosePostItem() {
      return this.$store.state.Project.choosePostItem; //返回值给store中的choosePostItem
    }
  },

  methods: {
    choose(item) {
      //store用Mutation定义修改 ,然后用store.commit('xx') 触发
      this.$store.commit("setChoosePostItem", item);
    }
  },
  async mounted() {
    
    var that = this;
    
    var rep = await this.$UJAPI.User_GetPostKeyword({
      ParentId: this.$store.state.Project.chooseItem.ParentId>0?this.$store.state.Project.chooseItem.ParentId:this.$store.state.Project.chooseItem.KeywordId
    });
    if (rep.ret == 0) {
      this.PostKeyword = rep.data;
    }
    console.log(this.PostKeyword);
  }
};
</script>


<style scoped>
.branchlist ul {
  line-height: 1.5rem;
  background-color: #ffffff;
  border-top: solid 0.01rem #e8e8e8;
}
.branchlist ul img {
  width: 0.55rem;
  height: 0.55rem;
  margin-top: 0.5rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}

.branchlist ul li{
  font-size: 0.46rem;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>