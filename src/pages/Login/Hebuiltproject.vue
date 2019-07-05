<template>
  <div class="Hebuiltproject">
    <!-- 搜索功能 -->
    <div class="search">
      <input type="text" placeholder="请输入项目名称" v-model="ProjectName" @input="search">
      <img class="searchico" src="/static/images/Search.png">
    </div>
    <!-- 列表 -->
    <div class="Self-built">
      <ul v-for="(item,index) in filtrate" :key="index">
        <li style="overflow: hidden;" @click="go({path:'/pages/home/index',isTab: true})">
          <p style="float:left">{{item.ProjectName}}</p>
          <img style="float:right;" src="/static/images/details.png">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ProjectName:'',//搜索框功能
      filtrate: [], //筛选后的项目信息
      othersProjectList: [] //加入他建项目
    };
  },
  methods:{
   //搜索项目
    async search() {
      var that = this;
      var temp = that.filtrate;
      that.filtrate = []; //每次进来 清空数组 让筛选后的项目信息变为0
      if (that.ProjectName == "") {
        // 判断变量是否为空
        //为空的时候就将最原始获取筛选后的项目信息列表数据赋值给筛选数组
        that.filtrate = this.othersProjectList;
      } else {
        //否则就往里面进行搜索
        for (let index = 0; index < temp.length; index++) {
          var element = temp[index];
          //indexOf 方法可返回某个指定的字符串值在字符串中首次出现的位置
          //判断搜索的文字是否出现在element.ProjectName列表中 出现执行下面的语句，不出现返回-1
          if (element.ProjectName.indexOf(that.ProjectName) >= 0) {
            this.filtrate.push(element); //添加筛选列表里面
          }
        }
      }
    },
  },
  
  async mounted() {
    // 加入他建项目
    var res = await this.$UJAPI.Project_ProjectGetList({
      IsCreate: false,
      PageSize: 4
    });
    if (res.ret == 0) {
      this.othersProjectList = res.data;
      this.filtrate=this.othersProjectList;//把项目信息列表赋值给筛选后的项目信息数组
    }
  }
};
</script>

<style scoped>
.search {
  background-color: #ffffff;
  height: 1.5rem;
  overflow: hidden;
}
.search input {
  margin-top: 0.3rem;
  margin-left: 0.2rem;
  width: 9.6rem;
  border: solid 0.01rem #d7c1c1;
  border-radius: 0.15rem;
  padding-left: 0.8rem;
  font-size: 0.38rem;
}
.searchico {
  position: relative;
  top: -23px;
  left: 0.3rem;
  height: 0.6rem;
  width: 0.6rem;
}

.Self-built {
  color: #12b7f5;
  background-color: #ffffff;
  margin-top: 0.2rem;
  padding-left: 0.2rem;
  font-size: 0.46rem;
}
.Self-built ul {
  padding-top: 0.29rem;
  border-top: solid 0.05rem #f2f2f2;
  padding-bottom: 0.29rem;
}
.Self-built ul li img {
  height: 0.4rem;
  width: 0.4rem;
  padding-right: 0.2rem;
  padding-top: 0.1rem;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>