<template>
  <div>
    <!-- 点击取消的背景样式 -->
    <div :class="{layout:yincang}"></div>
    <!-- 内容 -->
    <div class="index">
      <div class="topNr">
        <span class="top_one" @click="returnRoom">取消</span>
        <span class="top_two" @click="release">发布</span>
      </div>
      <!-- 时间 -->
      <div class="day" v-if="LogId == null">
        <picker mode="date" :value="date" start="2015-09-01" end="date" @change="bindDateChange">
          <div class="picker time">时间: {{date}}</div>
          <img class="picker tubiao" src="/static/img/time_icon.png" alt />
        </picker>
      </div>
      <div class="content">
        <div class="rich">
          <!-- maxlength设计最大字数 auto-height="ture"是高度随字数增加而增加-->
          <textarea
            v-if="LogId==null||LogId==2"
            v-model="ProjectInfo.LogContent"
            placeholder="不能超过2000字"
            maxlength="2000"
            auto-height="ture"
          ></textarea>
          <textarea
            v-if="LogId!=null&&LogId!=2"
            v-model="ProjectLog.LogContent"
            maxlength="2000"
            auto-height="ture"
          ></textarea>
        </div>
      </div>
      <div class="rizhi">
        <div v-if="isMP">
        <img
          class="rizhi_img"
          v-for="(items,index) in ProjectLog.Images"
          :key="index"
          :src="items"
          @click="yulan2(items)"
          @longpress="deleteImage2(items,index)"
        />
          <img
          class="rizhi_img"
          v-for="(items,index) in Images"
          :key="index"
          :src="items"
          @click="yulan(items)"
          @longpress="deleteImage(items,index)"
        />
        <img @click="chuantupian" src="/static/images/组30@3x.png" />
      </div>
      <!-- web -->
      <div class="tupian" v-else>
      <input
        accept="image/*"
        @change="AddImage($event)"
        ref="ImageInput"
        name="img"
        id="upload_file"
        type="file"
        style="display:none;"
      />
      <img
        class="rizhi_img"
        v-for="(items,index) in Images"
        :key="index"
        :src="items"
      />
      <img src="/static/images/组30@3x.png" @click="$refs.ImageInput.click()" />
    </div>
      </div>
    </div>
    <div class="frame" v-show="conceal">
      <div class="frame_top">确定取消？</div>
      <div class="frame_two">
        <div class="one" style="float:left" @click="affirm">确认</div>
        <div class="two" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
// 引进来获取时间
import utils from "@/utils/index.js";
import { compare } from "semver";
export default {
  data() {
    return {
      // 提示框刚刚开始是隐藏状态
      conceal: false,
      yincang: false,
      Images: [],
      // ProjectInfo代表一个日志
      ProjectInfo: {
        ProjectId: "",
        LogContent: "",
        CreateTime: "",
        Images: []
      },
      date: "",
      ProjectLog: "",
      LogId: "",
      RemoveImages: [],
      AddImages: [],
      // Photos:[]
    };
  },
  methods: {
    bindDateChange(e) {
      console.log("picker发送选择改变，携带值为", e.mp.detail.value);
      this.date = e.mp.detail.value;
    },
    returnRoom() {
      this.conceal = true;
      this.yincang = true;
    },
    cancel() {
      // 点击弹出框的取消后再次隐藏
      this.conceal = false;
      this.yincang = false;
    },
    affirm() {
      // 点击确定取消后返回上一级
      this.$router.back();
    },
    // 点击发布触发事件
    async release() {
      // 编辑
      if (this.LogId != null&&this.LogId!=2) {
        var that = this;
        var rep = await this.$UJAPI.ProjectLog_Update({
          LogId: that.LogId,
          LogContent:that.ProjectLog.LogContent,
          RemoveImages:that.RemoveImages,
          AddImages:that.ProjectInfo.Images,
        });
        // 当ret=0时，代表请求项目日志接口成功，然后把请求回来的数据赋值给ProjectLog。
        if (rep.ret == 0) {
          //  this就是整个vue，比如下访问return下面定义的东西，不加this则访问不到
          this.toast("编辑成功");
          this.$router.back();
        } else {
          this.toast(rep.msg)
        }
      }
      // 发布
      else if (this.LogId==null){
        var that = this;
        var fileNames = [];
        for (var i = 0; i < this.Images.length; i++) {
          fileNames.push("Images[" + i + "]");
        }
        this.ProjectInfo.CreateTime = this.date + " 00:00:00";
        // ProjectInfo既是上面定义的对象
        var rep = await this.$UJAPI.ProjectLog_Add(this.ProjectInfo);
        if (rep instanceof Array)
          //上传图片用的接口会返回多个结果的数组，暂时使用第一项
          rep = rep[0];
        if (rep.ret == 0) {
          this.toast("发布成功");
          // 点击确定取消后返回上一级
          this.$router.back();
        } else {
          this.toast(rep.msg)
        }
      }
      // 项目圈
      else{
         var that = this;
        var rep = await this.$UJAPI.ProjectNote_Add({
          ProjectId:this.ProjectId,
          NoteContent:this.ProjectInfo.LogContent,
          Photos:this.ProjectInfo.Images
        });
         if (rep.ret == 0) {
         this.toast("发布成功")
         this.$router.back();
      } else {
        this.toast(rep.msg)
      }
      }
    },
    // 获取本地照片上传
    chuantupian() {
      var that = this;
      wx.chooseImage({
        count: 1, //照片数量
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        //接口调用成功的回调函数
        success(res) {
          // 每次向图片里增加一张图片用push    
          that.Images.push(res.tempFilePaths[0]);
          let FileSystemManager = wx.getFileSystemManager();
          var filebase64 = FileSystemManager.readFileSync(
            res.tempFilePaths[0],
            "base64"
          );
            that.ProjectInfo.Images.push({
              FileName: `Images${that.ProjectInfo.Images.length ? that.ProjectInfo.Images.length : 0}`,
              MediaType: "image/png",
              Buffer: filebase64
            });
        }
      });
    },
    // web
    AddImage(e) {
      let that = this;
      // //e.target指本身 ,e.dataTransfer.files拖拽上传图片
      var files = e.target.files || e.dataTransfer.files;
      console.log(files)
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
           that.Images.push (e.target.result);
           var strarr = e.target.result.split(",");
           var filebase64 = strarr[1];//切割Data URI scheme。获得的图片文件的base64字符串用于上传
           that.ProjectInfo.Images.push({
             FileName: `Images`,
              MediaType: "image/png",
              Buffer: filebase64
           })
        };
        reader.readAsDataURL(files[i]);
      }
    },

    // 预览图片
    yulan(items) {
          wx.previewImage({
          current: items,
          urls: this.Images
      });
    },
    yulan2(items) {
          wx.previewImage({
          current: items,
          urls: this.ProjectLog.Images
      });
    },
    //长按删除事件
    deleteImage(items, index) {
      var that = this;
      var Images = that.Images;
      wx.showModal({
        title: "提示",
        content: "确定要删除此图片吗？",
        success(res) {
          if (res.confirm) {
            console.log("点击确定了");
            // 删除图片
              Images.splice(index, 1);
              that.ProjectInfo.Images.splice(index, 1);
          } else if (res.cancel) {
            console.log("点击取消了");
            return false;
          }
        }
      });
    },
    deleteImage2(items, index) {
      var that = this;
      wx.showModal({
        title: "提示",
        content: "确定要删除此图片吗？",
        success(res) {
          if (res.confirm) {
            console.log("点击确定了");
            // 删除图片
          that.ProjectLog.Images.splice(index, 1); 
          that.RemoveImages.push( that.ProjectLog.ImageIds[index])
          } else if (res.cancel) {
            console.log("点击取消了");
            return false;
          }
        }
      });
    }

  },
  async mounted() {
    // 获取日志ProjectId
    this.ProjectInfo.ProjectId = this.ProjectId;
    //  debugger;
    var myDate = new Date();
    var y = myDate.getFullYear();
    var m = myDate.getMonth() + 1;
    var d = myDate.getDate();
    this.date = y + "-" + m + "-" + d;
    this.ProjectInfo.CreateTime = this.date;
    this.LogId = this.$route.query.LogId;
    // 编辑时候获取内容
    if (this.LogId != null&&this.LogId!=2) {
      var that = this;
      //rep代表请求获取项目日志详情接口数据
      var rep = await this.$UJAPI.Project_ProjectLog({
        // logid当前所点击的日志Id
        LogId: this.LogId,
        Projectid: this.ProjectId
      });
      // 当ret=0时，代表请求项目日志接口成功，然后把请求回来的数据赋值给ProjectLog。
      if (rep.ret == 0) {
        //  this就是整个vue，比如下访问return下面定义的东西，不加this则访问不到
        this.ProjectLog = rep.data;
      } else {
        this.toast(rep.msg)
      }
    }
  }
};
</script>
<style scoped>
.index {
  margin: 0;
  background-color: #ffffff;
  z-index: 1;
}
.topNr {
  width: 100%;
  height: 1.28rem;
  background-color: #12b7f5;
  font-size: 0.46rem;
  color: #ffffff;
  line-height: 1.28rem;
  overflow: hidden;
}
.top_one {
  padding-left: 0.4rem;
}
.top_two {
  float: right;
  padding-right: 0.4rem;
}
.day {
  margin-top: 0.38rem;
  overflow: hidden;
}
.picker {
  font-size: 0.37rem;
  padding-left: 0.34rem;
}
.time {
  float: left;
}
.tubiao {
  width: 0.21rem;
  height: 0.12rem;
  padding-left: 1.95rem;
  margin-bottom: 0.25rem;
}
.content {
  margin-top: 0.41rem;
}
.rich {
  overflow: hidden;
  padding: 0.43rem;
  /* 设计四个边框 */
  outline: 0;
}
.rich textarea {
  /* 给高度设置一个最低限制 */
  min-height: 4rem;
  height: auto;
  font-size: 0.46rem;
  /* 下面二个都是自动换行的，但是word-wrap如果
  在最后长度不够会自动保留单
  次字体的完整性换行到下一行 */
  word-wrap: break-word;
  word-break: break-all;
}
.rizhi {
  float: left;
  margin-left: 0.31rem;
  margin-bottom: 0.3rem;
  overflow: hidden;
}
.rizhi img {
  float: left;
  width: 2.27rem;
  height: 2.27rem;
  padding-right: 0.28rem;
  padding-top: 0.28rem;
  display: block;
}
.rizhi_img:nth-child(4n) {
  padding-right: 0;
}
/* 点击弹出框背景 */
.layout {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #353535;
  /* 背景透明度 */
  opacity: 0.5;
  position: fixed;
  z-index: 2;
}
.frame {
  width: 7.79rem;
  height: 3rem;
  font-size: 0.49rem;
  background-color: #ffffff;
  border-radius: 0.36rem;
  opacity: 0.8;
  overflow: hidden;
  /*固定定位 */
  position: fixed;
  top: 5.23rem;
  left: 1.49rem;
  z-index: 3;
}
.frame_top {
  height: 1.74rem;
  text-align: center;
  color: #495f8c;
  line-height: 1.74rem;
  border-bottom: 0.02rem solid #353535;
}
.one {
  width: 50%;
  text-align: center;
  color: aqua;
  line-height: 1.26rem;
  border-right: 0.01rem solid #353535;
}
.two {
  overflow: hidden;
  text-align: center;
  color: aqua;
  line-height: 1.26rem;
}
</style>
