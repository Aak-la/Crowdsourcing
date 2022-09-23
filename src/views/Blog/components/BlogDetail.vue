<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期: {{ intercept(blog.create_time) }}</span>
      <span>浏览: {{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论: {{ blog.commentNumber }}</a>
      <RouterLink
        :to="{
          name: 'CategoryBlog',
          params: {
            categoryId: blog.name,
          },
        }"
      >
        {{ blog.category }}
      </RouterLink>
      <div class="desc">{{ blog.description }}</div>
    </div>
  </div>
</template>

<script>
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";
import intercept from "@/utils/interceptTime";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    intercept,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.aside {
  font-size: 12px;
  color: @gray;
  span,
  a {
    margin-right: 15px;
  }
}
.markdown-body {
  margin: 2em 0;
}
.desc {
  margin: 15px 0;
  font-size: 20px;
  color: #000;
  max-width: 1000px;
  overflow: hidden;
}
</style>
