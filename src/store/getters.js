const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    classify: state => state.classify.classify,
    Permissions: state => state.user.Permissions
}
export default getters
