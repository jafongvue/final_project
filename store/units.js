// State
export const state = () => ({
    loading: false,
    units: []
})

// Actions
export const actions = {
    async units({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/unit`).then(res => {
            let list = []
          for (let i in res.data.unit) {
            const el = res.data.unit[i];
            const obj = {
              idx: parseInt(i) + 1,
              unit_id: el.unit_id,
              unitName: el.unitName,
            }
            list.push(obj)
          }
          commit('setItem', list)
          commit('setLoading',true)

        }).catch(() => false)
    },
    async unit({ commit }, id) {
        commit('setLoading', true)
        await this.$axios.get(`/unit/${id}`).then(response => {
            commit('setItem', response.data)
            commit('setLoading', false)
        }).catch(() => false)
    },
    async create({ commit,dispatch }, data) {
        commit('setLoading', true)
        await this.$axios.post(`/unit`, data).then(response => {
            dispatch('units')
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
        await this.$axios.delete(`/unit/${data}`).then(response => {
            dispatch('units')
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
        await this.$axios.put(`/unit/${data.id}`, data.body).then(response => {
            dispatch('units')
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
        state.units = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}