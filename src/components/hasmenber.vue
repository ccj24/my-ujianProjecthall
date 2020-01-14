<template>
    <div>
        <div class="user" v-for="(item,index) in thezimu" :key="index" @click="checked(item,index)">
            <div v-if="item.xuanze==true" class="icon fuxuankuang" style="color:#12b7f5">&#xe618;</div>
            <div v-else class="icon fuxuankuang">&#xe62d;</div>
            <img :src="item.Portrait" alt />
            <p>{{item.UserName}}</p>
            <span>{{"职位："+item.PostName}}</span>
          </div>  
    </div>
</template>
<script>
export default {
    props:{
        haseman:Array,
        choosezimu:String
    },
    data() {
        return {
          themanber:[]
        }
    },
    methods:{
      checked(item,index) {
      item.xuanze = !item.xuanze;
      for(let i=0;i<this.haseman.length;i++) {
        if (this.haseman[i].UserId==item.UserId) {
          this.haseman.splice(i, 1,item)
          break
        }
      }     
    },
    },
    computed: {
      thezimu() {
        this.themanber=[]
        for(let i=0;i<this.haseman.length;i++) {
          var firstname=this.haseman[i].Spelling.substring(0,1)
          // 首字母与排列字母相同判断
          if(firstname==this.choosezimu) {
            this.themanber.push(this.haseman[i])
          }
        }
        return this.themanber
      } 
    },
    mounted() {
    }
}
</script>
<style scoped>

.user {
  width: 100%;
  height: 1.58rem;
  line-height: 1.58rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 0.01rem solid #e8e8e8;
  font-size: 0.46rem;
  color: #353535;
  /* 省略号 */
  text-overflow: ellipsis;
  /* 一行 */
  white-space: nowrap;
}
.xuanzhong {
  background-color: #e8e8e8;
}
.fuxuankuang {
  font-size: 0.53rem;
  margin-left: 0.27rem;
  margin-right: 0.21rem;
}
.user img {
  width: 1.05rem;
  height: 1.05rem;
  background-color: #000000;
  border-radius: 0.05rem;
  opacity: 1;
  margin-right: 0.28rem;
}
.user span {
  font-size: 0.37rem;
  color: #c9c9c9;
  margin-left: 0.57rem;
  margin-right: 0.3rem;
  overflow: hidden;
  /* 省略号 */
  text-overflow: ellipsis;
}
</style>