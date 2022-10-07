<template>
  <Layout>
    <template #left>
      <div class="aside">
        <SiteAside />
      </div>
    </template>
    <template>
      <el-empty description="登录后再进入"></el-empty>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
export default {
  components: {
    Layout,
    SiteAside,
  },
};
</script>

<style></style>
