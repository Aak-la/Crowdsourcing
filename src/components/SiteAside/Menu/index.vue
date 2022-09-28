<template>
  <nav class="menu-container">
    <RouterLink
      :exact="item.exact"
      v-for="item in items"
      :key="item.link"
      :to="{ name: item.name }"
      active-class="selected"
      exact-active-class=""
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "Home",
          title: "平台首页",
          icon: "home",
          exact: true,
        },
        {
          name: "Blog",
          title: "我的文章",
          icon: "blog",
          exact: false, // 激活状态是否要精确匹配
        },

        {
          name: "Project",
          title: "我的项目",
          icon: "code",
          exact: true,
        },
        {
          name: "About",
          title: "我的故事",
          icon: "about",
          exact: true,
        },
        {
          name: "Message",
          title: "上传文件",
          icon: "chat",
          exact: true,
        },
        {
          name: "ArticleOverview",
          title: "文章总览",
          icon: "chat",
          exact: true,
        },
        {
          name: "EditText",
          title: "富文本编辑",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.menu-container {
  color: @gray;
  margin: 24px 0;
  a {
    &.selected {
      background: darken(@words, 3%);
    }
    padding: 0 50px;
    display: block;
    display: flex;
    align-items: center;
    height: 45px;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
  }
}
</style>
