import { getUser } from "@/api/logIn";
export default {
  /*   namespaced: true, */
  state: {
    token: "",
    name: "",
    avatar: "",
    introduction: "",
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token;
    },
    setUserName: (state, introduction) => {
      state.introduction = introduction;
    },
    setUserId: (state, name) => {
      state.name = name;
    },
    setAvatar: (state, avatar) => {
      state.avatar = avatar;
    },
  },

  actions: {
    handleLogin({ commit }, userName, passWord) {
      console.log(userName, passWord);
      /* userName = userName.trim(); */
      return new Promise((resolve, reject) => {
        getUser({
          userName,
          passWord,
        })
          .then((res) => {
            const data = res.data;
            commit("setToken", data.token);
            resolve();
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
            commit("setToken", "");
            commit("setAccess", []);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getUserInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token)
            .then((res) => {
              const data = res.data;
              commit("setUserName", data.name);
              commit("setUserId", data.user_id);
              commit("setAvatar", data.access);
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};
