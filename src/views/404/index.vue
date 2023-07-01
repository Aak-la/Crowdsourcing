<template>
    <div class="container">
        <el-empty description="404"></el-empty>
        <div class="goBack-btn">
            <el-button type="primary" @click="goBack">返回首页</el-button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.replace('/')
        }
    }
}
</script>


<style lang="less" scoped>
.container {
    .goBack-btn {
        width: 100px;
        /*   background-color: aqua; */
        margin: 0 auto;
    }
}
</style>
