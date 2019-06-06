<template>
  <div class="Addproject">
    <div class="searchmessage">
      <input type="number">
      <label class="marked">填写项目编号：</label>
      <img class="searchico" src="/static/images/Search.png">
    </div>
    <button class="btn">加入项目</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>


<style scoped>
.Addproject {
  margin-top: 0.3rem;
}
.searchmessage {
  background-color: #ffffff;
}
.searchmessage input {
  padding-top: 0.6rem;
  padding-left: 3.8rem;
}
.btn {
  margin-top: 0.51rem;
  background-color: #12b7f5;
  color: #ffffff;
  border-radius: 0.1rem;
  width: 10rem;
}
.marked {
  position: relative;
  top: -25px;
  padding-left: 0.2rem;
}
.searchico {
  position: relative;
  top: -23px;
  left: 6rem;
  height: 0.6rem;
  width: 0.6rem;
}
</style>


<style>
page {
  background-color: #ecf0f1;
}
</style>