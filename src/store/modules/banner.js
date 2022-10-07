import { getBanners } from "@/api/banner";

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
    async fetchBanner(ctx) {
      if (ctx.state.data.length) {
        return;
      }
      const resp = await getBanners();
      ctx.commit("setData", resp.data.data);
    },
  },
};
