<template>
  <div style="overflow: hidden">
    <!-- 内容 -->
    <div class="index">
      <div class="content">
        <div class="rich">
          <!-- maxlength设计最大字数 auto-height="ture"是高度随字数增加而增加-->
          <textarea placeholder="不能超过2000字" v-model="TaskRequest.TaskContent" maxlength="2000" auto-height="ture"></textarea>
        </div>
      </div>
      <div class="rizhi">
        <div v-if="isMP">
          <img
            class="rizhi_img"
            v-for="(items,index) in Images"
            :key="index"
            :src="items"
            @click="yulan(items,index)"
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
          <img @click="yulan(items,index)" class="rizhi_img" v-for="(items,index) in Images" :key="index" :src="items" />
          <img src="/static/images/组30@3x.png" @click="$refs.ImageInput.click()" />
        </div>
      </div>
      <div>
        <div class="task" @click="timeshow">
          <span>要求答复时间：</span>
          <span class="task_time">{{shijian.showTime}}</span>
          <p style="float:right" class="icon">&#xe601;</p>
        </div>
        <div class="task_one">
          <div class="renyuan" @click="goman()">
            <span>选择人员</span>
            <p style="float:right" class="icon">&#xe601;</p>
          </div>
          <div class="yyy" v-if="chooseman !=null">
            <div class="task_img" :style=thewidth>
              <div class="tuji" v-for="(item,index) in chooseman" :key="index">
                <img :src="item.Portrait" alt />
                <p>{{item.UserName}}</p>
              </div>
            </div>
          </div>
          <div class="kuang" v-show="theshuoming">
            <div>
              <span>权限说明</span>
              <span @click="shuoming" style="margin-left: 7.5rem;" class="icon">&#xe647;</span>
              <p>&#12288;&#12288;任务单只能本方人员内从级别高往级别低发送和接收，如出现筛选后无人员显示，则说明您现在权限范围内无可发送人员</p>
            </div>
          </div>
          <div class="fabu">
            <button @click="addrenwu">发布任务</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 预览图片，切换图片 -->
      <BigImg :clickhit="clickhit" :indexx="theindex" :tupian="Images"></BigImg>  
    <!-- 选择时间 -->
    <div class="timeBB" v-show="timeoff" @click="timeno">
      <div class="timeBB_a" @click.stop>
        <div style="border-bottom: 0.02rem solid #e8e8e8;" class="task">
          <span>要求答复时间：</span>
          <span v-if="thetime.showTime!=null" class="task_time">{{thetime.showTime}}</span>
          <span v-else class="task_time"></span>
        </div>
        <div class="xiaoshi" v-for="(item,index) in time" :key="index" @click="choosetime(item,index)">
          <div v-if="timeindex==index" style="color:#12b7f5" class="icon">&#xe625;</div>
          <div v-else style="color:#e8e8e8;" class="icon">&#xe631;</div>
          <span style="margin-left: 1.5rem">{{item}}</span>
        </div>
        <div class="timesure">
            <button @click="yestime">确定</button>
        </div>
      </div>
    </div>
    <!-- 时间组件 -->
    <div class="layout" v-show="shijianshow" @click="aaa">
      <thetime @sendmsg="getmsg" @click.stop></thetime>
    </div>
  </div>
</template>
<script>
import BigImg from "@/components/BigImg";
import thetime from "@/components/thetime";
import { compare } from "semver";
export default {
  data() {
    return {
      Images: [],
      TaskRequest: {
        ReplytId: [],
        TaskContent: "",
        PlanReplyTime: "",
        ProjectId:"",
        TaskTypeId:"",
        Images: []
      },
      time:["3小时","6小时","9小时","12小时","无限时","自定义"],
      nowtime:new Date(),
      timeoff:false,
      timeindex:null,
      shijianshow:false,
      theshuoming:true,
      shijian:{},
      chooseman:[],
      styleObj: {
        width: ""
      },
      clickhit:0,
      theindex:0,
    };
  },
  methods: {
      timeshow() {
          this.timeoff=true
      },
      timeno() {
          this.timeoff=false
      },
      choosetime(item,index){
          this.timeindex=index;
      },
      yestime() {
        if (this.timeindex==5) {
          this.timeoff=false
          this.shijianshow=true
        }
        else{
          this.timeoff=false
        }
      },
      aaa() {
         this.shijianshow=false
      },
      getmsg(data) {
        this.shijian.Time=data
        this.shijianshow=false
        console.log(this.shijian)
      },
     async addrenwu() {
       
        this.TaskRequest.PlanReplyTime=this.shijian.Time
        console.log(this.TaskRequest)
        var that=this
         var rep = await this.$UJAPI.Addbatch(this.TaskRequest);
        if (rep.ret == 0) {
          this.toast("发送成功");
          this.replace("/pages/task/taskindex");
        }
        else {
          this.toast(rep.msg);
        }
      },
      shuoming() {
        this.theshuoming=false
      },
      goman() {
      this.$store.commit("thetime", this.shijian);
      this.$store.commit("TaskContent",this.TaskRequest.TaskContent);
      this.$store.commit("theImages", this.Images);
        this.replace("/pages/task/staff");
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
          that.TaskRequest.Images.push({
            FileName: `Images${
              that.TaskRequest.Images.length
                ? that.TaskRequest.Images.length
                : 0
            }`,
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
          that.Images.push(e.target.result);
          var strarr = e.target.result.split(",");
          var filebase64 = strarr[1]; //切割Data URI scheme。获得的图片文件的base64字符串用于上传
          that.TaskRequest.Images.push({
            FileName: `Images`,
            MediaType: "image/png",
            Buffer: filebase64
          });
        };
        reader.readAsDataURL(files[i]);
      }
    },

    // 预览图片
    yulan(items,index) {
      this.theindex=index;
        this.clickhit++;
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
            that.TaskRequest.Images.splice(index, 1);
          } else if (res.cancel) {
            console.log("点击取消了");
            return false;
          }
        }
      });
    },
  },
   // 注册组件
  components: {
    BigImg,
    thetime
  }, 
  computed:{
    thetime() {
      var year = this.nowtime.getFullYear();
      var month = this.nowtime.getMonth();
      var date = this.nowtime.getDate();
      var h = this.nowtime.getHours(); //获取当前小时数(0-23)
      var m = this.nowtime.getMinutes(); //获取当前分钟数(0-59)
      var monthDays=[]
      if (this.timeindex<4&&this.timeindex!=null) { 
        h=(this.timeindex+1)*3+h
        if (h>23) {
          if ((year % 4 == 0 && year % 100 != 0) ||year % 400 == 0) {
              monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                } else {
                         monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                          }
          h=h-24 //因为从0点开始
          date=date+1
          if (date>monthDays[month]) {
            date=1
            month=month+1
            if (month==12) {
              month=0
              year=year+1
            }
          }
        }    
        this.shijian.Time=year+"-"+((month+1)<10? ("0"+(month+1)) :(month+1))+"-"+((date<10)? ("0"+date) :date)+" "+(h<10? ("0"+h) :h)+":"+(m<10? ("0"+m) :m)+":"+"00"
        this.shijian.showTime=year+"年"+(month+1)+"月"+date+"日"+h+"时"+m+"分"
      }
      else if (this.timeindex==4) {
         this.shijian.Time=null
         this.shijian.showTime="无限时"
      }
      else if (this.timeindex==5) {
        this.shijian.Time=null
         this.shijian.showTime="自定义"
      }
      // console.log(this.shijian)
      return this.shijian
    },
    thewidth() {
      // widtn 用于头像滑动距离
      this.styleObj.width =(2.16*(this.chooseman.length))+"rem"
      return this.styleObj
    }
  },
  async mounted() {
    this.TaskRequest.TaskTypeId=this.$store.state.Project.addrenwu.TaskTypeId;
    this.Images=this.$store.state.Project.addrenwu.Images;
    console.log(this.Images)
    this.TaskRequest.TaskContent=this.$store.state.Project.addrenwu.TaskContent;
    this.shijian=this.$store.state.Project.addrenwu.PlanReplyTime;
    // this.TaskRequest.PlanReplyTime=this.shijian.Time
    this.chooseman=this.$store.state.Project.addrenwu.thetaskman;
    this.TaskRequest.ProjectId=this.$route.query.ProjectId
    if (this.chooseman!=null) {
      for(let i=0;i<this.chooseman.length;i++) {
      this.TaskRequest.ReplytId[i]=this.chooseman[i].UserId
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
  min-height: 2.5rem;
  height: auto;
  font-size: 0.46rem;
  /* 下面二个都是自动换行的，但是word-wrap如果
  在最后长度不够会自动保留单
  次字体的完整性换行到下一行 */
  word-wrap: break-word;
  word-break: break-all;
}
.rizhi {
  /* float: left; */
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
  opacity: 1;
  position: fixed;
  z-index: 2;
}
.task {
  height: 1.45rem;
  line-height: 1.45rem;
  font-size: 0.43rem;
  border-top: 0.02rem solid #e8e8e8;
  color: #8c8c8c;
  padding: 0 0.3rem;
}
.task_time {
  color: #999999;
  margin-left: 0.3rem;
}
.renyuan {
  height: 1.45rem;
  line-height: 1.45rem;
  font-size: 0.43rem;
  color: #8c8c8c;
  padding: 0 0.3rem;
  border-top: 0.15rem solid #f4f3f2;
  border-bottom: 0.02rem solid #f4f3f2;
}
.yyy {
  overflow: hidden;
  overflow-x: scroll;
  width: 10.8rem;
  height: 2.7rem;
}
.task_img {
  height: 2.7rem;
}
.tuji {
  width: 1.68rem;
  float: left;
  margin: 0.2rem 0.24rem;
}
.tuji img {
  width: 1.68rem;
  height: 1.68rem;
  border-radius: 0.12rem;
}
.tuji p {
  font-size: 0.35rem;
  color: #353535;
  margin-top: 0.08rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.kuang {
  border-top: 0.49rem solid #f4f3f2;
  border-bottom: 0.02rem solid #f4f3f2;
  width: 100%;
  height: 2.93rem;
  background-color: #fcfcfc;
  box-shadow: 0rem -0.03rem 0.09rem 0rem rgba(8, 1, 3, 0.04);
}
.kuang div {
  margin: 0rem 0.5rem;
}
.kuang span {
  font-size: 0.4rem;
  color: #8c8c8c;
}
.kuang p {
  color: #8c8c8c;
  font-size: 0.35rem;
}
.fabu {
  width: 100%;
  height: 2.16rem;
  position: fixed;
  bottom: 0.4rem;
}
.fabu button {
  width: 9.66rem;
  height: 1.37rem;
  background-color: #12b7f5;
  border-radius: 0.14rem;
  color: #fff;
  margin-left: 0.6rem;
  margin-top: 0.3rem;
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
.timeBB {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
}
.timeBB_a {
  background-color: #fff;
  opacity: 1;
}
.xiaoshi {
    line-height: 1.3rem;
    font-size: 0.37rem;
    color: #353535;
    border-bottom: 0.02rem solid #e8e8e8;
    display: flex;
    align-items: center
}
.xiaoshi div {
    font-size: 0.5rem;
    margin-left: 0.4rem;
}
.timesure {
    height: 3.5rem;
    line-height: 3.5rem;
    background-color: #f8f8f8;
}
.timesure button{
    width: 7.85rem;
	height: 1.16rem;
	background-color: #00aeff;
    border-radius: 0.07rem;
    margin-left: 1.56rem;
}
</style>
