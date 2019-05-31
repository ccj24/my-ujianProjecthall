<script>

export default {
  created () {
    // `this` 指向 vm 实例
    //debugger
   // console.log('this is: ' + this, 'vue触发的 created')
  },
  mounted(){
    //同上
  },
  onShow () {
    // `this` 指向 vm 实例
    //debugger
   // console.log('this is: ' + this, '小程序触发的 onshow')
  },
  onLoad(){
    //同上
  },
}
</script>

<style>
@import url('./assets/global.css');
@import url('./assets/iconfont.less');
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 50px 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
page{
  /* background: #ecf0f1; */
  /* margin-bottom: 45px; */
}
</style>
