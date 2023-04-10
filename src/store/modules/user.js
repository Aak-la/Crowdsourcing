import { UserLogin, logout } from '@/api/user'
export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('localStorageToken') || null,
        name: localStorage.getItem('name') || null,
        avatar: localStorage.getItem('avatar') || null,
        Permissions: localStorage.getItem('Permissions') || null
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token
            localStorage.setItem('localStorageToken', token)
        },
        setUserName: (state, name) => {
            state.name = name
            localStorage.setItem('name', name)
        },
        setAvatar: (state, avatar) => {
            state.avatar = avatar
            localStorage.setItem('avatar', avatar)
        },
        setPermissions: (state, Permissions) => {
            state.Permissions = Permissions
            localStorage.setItem('Permissions', Permissions)
        }
    },
    actions: {
        handleLogin({ commit }, inFor) {
            let { password, username } = inFor
            return new Promise((resolve, reject) => {
                UserLogin({
                    password,
                    username
                })
                    .then(res => {
                        const data = res
                        commit('setToken', data.token)
                        commit('setUserName', data.username)
                        commit('setAvatar', data.avatar)
                        commit('setPermissions', data.permissions)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        handleLogOut({ state, commit }) {
            return new Promise((resolve, reject) => {
                logout(state.token)
                    .then(() => {
                        commit('setToken', null)
                        commit('setUserName', null)
                        commit('setAvatar', null)
                        localStorage.removeItem('localStorageToken')
                        localStorage.removeItem('name')
                        localStorage.removeItem('avatar')
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
}
