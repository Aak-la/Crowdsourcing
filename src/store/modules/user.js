import { UserLogin, logout } from "@/api/user";
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || null,
    name: localStorage.getItem("name") || null,
    avatar: localStorage.getItem("avatar") || null,
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setUserName: (state, name) => {
      state.name = name;
      localStorage.setItem("name", name);
    },
    setAvatar: (state, avatar) => {
      state.avatar = avatar;
      localStorage.setItem("avatar", avatar);
    },
  },
  actions: {
    handleLogin({ commit }, inFor) {
      let { password, username } = inFor;
      return new Promise((resolve, reject) => {
        UserLogin({
          password,
          username,
        })
          .then((res) => {
            const data = res.data;
            commit("setToken", data.token);
            commit("setUserName", data.username);
            commit("setAvatar", data.avatar);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("setToken", null);
            commit("setUserName", null);
            commit("setAvatar", null);
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("avatar");
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
