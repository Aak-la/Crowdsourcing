import request from "./request";

/**
 * 获取博客列表数据
 */
export async function getBlogs(classification = -1) {
  return await request.get("/api/blog/list", {
    params: {
      classification,
    },
  });
}

/**
 * 获取博客分类
 */
export async function getBlogCategories() {
  return await request.get("/api/blog/type");
}

export async function getBlog(id) {
  return await request.get(`/api/blog/${id}`);
}

/**
 * 提交评论
 */
export async function postComment(commentInfo) {
  return await request.post(`/api/comment`, { params: commentInfo });
}

export async function getComments(id) {
  return await request.get(`/api/comment/${id}`);
}
