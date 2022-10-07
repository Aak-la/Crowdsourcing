import { getBlogCategories } from "@/api/blog.js";

export default {
  namespaced: true,
  state: {
    data: [],
    total: 0,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setTotal(state, payload) {
      state.total = payload;
    },
  },
  actions: {
    getClassification(ctx) {
      return new Promise((resole, reject) => {
        getBlogCategories()
          .then((resp) => {
            console.log(resp.data.data);
            ctx.commit("setData", resp.data.data);
            resole(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    calculateTheTotalNumberOf(ctx, { getGroups }) {
      return new Promise((resole) => {
        ctx.commit("setTotal", getGroups);
        resole();
      });
    },
  },
};
