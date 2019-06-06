<template>
  <div class="Remark">
    <!-- 编辑文本框 -->
    <textarea maxlength="50" placeholder="添加更多备注信息" v-model="content"></textarea>
    <!-- 提交按钮 -->
    <button class="btn" @click="Issue">发布</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    async Issue() {
      var rep = await this.$UJAPI.UpdateComment({
        UserId: this.$route.query.UserId,
        Comment: this.content
      });
    }
  },
  async mounted() {
    this.content = this.$route.query.Comment;
  }
};
</script>


<style scoped>
.Remark textarea {
  padding-left: 0.3rem;
  padding-top: 0.51rem;
  padding-right: 0.3rem;
  width: 10.2rem;
  background-color: #ffffff;
  margin-top: 0.2rem;
  border: none;
}
.btn {
  background-color: #12b7f5;
  border-radius: 0.1rem;
  color: #ffffff;
  margin-top: 2rem;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>