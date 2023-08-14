// State
export const state = () => ({
    loading: false,
    products: [],
    product: {},
})

// Actions
export const actions = {
    async products({ commit }) {
        commit('setLoading', true)
        await this.$axios.get(`/product`).then(res => {
            // let list = []
            // for (let i in res.data.product) {
            //     const el = res.data.prodcut[i];
            //     const obj = {
            //         idx: parseInt(i) + 1,
            //         id: el.pro_id,
            //         pro_name: el.pro_name,
            //         cate_name: el.cate_name,
            //         color: el.color,
            //         size: el.size,
            //         qty: el.qty,
            //         price: el.price,
            //         status: el.status,
            //         create_date: el.create_date,
            //         profile: el.profile,
            //     }
            //     list.push(obj)
           // }
            commit('setItem', res.data.product)
            commit('setLoading', false)

        }).catch(() => false)
    },
    async product({ commit }, id) {
        commit('setLoading', true)
        await this.$axios.get(`/product/${id}`).then(response => {
            commit('setItemById', response.data.product)
            commit('setLoading', false)
        }).catch(() => false)
    },

    async create({ commit, dispatch }, data) {
        commit('setLoading', true)
        await this.$axios.post(`/product`, data).then(response => {
            dispatch('products')
            commit('setLoading', false)
            this.$toast.success('ການສ້າງຂໍ້ມູນສິນຄ້າສຳເລັດ', {
                duration: 1000,
                position: 'top-right',
                iconPack: 'mdi',
                icon: 'check',
                singleton: true,
            })
        }).catch(() => false)
    },
    //image
    async createImage({ commit, dispatch }, data) {
        commit('setLoading', true)
        await this.$axios.post(`/product/image`, data).then(response => {
            commit('setLoading', false)
            this.$toast.success('ການສ້າງຂໍ້ມູນສຳເລັດ', {
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
        await this.$axios.delete(`/product/${data}`).then(response => {
            dispatch('products')
            commit('setLoading', false)
            this.$toast.success('ການລົບຂໍ້ມູນສຳເລັດ', {
                duration: 1000,
                position: 'top-right',
                iconPack: 'mdi',
                icon: 'check',
                singleton: true,
            })
        }).catch(() => false)
    },
    async update({ commit, dispatch }, data) {
        commit('setLoading', true)
        await this.$axios.put(`/product/${data.id}`, data.body).then(response => {
            dispatch('products')
            commit('setLoading', false)
            this.$toast.success('ການແກ້ໄຂສຳເລັດ', {
                duration: 1000,
                position: 'top-right',
                iconPack: 'mdi',
                icon: 'check',
                singleton: true,
            })
        }).catch(() => false)
    },
    async updateQty({ commit, dispatch }, data) {
        commit('setLoading', true)
        await this.$axios.put(`/product/UpdateQty/${data.id}`, data.body).then(response => {
            dispatch('products')
            commit('setLoading', false)
            this.$toast.success('ການແກ້ໄຂສຳເລັດ', {
                duration: 1000,
                position: 'top-right',
                iconPack: 'mdi',
                icon: 'check',
                singleton: true,
            })
        }).catch(() => false)
    },
    async updateQtyIm({ commit, dispatch }, data) {
        commit('setLoading', true)
        await this.$axios.put(`/product/UpdateQtyIm/${data.id}`, data.body).then(response => {
            dispatch('products')
            commit('setLoading', false)
            this.$toast.success('ການແກ້ໄຂສຳເລັດ', {
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
        state.products = data
    },
    setItemById(state, data = Array) {
        state.product = data
    },
    setLoading: (state, type) => {
        state.loading = type
    }
}

// Getters
export const getters = {}
