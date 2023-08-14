<template>
  <div class="mb-10">
    <v-card flat tile color="#ffffff">
      <v-row class="mb-10">
        <v-menu
          offset-y
          close-on-content-click
          open-on-hover
          internal-activator
        >
          <template #activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" class="mt-10 ml-10" id="css">
              <v-icon large>mdi-sort-variant</v-icon>
              ປະເພດສິນຄ້າ
            </v-btn>
            <!-- {{ filteredRow }} -->
          </template>
          <v-list-item v-for="(itm, index) in Category" :key="index" link>
            <v-row>
              <v-list-item-title id="css"> </v-list-item-title>
            </v-row>
          </v-list-item>
        </v-menu>
        <v-spacer></v-spacer>
        <v-row align="center" justify="space-around">
          <v-text-field
            class="mt-9 ml-15 mr-15"
            dense
            outlined
            clearable
            hide-details
            placeholder="ຄົ້ນຫາຂໍ້ມູນສິນຄ້າ"
            id="txtsearch"
            @keypress="getProducts"
            v-model="search"
          >
            <template slot="append">
              <v-btn  @click="getProducts" style="margin-top: -7px; margin-right: -12px" text>
                <v-icon large>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-row>
      </v-row>

       <!-- use Components -->
      <v-row class="mr-1 ml-1">
        <v-col
          cols="6"
          sm="6"
          md="4"
          lg="3"
          v-for="(pro, i) in products"
          :key="i"
        >
          <ProductCustomer :pro="pro" />

        </v-col>
      </v-row>
      <v-row justify="center" class="mb-3">
          <v-btn v-if="!search" :loading="loading" color="orange" @click="seeMore"
            >ເບິ່ງເພີ່ມເຕີມ
            <v-icon right>mdi-chevron-down-circle-outline</v-icon></v-btn
          >
        </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  layout:'customer',
  data() {
    return {
      search: "",
      snackbar: false,
      Category: [],
      products:[],
      limit:8,
      loading:false
    }
  },
  computed: {
    filteredRow() {
    const searchTerm = this.search.toLocaleLowerCase().trim()
    return this.products
    .map((item,index) => {
      return {
        index: index + 1,
        ...item,
      }
    }).filter((item) => {
      const nameMatch = item.proName?.toLocaleLowerCase().includes(searchTerm)
      return nameMatch
    })
    },
  },
  //watch{}
  mounted() {
    this.getProducts()
  },
  methods: {
    async getProducts(){  
      const res=await this.$axios.$get('/product/getAllLimit', {
        params: { search: this.search },
      })
    this.products=res.product
    },
    async seeMore() {
    try {
      this.loading=true;
      const res = await this.$axios.$get("/product/getAllLimit", {
        params: { limit: this.limit },
      });

      // Append the newly fetched products to the existing products array
      this.products = [...res.product];

      // Increase the limit for the next fetch (if required)
      this.limit += 8;
      this.loading=false
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle the error as needed
    }
  },
  },
}
</script>


<style>
#css {
  font-size: 20px;
  font-family: 'Noto Sans Lao';
  text-align: left;
  margin-left: 7px;
  margin-top: 7px;
  color: black;
}
#name {
  font-size: 20px;
  font-family: 'Noto Sans Lao';
  text-align: left;
  margin-left: 7px;
  margin-top: 7px;
  color: black;
}
#txtsearch {
  font-size: 20px;
  font-family: 'Noto Sans Lao';
  text-align: left;
  margin-left: 7px;
  color: black;
}
#btnAdd {
  font-size: 18px;
  font-family: 'Noto Sans Lao';
  font-weight: normal;
  color: black;
}
</style>
<style scoped>
.tcenter >>> input {
  text-align: center;
}
</style>
