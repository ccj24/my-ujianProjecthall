<template>
  <div>
    <div :class="{zhezhaoceng:yincang}"></div>
    <div>
      <div>
        <div class="journal_top">
          <div class="top_one" :class="{top_oneNr:checkIndex==0}" @click="checktab(0)">
            <img src="/static/img/log-all@3x.1.png" />
            <p>公共日志</p>
          </div>
          <div class="top_one" :class="{top_oneNr:checkIndex==1}" @click="checktab(1)">
            <img src="/static/img/log-all@3x.2.png" />
            <p>内部日志</p>
          </div>
          <!-- 跳转到我的日志 -->
          <div class="top_one" @click="go({path:'/pages/log/myLog'})">
            <img src="/static/img/log-all@3x.3.png" />
            <p>我的日志</p>
          </div>
          <div class="top_one" @click="go({path:'/pages/log/toAudit'})"
        v-if="activeUser!=null &&activeUser.Role>0"
          >
            <img src="/static/img/log-all@3x.4.png" />
            <p>待审核日志</p>
          </div>
        </div>
        <!-- calendar:classshow是隐藏样式，calendarshow:classconceal是打开样式 -->
        <div :class="{calendar:classshow,calendarshow:classconceal}">
          <div class="month">
            <img src="/static/img/back.png" @click="preMon" alt />
            <span>{{year}}年{{(month+1)}}月</span>
            <img src="/static/images/theMore.png" @click="nextMon" alt />
          </div>
          <table class="rili">
            <tr class="week">
              <td v-for="(item,index) in weeks" :key="index">{{item}}</td>
            </tr>
            <tr class="time_hide">
              <td
                v-for="(item, index) in showCalender"
                :key="index"
                :class="[{otherday:item.Month!=month+1}]"
                @click="today(item,index)"
              >
                  <p :class="[{logday:item.haslog},{today:item.Year==y &&item.Month==m+1&& item.Day==d}]">
                  {{item.Day}}
                  </p>
              </td>
            </tr>
          </table>
        </div>
        <div class="unfold">
          <div class="unfold_content">
            <div v-if="show" @click="triggershow">
              <img src="/static/images/xc_xialan.png" />
              <p>展开</p>
            </div>
            <div v-if="conceal" @click="triggerconceal">
              <img src="/static/images/wallet-morex.png" alt />
              <p>收起</p>
            </div>
          </div>
        </div>
      </div>
      <!-- item是每一项  index索引和key值是一样的 -->
      <div
        class="middle"
        v-for="(item,index) in ProjectLog"
        :key="index"
        @click="goaudit(item.LogId)"
      >
        <div class="middle_top">
          <img :src="item.Portrait" />
          <div class="one">
            <p class="name">{{item.CreatorName}}</p>
            <p class="pm">{{item.PostName}}</p>
          </div>
          <div class="date">
            <span>{{item.CreateTimeFormat}}</span>
            <span>{{item.CreateTimeWeekFormat}}</span>
          </div>
        </div>
        <div class="typeface">{{item.LogContent}}</div>
        <div class="img">
          <!-- 不能使用同一个索引 -->
          <img
            v-for="(items,indexs) in item.Images"
            :key="indexs"
            :src="items"
            @click.stop="yulan(items)"
          />
        </div>
        <!-- 事件estimate(item)附带每一项日志的参数,点击只显示当前的评论框 -->
        <div class="dianping" @click.stop="estimate(item,item.LogGuid)">
          <img src="/static/images/bubble.png" alt />
          <span>点评</span>
        </div>
        <!-- 评语 -->
        <div class="remark" @click.stop
        >
          <div
            class="remark_box"
             v-for="(itemx,indexx) in item.CommentList"
            :key="indexx"
            @longpress="deleteImage(itemx,indexx,index)"
            @click.stop="reply(item,itemx,item.LogGuid,itemx.CommentatorId,itemx.Commentator_R)"
           
          >
            <span class="remark_name">{{itemx.Commentator_R}}
              <span v-if="itemx.ReplyId !=null">回复 {{itemx.ReplyName}}</span>:
            </span>
            <span class="remark_word">{{itemx.CommentContent}}</span>
            <span class="remark_time">{{itemx.CommentTime}}</span>
          </div>
        </div>
        <!-- 评论框 -->
        <div v-if="item.commentbox" class="comment_box" @click.stop>
          <div class="comment">
            <!-- 用失去焦点 @blur失焦事件让评论框隐藏 -->
            <textarea
              maxlength="1000"
              v-model="LogComments.CommentContent"
              auto-focus="’true’"
              @click.stop
              @blur="lose(item)"
            ></textarea>
          </div>
          <div
            class="pinglun"
            :class="{pinglunNr:LogComments.CommentContent.length>0}"
            @click="review(item)"
          >评论</div>
        </div>
      </div>
      <div class="bottom">加载完毕</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      ProjectLog: [], //项目日志
      classshow: true,
      classconceal: false,
      show: true,
      conceal: false,
      checkIndex: 0,
      // 评论框
      commentbox: false,
      textContent: [],
      yincang: false,
      QueryType :1,
      // 日志评论
      LogComments: {
        NoteId: "",
        CommentContent: "",
        ReplyId:null,
      },
      ReplyName:"",
      // 删除评论
      notecomid: "",
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      y: new Date().getFullYear(), // 今日年份
      m: new Date().getMonth(), // 今日月份
      d: new Date().getDate(), // 今日日份
      list: [], //存放每个页面的时间
      logtime: [],
      Project_ProjectMember:null,
    };
  },
  methods: {
    // 显示的方法
    triggershow() {
      // 控制样式
      this.classshow = false;
      this.classconceal = true;
      // 控制控件
      this.show = false;
      this.conceal = true;
    },
    // 隐藏的方法
    triggerconceal() {
      this.classshow = true;
      this.classconceal = false;
      this.show = true;
      this.conceal = false;
    },
    // 点评
    estimate(item,LogGuid) {
      item.commentbox = true;
      this.yincang = true;
      this.LogComments.NoteId = LogGuid;
      this.LogComments.ReplyId = null;   
    },
    lose(item) {
      item.commentbox = false;
      this.yincang = false;
    },
    // 预览图片
    yulan(items) {
      var arr = Array(items);
      wx.previewImage({
        current: items,
        urls: arr
      });
    },

    async checktab(index) {
      this.checkIndex = index;
      let QueryType;
      // 点击时候传公共日志的数据
      if (index == 0) {
        this.QueryType = 1;
      }
      // 点击时候传内部日志的数据
      else if (index == 1) {
        this.QueryType = 5;
      }
      var rep = await this.$UJAPI.Project_GetList({
        ProjectId: this.ProjectId,
        QueryType:this.QueryType
      });
      if (rep.ret == 0) {
        // 这个ProjectLog是data自己定义的
        this.ProjectLog = rep.data;
      }
      else {
        this.toast("获取数据失败");
      }
    },
    goaudit(LogId) {
      this.commentbox = false;
      // 传参
      this.$router.push({
        path: "/pages/log/LogDetails",
        query: {
          LogId: LogId
        }
      });
    },
   reply(item,itemx,LogGuid,CommentatorId,Commentator_R) {
    //  debugger
     item.commentbox = true;
     this.yincang = true;
     this.LogComments.NoteId = LogGuid;
     this.LogComments.ReplyId = CommentatorId;
     this.ReplyName=Commentator_R;
   },
    // 点击评论日志传回去的数据
    async review(item) {
      var rep = await this.$UJAPI.ProjectLogComment_Add(this.LogComments);
      if (rep.ret == 0) { 
        this.notecomid=rep.data
        var date = new Date()
        var time = (date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds())
        item.CommentList.push({
          CommentContent:this.LogComments.CommentContent,
          ReplyId:this.LogComments.ReplyId,
          NoteId:this.LogComments.NoteId,
          CommentTime:time,
          ReplyName: this.ReplyName,
          Commentator_R:this.UserInfo.UserName ,
          NoteComId:this.notecomid,
          CommentatorId:this.UserInfo.UserId
        })
        this.toast("评论成功");
        item.commentbox = false;
        this.LogComments.CommentContent=""
      } else {
        //失败执行的代码
        this.toast("评论失败");
      }
    },
    //长按删除评论
    deleteImage(itemx, indexx, index) {
      var that = this;
      var group = that.ProjectLog[index].CommentList;
      wx.showModal({
        title: "提示",
        content: "确定要删除这条评论吗？",
        async success(res) {
          if (res.confirm) {
            // this.ProjectLog[index].CommentList[indexx]
            var notecomid = itemx.NoteComId;
            var rep = await that.$UJAPI.ProjectLogComment_Delete(notecomid);
            if (rep.ret == 0) {
              // splice操作对象的是数组
              group.splice(indexx, 1);
              this.toast("删除成功");
            } else if (rep.ret != 0) {
              this.toast("删除失败，请重试");
            }
          } else if (res.cancel) {
            return false;
          }
        }
      });
    },
    async today(item) {
      var that = this;
    // 获取日志接口
    var rep = await this.$UJAPI.Project_GetList({
      ProjectId: this.ProjectId,
      StartDate:item.Year+"-"+item.Month+"-"+item.Day
    });
    if (rep.ret == 0) {
      // 这个ProjectLog是data自己定义的
      this.ProjectLog = rep.data;
    }
    },
    async preMon() {
      if (this.month === 0) {
        this.year--;
        this.month = 11;
      } else {
        this.month--;
      }
        var rep1 = await this.$UJAPI.ProjectLog_LogStatistics({
      ProjectId: this.ProjectId,
      StartDate: this.year + "-" + (this.month+1)+ "-" + "1"
    });
   
    if (rep1.ret == 0) {
      // 这个ProjectLog是data自己定义的
      this.logtime = rep1.data;
    }
    },
    async nextMon() {
      if ((this.y>this.year) ||(this.y==this.year&&this.m>this.month)) {
          if (this.month === 11) {
        this.year++;
        this.month = 0;
      } else {
        this.month++;
      }
      var rep1 = await this.$UJAPI.ProjectLog_LogStatistics({
      ProjectId: this.ProjectId,
      StartDate: this.year + "-" + (this.month+1)+ "-" + "1"
    });
    if (rep1.ret == 0) {
      // 这个ProjectLog是data自己定义的
      this.logtime = rep1.data;
    }
    }
      }
  },
  computed: {
    showCalender() {
      this.list = [];
      this.otherlist = [];
      var weekDay = new Date(this.year, this.month, "1").getDay(); //获取每个月一号星期几
      var monthDays = [];
      if (
        (this.year % 4 == 0 && this.year % 100 != 0) ||this.year % 400 == 0
      ) {
        monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      } else {
        monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      }
      for (let i = 1; i <= monthDays[this.month]; i++) {
        // 当前月份
        this.list.push({
          Year: this.year,
          Month: this.month + 1,
          Day: i,
          time: this.year + "-" + (this.month+1 < 10 ? '0'+(this.month+1):this.month+1) + "-" + (i < 10 ? '0' +i:i)+" "+"00:00:00",
          haslog: false
        });
         for (let j=0;j<this.logtime.length;j++) {
          if (this.list[i-1].time==this.logtime[j].CreateDate){
            this.list[i-1].haslog=true
          }
        }
      }
     
      //前面部分
      if (this.month === 0) {
        var yearm = this.year - 1;
        var monthm = 11; //这里11即是12月
      } else {
        yearm = this.year;
        monthm = this.month - 1;
      }
      var a = monthDays[monthm];
      for (let k = 0; k < weekDay; k++) {
        this.list.unshift({
          Year: yearm,
          Month: monthm + 1,
          Day: a,
          time: yearm + "-" + ( monthm + 1< 10 ? '0' +(monthm + 1):monthm + 1) + "-" + (a < 10 ? '0' +a:a)+" "+"00:00:00",
        });
        a--;
          for (let j=0;j<this.logtime.length;j++) {
          if (this.list[k].time==this.logtime[j].CreateDate){
            this.list[k].haslog=true
          }
        }
      }
      //月尾部分
      if (this.month === 11) {
        var years = this.year + 1;
        var months = 0; //这里11即是12月
      } else {
        years = this.year;
        months = this.month + 1;
      }
      var lastweekDay = new Date(years, months, "1").getDay();
      //这是月末剩下格子数，小于7让他+7显示多一行
      var b = 7 - lastweekDay;
      if (b < 7) {
        b = b + 7;
      }
      for (let k = 1; k <= b; k++) {
        this.list.push({
          Year: years,
          Month: months + 1,
          Day: k,
          time: years + "-" + ( months + 1< 10 ? '0' + (months + 1):months + 1) + "-" + (k < 10 ? '0' +k:k)+" "+"00:00:00",
        });
        for (let j=0;j<this.logtime.length;j++) {
          if (this.list[k-1].time==this.logtime[j].CreateDate){
            this.list[k-1].haslog=true
          }
        }
      }
      return this.list;
    },
    ...mapState({
      UserInfo: state => state.User.UserInfo   //获取当前用户的登录信息
    }),
    activeUser () {
      if (this.Project_ProjectMember!=null) {
        return this.Project_ProjectMember[0]
      }
      else {
        return null;
      }
    },
  },
  async mounted() {
    var that = this;
    // 获取日志接口
    var rep = await this.$UJAPI.Project_GetList({
      ProjectId: this.ProjectId
    });
    if (rep.ret == 0) {
      // 这个ProjectLog是data自己定义的
      this.ProjectLog = rep.data;
      console.log(this.ProjectLog)
    }
    var rep1 = await this.$UJAPI.ProjectLog_LogStatistics({
      ProjectId: this.ProjectId,
      StartDate: this.year + "-" + (this.month+1) + "-" + this.day
    });
    if (rep1.ret == 0) {
      this.logtime = rep1.data;
    }
    // 获取项目成员列表
    var rep2 = await this.$UJAPI.Project_ProjectMember({
      ProjectId: this.ProjectId,
      UserId: this.UserInfo.UserId
    });
    if (rep2.ret == 0) {
      this.Project_ProjectMember = rep2.data;
    }
  }
};
</script>
<style scoped>
.zhezhaoceng {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  /* 背景透明度 */
  opacity: 0;
  z-index: 2;
}
.journal_top {
  overflow: hidden;
  border-bottom: 0.03rem solid #ebebeb;
  display: flex;
}
.top_one {
  /* 等分 */
  flex: 1;
  overflow: hidden;
  /* position: relative; */
  float: left;
  background-color: #e8e8e8;
  text-align: center;
}
.top_oneNr {
  background-color: #fafafa;
}
.top_one img {
  /* position: absolute;
  top: 0.47rem; */
  width: 0.65rem;
  height: 0.65rem;
  padding-top: 0.47rem;
}
.top_one p {
  font-size: 0.42rem;
  line-height: 0.7rem;
  color: #8c8c8c;
  text-align: center;
  padding-top: 0.25rem;
  padding-bottom: 0.27rem;
}
/* 隐藏样式 */
.calendar {
  height: 2.3rem;
  overflow: hidden;
  margin-top: 0.22rem;
  text-align: center;
}
/* 全部显示样式 */
.calendarshow {
  overflow: hidden;
  margin-top: 0.22rem;
  text-align: center;
}
.month {
  font-size: 0.48rem;
  line-height: 0.7rem;
  letter-spacing: 0.01rem;
  color: #88dbfa;
  text-align: center;
  display: flex;
  align-items: center;
  margin-left: 2.92rem;
}
.month img {
  width: 0.19rem;
  height: 0.4rem;
}
.month span {
  padding-left: 1.08rem;
  padding-right: 1.08rem;
}
.week {
  font-size: 0.36rem;
  line-height: 0.7rem;
  letter-spacing: 0.01rem;
  color: #8c8c8c;
  font-weight: bold;
  overflow: hidden;
}
/* 设计当天时间背景 */
.today {
  width: 1rem;
  margin-left: 0.3rem;
  border-radius: 50%;
  background-color: #e5e5e5;
}
/* 不是本月的时间的样式 */
.otherday {
  color: #8c8c8c;
}
.logday {
  color: #29bef6!important;
}
.time_hide {
  overflow: hidden;
  font-size: 0.36rem;
  line-height: 1rem;
  letter-spacing: -0.01rem;
  color: #000000;
}
.rili td {
  width: 14.2%;
  float: left;
}
.unfold {
  margin-top: 0.03rem;
  border-top: 0.03rem solid #ebebeb;
}
.unfold img {
  width: 0.55rem;
  height: 0.37rem;
  margin-left: 5.1rem;
}
.unfold p {
  font-size: 0.46rem;
  color: #9f9f9f;
  margin-left: 4.95rem;
}
.middle {
  margin-top: 0.33rem;
  border-bottom: 0.21rem solid #f5f5f9;
}
.middle_top {
  overflow: hidden;
}
.middle_top img {
  margin-left: 0.28rem;
  width: 1.14rem;
  height: 1.15rem;
  /* 图片设为块元素 */
  display: block;
  float: left;
  background-color: #000000;
  margin-left: 0.28rem;
}
.one {
  padding-left: 0.33rem;
  float: left;
}
.name {
  font-size: 0.42rem;
  line-height: 0.7rem;
  letter-spacing: 0.02rem;
  color: #404040;
}
.pm {
  font-size: 0.36rem;
  line-height: 0.7rem;
  color: #8c8c8c;
}
.date {
  font-size: 0.3rem;
  line-height: 0.7rem;
  color: #8c8c8c;
  float: right;
  margin-right: 0.45rem;
  margin-top: 0.16rem;
}
.typeface {
  font-size: 0.46rem;
  line-height: 0.7rem;
  letter-spacing: 0.01rem;
  color: #404040;
  margin-left: 0.44rem;
  margin-right: 0.64rem;
  margin-top: 0.6rem;
  word-break: break-all;
  /* 将对象作为弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 设计文字只显示4行 */
  -webkit-line-clamp: 4;
  /* 从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
  -webkit-box-orient: vertical;
  /* 防止溢出 */
  overflow: hidden;
  /* 溢出用省略号显示 */
  text-overflow: ellipsis;
}
.img {
  margin-left: 0.44rem;
  margin-top: 0.81rem;
  overflow: hidden;
}
.img img {
  width: 2.2rem;
  height: 2.2rem;
  float: left;
  margin-right: 0.3rem;
}
.dianping {
  width: 1.38rem;
  height: 0.4rem;
  border-radius: 0.2rem;
  border: solid 0.02rem #898989;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin-top: 1.34rem;
  margin-left: 8.9rem;
  margin-bottom: 0.21rem;
}
.dianping img {
  width: 0.31rem;
  height: 0.25rem;
  float: left;
  padding-left: 0.1rem;
}
.dianping span {
  font-size: 0.28rem;
  color: #757575;
  padding-left: 0.15rem;
}
.remark {
  margin: 0.36rem;
  background-color: #f2f2f2;
}
.remark_box {
  margin: 0.1rem 0.27rem 0rem 0.27rem;
  padding: 0;
  overflow: hidden;
  display: block;
}
.remark_name {
  font-size: 0.36rem;
  color: #2a5892;
  padding-right: 0.15rem;
}
.remark_word {
  font-size: 0.36rem;
  color: #404040;
}
.remark_time {
  font-size: 0.36rem;
  color: #8d8d8d;
  float: right;
  padding-top: 0.18rem;
}

.comment_box {
  width: 100%;
  overflow: hidden;
  border-top: 0.02rem solid #898989;
  border-bottom: 0.02rem solid #898989;
  background-color: #ffffff;
  opacity: 1;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 3;
}
.comment {
  float: left;
  margin-left: 0.15rem;
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  width: 8.3rem;
}
.comment textarea {
  padding: 0.1rem;
  width: 8rem;
  max-height: 1.2rem;
  font-size: 0.4rem;
  word-wrap: break-word;
  word-break: break-all;
  overflow-y: auto;
  border-radius: 0.15rem;
  border: 0.02rem solid #898989;
}
.pinglun {
  height: 0.8rem;
  width: 2rem;
  font-size: 0.4rem;
  line-height: 0.8rem;
  text-align: center;
  background-color: #898989;
  color: #ffffff;
  border-radius: 0.15rem;
  float: right;
}
.pinglunNr {
  background-color: #29bef6;
}
.bottom {
  font-size: 0.4rem;
  line-height: 0.7rem;
  letter-spacing: 0.02rem;
  color: #757575;
  text-align: center;
  margin-top: 0.47rem;
}
</style>

