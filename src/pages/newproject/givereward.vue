<template>
  <div class="givereward">
    <!-- 头部  发红包的项目 -->
    <div class="gwtop" style="overflow: hidden;">
      <p style="color:#8c8c8c;float:left;">您将对</p>
      <p
        style="color:#353535;float:left; padding-left: 0.19rem;padding-right:0.26rem"
      >{{ProjectDetailed.ProjectName}}</p>
      <p style="color:#8c8c8c;">项目进行红包打赏</p>
    </div>
    <!-- 金额 -->
    <div class="money">
      <p style="float:left">金额</p>
      <div style="float:right;">
        <input type="number" placeholder="请输入金额" v-model="isNullInput" @input="getInputValue" />
        <p style="overflow: hidden;">元</p>
      </div>
    </div>
    <!-- 人数 -->
    <div class="number">该项目共{{ProjectDetailed.NumberOfPeople}}人</div>
    <!-- 祝福语 -->
    <div class="greeting">
      <p style="color:#8c8c8c">选择红包祝贺语</p>
      <div class="single">
        <img src="/static/images/select1.png" alt />
        <p>恭喜发财</p>
      </div>
      <div class="single">
        <img src="/static/images/select.png" alt />
        <p>大家工作辛苦了</p>
      </div>
    </div>
    <!-- 金额 -->
    <div class="sum">￥20.00</div>
    <!-- 输入框没输入数字的状态 灰色 -->
    <button v-if="btnOK" class="packetButton">塞进红包</button>
    <!-- 输入框输入数字的状态 蓝色-->
    <button v-if="isOK" class="packetButton1">塞进红包</button>
    <!-- 余额 -->
    <div class="balance">
      <p style="color:#8c8c8c;float:left">使用账户余额支付，</p>
      <p style="color:#ff6c6c;display: inline-block;">余额：{{balance}}元</p>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isOK: false,
      btnOK: true,
      isNullInput: null,
      balance: "", //个人钱包余额
      RedPacketRemar: [] //获取红包祝福语
    };
  },
  methods: {
    getInputValue() {
      //  判断如果输入不为空的话，让按钮的颜色变为蓝色
      if (this.isNullInput != "") {
        this.isOK = true;
        this.btnOK = false;
      }
      //  输入为空的话，让按钮的背景颜色变为灰色
      else {
        this.isOK = false;
        this.btnOK = true;
      }
    }
  },
  computed: {
    //  获取保存在vuex中的项目详情数据
    ProjectDetailed() {
      // ProjectDetailed是主页保存去vuex中的项目详情数据
      return this.$store.state.Project.ProjectDetailed;
    }
  },

  async mounted() {
    var that = this;
    // 获取个人钱包余额
    var rep = await this.$UJAPI.Purse_Balance({});
    if (rep.ret == 0) {
      this.balance = rep.data;
    }
    //获取红包祝福语
    var rep = await this.$UJAPI.RedPacket_CommonInfo({});
    if (rep.ret == 0) {
      this.RedPacketRemar = rep.data;
    }
    console.log(this.RedPacketRemar);
  }
};
</script>

<style scoped>
.gwtop {
  font-size: 0.4rem;
  height: 1.54rem;
  padding: 0.42rem 0.36rem 0 0.42rem;
}
.money {
  background-color: #ffffff;
  font-size: 0.49rem;
  line-height: 1.42rem;
  overflow: hidden;
  padding-left: 0.43rem;
  padding-right: 0.52rem;
}
.money input {
  width: 2.5rem;
  padding-top: 0.4rem;
  float: left;
}
.number {
  line-height: 0.89rem;
  padding-left: 0.46rem;
  font-size: 0.35rem;
}
.greeting {
  font-size: 0.4rem;
  background-color: #ffffff;
  padding-top: 0.39rem;
  padding-left: 0.35rem;
}
.greeting .single {
  padding-top: 0.86rem;
  border-bottom: solid 0.01rem #e8e8e8;
  padding-bottom: 0.68rem;
}
.greeting .single img {
  width: 0.5rem;
  height: 0.5rem;
  float: left;
  padding-right: 0.71rem;
}
.sum {
  font-size: 1.38rem;
  text-align: center;
  padding-top: 0.95rem;
}
.packetButton {
  width: 9.64rem;
  height: 1.65rem;
  border-radius: 0.14rem;
  background-color: #8c8c8c;
  color: #ffffff;
  margin-top: 0.76rem;
}
.packetButton1 {
  width: 9.64rem;
  height: 1.65rem;
  border-radius: 0.14rem;
  background-color: #ff6c6c;
  color: #ffffff;
  margin-top: 0.76rem;
}
.balance {
  font-size: 0.37rem;
  padding-left: 2.14rem;
  padding-top: 0.6rem;
}
</style>



