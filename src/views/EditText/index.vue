<template>
  <Layout>
    <template #left>
      <div class="aside">
        <SiteAside />
      </div>
    </template>
    <template>
      <div>富文本编辑</div>
    </template>
  </Layout>
</template>

<script>
import SiteAside from "@/components/SiteAside";
import Layout from "@/components/Layout";

export default {
  components: {
    SiteAside,
    Layout,
  },
};
</script>
