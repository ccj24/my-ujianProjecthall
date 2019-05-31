<template>
  <div class="ProjectVR">
    <div class="VRdisplay">
      <ul class="article" v-for="(item,index) in ProjectVideo" :key="index">
        <li>
          <video controls>
            <source :src="item.Videos" type="video/mp4">
            <!-- <source src="movie.ogg" type="video/ogg"> -->
          </video>
        </li>
        <li class="linkman">{{item.Title}}</li>
      </ul>
    </div>
    <div v-if="showexplain" class="explain">
       <img @click="clickexplain" src="/static/images/off.png" alt="">
       <p>u建将为你提供更专业的720全景服务，如有需要，欢迎照下面操作与我们联系。我们将在最短时间内进行回复。并且竭力提供最优良的服务</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showexplain:true, 
      ProjectVideo:[],  
    };
  },
  methods:{
   clickexplain(){
       this.showexplain=false;
   }
  },
  async mounted() {
    var than = this;
    var rep = await this.$UJAPI.Project_AerialVideo({
      Projectid: "70057154-a003-4815-b247-0fe887ab4469"
    });
    if(rep.ret==0){
        this.ProjectVideo=rep.data;
    }
    // console.log(this.ProjectVideo);
  }
};
</script>

<style scoped>
.article {
  margin-top: 0.2rem;
  color: #8c8c8c;
}
.linkman {
  padding-left: 0.4rem;
  padding-bottom: 0.2rem;
}
.article video {
  width: 10.8rem;
}
.VRdisplay {
 border-bottom: solid 0.01rem #e8e8e8;
 margin-bottom: 0.5rem;
}
.explain {
    margin-top: 0.8rem;
    border-top: #e8e8e8 solid 0.01rem;
    border-bottom: #e8e8e8 solid 0.01rem;
}
.explain img {
    width: 0.8rem;
    height: 0.8rem;
    float: right;
    padding-top: 0.2rem;
    padding-right: 0.2rem;
    padding-bottom: 0.2rem;
    overflow:hidden;
}
.explain p {
    float: left;
     color: #8c8c8c;
     padding-left:0.2rem;
     padding-right: 0.2rem;
     padding-bottom: 0.3rem;
}
</style>
