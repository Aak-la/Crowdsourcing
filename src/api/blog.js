import request from "./request";


export async function getBlogs(classification = -1) {
  return await request.get("/api/blog/list", {
    params: {
      classification,
    },
  });
}


export async function getBlogCategories() {
  return await request.get("/api/blog/type");
}

export async function getBlog(id) {
  return await request.get(`/api/blog/${id}`);
}


export async function postComment(commentInfo) {
  return await request.post(`/api/comment`, { params: commentInfo });
}

export async function getComments(id) {
  return await request.get(`/api/comment/${id}`);
}
