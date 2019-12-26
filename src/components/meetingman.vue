<template>
  <div >
    <div class="personnel-one">
      <div>
        <p style="color: #353535;" :class="{shijian:checkIndex!=0}">
          出席
          <span style="color: #c7c7cd;">（{{chuxi.length}} 人）</span>
        </p>
      </div>
      <span
        v-for="(items,indexx) in chuxi"
        :key="indexx"
      >{{items.UserName}}<span v-if="indexx+1<chuxi.length">，</span></span>
    </div>
    <div class="personnel-one">
      <div>
        <p style="color: #f43531;" :class="{shijian:checkIndex!=0}">
          缺席
          <span style="color: #c7c7cd;">（{{quexi.length}} 人）</span>
        </p>
      </div>
      <span
        v-for="(items,indexx) in quexi"
        :key="indexx"
      >{{items.UserName}}<span v-if="indexx+1<quexi.length">，</span></span>
    </div>
    <div class="personnel-one">
      <div>
        <p style="color: #ffc539;" :class="{shijian:checkIndex!=0}">
          未定
          <span style="color: #c7c7cd;">（{{weiding.length}} 人）</span>
        </p>
      </div>
      <span
        v-for="(items,indexx) in weiding"
        :key="indexx"
      >{{items.UserName}}<span v-if="indexx+1<weiding.length">，</span></span>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        partaket:Array,
        checkIndex:""
    },
    date() {
        return{
        }
    },
    computed:{
        weiding() {
            var weidingman=[]
            for(let i=0;i<this.partaket.length;i++){
                 if (this.partaket[i].State==0) {
                    weidingman.push(this.partaket[i])
                }
            }
            return weidingman
        },
        quexi() {
            var queximan=[]
            for(let i=0;i<this.partaket.length;i++){
                if (this.partaket[i].State==1) {
                    queximan.push(this.partaket[i])
                }              
            }
            return queximan
        }, 
        chuxi() {

            var chuximan=[]
            for(let i=0;i<this.partaket.length;i++){
                if (this.partaket[i].State==2) {
                    chuximan.push(this.partaket[i])
                }
            }
            return chuximan
        },
    }
};
</script>
<style scoped>
.personnel {
  width: 7.8rem;
  border-radius: 0.04rem;
  border: solid 0.02rem #e8e8e8;
  font-size: 0.37rem;
  color: #999999;
  overflow: hidden;
  padding: 0.32rem;
}
.personnel-one {
  padding-bottom: 0.25rem;
}
.shijian {
  color: #999999 !important;
}
</style>