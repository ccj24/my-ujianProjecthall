<template>
    <nav>
        <router-link to="/pages/home/index">行业市场</router-link>
        <router-link to="/pages/order/index">个人订单</router-link>
        <router-link to="/pages/my/index">信息</router-link>
        <router-link to="/pages/my/index">我的</router-link>
    </nav>
</template>
<script>
export default {

}
</script>
<style scoped>

    nav{
        position: fixed;
        bottom: 0;
        width: 100%;
        margin: auto 0;
        text-align: center;
        background-color: #ffffff;
        border-top: 1px solid #ecf0f1;
        padding-top: 10px;
    }
    nav a{
        line-height: 1.41rem;
        width: 20%;
        font-size: 0.32rem;
        text-decoration:none;
        display: inline-block;
    }
</style>


