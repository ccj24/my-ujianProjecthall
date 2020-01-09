<template>
  <div style="overflow: hidden;">
    <div class="topNr">
      <span class="top_one" @click="go({path:'/pages/task/taskindex'})">取消</span>
      <span class="top_two" @click="tijiao">完成</span>
    </div>
    <div class="neirong">
      <textarea
        placeholder="请输入回复内容..."
        v-model="abstract.ReplyContent"
        maxlength="2000"
        auto-height="ture"
      ></textarea>
    </div>
    <div class="tupian" v-if="isMP">
      <img
        class="rizhi_img"
        v-for="(items,index) in Photos"
        :key="index"
        :src="items"
        @click="yulan(items,index)"
        @longpress="deleteImage(items,index)"
      />
      <img @click="chuantupian" src="/static/images/组30@3x.png" />
    </div>
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
        v-for="(items,index) in Photos"
        :key="index"
        :src="items"
        @click="yulan(items,index)"
      />
      <img src="/static/images/组30@3x.png" @click="$refs.ImageInput.click()" />
    </div>
    <!-- 预览图片，切换图片 -->
      <BigImg :clickhit="clickhit" :indexx="theindex" :tupian="Photos"></BigImg>  
  </div>
</template>
<script>
import BigImg from "@/components/BigImg";
export default {
    data() {
        return{
            Photos: [],
            abstract: {
            Images: [],
            TaskId: "",
            ReplyContent: "",
            },
            clickhit:0,
            theindex:0,
        }
    },
       // 注册组件
  components: {
    BigImg,
  },
    methods: {
        async tijiao() {
            var that =this
            var rep2 = await this.$UJAPI.task_Reply(
          this.abstract
        );
        if (rep2.ret == 0) {
          this.toast("已经回复");
          this.replace("/pages/task/taskindex");
        }
        else {
          this.toast(rep2.msg);
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
          that.Photos.push(res.tempFilePaths[0]);
          let FileSystemManager = wx.getFileSystemManager();
          var filebase64 = FileSystemManager.readFileSync(
            res.tempFilePaths[0],
            "base64"
          );
          that.abstract.Images.push({
            FileName: `Photos${
              that.abstract.Images.length ? that.abstract.Images.length : 0
            }`,
            MediaType: "image/png",
            Buffer: filebase64
          });
        }
      });
    },
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
           that.Photos.push (e.target.result);
           var strarr = e.target.result.split(",");
           var filebase64 = strarr[1];//切割Data URI scheme。获得的图片文件的base64字符串用于上传
           that.abstract.Images.push({
             FileName: `Photos`,
              MediaType: "image/png",
              Buffer: filebase64
           })
        };
        reader.readAsDataURL(files[i]);
      }
    },
    // 预览图片
    yulan(items,index) {
      this.theindex=index;
      this.clickhit++;
    },
    },
    async mounted() {
        this.abstract.TaskId=this.$route.query.TaskId;
    }
}
</script>
<style scoped>
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
.neirong textarea {
  padding: 0.2rem;
  min-height: 4.5rem;
  font-size: 0.4rem;
  word-wrap: break-word;
  word-break: break-all;
  overflow-y: auto;
  border-bottom: 0.02rem solid #f4f3f2;
}
.tupian {
  float: left;
  margin-left: 0.31rem;
  margin-bottom: 3rem;
  overflow: hidden;
}
.tupian img {
  float: left;
  width: 2.27rem;
  height: 2.27rem;
  padding-right: 0.28rem;
  padding-top: 0.28rem;
  display: block;
}
</style>