<template>
  <div class="index">
    <!-- 环保页面 -->
    <div class="content">
      <div class="environmental">
        <div class="enList" v-for="(item,index) in ProjectDetailedView.listInfo" :key="index">
          <div class="enListDot"></div>
          <div class="enListNr">
            <p class="enListP">{{item.txtTitle}}</p>
            <p class="enListP2">{{item.txtNum+item.txtUnit}}</p>
          </div>
        </div>
      </div>
      <div class="environmental_Hint">来源于网络</div>
    </div>
  </div>
</template>


<script>
import "../../assets/style.css";

export default {
  data() {
    return {};
  },
  computed: {
    //  获取保存在vuex中的环保数据
    ProjectDetailedView() {
      return this.$store.state.Project.ProjectDetailedView; //返回值给store中的ProjectDetailedView
    }
  },
  async mounted() {
    console.log(this.$store.state.Project.ProjectDetailedView);
  }
};
</script>

<style scoped>
</style>