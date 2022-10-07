<template>
  <Layout>
    <template #left>
      <div class="aside">
        <SiteAside />
      </div>
    </template>
    <div class="project-container" ref="projectContainer" v-loading="loading">
      <div v-for="item in data" :key="item.id" class="project-item">
        <img class="thumb" :src="item.url" />
        <div class="info">
          <div>
            <a :href="item.url" style="font-weight: bold; ">
              {{ item.name }}
            </a>
          </div>
          <a
            class="github "
            target="_blank"
            :href="item.github"
            v-if="item.github"
          >
            github地址:{{ item.github }}
          </a>
          <div>
            <span style="font-weight: bold;">项目描述:</span>
            {{ item.description }}
          </div>

          <div>
            <span style="font-weight: bold;">创建时间:</span>
            {{ interceptTime(item.create_time) }}
          </div>

          <div>
            <span style="font-weight: bold;">项目目的:</span>
            {{ item.objective }}
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import interceptTime from "@/utils/interceptTime";
import mainScroll from "@/mixins/mainScroll.js";
import { mapState } from "vuex";
import Layout from "@/components/Layout";
import SiteAside from "@/components/SiteAside";
export default {
  mixins: [mainScroll("projectContainer")],
  computed: mapState("project", ["loading", "data"]),
  created() {
    this.$store.dispatch("project/fetchProject");
  },
  components: {
    Layout,
    SiteAside,
  },
  methods: {
    interceptTime,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.project-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
  overflow-x: hidden;
}
.project-item {
  width: 90%;
  margin: 0 auto;
  transition: 0.5s;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  border-radius: 20px;
  min-width: 660px;
  height: 200px;
  animation: slide-in-top 1s;
  &:hover {
    /*  box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px); */
    color: inherit;
    border-radius: 26px;
    /*  background: #000; */
    box-shadow: 7px 7px 25px #bebebe, -7px -7px 25px #ffffff;
    cursor: pointer;
  }
  .thumb {
    width: 250px;
    min-height: 150px;
    flex: 0 0 auto;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 15px;
    pointer-events: none;
  }
  .info {
    line-height: 1.7;
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .github {
    font-size: 14px;
    color: @primary;
    font-weight: bolder;
    animation: focus-in-expand 1s;
  }
  @keyframes focus-in-expand {
    0% {
      letter-spacing: -0.5em;
      -webkit-filter: blur(12px);
      filter: blur(12px);
      opacity: 0;
    }
    100% {
      -webkit-filter: blur(0px);
      filter: blur(0px);
      opacity: 1;
    }
  }
  @keyframes slide-in-top {
    0% {
      -webkit-transform: translateY(-1000px);
      transform: translateY(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>
