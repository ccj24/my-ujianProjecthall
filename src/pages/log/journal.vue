<template>
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
        <div class="top_one" @click="go({path:'/pages/log/Logdetails'})">
          <img src="/static/img/log-all@3x.3.png" />
          <p>我的日志</p>
        </div>
         <div class="top_one" :class="{top_oneNr:checkIndex==2}" @click="checktab(2)">
          <img src="/static/img/log-all@3x.4.png" />
          <p>待审核日志</p>
        </div>
      </div>
      <!-- calendar:classshow是隐藏样式，calendarshow:classconceal是打开样式 -->
      <div :class="{calendar:classshow,calendarshow:classconceal}">
        <div class="month">
          <img src="/static/img/back.png" alt="">
          <span>2016年12月</span>
          <img src="/static/images/theMore.png" alt="">
          </div>
        <table>
          <tr class="week">
            <td>日</td>
            <td>一</td>
            <td>二</td>
            <td>三</td>
            <td>四</td>
            <td>五</td>
            <td>六</td>
          </tr>
          <tr class="time">
            <td>30</td>
            <td><p>31</p></td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
           <tr class="time_hide">
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
          </tr>
           <tr class="time_hide">
            <td>13</td>
            <td>14</td>
            <td>15</td>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <td>19</td>
          </tr>
           <tr class="time_hide">
            <td>20</td>
            <td>21</td>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
          </tr>
           <tr class="time_hide">
            <td>27</td>
            <td>28</td>
            <td>29</td>
            <td>30</td>
            <td>31</td>
            <td>1</td>
            <td>2</td>
          </tr>
        </table>

      </div>
      <div class="unfold">
        <div class="unfold_content">
          <div v-if="show" @click="triggershow">
          <img src="/static/images/xc_xialan.png" />
          <p>展开</p>
          </div>
          <div  v-if="conceal" @click="triggerconceal">
          <img src="/static/images/wallet-morex.png" alt="">
          <p>收起</p>
          </div>
        </div>
      </div>
    </div>
    <!-- item是每一项  index索引和key值是一样的 -->
    <div class="middle" v-for="(item,index) in ProjectLog" :key="index">
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
        <img v-for="(items,indexs) in item.Images" :key="indexs" :src="items" />
     
        <!-- <div class="kuang">+</div> -->
      </div>
      <div class="dianping">
        <img src="/static/images/bubble.png" alt="">
        <span>点评</span>
      </div>
    </div>
    <!-- 评论框 -->
    <div>
      <textarea class="comment"></textarea>
      <span>评论</span>
    </div>
    <div class="bottom">加载完毕</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      ProjectLog :[],//项目日志
      classshow:true,
      classconceal:false,
      show:true,
      conceal:false,  
      checkIndex: 0,
    };

  },
  methods:{
    // 显示的方法
    triggershow(){
      // 控制样式
      this.classshow=false,
      this.classconceal=true,
    // 控制控件
      this.show=false,
      this.conceal=true
    },
    // 隐藏的方法
    triggerconceal(){
      this.classshow=true,
      this.classconceal=false,
      this.show=true,
      this.conceal=false
    },
    async checktab(index) {
      this.checkIndex = index;
      let QueryType;
      // 点击时候传公共日志的数据
      if(index==0)
      {
        QueryType=1;
      }
       // 点击时候传内部日志的数据
       else if(index==1) {
         QueryType=5;
       }
       var rep=await this.$UJAPI.Project_GetList({
      ProjectId:this.ProjectId
    })
    if (rep.ret==0) {
      // 这个ProjectLog是data自己定义的
      this.ProjectLog=rep.data
    }
    }
  },
  async mounted() {
    var that=this;
    // 获取日志接口
    var rep=await this.$UJAPI.Project_GetList({
      ProjectId:this.ProjectId
    })
    if (rep.ret==0) {
      // 这个ProjectLog是data自己定义的
      this.ProjectLog=rep.data
    }
  console.log(this.ProjectLog)
  }
}
</script>

<style scoped>
.journal_top {
  overflow: hidden;
  border-bottom: 0.03rem solid #ebebeb;
  display: flex;
}
.top_one {
  /* 分为4部分 */
  /* width: 25%; */
  /* 等分 */
  flex:1;
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
  height: 2.5rem;
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
  display: flex;
}
.week td {
  flex: 1;
}
.time {
  font-size: 0.36rem;
  line-height: 1rem;
  letter-spacing: -0.01rem;
  color: #000000;
  display: flex;
}
.time td {
  flex: 1;
}
/* 设计背景 */
.time td p {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #e5e5e5;
  color: #29bef6;
  line-height: 0.5rem;
}
/* 用伪类选择器选中第二个元素、 */
.time td:nth-child(2) {
  /* 让里面内容上下左右居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.time td:nth-child(3),
.time td:nth-child(5) {
  color: #29bef6;
}
.time_hide {
  font-size: 0.36rem;
  line-height: 1rem;
  letter-spacing: -0.01rem;
  color: #000000;
  display: flex;
} 
.time_hide td {
  flex: 1;
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
/* .kuang {
  width: 2.2rem;
	height: 2.2rem;
	border: 0.03rem dashed #a0a0a0;
  font-size: 1.05rem;
	line-height: 2.2rem;
  text-align: center;
	color: #b3b3b3;
  margin-left: 7.54rem;
} */
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
	line-height: 0.7rem;
	color: #757575;
  padding-left: 0.15rem;
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

