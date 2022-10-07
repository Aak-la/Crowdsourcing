import { getProjects } from "@/api/project";

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
    async fetchProject(ctx) {
      if (ctx.state.data.length) {
        return;
      }
      const resp = await getProjects();
      ctx.commit("setData", resp.data.data);
    },
  },
};
