<template>
  <div class="site-aside-container">
    <template>
      <Avatar :url="avatar ? avatar : defaultImg" :size="130" />
      <h1 class="title" v-if="!name" @click="login" style="cursor: pointer;">
        去登录
      </h1>
      <h1 class="title" v-else>{{ name }}</h1>
    </template>
    <Menu />
    <Contact />
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import defaultImg from "../../assets/login.png";
import Menu from "./Menu";
import Contact from "./Contact";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  data() {
    return {
      defaultImg,
    };
  },
  computed: {
    ...mapGetters(["avatar", "name"]),
  },
  methods: {
    login() {
       this.$router.replace("/");
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow: hidden;
}
.avatar-container {
  margin: 0 auto;
}
.title {
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}
</style>
