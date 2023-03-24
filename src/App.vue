<template>
    <div class="app-container">
        <router-view :key="key"></router-view>
    </div>
</template>

<style scoped>
.app-container {
    height: 100vh;
}
</style>
<script>
export default {
    computed: {
        key() {
            return this.$route.meta.routerViewKey || this.$route.path
        }
    }
}
</script>
