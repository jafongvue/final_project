// State
export const state = () => ({
    loading: false,
    types: []
})

// Actions
export const actions = {
    async types({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/type`).then(res => {
            let list = []
          for (let i in res.data.type) {
            const el = res.data.type[i];
            const obj = {
              idx: parseInt(i) + 1,
              type_id: el.type_id,
              typeName: el.typeName,
            }
            list.push(obj)
          }
          commit('setItem', list)
          commit('setLoading',true)

        }).catch(() => false)
    },
    async type({ commit }, id) {
        commit('setLoading', true)
        await this.$axios.get(`/type/${id}`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async create({ commit,dispatch }, data) {
        commit('setLoading', true)
        await this.$axios.post(`/type`, data).then(response => {
            dispatch('types')
            commit('setLoading', false)
            this.$toast.success('ການສ້າງປະເພດສິນຄ້າສຳເລັດ',{
                duration: 1000,
                position: 'top-right',
                iconPack: 'mdi',
                icon: 'check',
                singleton: true,
            })
        }).catch(() => false)
    },
    async delete({ commit, dispatch }, data) {
        commit('setLoading', true)
        await this.$axios.delete(`/type/${data}`).then(response => {
            dispatch('types')
            commit('setLoading', false)
            this.$toast.success('ການລົບຂໍ້ມູນສຳເລັດ',{
                duration: 1000,
                position: 'top-right',
                iconPack: 'mdi',
                icon: 'check',
                singleton: true,
            })
        }).catch(() => false)
    },
    async update({ commit,dispatch }, data) {
        commit('setLoading', true)
        await this.$axios.put(`/type/${data.id}`, data.body).then(response => {
            dispatch('types')
            commit('setLoading', false)
            this.$toast.success('ການແກ້ໄຂສຳເລັດ',{
                duration: 1000,
                position: 'top-right',
                iconPack: 'mdi',
                icon: 'check',
                singleton: true,
            })
        }).catch(() => false)
    },
}

// Mutations
export const mutations = {
    setItem(state, data = Array) {
        state.types = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}