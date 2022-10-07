const getters = {
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  classification: (state) => state.classification.data,
  classificationTotal: (state) => state.classification.total,
  blog: (state) => state.blog.data,
};
export default getters;
