<template>
  <div>
    <!-- 项目圈头部 -->
    <div>
      <div class="topBr">
        <div class="icon huitui" @click="go({path:'/pages/newproject/homepage'})">&#xe645;</div>
        <div class="top_name">{{$route.query.Projectname}}</div>
        <div class="icon fabu" @click="addnote">&#xe61d;</div>
      </div>
    </div>
    <!-- 背景图 -->
    <div class="Img">
      <img class="Imgone" src="https://image.ujianchina.net//ProjectNoteAtta//default/bg.png" alt />
      <img class="Imgtwo" :src="UserInfo.Portrait" alt />
    </div>
    <!-- 内容 -->
    <div class="content" v-for="(item,index) in theProjectNote_GetList" :key="index" @click="Details(item,index)">
      <div>
        <img :src="item.Portrait" alt />
        <div class="content_one">
          <div style="overflow: hidden;">
            <span class="name">{{item.CreatorName}}</span>
            <span class="time" v-if="item.fenzhongcha<=1">刚刚</span>
            <span class="time" v-else-if="1 <item.fenzhongcha&& item.fenzhongcha<60">{{item.fenzhongcha}}分钟前</span>
            <span class="time" v-else-if="60<=item.fenzhongcha&&item.fenzhongcha<1440">{{item.xiaoshicha}}小时前</span>
            <span class="time" v-else>{{item.Createtime}}</span>
          </div>
          <p class="neirong">{{item.NoteContent}}</p>
          <div class="tupian">
            <img
              v-for="(items,indexx) in (item.ThumbnailList==null? item.AttaList: item.ThumbnailList)"
              :key="indexx"
              :src="items"
              alt
              @click.stop="yulan(item,indexx)"
            />
          </div>
          <div class="caozuo" @click.stop>
            <span style="color:#495f8c" v-if="item.CreatorId==UserInfo.UserId" @click="deleter(item.NoteId,item,index)">删除</span>
            <div class="thedianzan" @click="Dianzan(item.NoteId,item,index)">
              <span class="icon" :class="{dianzan:item.dianzan==true}">&#xe619;</span>
              点赞
            </div>
            <div class="icon" @click="dianping(item,index)">&#xe61a; 评论</div>
          </div>
          <!-- 点赞和评论 -->
          <div class="talk" @click.stop>
            <div class="talk_one" v-if="item.PraiseList.length>0">
              <span class="icon">&#xe619; </span>
              <span
                style="color: #495f8c;"
                v-for="(items,indexs) in item.PraiseList"
                :key="indexs"
              >{{items.Value}}<span v-if="indexs+1<item.PraiseList.length">，</span></span>
            </div>
            <div class="talk_two" v-if="item.CommentList.length>0" >
              <div              
                style="overflow: hidden;"
                v-for="(itemx,kk) in item.CommentList"
                :key="kk"
                @click="dianpingBr(item,index,kk,itemx)"
              >
                <span>{{itemx.Commentator_R}}</span>
                <span v-if="itemx.ReplyId !=null"><span style="color: #353535;"> 回复</span> {{itemx.ReplyName}}</span>
                <span style="color: #353535;">: {{itemx.CommentContent}}</span>
                <span @click.stop class="shanchu" v-if="itemx.CommentatorId==UserInfo.UserId" @click="shanchu(itemx.NoteComId,itemx,kk,index)">删除</span>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
    <!-- 评论框 -->
    <div class="commentBr" v-if="commentbox" @click="theoutside">
      <div class="comment_box" @click.stop>
            <div class="comment">
            <textarea
              maxlength="1000"
              v-model="comment.CommentContent"
              auto-focus="’true’"
            ></textarea>
          </div> 
          <div class="pinglun" :class="{pinglunNr:comment.CommentContent.length>0}" @click="talking">评论</div>
        </div>
    </div> 
    <!-- 预览图片，切换图片 -->
      <BigImg :clickhit="clickhit" :indexx="theindex" :tupian="tupian"></BigImg>  
  </div>
</template>
<script>
import BigImg from "@/components/BigImg";
import { mapState } from "vuex";
export default {
  data() {
    return {
      ProjectNote_GetList: "",
      theProject:"",
      thetime: new Date(),
      // 评论框
      commentbox: false,
      comment:{
        NoteId:"",
        ReplyId:null,
        CommentContent:"",
      },
      index:"",
      ReplyName:null,
      NoteComId:"",
      clickhit:0,
      theindex:0,
      tupian:[],
    };
  },
  methods: {
    // 点赞
    async Dianzan(NoteId, item,index) {
        var that = this;
        var rep = await this.$UJAPI.ProjectNotePraise_Add(NoteId);
        if (rep.ret == 0) {
            item.dianzan = !item.dianzan;
            // this.ProjectNote_GetList.splice(index, 1, item);
            this.ProjectNote_GetList[index].dianzan=item.dianzan
            var that = this;
            var rep = await this.$UJAPI.ProjectNote_GetList({
            ProjectId: this.ProjectId
            });
            if (rep.ret == 0) {
              this.ProjectNote_GetList[index].PraiseList = rep.data[index].PraiseList;
            } else {
              this.toast(rep.msg);
            }
        } else {
          this.toast(rep.msg);
        }
    },
    Details(item,index) {
      // 这样接收this.$store.state.Project.cirleDetails;
      this.$store.commit("cirleDetails", item);
      this.$router.push({
        path: "/pages/ProjectCircle/cirleDetails",
        query: {
          index:index
        }
      });
    },
    dianping(item,index) {
      this.comment.NoteId=item.NoteId;
      this.index=index;
      this.commentbox = true;
    },
    // 传参一定要按照顺序接收，像item,index,kk,itemx对应分别顺序的值，名字只是自己定义的
    dianpingBr(item,index,kk,itemx) {
      this.comment.NoteId=item.NoteId;
      this.index=index;
      this.commentbox = true;
      this.comment.ReplyId=itemx.CommentatorId;
      this.ReplyName=itemx.Commentator_R;
    },
    async talking() {
      var that = this;
      var rep = await this.$UJAPI.ProjectNoteComment_Add(that.comment);
      if (rep.ret == 0) {
        this.NoteComId= rep.data
        this.ProjectNote_GetList[this.index].CommentList.push({
          CommentContent: this.comment.CommentContent,
          CommentTime: this.thetime,
          CommentatorId: this.UserInfo.UserId,
          Commentator_R: this.UserInfo.UserName,
          NoteComId: this.NoteComId,
          NoteId: this.comment.NoteId,
          ReplyId: this.comment.ReplyId,
          ReplyName: this.ReplyName
        })
        this.toast("评论成功");
        this.commentbox = false;
        this.comment.CommentContent=""
      } else {
        this.toast(rep.msg);
      }
    },
    async shanchu(NoteComId,itemx,kk,index) {
       var that = this;
      var rep = await this.$UJAPI.ProjectNoteComment_Delete(NoteComId);
      if (rep.ret == 0) {
        this.toast("已经删除");
        this.ProjectNote_GetList[index].CommentList.splice(kk,1)
      } else {
        this.toast(rep.msg);
      }
    },
    theoutside() {
      this.commentbox = false;
    },
    addnote() {
      this.$router.push({
        path: "/pages/log/writeLog",
        query: {
          LogId:2
        }
      });
    },
    // 删除项目记录 
    async deleter(NoteId,item,index) {
        var that = this;
      var rep = await this.$UJAPI.ProjectNote_Delete(
        NoteId
      );
      if (rep.ret == 0) {
        this.toast("已经删除");
        this.ProjectNote_GetList.splice(index,1)
      } else {
        this.toast(rep.msg);
      }
      },
      yulan(item,indexx) {
        this.theindex=indexx;
        this.clickhit++;
       this.tupian=item.AttaList
      }
  },
  computed: {
    theProjectNote_GetList() {
      for (let i = 0; i < this.ProjectNote_GetList.length; i++) {
        for (let y = 0;y < this.ProjectNote_GetList[i].PraiseList.length;y++) {
          if (this.ProjectNote_GetList[i].PraiseList[y].Key ==this.UserInfo.UserId) {
            this.ProjectNote_GetList[i].dianzan = true;
          }
          //  else{this.ProjectNote_GetList[i].dianzan = false;}
        }
        // 相差分钟
        this.ProjectNote_GetList[i].fenzhongcha = Math.floor((this.thetime - new Date(this.ProjectNote_GetList[i].Createtime)) /1000 /60);
        // 小时
        this.ProjectNote_GetList[i].xiaoshicha=Math.floor((this.ProjectNote_GetList[i].fenzhongcha)/60)
     }
     console.log(this.ProjectNote_GetList)
      return this.ProjectNote_GetList;
    },
        ...mapState({
      UserInfo: state => state.User.UserInfo //获取当前用户的登录信息
    }),
  },
         // 注册组件
  components: {
    BigImg
  },
  async mounted() {
    var that = this;
    var rep = await this.$UJAPI.ProjectNote_GetList({
      ProjectId: this.ProjectId
    });
    if (rep.ret == 0) {
      this.ProjectNote_GetList = rep.data;
    } else {
      this.toast(rep.msg);
    }
  }
};
</script>
<style scoped>
.topBr {
  width: 100%;
  height: 1.28rem;
  background-color: #00aef6;
  overflow: hidden;
  font-size: 0.5rem;
  color: #fff;
}
.huitui {
  line-height: 1.28rem;
  float: left;
  display: block;
}
.top_name {
  line-height: 1.28rem;
  font-size: 0.46rem;
  overflow: hidden;
  text-align: center;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  width: 6.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  float: left;
}
.fabu {
  float: right;
  margin-right: 0.3rem;
  line-height: 1.28rem;
  display: block;
}
.Img {
  height: 6.69rem;
  background-color: #00aef6;
  position: relative;
}
.Imgone {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.Imgtwo {
  width: 2.2rem;
  height: 2.19rem;
  position: absolute;
  /* background-color: #00aef6; */
  bottom: -0.6rem;
  right: 0.28rem;
}
.content {
  margin-top: 0.75rem;
  background-color: #fff;
  overflow: hidden;
  padding-bottom: 0.3rem;
  border-bottom: 0.01rem solid #e8e8e8;
}
.content img {
  width: 1.28rem;
  height: 1.28rem;
  /* display: block; */
  float: left;
  margin-left: 0.28rem;
}
.content_one {
  margin-left: 1.9rem;
  overflow: hidden;
  margin-right: 0.31rem;
  font-size: 0.4rem;
}
.name {
  font-size: 0.43rem;
  color: #495f8c;
  float: left;
}
.time {
  color: #aaaaaa;
  font-size: 0.35rem;
  float: right;
}
.neirong {
  color: #353535;
  font-size: 0.43rem;
  margin-top: 0.31rem;
}
.tupian {
  margin-top: 0.15rem;
  overflow: hidden;
}
.tupian img {
  width: 2.25rem;
  height: 2.25rem;
  /* background-color: #00aef6; */
  float: left;
  margin-left: 0.12rem;
  margin-top: 0.12rem;
}
.caozuo {
  font-size: 0.35rem;
  color: #aaaaaa;
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
}
.thedianzan {
  margin-left: 5rem;
  margin-right: 0.4rem;
}
.dianzan {
  color: #00aef6;
}
.talk {
  background-color: #f8f8f8;
  margin-top: 0.3rem;
}
.talk_one {
  padding: 0.2rem;
  border-bottom: 0.01rem solid #e8e8e8;
}
.talk_two {
  padding: 0.2rem;
  font-size: 0.4rem;
  color: #495f8c;
}
.shanchu {
  float: right;
  margin-left: 0.8rem;
}
.commentBr {
  position:absolute;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: 99;
}
.comment_box {
  position: fixed;
  bottom: 0rem;
  width: 100%;
  overflow: hidden;
  border-top: 0.02rem solid #898989;
  border-bottom: 0.02rem solid #898989;
  background-color: #ffffff;
  opacity: 1;
  display: flex;
  align-items: center;
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
</style>