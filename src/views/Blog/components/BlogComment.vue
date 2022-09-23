<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="listTotal"
      :list="data"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import { getComments, postComment } from "@/api/blog.js";
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
      return this.data.length;
    },
  },
  methods: {
    async handleSubmit(formData, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      console.log(resp);
      if (resp.data.data.msg == "添加评论成功") {
        callback("评论成功");
        this.$forceUpdate();
      } else {
        callback("评论失败");
      }
      /* this.data.rows.unshift(resp);
      this.data.total++;
      */
    },
  },
};
</script>

<style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
}
</style>
