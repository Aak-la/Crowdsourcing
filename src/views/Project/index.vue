<template>
  <div class="project-container" ref="projectContainer" v-loading="loading">
    <div v-for="item in data" :key="item.id" class="project-item">
      <img class="thumb" v-lazy="item.url" />
      <div class="info">
        <h2>
          <a :href="item.url">
            {{ item.name }}
          </a>
        </h2>
        <a
          class="github"
          target="_blank"
          :href="item.github"
          v-if="item.github"
        >
          github地址: {{ item.github }}
        </a>
        <p><h3>项目描述:</h3> {{ item.description}}
        <h3>创建时间:</h3> {{ item.create_time}}
        <h3>项目目的:</h3> {{ item.objective}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import mainScroll from "@/mixins/mainScroll.js";
import { mapState } from "vuex";
export default {
  mixins: [mainScroll("projectContainer")],
  computed: mapState("project", ["loading", "data"]),
  created() {
    this.$store.dispatch("project/fetchProject");
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
}
.project-item {
  transition: 0.5s;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  border-radius: 20px;
  min-width: 660px;
  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
    color: inherit;
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
  }
}
</style>
