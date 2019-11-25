<template>
  <div>
    <div class="Projecthall">
      <ul>
        <li>
          <span>*</span>
          <input type="text" placeholder="填写项目名称(长度5~50)" />
        </li>
        <li>
          <span>*</span>
          <input @click="SelectSite" type="text" placeholder="项目所属省市县" />
        </li>
        <li>
          <span>*</span>
          <input type="text" placeholder="项目详细地址" />
        </li>
        <li>
          <span>*</span>
          <input type="text" placeholder="姓名" />
        </li>
        <li @click="go({path:'/pages/Login/Choiceprofessional'})" style="overflow: hidden;">
          <span>*</span>
          <samp>选择职业</samp>
          <img class="zhiye" src="/static/images/details.png" alt />
        </li>
        <li style="overflow: hidden;">
          <span>*</span>
          <samp>项目证明材料</samp>
          <div class="prove">
           <input accept="image/*" name="img" id="upload_file" type="file">
            
            <img src="/static/images/Photo.png" />
            <span>上传</span>
          </div>
        </li>
      </ul>
      <!-- 注 -->
      <div class="infuse">注：*为必填</div>
      <!-- 说明 -->
      <div class="explain">请提供该项目真实性的相关材料照片，如“项目实地照片、项目名片、项目产权材料等”上述材料之一即可</div>
      <!-- 底部按钮 -->
      <div class="btm">
        <button class="btn">提交审核</button>
      </div>
    </div>

    <!-- 点击弹窗 -->
    <div class="message-box-wrapper" @click.stop="checktanchuceng" v-if="ShowSite">
      <div class="address" @click.stop>
        <div class="roof">
          <span style="float: right;" @click="accomplish">完成</span>
        </div>
        <div class="drop-down" style="display:inline;">
          <ul style=" overflow: auto;overflow-x:scroll,">
            <li v-for="(item,index) in city" :key="index">{{item.KeywordName}}</li>
          </ul>
          <ul style="overflow: auto;">
            <li v-for="(item,index) in district" :key="index">{{item.KeywordName}}</li>
          </ul>
          <ul style="overflow: auto;">
            <li v-for="(item,index) in county" :key="index">{{item.KeywordName}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      ShowSite: false,
      location: [],
      city: [],
      district: [],
      county: []
    };
  },
  methods: {
    SelectSite() {
      this.ShowSite = true;
    },
    checktanchuceng() {
      if ((this.ShowSite = true)) {
        this.ShowSite = false;
      }
    },
    accomplish() {
      this.ShowSite = false;
    }
  },
  async mounted() {
    var that = this;
    var rep = await this.$UJAPI.CommonInfo_GetKeyword({
      TypeId: 4
    });
    if (rep.ret == 0) {
      this.location = rep.data;
      console.log(this.location);
      for (let i = 0; i < this.location.length; i++) {
        if (this.location[i].Depth == 1) {
          this.city.push(this.location[i]);
        }
        if (this.location[i].Depth == 2) {
          this.district.push(this.location[i]);
        }
        if (this.location[i].Depth == 3) {
          this.county.push(this.location[i]);
        }
      }
    }
  }
};
</script>
<style scoped>
.Projecthall {
  background-color: #ffffff;
  margin-top: 1rem;
  margin-left: 0.5rem;
}
.Projecthall span {
  font-size: 0.82rem;
  float: left;
  color: red;
}

.Projecthall input {
  width: 90%;
  padding-bottom: 0.1rem;
  font-size: 0.42rem;
  margin-left: 0.2rem;
}
.Projecthall li samp {
  font-size: 0.42rem;
  line-height: 0.82rem;
  padding-bottom: 0.1rem;
  margin-left: 0.2rem;
  color: #353535;
  float: left;
}
.Projecthall li {
  display: flex;
  align-items: center;
  margin-top: 0.6rem;
  border-bottom: 0.01rem solid #d7c1c1;
}
.infuse {
  padding-top: 1rem;
  color: red;
  font-size: 0.42rem;
}
.explain {
  padding-top: 1rem;
  color: red;
  font-size: 0.42rem;
}
.btm {
  margin-top: 1.5rem;
}
.btn {
  width: 9.66rem;
  height: 1.36rem;
  font-size: 0.52rem;
  text-align: center;
  line-height: 1.36rem;
  background-color: #12b7f5;
  color: #ffffff;
  border-radius: 0.2rem;
}
.zhiye {
  width: 0.4rem;
  height: 0.5rem;
  margin-left: 7.2rem;
}
.prove {
  margin-left: 5.3rem;
}
.prove img {
  width: 0.53rem;
  height: 0.38rem;
  float: left;
  margin-top: 0.2rem;
}
.prove span {
  font-size: 0.42rem;
  color: #12b7f5;
  padding-right: 0.5rem;
  padding-top: 0.15rem;
}
/* 先定位 才能设置四个值得属性 居中定位 取消订单弹出框 */
.message-box-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.message-box-wrapper::after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle; /*让行级元素垂直居中*/
}
.address {
  width: 100%;
  height: 6.5rem;
  background-color: #ffffff;
  position: fixed;
  bottom: 0rem;
}
.roof {
  border-bottom: #d7c1c1 solid 0.01rem;
  padding-bottom: 0.1rem;
  padding-top: 0.2rem;
  overflow: hidden;
}
.roof span {
  padding-right: 0.4rem;
  color: #12b7f5;
  font-size: 0.7rem;
}
/* 选中样式 */
.suoxuan {
  border-bottom: 0.01rem solid #d7c1c1;
  border-top: 0.01rem solid #d7c1c1
}
.drop-down li {
  padding-bottom: 0.2rem;
  text-align: center;
  font-size: 0.4rem;
  white-space: nowrap;
   text-overflow: ellipsis;
  backface-visibility: hidden;
}
.drop-down ul {
  float: left;
  height: 5rem;
  color: #d7c1c1;
  width: 33%;
  transform-style: preserve-3d;
}
</style>
