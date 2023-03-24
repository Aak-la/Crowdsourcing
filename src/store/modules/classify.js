import { getClassify } from '@/api/classify.js'
export default {
    namespaced: true,
    state: {
        classify: []
    },
    mutations: {
        setClassify: (state, classify) => {
            state.classify = classify
        }
    },
    actions: {
        GetClassify({ commit }) {
            return new Promise((resolve, reject) => {
                getClassify()
                    .then(data => {
                        const { res } = data
                        commit('setClassify', res)
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
}
