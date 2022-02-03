export default {
    namespaced: true,
    state: {
      show: true,
    },
    mutations: {
      setShow(state, payload) {
        state.loading = payload;
      },
    },
   
  };