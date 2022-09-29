<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: index == item.id }">
        {{ item.name }}
      </span>
      <span
        v-if="item.total"
        @click="handleClick(item)"
        class="aside"
        :class="{ active: index == item.id }"
      >
        {{ item.total }}篇
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  data() {
    return {
      index: -1,
    };
  },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      this.index = item.id;
      this.$router.push({
        name: "CategoryBlog",
        params: {
          categoryId: item.name,
        },
      });
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container {
  list-style: none;
  padding: 0;
  .right-list-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    .active {
      color: @words;
      font-weight: bold;
    }
  }
}
.aside {
  font-size: 12px;
  margin-left: 1em;
  color: @gray;
}
</style>
