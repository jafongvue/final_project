// State
export const state = () => ({
  loading: false,
  ProductCart: [],
});

// Actions
export const actions = {
  // async getOrdersOld({ commit }, data) {
  //   await this.$axios
  //     .get("/cus_order")
  //     .then((res) => {
  //       commit("setItem", res.data);
  //     })
  //     .catch((err) => {
  //       false;
  //     });
  // },
  // async getOrdersNew({ commit }, data) {
  //   await this.$axios
  //     .get("/cus_order/status")
  //     .then((res) => {
  //       commit("setItemNew", res.data);
  //     })
  //     .catch((err) => {
  //       false;
  //     });
  // },
  // async getOrderById({ commit }, id) {
  //   await this.$axios
  //     .get(`/cus_order/${id}`)
  //     .then((res) => {
  //       commit("setItem", res.data);
  //     })
  //     .catch((err) => {
  //       false;
  //     });
  // },
  // async updateOrderById({ commit, dispatch }, form) {
  //   await this.$axios
  //     .put(`/cus_order/${form.id}`, form.body)
  //     .then((res) => {
  //       console.log("successfully");
  //       dispatch("orderBuyNew");
  //     })
  //     .catch((err) => {
  //       false;
  //     });
  // },
  // async getOrdersDetails({ commit }, data) {
  //   await this.$axios
  //     .get("/cus_order/detail")
  //     .then((res) => {
  //       commit("setItems", res.data);
  //     })
  //     .catch((err) => {
  //       false;
  //     });
  // },
  // async getOrderDetailById({ commit }, id) {
  //   await this.$axios
  //     .get(`/cus_order/detail/${id}`)
  //     .then((res) => {
  //       commit("setItems", res.data);
  //     })
  //     .catch((err) => {
  //       false;
  //     });
  // },
  AddProductToCart(
    { commit },
    { pro_id, proName, typeName, unitName, qty,qty_in_data, price, profile, shop_id, total }
  ) {
    commit("Add_ToCart", {
      pro_id,
      proName,
      typeName,
      unitName,
      qty,
      qty_in_data,
      price,
      profile,
      shop_id,
      total,
    });
  },
  async Submit_Order({ commit }, { order_id, admin_id, cus_id, image }) {
    await this.$axios
      .post("/order", {
        order_id,
        admin_id,
        cus_id,
        image
      })
      .then((response) => {
        if (response.data.length == 0) {
          alert(JSON.stringify("Fail"));
          return;
        }
      });
  },
  async SubmitToOrderBuyDetail({ commit, dispatch }, form) {
    await this.$axios.post("/order/detail", form).then((result) => {
      if (result.data.length === 0) {
        alert("Fail ? Try again");
        return;
      }
      // commit("clearData", result.data);
      // dispatch("ProductCart");
    });
  },
  deleteItemIdx({ commit, dispatch }, pro_id) {
    commit("deleteItemByIndex", pro_id);
    dispatch("ProductCart");
    this.$toast.success("ການລົບຂໍ້ມູນສຳເລັດ", {
      duration: 1000,
      position: "top-right",
      iconPack: "mdi",
      icon: "check",
      singleton: true,
    });
   // alert(pro_id);
  },
  CancelAllItem({ commit }) {
    commit("Delete_All_OrderCut_Item");
  },
};

// Mutations
export const mutations = {
  Add_ToCart(
    state,
    { pro_id, proName, typeName, unitName, qty,qty_in_data, price, profile, shop_id, total }
  ) {
    let ProductInCart = state.ProductCart.find((item) => {
      return item.pro_id == pro_id;
    });
    if (ProductInCart) {
      if (ProductInCart.qty < 1) {
        return;
      }
      ProductInCart.qty += qty;
      ProductInCart.total = ProductInCart.qty * price;
      return;
    }
    state.ProductCart.push({
      pro_id,
      proName,
      typeName,
      unitName,
      qty,
      qty_in_data,
      price,
      profile,
      shop_id,
      total,
    });
  },
  // clearData(state, data = Array) {
  //   state.ProductCart = [];
  // },
  // setItem(state, data = Array) {
  //   state.orderBuyOld = data;
  // },
  // setItemNew(state, data = Array) {
  //   state.orderBuyNew = data;
  // },
  // setItems(state, data = Array) {
  //   state.orderBuyDetail = data;
  // },
  deleteItemByIndex(state, pro_id) {
    state.ProductCart = state.ProductCart.filter((item) => {
      return item.pro_id !== pro_id;
    });
  },

  Delete_All_OrderCut_Item(state) {
    state.ProductCart = [];
  },
  updateAddQty(state,{productId,addQty}){
    let product=state.ProductCart.find((p)=>p.pro_id===productId);
    if(product){
      product.qty=addQty;
    }
  }
};

// Getters
export const getters = {
  CountOrderQty(state) {
    let SumQty = 0;
    state.ProductCart.forEach((item) => {
      SumQty += item.qty;
    });
    return SumQty;
  },
  messages(state) {
    let OrderByQty = 0;
    state.ProductCart.forEach((item) => {
      OrderByQty += item.qty;
    });
    return OrderByQty;
  },
};
