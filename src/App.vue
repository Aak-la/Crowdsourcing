<template>
  <div class="app-container">
    <router-view :key="key"></router-view>
  </div>
</template>
<script>
export default {
  computed: {
    key() {
      return this.$route.meta.activeMenuName;
    },
  },
};
</script>
<style scoped>
.app-container {
  height: 100vh;
}
</style>
