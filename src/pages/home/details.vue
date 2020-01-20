<template>
  <div>
    <div class="name">
      <img :src="UserInfoViewModel.Portrait">
      <ul>
        <li style="color:#353535;padding-bottom: 0.29rem;padding-top:0.42rem;">{{UserInfoViewModel.UserName}}</li>
        <li style="color:#999999">{{UserInfoViewModel.Phone}}</li>
      </ul>
    </div>
    <!-- 公司 -->
    <div class="companylist">
      <div class="company">
        <p style="float:left;color: #a1a1a1;padding-right: 1rem;">公司</p>
        <div :class="{'listbox':isredenvelopes,'listbox1':isredenvelopes1}" style="color: #353535;float:left;overflow: hidden;">
          <div style="padding-bottom:0.63rem;" v-for="(item,index) in EnterpriseViewModel" :key="index">
            <p @click="go({path:'/pages/home/firmmanage'})" style="overflow: hidden;">{{item.eName}}</p>
          </div>
        </div>
        <img v-if="wallet==1" @click="unfold" style="float: right;" src="/static/images/wallet-more.png">
        <img v-if="wallet==2" @click="shrink" style="float: right;" src="/static/images/wallet-morex.png">
      </div>
    </div>
    <!-- 备注 -->
    <div class="remark">
      <div class="company">
        <p style="float:left;color: #a1a1a1;padding-right: 1rem;">备注</p>
        <div class="comment" style="color: #353535;float:left">
          <p style="padding-bottom:0.3rem;">{{UserInfoViewModel.Comment}}</p>
        </div>
        <img @click="go({path:'/pages/home/Remark',query:{Comment:UserInfoViewModel.Comment,UserId:UserInfoViewModel.UserId}})" style="float: right;" src="/static/images/theMore.png" alt>
      </div>
    </div>
    <!-- 同处项目 -->
    <div class="Withproject">
      <div class="company">
        <p style="color: #a1a1a1;">同处项目</p>
      </div>
      <ul>
        <li v-for="(item,index)  in UserInfoViewModel.ProjectsInfo" :key="index">{{item.ProjectName}}</li>
      </ul>
    </div>
    <!-- 底部按钮 -->
    <div class>
      <button v-if="UserInfoViewModel.IsFriend==true" class="btn">发送信息</button>
      <button @click="AddContact" v-else class="btn">加为好友</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isredenvelopes: true,
      isredenvelopes1: false,
      wallet: 1,
      EnterpriseViewModel: [], //获取指定用户所属的企业列表
      UserInfoViewModel: {} //根据户唯一标识查询用户
    };
  },

  methods: {
    unfold() {
      this.isredenvelopes = false;
      this.isredenvelopes1 = true;
      this.wallet = 2;
    },
    shrink() {
      this.isredenvelopes = true;
      this.isredenvelopes1 = false;
      this.wallet = 1;
    },

    async AddContact() {
      // console.log(this.UserInfoViewModel.UserId)
      var rep = await this.$UJAPI.Add_Contact({
        contactid:this.UserInfoViewModel.UserId
      });
     if(rep.ret==0){
       this.UserInfoViewModel.IsFriend=false;
     }
    },
    async init() {
      var that = this;
    // 1、根据户唯一标识查询用户
    var rep = await this.$UJAPI.User_Get({
      UserId: this.$route.query.UserId
    });
    if (rep.ret == 0) {
      this.UserInfoViewModel = rep.data;
    }
    console.log(this.UserInfoViewModel);

    // 2、获取指定用户所属的企业列表
    var rep = await this.$UJAPI.Project_Enterprise({
      UserId: this.$route.query.UserId
    });
    if (rep.ret == 0) {
      this.EnterpriseViewModel = rep.data;
    }
    // console.log(this.EnterpriseViewModel);
    }
  }, 
    // 把请求放在onShow 事件 这样让回退也会触发改变值
  async onShow() {},
  onPullDownRefresh(){
    this.init();
    wx.stopPullDownRefresh();
  },
  async mounted() {
    this.init()
  }
};
</script>

<style scoped>
.name {
  background-color: #ffffff;
  margin-top: 0.49rem;
  padding: 0.32rem 0.26rem 0.32rem 0.28rem;
  overflow: hidden;
  font-size: 0.46rem;
}
.name img {
  width: 2rem;
  height: 2rem;
  margin-right: 0.26rem;
  float: left;
  overflow: hidden;
}
.companylist {
  font-size: 0.46rem;
  margin-top: 0.58rem;
  background-color: #ffffff;
  overflow: hidden;
}
.remark {
  border-top: solid 0.01rem #e8e8e8;
  font-size: 0.46rem;
  background-color: #ffffff;
  overflow: hidden;
}
.Withproject {
  font-size: 0.46rem;
  background-color: #ffffff;
  overflow: hidden;
  margin-top: 0.2rem;
}
.Withproject ul li {
  border: solid 0.01rem #e8e8e8;
  color: #353535;
  font-size: 0.43rem;
  padding-top: 0.41rem;
  padding-left: 0.29rem;
  padding-bottom: 0.56rem;
}
.company {
  min-height: 1.28rem;
  padding-top: 0.47rem;
  padding-left: 0.29rem;
}
.company img {
  width: 0.44rem;
  height: 0.44rem;
  margin-right: 0.2rem;
}
.listbox {
  max-height: 0.65rem;
  max-width: 8.48rem;
  overflow: hidden;
}
.listbox1 {
  max-width: 8.48rem;
}
.comment {
  max-height: 6rem;
  max-width: 8.48rem;
}
.btn {
  background-color: #12b7f5 !important;
  color: #ffffff;
  width: 10.4rem;
  margin-left: 0.2rem;
  border-radius: 0.14rem;
  margin-top: 0.68rem;
}
</style>

<style>
page {
  background-color: #ecf0f1;
}
</style>