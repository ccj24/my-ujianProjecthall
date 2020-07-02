<template>
    <div class="user">
        <div class="baseinfo">
            <div class="portrait">
                <img>
            </div>
            <div class="body">
                <span class="name"></span>
                <span class="post"><i class="icon">&#xe756;</i></span>
                <span class="corp"><i class="icon">&#xe636;</i></span>
                <div class="tool">
                    <span class="share"><i class="icon">&#xe64e;</i></span>
                    <span class="praise"><i>&#xe619;</i></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.user{
    .baseinfo{
        display: flex;
        padding:0.49rem 0  0 0.79rem;
        .portrait{
            width: 2.35rem;
            height: 2.37rem;
        }
    }
}
</style>