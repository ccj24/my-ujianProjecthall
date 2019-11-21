<template>
    <div class="bc">
        <span class="icon" @click="back()">&#xe602;</span>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    computed:{
    },
    methods:{
        back(){
            this.$router.back();
        }
    }
}
</script>
<style lang="less" scoped>
.bc{
    background-color: #12b7f5;
    height: 1.28rem;
    .icon{
        font-size: 1rem;
        font-weight: bold;
        color: #d0f1fd;
    }
}
</style>
