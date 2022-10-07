<template>
  <Layout>
    <template #left>
      <div class="aside">
        <SiteAside />
      </div>
    </template>
    <template>
      <div ref="mainContainer" class="main-container" v-loading="isLoading">
        <BlogDetail :blog="data" v-if="data" />
        <BlogComment v-if="!isLoading" />
      </div>
    </template>
    <template #right> </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getBlog } from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogComment from "./components/BlogComment";
import mainScroll from "@/mixins/mainScroll.js";
import { titleController } from "@/utils";
import SiteAside from "@/components/SiteAside";
export default {
  components: {
    Layout,
    BlogDetail,
    BlogComment,
    SiteAside,
  },
  mixins: [fetchData(null), mainScroll("mainContainer")],
  methods: {
    async fetchData() {
      const resp = await getBlog(this.$route.params.id);
      titleController.setRouteTitle(resp.title);
      return resp.data;
    },
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>
