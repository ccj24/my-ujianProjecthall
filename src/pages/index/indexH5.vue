<template>
        <div class="container">
          <login :userInfo="userInfo"></login>
        </div>
</template>

<script>
import login from '@/components/login.vue'

export default {
  data() {
    return {
      userInfo: {
        Account: "",
        PassWord: "",
        avatarUrl: "",
        nickName: ""
      }
    };
  },
  components: {
      login
  },
};
</script>