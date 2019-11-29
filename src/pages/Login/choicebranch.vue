<template>
  <div class="choicebranch">
    <!--没有子集的单位部门-->
    <div class="branchlist">
      <ul>
        <li @click="choose(item)" v-for="(item,index) in mode" :key="index"  :class="{selected:chooseItem&&chooseItem.KeywordId==item.KeywordId}" v-if="item.KeywordName!='施工单位'">
          <img v-if="chooseItem&&chooseItem.KeywordId==item.KeywordId" style="float:left" src="/static/images/dan.png" />
          <img v-else style="float:left" src="/static/images/noxuan.png" />
          <p>{{item.KeywordName}}</p>
        </li>
      </ul>
      <ul>
        <li @click="showdepth2=!showdepth2">
          <i v-if="showdepth2" class="icon">&#xe601;</i>
          <i v-else class="icon">&#xe614;</i>
          <span>施工单位</span>
           <ul v-if="showdepth2">
              <li @click.stop="choose(shigongmode)" :class="{selected:chooseItem&&chooseItem.KeywordId==shigongmode.KeywordId}">
                <img v-if="chooseItem&&chooseItem.KeywordId==shigongmode.KeywordId" style="float:left" src="/static/images/dan.png" />
                <img v-else style="float:left" src="/static/images/noxuan.png" />
                <p>总包</p>
              </li>
              <li v-for="(item,index) in mode2" :key="index" @click.stop="choose(item)">
                <img v-if="chooseItem&&chooseItem.KeywordId==item.KeywordId" style="float:left" src="/static/images/dan.png" />
                <img v-else style="float:left" src="/static/images/noxuan.png" />
                <p>{{item.KeywordName}}</p>
              </li>
            </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ModelResponse: [], //部门数据
      showdepth2:false
    };
  },
  computed: {
    //筛选出来的一级部门数据
    mode() {
      let _ModelResponse = [];
      for (let index = 0; index < this.ModelResponse.length; index++) {
        const element = this.ModelResponse[index];
        if (element.Depth == 1) {//判断一级部门
          _ModelResponse.push(element);
        }
      }
      return _ModelResponse;
    },
    shigongmode(){
      var obj =  this.ModelResponse.find(item=>{
        return item.KeywordName=="施工单位"
      })
      return obj;
    },
    //筛选出来的二级部门数据
    mode2() {
      let _ModelResponse = [];
      for (let index = 0; index < this.ModelResponse.length; index++) {
        const element = this.ModelResponse[index];
        if (element.Depth == 2) {
          _ModelResponse.push(element);
        }
      }
      return _ModelResponse;
    },
    chooseItem() {
      return this.$store.state.Project.chooseItem; //返回值给store中的chooseItem
    }
  },
  methods: {
    choose(item) {
      //store用Mutation定义修改 ,然后用store.commit('xx') 触发
      this.$store.commit("setChooseItem", item);
      this.$store.commit("setChoosePostItem", null);
    }
  },
  async mounted() {
    var that = this;
    // 获取部门数据
    var rep = await this.$UJAPI.Project_GetDepKeyword();
    if (rep.ret == 0) {
      this.ModelResponse = rep.data;
    }
    if(this.chooseItem&&(this.chooseItem.KeywordId==3||this.chooseItem.ParentId==3))
    {
      this.showdepth2=true;
    }
  }
};
</script>


<style scoped>
.branchlist ul {
  line-height: 1.5rem;
  background-color: #ffffff;
}
.branchlist ul img {
  width: 0.55rem;
  height: 0.55rem;
  margin-top: 0.5rem;
  margin-right: 0.2rem;
}
.branchlist ul li{
  font-size: 0.46rem;
  padding-left: 0.2rem;
  border-bottom: solid 0.01rem #e8e8e8;
}
.branchlist ul li.selected{
  background-color: #e8e8e8;
}
.icon{
  display: inline-block;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>