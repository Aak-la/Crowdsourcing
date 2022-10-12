<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表总数"
      :subTitle="listTotal"
      :list="data"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import { Message } from "element-ui";
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getComments, postComment } from "@/api/blog.js";
import store from "@/store/index";
export default {
  components: {
    MessageArea,
  },
  data() {
    return {
      data: [],
      isLoading: true,
    };
  },
  async created() {
    let { data } = await getComments(this.$route.params.id);
    this.data = data.data;
    this.isLoading = false;
  },
  computed: {
    listTotal() {
      return this.data.length == undefined ? 0 : this.data.length;
    },
  },
  methods: {
    async handleSubmit(formData, callback) {
      let nickname = store.getters.name;
      let avatar = store.getters.avatar;
      if (nickname && avatar) {
        const resp = await postComment({
          blogId: this.$route.params.id,
          ...formData,
          nickname,
          avatar,
        });
        if (resp.data.msg == "添加评论成功") {
          callback("评论成功");
          let { data } = await getComments(this.$route.params.id);
          this.data = data.data;
        } else {
          callback("评论失败");
        }
      } else {
        callback("登录后评论");
      }
    },
  },
};
</script>

<style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
  max-width: 1000px;
}
</style>
