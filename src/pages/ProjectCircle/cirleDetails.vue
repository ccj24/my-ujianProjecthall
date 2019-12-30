<template>
  <div>
    <div class="top">
      <img class="top_img" :src="cirleDetails.Portrait" alt />
      <div class="top_one">
        <span>{{cirleDetails.CreatorName}}</span>
        <span class="shijian" v-if="cirleDetails.fenzhongcha<=1">刚刚</span>
        <span
          class="shijian"
          v-else-if="1 <cirleDetails.fenzhongcha&& cirleDetails.fenzhongcha<60"
        >{{cirleDetails.fenzhongcha}}分钟前</span>
        <span
          class="shijian"
          v-else-if="60<=cirleDetails.fenzhongcha&&cirleDetails.fenzhongcha<1440"
        >{{cirleDetails.xiaoshicha}}小时前</span>
        <span class="shijian" v-else>{{cirleDetails.Createtime}}</span>
        <p>{{cirleDetails.NoteContent}}</p>
        <div class="tupian">
          <img
            v-for="(items,indexx) in (cirleDetails.ThumbnailList==null? cirleDetails.AttaList: cirleDetails.ThumbnailList)"
            :key="indexx"
            :src="items"
            @click="magnifyImg(items,indexx)"
            alt
          />
        </div>
        <!-- 预览图片，切换图片 -->
        <BigImg :clickhit="clickhit" :indexx="index" :tupian="tupian"></BigImg>
        <div class="caozuo" @click.stop>
          <span
            style="color:#495f8c"
            v-if="cirleDetails.CreatorId==UserInfo.UserId"
            @click="deleter()"
          >删除</span>
          <div class="thedianzan" @click="Dianzan(cirleDetails.NoteId)">
            <span class="icon" :class="{dianzan:cirleDetails.dianzan==true}">&#xe619;</span>
            点赞
          </div>
          <div class="icon" @click="dianping()">&#xe61a; 评论</div>
        </div>
        <!-- 点赞和评论 -->
        <div class="talk">
          <div class="talk_one" v-if="kk>0">
            <span class="icon">&#xe619;</span>
            <span
              style="color: #495f8c;"
              v-for="(items,indexs) in cirleDetails.PraiseList"
              :key="indexs"
            >
              {{items.Value}}
              <span v-if="indexs+1<kk">，</span>
            </span>
          </div>
          <div class="talk_two">
            <div
              @click.stop
              style="overflow: hidden;"
              v-for="(itemx,kk) in cirleDetails.CommentList"
              :key="kk"
              @click="dianpingBr(kk,itemx)"
            >
              <span>{{itemx.Commentator_R}}</span>
              <span v-if="itemx.ReplyId !=null">
                <span style="color: #353535;">回复</span>
                {{itemx.ReplyName}}
              </span>
              <span style="color: #353535;">: {{itemx.CommentContent}}</span>
              <span
                @click.stop
                class="shanchu"
                v-if="itemx.CommentatorId==UserInfo.UserId"
                @click="shanchu(itemx.NoteComId,kk)"
              >删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论框 -->
    <div class="commentBr" v-if="commentbox" @click="theoutside()">
      <div class="comment_box" @click.stop>
        <div class="comment">
          <textarea maxlength="1000" v-model="comment.CommentContent" auto-focus="’true’"></textarea>
        </div>
        <div
          class="pinglun"
          @click.stop
          :class="{pinglunNr:comment.CommentContent.length>0}"
          @click="talking"
        >评论</div>
      </div>
    </div>
    <div class="pinglunBB" v-if="commentbox==false" @click.stop>
      <div class="aa" @click="dianping()">
        <span class="icon">&#xe61a;</span>
        评论
      </div>
      <div class="aa" @click="Dianzan(cirleDetails.NoteId)">
        <span class="icon" :class="{dianzan:cirleDetails.dianzan==true}">&#xe619;</span>
        点赞
      </div>
    </div>
  </div>
</template>
<script>
import BigImg from "@/components/BigImg";
import { mapState } from "vuex";
export default {
  data() {
    return {
      cirleDetails: {},
      itemindex:0,
      kk:"",
      commentbox:false,
      comment:{
         NoteId:"",
         ReplyId:null,
        CommentContent:"",
      },
      NoteComId:"",
      thetime: new Date(),
      ReplyName:null,
      tupian:[],
      index:0,
      clickhit:0
    };
  },
  methods: {
    // 点赞
    async Dianzan(NoteId) {
        var that = this;
        var rep = await this.$UJAPI.ProjectNotePraise_Add(NoteId);
        if (rep.ret == 0) {
            this.cirleDetails.dianzan = !this.cirleDetails.dianzan;
            this.$store.commit("cirleDetails", this.cirleDetails);
            this.cirleDetails=this.$store.state.Project.cirleDetails;
            var that = this;
            var rep = await this.$UJAPI.ProjectNote_GetList({
              ProjectId: this.ProjectId
            });
            if (rep.ret == 0) {
              this.cirleDetails.PraiseList = rep.data[this.itemindex].PraiseList;
              this.kk=this.cirleDetails.PraiseList.length
            } else {
              this.toast(rep.msg);
            }
        } else {
          this.toast(rep.msg);
        }
    },
    theoutside() {
      this.commentbox = false;
    },
     dianping() {
      this.commentbox = true;
    },
    dianpingBr(kk,itemx) {
      this.commentbox = true;
      this.comment.ReplyId=itemx.CommentatorId;
      this.ReplyName=itemx.Commentator_R;
    },
    async talking() {
      var that = this;
      this.comment.NoteId=this.cirleDetails.NoteId
      var rep = await this.$UJAPI.ProjectNoteComment_Add(that.comment);
      if (rep.ret == 0) {
        this.NoteComId= rep.data
        this.cirleDetails.CommentList.push({
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
    async shanchu(NoteComId,kk) {
       var that = this;
      var rep = await this.$UJAPI.ProjectNoteComment_Delete(NoteComId);
      if (rep.ret == 0) {
        this.toast("已经删除");
        this.cirleDetails.CommentList.splice(kk,1)
      } else {
        this.toast(rep.msg);
      }
    },
    // 删除项目记录 
    async deleter() {
        var that = this;
      var rep = await this.$UJAPI.ProjectNote_Delete(
        this.cirleDetails.NoteId
      );
      if (rep.ret == 0) {
        this.toast("已经删除");
        this.$router.back();
      } else {
        this.toast(rep.msg);
      }
      },
     // 放大图片
     magnifyImg(items,indexx) {
       this.index=indexx;
       this.clickhit++;
     }
  },
  computed: {
    ...mapState({
      UserInfo: state => state.User.UserInfo //获取当前用户的登录信息
    }),
  },
     // 注册组件
  components: {
    BigImg
  },
  async mounted() {
    this.itemindex=this.$route.query.index;
    this.cirleDetails=this.$store.state.Project.cirleDetails;
    this.kk=this.cirleDetails.PraiseList.length
    console.log(this.cirleDetails)
    this.tupian=(this.cirleDetails.ThumbnailList==null? this.cirleDetails.AttaList: this.cirleDetails.ThumbnailList)

  }
};
</script>
<style scoped>
.top {
  padding: 0.3rem;
  overflow: hidden;
}
.top_img {
  height: 1.2rem;
  width: 1.2rem;
  display: block;
  float: left;
}
.top_one {
  font-size: 0.43rem;
  color: #495f8c;
  margin-left: 1.55rem;
}
.shijian {
  float: right;
  color: #aaa;
  font-size: 0.35rem;
}
.top_one p {
  color: #353535;
  margin-top: 0.3rem;
}
.tupian {
  overflow: hidden;
  margin-left: 0.3rem;
  margin-top: 0.3rem;
}
.tupian img {
  width: 2.49rem;
  height: 2.49rem;
  background-color: #00aef6;
  float: left;
  margin-left: 0.12rem;
  margin-top: 0.12rem;
}
.caozuo {
  font-size: 0.35rem;
  color: #aaaaaa;
  display: flex;
  align-items: center;
  margin-top: 0.6rem;
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
.pinglunBB {
  height: 1.37rem;
  width: 100%;
  line-height: 1.37rem;
  position: fixed;
  bottom: 0rem;
  background-color: #e8e8e8;
  font-size: 0.5rem;
  overflow: hidden;
  display: table;
}
.aa {
  overflow: hidden;
  display: table-cell;
  text-align: center;
}
.commentBr {
  position: absolute;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.05);
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
  z-index: 99;
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