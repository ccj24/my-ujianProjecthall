<template>
  <div class="backHome" :class="{action:show}" @click="click_backHome">
    {{show?"隐藏":"展开"}}
    <div class="tool_item" @click="go({path:'/pages/Login/Projecthall', reLaunch: true})">回主页</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    click_backHome() {
      this.show = !this.show;
    }
  }
};
</script>
<style scoped>

.backHome {
  position: fixed;

  right: -1rem;
  bottom: 0;
  background-color: #12b7f5;
  color: #fff;
  font-size: 0.4rem;
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  border-radius: 50%;
  z-index: 2;
  animation: hide 1s;
  -moz-animation: hide 1s; /* Firefox */
  -webkit-animation: hide 1s; /* Safari 和 Chrome */
  -o-animation: hide 1s;
}
.backHome .tool_item {
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  position: absolute;
  border-radius: 50%;
  top: 0;
  left: 0;
  z-index: 1;
  display: none;
  animation: hideItem 0.5s;
  -moz-animation: hideItem 0.5s; /* Firefox */
  -webkit-animation: hideItem 0.5s; /* Safari 和 Chrome */
  -o-animation: hideItem 0.5s;
}

.backHome.action {
  right: 0;
  animation: show 1s;
  -moz-animation: show 1s; /* Firefox */
  -webkit-animation: show 1s; /* Safari 和 Chrome */
  -o-animation: show 1s;
}
.backHome.action .tool_item {
  display: block;
  background-color: #12b7f5;
  color: #fff;
    top: -1.5rem;
    left: -0.5rem;
  animation: showItem 0.5s;
  -moz-animation: showItem 0.5s; /* Firefox */
  -webkit-animation: showItem 0.5s; /* Safari 和 Chrome */
  -o-animation: showItem 0.5s;
}
@keyframes showItem {
  from {
    top: 0rem;
    left: 0rem;
  }
  to {
    top: -1.5rem;
    left: -0.5rem;
  }
}
@keyframes hideItem {
  from {
    top: -1.5rem;
    left: -0.5rem;
  }
  to {
    top: 0rem;
    left: 0rem;
    display: none;
  }
}

@keyframes show {
  from {
    right: -1rem;
  }
  to {
    right: 0;
  }
}
@keyframes hide {
  from {
    right: 0;
  }
  to {
    right: -1rem;
  }
}
</style>
