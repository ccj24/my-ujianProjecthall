<template>
  <div>
    <div class="Projecthall">
      <ul>
        <li>
          <span>*</span>
          <input type="text" v-model.lazy="CreateProjectInfo.ProjectName" placeholder="填写项目名称(长度5~50)">
        </li>
        <li @click="SelectSite">
          <span>*</span>
          <input :value="displayName" type="text" disabled readonly placeholder="项目所属省市县">
          <i class="icon zhiye">&#xe601;</i>
        </li>
        <li>
          <span>*</span>
          <input type="text"  v-model.lazy="CreateProjectInfo.Address" placeholder="项目详细地址">
        </li>
        <li>
          <span>*</span>
          <input type="text" :value="UserInfo.UserName" placeholder="姓名" disabled readonly >
        </li>
        <li @click="go({path:'/pages/Login/Choiceprofessional'})" style="overflow: hidden;">
          <span>*</span>
          <p class="title">{{displayDepOrPostName}}</p>
          <i class="icon zhiye">&#xe601;</i>
        </li>
        <li style="overflow: hidden;">
          <!-- <span>*</span> -->
          <p class="title">项目证明材料</p>
          <p class="prove" v-if="isMP" @click="chuantupian">
            <img class="upload" v-if="ImagesSrc" :src="ImagesSrc">
            <img v-else src="/static/images/Photo.png">
            <span v-if="ImagesSrc">更换</span>
            <span v-else>上传</span>
          </p>
          <p class="prove" v-else @click="$refs.ImageInput.click()">
            <input accept="image/*" @change="AddImage($event)"  ref="ImageInput" name="img" id="upload_file" type="file" style="display:none;">
            <img class="upload" v-if="ImagesSrc" :src="ImagesSrc">
            <img v-else src="/static/images/Photo.png">
            <span v-if="ImagesSrc">更换</span>
            <span v-else>上传</span>
          </p>
        </li>
      </ul>
      <!-- 注 -->
      <div class="infuse">注：*为必填</div>
      <!-- 说明 -->
      <div class="explain">请提供该项目真实性的相关材料照片，如“项目实地照片、项目名片、项目产权材料等”上述材料之一即可</div>
      <!-- 底部按钮 -->
      <div class="btm">
        <button class="btn" @click="post">提交审核</button>
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
            <li v-for="(item,index) in city" :key="index" :class="{selected:selectedCity&&item.KeywordId==selectedCity.KeywordId}" @click="selectCity(item)">{{item.KeywordName}}</li>
          </ul>
          <ul style="overflow: auto;">
            <li v-for="(item,index) in district" :key="index" :class="{selected:selectedDistrict&&item.KeywordId==selectedDistrict.KeywordId}" @click="selectDistrict(item)">{{item.KeywordName}}</li>
          </ul>
          <ul style="overflow: auto;">
            <li v-for="(item,index) in county" :key="index" :class="{selected:selectedCounty&&item.KeywordId==selectedCounty.KeywordId}" @click="selectCounty(item)">{{item.KeywordName}}</li>
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
      location1: [],
      location2: [],
      location3: [],
      selectedCity: null,
      selectedDistrict: null,
      selectedCounty: null,
      ImagesSrc:null,
      files:null,
      CreateProjectInfo: {
        ProjectName: "",
        CreatorName: "",
        Address: "",
        PostId:0,
        DepartmentId: 0,
        AreaId: 0,
        Latitude: 0,
        Longitude: 0,
      }
    };
  },
  computed: {
    city() {
      return this.location1;
    },
    district() {
      if (this.selectedCity) {
        var _arr = this.location2.filter(item => {
          return item.ParentId == this.selectedCity.KeywordId;
        });
        return _arr;
      }
      return [];
    },
    county() {
      if (this.selectedDistrict) {
        var _arr = this.location3.filter(item => {
          return item.ParentId == this.selectedDistrict.KeywordId;
        });
        return _arr;
      }
      return [];
    },
    displayName() {
      return (
        (this.selectedCity ? this.selectedCity.KeywordName : "") +
        (this.selectedDistrict ? this.selectedDistrict.KeywordName : "") +
        (this.selectedCounty ? this.selectedCounty.KeywordName : "")
      );
    },
    // 保存在state中的部门信息
    chooseItem() {
      return this.$store.state.Project.chooseItem; //返回值给store中的chooseItem
    },
    // 保存在state中的职位信息
    choosePostItem() {
      return this.$store.state.Project.choosePostItem; //返回值给store中的choosePostItem
    },
    // 获取当前用户的登录信息
    UserInfo(){
      return this.$store.state.User.UserInfo
    },
    //用来显示部门与职位字符串
    displayDepOrPostName()
    {
      var _depname = this.chooseItem!=null?(this.chooseItem.ParentId==3?"施工单位分包-"+this.chooseItem.KeywordName:(this.chooseItem.KeywordId==3?"施工单位总包":this.chooseItem.KeywordName)):""
      var _postname = this.choosePostItem!=null?this.choosePostItem.KeywordName:""

      if(_depname&&_postname)
        return `部门：${_depname}  职位：${_postname}`
      else
       return "请选择五方部门与职位";
   }
  },
  methods: {
    //Web获取本地照片上传
    AddImage(e) {
      
      let that = this;
      // //e.target指本身 ,e.dataTransfer.files拖拽上传图片
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) return; //if(!false) return 条件成立的时候返回
      // 使用HTML5的FileReader接口，即可完全在页面里读取文件了
      // FileReader专门用于读取文件 判断你的浏览器是否支持FileReader接口
      if (typeof FileReader === "undefined") {
        alert("您的浏览器不支持图片上传，请升级您的浏览器");
        return false;
      }
      var reader = new FileReader();
      for (var i = 0; i < files.length; i++) {
        // FileReader接口中的readAsDataURL()方法可以获取API异步读取的文件数据，另存为数据URL;
        //将该URL绑定到img标签的src属性上，就可以实现图片的上传预览效果了
        reader.onload = function(e) {
           console.log(e.target.result)
           that.ImagesSrc= e.target.result;
           var strarr = that.ImagesSrc.split(",");
           var filebase64 = strarr[1];//切割Data URI scheme。获得的图片文件的base64字符串用于上传
           that.CreateProjectInfo.LicenseAttr={
              FileName: `LicenseAttr`,
              MediaType: "image/png",
              Buffer: filebase64
            };
        };
        reader.readAsDataURL(files[i]);
      }
    },
    // 微信小程序获取本地照片上传
    chuantupian() {
      var that = this;
      wx.chooseImage({
        count: 1, //照片数量
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        //接口调用成功的回调函数
        success(res) {
          // 每次向图片里增加一张图片用push    
          that.ImagesSrc=res.tempFilePaths[0];
          let FileSystemManager = wx.getFileSystemManager();
          var filebase64 = FileSystemManager.readFileSync(
            res.tempFilePaths[0],
            "base64"
          );
            that.CreateProjectInfo.LicenseAttr={
              FileName: `LicenseAttr`,
              MediaType: "image/png",
              Buffer: filebase64
            };
        }
      });
    },
    selectCity(item) {
      this.selectedCity = item;
      this.selectedDistrict = null;
    },
    selectDistrict(item) {
      this.selectedDistrict = item;
      this.selectedCounty = null;
    },
    selectCounty(item) {
      this.selectedCounty = item;
    },
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
    },
    async post(){
      if(this.chooseItem)
      {
        this.CreateProjectInfo.DepartmentId=this.chooseItem.KeywordId;
      }else{
        this.toast("请选择五方部门")
      }

      if(this.choosePostItem)
      {
        this.CreateProjectInfo.PostId=this.choosePostItem.KeywordId;
      }else{
        this.toast("请选择职位")
      }

      if(this.selectedCity||this.selectDistrict||this.selectCounty)
      {
        this.CreateProjectInfo.AreaId=this.selectCounty?this.selectCounty.KeywordId:(this.selectDistrict?this.selectDistrict.KeywordId:this.selectedCity.KeywordId)
      }else
      {
        this.toast("请选择项目所在省市")
      }

      this.CreateProjectInfo.CreatorName  = this.UserInfo.UserName;
      var rep = await this.$UJAPI.Project_Add(this.CreateProjectInfo)
      if(rep.ret==0)
      {
        this.selectCity=null;
        this.selectDistrict=null;
        this.selectCounty=null;
        this.CreateProjectInfo={
          ProjectName: "",
          CreatorName: "",
          Address: "",
          PostId:0,
          DepartmentId: 0,
          AreaId: 0,
          Latitude: 0,
          Longitude: 0,
        };
        this.$store.commit("setChooseItem", null);
        this.$store.commit("setChoosePostItem", null);
        this.$router.back();
      }else
      {
        this.toast(rep.msg)
      }
      
    }
  },
  async mounted() {
    var that = this;
    var rep = await this.$UJAPI.CommonInfo_GetKeyword({
      TypeId: 4
    });
    if (rep.ret == 0) {
      for (let i = 0; i < rep.data.length; i++) {
        if (rep.data[i].Depth == 1) {
          this.location1.push(rep.data[i]);
        } else if (rep.data[i].Depth == 2) {
          this.location2.push(rep.data[i]);
        } else if (rep.data[i].Depth == 3) {
          this.location3.push(rep.data[i]);
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
  font-size: 0.52rem;
  float: left;
  color: red;
}

.Projecthall input,.Projecthall li p.title {
  /* width: 90%; */
  padding-bottom: 0.1rem;
  font-size: 0.42rem;
  margin-left: 0.2rem;
  flex-grow:2;
}
.Projecthall li .samp {
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
    margin-top: 0.3rem;
    padding-bottom: 0.3rem;
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
  border: 0;
}
.btn::after{
  border: 0;
}
.zhiye {
  /* width: 0.4rem;
  height: 0.5rem;*/
  margin-right: 0.3rem; 
  font-size: 0.6rem;
  /* margin-left: 7.2rem; */
}
.prove {
  /* margin-left: 5.3rem; */
  text-align: right;
  display: flex;
  align-items: inherit;
}
.prove img {
  width: 0.53rem;
  height: 0.38rem;
  margin-right: 0.15rem;
  float: left;
  /* margin-top: 0.2rem; */
}
.prove img.upload {
  width: 1.53rem;
  height: 1.38rem;
  
  /* margin-top: 0.2rem; */
}
.prove span {
  font-size: 0.42rem;
  color: #12b7f5;
  padding-right: 0.5rem;
  padding-left: 0.1rem;
  /* padding-top: 0.15rem; */
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
  font-size: 0.5rem;
}
/* 选中样式 */
.suoxuan {
  border-bottom: 0.01rem solid #d7c1c1;
  border-top: 0.01rem solid #d7c1c1;
}
.drop-down li {
  padding-bottom: 0.2rem;
  text-align: center;
  font-size: 0.4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  backface-visibility: hidden;
}
.drop-down li.selected {
  color: #000;
  font-weight: bold;
}
.drop-down ul {
  float: left;
  height: 5rem;
  color: #d7c1c1;
  width: 33%;
  transform-style: preserve-3d;
}
</style>
