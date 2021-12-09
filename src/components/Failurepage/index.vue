<template>
  <div class="container">
    <img :src="ImgSrc" alt="" />
    <div class="click" @click="toHome">返回首页</div>
  </div>
</template>

<script>
import ImgSrc from "@/assets/404.gif";
export default {
  data() {
    return {
      ImgSrc,
    };
  },
  methods: {
    toHome() {
      this.$router.push({
        name: "Home",
       
      });
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.container {
  position: relative;
}
.container img {
  display: block;
  width: 100vw;
  height: 100vh;
}
.click {
  position: absolute;
  z-index: 999;
  width: 200px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  color: #ffff;
  left: 50%;
  margin-left: -100px;
  background-color: #43cd79;
  top: 65%;
  cursor: pointer;
  user-select: none;
}
.click:hover {
  opacity: 0.7;
}
</style>