<template>
  <div class="choicebranch">
    <!--没有子集的单位部门-->
    <div class="branchlist">
      <ul v-for="(item,index) in mode" :key="index">
        <li @click="choose(item)">
          <img v-if="chooseItem&&chooseItem.KeywordId==item.KeywordId" style="float:left" src="/static/images/dan.png">
          <img  v-else style="float:left" src="/static/images/noxuan.png">
          <p>{{item.KeywordName}}</p>
        </li>
      </ul>
    </div>
    <!-- 有子集的单位部门 -->
    <!-- <div class="branchlist" style="margin-top: 0.3rem;">
      <ul>
        <li>
          <img style="float:left" src="/static/images/xc_xialan.png">
          <p>施工单位</p>
        </li>
      </ul>
      <ul @click="choose" style="padding-left: 1.4rem;">
        <li>
          <img v-if="checked==true" style="float:left" src="/static/images/noxuan.png">
          <img v-else style="float:left" src="/static/images/dan.png">
          <p>分项工程</p>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      ModelResponse: [] //获取各部门
    };
  },
  computed: {
    mode() {
      let _ModelResponse = [];
      for (let index = 0; index < this.ModelResponse.length; index++) {
        const element = this.ModelResponse[index];
        if (element.Depth == 1) {
          //判断它是否属于父级   属于父级的话就赋值给
          _ModelResponse.push(element);
        }
      }
      return _ModelResponse;
    },
    chooseItem(){
      return this.$store.state.Project.chooseItem;//返回值给store中的chooseItem
    }
  },
  methods: {
    choose(item) {
      this.$store.commit("setChooseItem", item);
    }
  },
  async mounted() {
    var that = this;
    // 获取部门
    var rep = await this.$UJAPI.Project_GetDepKeyword();
    if (rep.ret == 0) {
      this.ModelResponse = rep.data;
    }
    
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
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>