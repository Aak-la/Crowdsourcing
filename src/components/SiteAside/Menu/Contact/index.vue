<template>
  <el-button type="text" @click="open" class="btn" v-if="name"
    ><el-button type="info" round>退出登录</el-button></el-button
  >
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    open() {
      this.$confirm("是否退出登录?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.$store.dispatch("user/handleLogOut");
          this.$router.replace("/");
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>
<style scoped>
.btn {
  color: #fff;
  position: relative;
  top: 100px;
  left: 50px;
}
</style>
