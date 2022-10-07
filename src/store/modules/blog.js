import { getBlogs } from "@/api/blog.js";
export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    getBlog(ctx) {
      return new Promise((resole, reject) => {
        getBlogs()
          .then((res) => {
            ctx.commit("setData", res.data.data);
            resole(res.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
