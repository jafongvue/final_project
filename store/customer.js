export const state = () => ({
    customers: [],
    customer: {},

  })
  
  export const getters = {
    getCounter(state) {
      return state.counter
    }
  }
  
  export const mutations = {
    setItem(state,data) {
      state.customer=data
    },
    setItemById(state,data) {
      state.customer=data
    },
  }
  
  export const actions = {
    async getAll({commit}){
        try {
            await this.$axios
              .get(`/customer`)
              .then((data) => {
                commit("setItem", data.data.customer);
              });
          } catch (error) {
            console.log(err);
          }
    },
    async getById({commit},id){
        try {
            await this.$axios
              .get(`/customer/${id}`)
              .then((data) => {
                commit("setItemById", data.data.customer);
              });
          } catch (error) {
            console.log(err);
          }
    },
    async create({commit,dispatch},form){
        try {
            await this.$axios
              .post(`/customer`,form)
              .then((data) => {
                dispatch('customers');
              });
          } catch (error) {
            console.log(err);
          }
    },
    async update({commit,dispatch},form){
        try {
            await this.$axios
              .post(`/customer/${form.id}`,form.body)
              .then((data) => {
                dispatch('customer');
              });
          } catch (error) {
            console.log(err);
          }
    },
    async delete({commit,dispatch},id){
        try {
            await this.$axios
              .post(`/customer/${id}`)
              .then((data) => {
                dispatch('customers');
              });
          } catch (error) {
            console.log(err);
          }
    },
  }
  