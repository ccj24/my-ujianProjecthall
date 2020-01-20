<template>
    <div class="top_name" @click="show">
        <div :class="{namecolor:allname}">
            <p v-if="chooseindex==null ||name.length==0" class="top_name_p" >{{othername}}</p>
            <p v-else class="top_name_p" >{{name[chooseindex]}}</p>
            <span v-if="!allname" class="icon">&#xe632;</span>
            <span v-if="allname" class="icon" :class="{namecolor:allname}">&#xe6b0;</span>
        </div>
        <div class="thename" v-show="allname">
            <div class="rongqi">
                <div style="background-color: #fff;" v-for="(item,index) in name" :key="index" @click.stop="choose(index)" :class="{choosecolor:index==chooseindex}" >
                   <p class="name_p">{{item}}</p>
                </div>
            </div>
        </div>
       
    </div>
</template>
<script>
export default {
    props:{
        name:Array,
        othername:String,
    },
    data() {
        return{
            allname:false,
            chooseindex:null
        }
    },
    methods:{
        show() {
            this.allname=!this.allname
            this.$emit("theshow")
        },
        choose(index) {
            this.allname=false
            console.log( this.allname)
            this.chooseindex=index
            this.$emit("sendmsg",index)
            
        }
    }
}
</script>
<style scoped>
.top_name {
    flex: 1;
    padding: 0 0.2rem;
    overflow: hidden;
}
.top_name_p {
    float: left;
    text-align: center;
     width: 70%;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
}
.thename {
      position: fixed;
        top: 2.73rem;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.1);
}
.name_p {
    font-size: 0.4rem;
    height: 1.43rem;
    line-height: 1.43rem;
    border-bottom: 0.02rem solid #f4f3f4;
    padding: 0 0.3rem;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
}
.rongqi {
    opacity: 1;
    overflow: scroll;
    height: 100%;
}
.namecolor {
    color: #12b7f5
}
.choosecolor {
    background-color: #e8e8e8!important;
    border-left: 0.05rem solid #12b7f5
}
</style>