<template>
  <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
    <ul v-show="isShow">
      <li v-for="item in data" :key="item.id" v-if="data">
        <div class="thumb" v-if="item"></div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ intercept(item.create_time) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category,
                },
              }"
            >
              {{ item.category }}
            </RouterLink>
          </div>
        </div>
      </li>
    </ul>
    <!--  <Pager
      v-if="total"
      :current="routeInfo.page"
      :total="total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
      v-show="isShow"
    /> -->
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData.js";
import { getBlogs } from "@/api/blog.js";
import intercept from "@/utils/interceptTime";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  components: {
    Pager,
  },
  data() {
    return {
      isShow: true,
      data: null,
      isLoading: true,
      total: null,
    };
  },
  async created() {
    let BlogList = await getBlogs(
      this.routeInfo.page,
      this.routeInfo.limit,
      this.routeInfo.categoryId
    );
    this.data = BlogList.data.data;
    this.total = BlogList.data.total;
    this.isLoading = false;
  },
  computed: {
    routeInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;

      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  methods: {
    intercept,
    async fetchData() {
      return await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );
    },
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: "Blog",
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    async $route() {
      this.isShow = false;
      this.isLoading = true;
      this.$refs.mainContainer.scrollTop = 0;
      let category = this.$route.params.categoryId;
      if (category == "全部") {
        let result = await this.fetchData();
        let res = result.data.data;
        this.data = res;
        this.isLoading = false;
        this.isShow = true;
      } else {
        let result = await this.fetchData();
        let res = result.data.data;
        let ru = res.filter((item) => item.category == category);
        this.data = ru;
        this.isLoading = false;
        this.isShow = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
}
</style>
