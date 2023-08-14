<template>
  <div>
    <v-carousel
      cycle
      height="450"
      hide-delimiter-background
      show-arrows-on-hover
      show-arrows
    >
      <v-carousel-item v-for="img in items" :src="img.src" :key="img.id">
      </v-carousel-item>
    </v-carousel>
    <v-card flat tile>
      <v-container
        v-for="type in types"
        :key="type"
        class="grey lighten-4"
        fluid
      >
        <div class="d-flex">
          <div id="css">
            <v-icon left class="red--text mb-1">mdi-fire</v-icon> {{ type }}
          </div>
          <v-spacer></v-spacer>
          <div class="mt-4">
            <v-row justify="end">
              <v-btn
                id="btntext"
                text
                rounded
                color="primary"
                dark
                to="/view.customer/topSaleProduct"
              >
                ເບີ່ງທັງໝົດ <v-icon class="mn-1">mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </div>
        </div>
        <v-progress-linear
          class="mb-2"
          color="black"
          value="100"
          height="1px"
        ></v-progress-linear>
        <v-row>
          <v-col
            v-for="(pro, idx) in TopProduct"
            :key="idx"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <ProductTopSaleView :pro="pro" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card flat tile>
      <v-container class="grey lighten-4" fluid>
        <v-img src="/myads.png" height="150"></v-img>
      </v-container>
    </v-card>
    <v-card flat tile>
      <v-container
        v-for="type in types2"
        :key="type"
        class="grey lighten-4"
        fluid
      >
        <div class="d-flex">
          <div class="d-flex" id="css">
            <v-img
              class="mb-1 mr-1"
              src="/box_1524855.png"
              height="30"
              width="30"
              contain
            ></v-img>
            {{ type }}
          </div>
        </div>
        <v-progress-linear
          class="mb-2"
          color="black"
          value="100"
          height="1px"
        ></v-progress-linear>
        <v-row>
          <v-col
            cols="12"
            sm="2"
            md="3"
            lg="3"
            v-for="(pro, idx) in product"
            :key="idx"
          >
            <Product :pro="pro" />
          </v-col>
        </v-row>
        <v-row justify="center" class="mb-3">
          <v-btn :loading="loading" color="orange" @click="seeMore"
            >ເບິ່ງເພີ່ມເຕີມ
            <v-icon right>mdi-chevron-down-circle-outline</v-icon></v-btn
          >
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          src: require("@/assets/images/products/girl001.png"),
        },
        {
          src: require("@/assets/images/products/girl002.png"),
        },
        {
          src: require("@/assets/images/products/images.jpeg"),
        },
        {
          src: require("@/assets/images/products/003.png"),
        },
      ],
      types: ["ສິນຄ້າຍອດນິຍົມ"],
      types1: ["ສິນຄ້າແນະນຳ"],
      types2: ["ສິນຄ້າ"],
      TopProduct: [
        { profile: "/shop.jpg", proName: "pepsi", qty: 12, price: 8000 },
        { profile: "/shop.jpg", proName: "pepsi", qty: 12, price: 8000 },
        { profile: "/shop.jpg", proName: "pepsi", qty: 12, price: 8000 },
        { profile: "/shop.jpg", proName: "pepsi", qty: 12, price: 8000 },
      ],
      re_products: [
        { profile: "/shop.jpg", proName: "pepsi", qty: 12, price: 8000 },
        { profile: "/shop.jpg", proName: "pepsi", qty: 12, price: 8000 },
        { profile: "/shop.jpg", proName: "pepsi", qty: 12, price: 8000 },
        { profile: "/shop.jpg", proName: "pepsi", qty: 12, price: 8000 },
      ],
      products: [],
      limit: 4,
      loading: false,
    };
  },
  mounted() {
    this.getProducts();
    this.getTopProducts();
    // this.getRecommendProducts();
  },
  methods: {
    async getProducts() {
      const res = await this.$axios.$get("/product/getAllLimit");
      this.product = res.product;
    },
    async getTopProducts() {
      const res = await this.$axios.$get("/order/get/ProductOrderBuy");
      const arr = res;
      this.TopProduct = [];
      this.TopProduct = arr.splice(0, 4);
      // alert(JSON.stringify(this.TopProduct))
    },
    async getRecommendProducts() {
      const res = await this.$axios.$get(
        `/recommend/${this.$cookies.get("cus_id")}`
      );
      const arr = res;
      this.re_products = [];
      this.re_products = arr.splice(0, 4);
    },
    async seeMore() {
      try {
        this.loading = true;
        const res = await this.$axios.$get("/product/getAllLimit", {
          params: { limit: this.limit },
        });

        // Append the newly fetched products to the existing products array
        this.product = [...res.product];

        // Increase the limit for the next fetch (if required)
        this.limit += 4;
        this.loading = false;
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle the error as needed
      }
    },
  },
};
</script>

<style>
#css {
  font-size: 20px;
  font-family: "Noto Sans Lao";
  text-align: left;
  margin-left: 7px;
  margin-top: 7px;
  color: black;
}
#textfield {
  font-size: 20px;
  font-family: "Noto Sans Lao";
}
</style>

<style scoped>
.tcenter >>> input {
  text-align: center;
  color: black;
}
</style>
