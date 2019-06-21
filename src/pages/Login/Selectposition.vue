<template>
  <div class="choicebranch">
    <!--某个单位对应的职位-->
    <div class="branchlist">
      <ul>
        <li @click="choose">
          <img v-if="checked==true" style="float:left" src="/static/images/noxuan.png">
          <img v-else style="float:left" src="/static/images/dan.png">
          <p>建设单位总工程</p>
        </li>
      </ul>
      <ul @click="choose">
        <li>
          <img v-if="checked==true" style="float:left" src="/static/images/noxuan.png">
          <img v-else style="float:left" src="/static/images/dan.png">
          <p>工程部经理</p>
        </li>
      </ul>
      <ul @click="choose">
        <li>
          <img v-if="checked==true" style="float:left" src="/static/images/noxuan.png">
          <img v-else style="float:left" src="/static/images/dan.png">
          <p>总监理工程师</p>
        </li>
      </ul>
      <ul @click="choose">
        <li>
          <img v-if="checked==true" style="float:left" src="/static/images/noxuan.png">
          <img v-else style="float:left" src="/static/images/dan.png">
          <p>工程副总</p>
        </li>
      </ul>
      <ul @click="choose">
        <li>
          <img v-if="checked==true" style="float:left" src="/static/images/noxuan.png">
          <img v-else style="float:left" src="/static/images/dan.png">
          <p>工程总监</p>
        </li>
      </ul>
      <ul @click="choose">
        <li>
          <img v-if="checked==true" style="float:left" src="/static/images/noxuan.png">
          <img v-else style="float:left" src="/static/images/dan.png">
          <p>土建工程师</p>
        </li>
      </ul>
      <ul @click="choose">
        <li>
          <img v-if="checked==true" style="float:left" src="/static/images/noxuan.png">
          <img v-else style="float:left" src="/static/images/dan.png">
          <p>水电工程师</p>
        </li>
      </ul>
      <ul @click="choose">
        <li>
          <img v-if="checked==true" style="float:left" src="/static/images/noxuan.png">
          <img v-else style="float:left" src="/static/images/dan.png">
          <p>装饰工程师</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    };
  },
  methods: {
    choose() {
      this.checked = !this.checked;
    }
  },
  async mounted(){
    
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