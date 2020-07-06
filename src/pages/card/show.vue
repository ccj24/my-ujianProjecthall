<template>
    <!-- <div class="user">
        <div class="baseinfo">
            <div class="portrait">
                <img>
            </div>
            <div class="body">
                <div class="name">用户姓名</div>
                <div class="post"><i class="icon">&#xe756;</i>职位</div>
                <div class="corp"><i class="icon">&#xe636;</i>公司名</div>
                <div class="tool">
                    <span class="share"><i class="icon">&#xe64e;</i></span>
                    <span class="praise"><i class="icon">&#xe619;</i>131</span>
                </div>
            </div>
        </div>
    </div> -->
    <web-view :src="webviewUrl" @message="getPostMessage" @load="load" @error="error" style="width: 414px; height: 672px;"></web-view>

</template>
<script>
import { mapState } from "vuex";

export default {
    data(){
        return {
            shareId:"",
            backjson:"",
            // Url:"http://192.168.0.85:811/wxtest.html",
            Url:"http://knowmore.iok.la/%E5%90%8D%E7%89%87%E5%8A%9F%E8%83%BD%E7%A8%8B%E5%BA%8F/share.html"
        }
    },
    computed:{
        ...mapState({
            SingleTicket: state => state.User.SingleTicket,//获取当前用户的验证票据
            UserInfo: state => state.User.UserInfo//获取当前用户的登录信息

        }),
        webviewUrl(){
            var parmes =[];
            if(this.backjson)
            {
                parmes.push(`backjson=${this.backjson}`)
            }
            if(this.shareId)
            {
                parmes.push(`shareId=${this.shareId}`)
            }
            if(this.UserInfo)
            {
                parmes.push(`UserInfo=${escape(JSON.stringify(this.UserInfo))}`)
            }

            if(parmes.length >0)
            {
                return `${this.Url}?${parmes.join('&')}`
            }else
             return `${this.Url}`
        }
    },
    methods:{
        getPostMessage(e){
            console.log(e)
            this.backjson = JSON.stringify(e.mp.detail.data[0]) ;
        },
        load(e){
            console.log(e)
        },
        error(e)
        {
            console.log(e)
        }
        
    },
    onShareAppMessage(){
        return {

        }
    },
    onLoad(query) {
        // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
        if (query.scene) this.shareId = decodeURIComponent(query.scene);
        
        wx.showShareMenu({
            withShareTicket: true
        });
    },

    mounted(){
        if (this.$route.query && this.$route.query.shareId) {
            this.shareId = this.$route.query.shareId
        }
        console.log(this.webviewUrl)
    }
}
</script>
<style lang="scss" scoped>
.user{
    .baseinfo{
        display: flex;
        padding:0.49rem 0  0 0.79rem;
        .portrait{
                width: 2.35rem;
                height: 2.37rem;
            img{
                width: 2.35rem;
                height: 2.37rem;
            }

        }
        .body{
            position: relative;
            width: 100%;
            color: #1a1a1a;

            margin:0 0.59rem;
            div{
                    display: block;
                }

            .name{
                font-size: 0.52rem;
                margin-top: 0.28rem;
                margin-bottom: 0.55rem;
            }
            .post,.corp{
                font-size: 0.38rem;
                    i{
                        display: inline-block;
                        font-size:0.34rem;
                        padding: 0.07rem;
                        border-radius: 50%;
                        background-color: #12b7f5;
                        color: #fff;
                        margin-right: 0.16rem;
                    }
            }
            .post{
                margin-bottom: 0.28rem;
            }
            .tool{
                position:absolute;
                top: 0;
                right: 0;
                display: flex;
                .share , .praise{
                    flex: 0 0 auto;
                    
                    border: solid 0.02rem #34394c;
                    padding: 0.25rem 0.33rem;
                    color: #34394c;
                    font-size: 0.36rem;
                    i{
                        display: inline-block;
                    }
                }
                .share{
                    margin-right: 0.2rem;
                    border-radius: 50%;
                }
                .praise{
                    border-radius: 0.4rem;
                    i{
                    margin-right: 0.1rem;
                    }
                }
            }
        }
 

    }
}
</style>