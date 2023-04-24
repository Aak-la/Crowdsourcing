<template>
    <div class="app-container">
        <keep-alive :include="['takingGoods']"
            ><router-view></router-view
        ></keep-alive>
    </div>
</template>

<style scoped>
.app-container {
    height: 100vh;
}
</style>
<script>
/* export default {
    computed: {
        key() {
            return this.$route.meta.routerViewKey || this.$route.path
        }
    }
} */
</script>
