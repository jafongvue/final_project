<template>
  <div class="mb-10">
    <v-card flat tile color="#ffffff">

      <v-row class="mb-10">
        <!-- <v-menu
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
          </template>
          <v-list-item v-for="(itm, index) in Category" :key="index" link>
            <v-row>
              <v-list-item-title id="css"> </v-list-item-title>
            </v-row>
          </v-list-item>
        </v-menu> -->

        <v-menu offset-y close-on-content-click open-on-click>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" class="mt-10 ml-10" id="css">
              <v-icon large>mdi-sort-variant</v-icon>
              ຈັດລຽງສິນຄ້າ
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" link>
              <v-list-item-title id="css"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-row align="center" justify="space-around">
          <v-text-field
            class="mt-9 ml-15 mr-15"
            dense
            outlined
            hide-details
            v-model="search"
            placeholder="ຄົ້ນຫາຂໍ້ມູນສິນຄ້າ"
            id="txtsearch"
          >
            <template slot="append">
              <v-btn style="margin-top: -7px; margin-right: -12px" text>
                <v-icon large>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-row>
      </v-row>

      <v-row class="mr-1 ml-1">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(pro, i) in filteredRow"
          :key="i"
        >
          <Product :pro="pro" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "product",
  data() {
    return {
      search: "",
      product: [],
      snackbar: false,
      text: "ທ່ານໄດ້ເພີ່ມສິນຄ້າ",
      timeout: 1000,
      items: [
        { title: "ສິນຄ້າໃໝ່-ເກົ່າ" },
        { title: "ສິນຄ້າເກົ່າ-ໃໝ່" },
        { title: "ສິນຄ້າຍອດນິຍົມ" },
      ],
      title: "ສິນຄ້າໃໝ່-ເກົ່າ",
      Category: [],
    };
  },
  computed: {
    filteredRow() {
    const searchTerm = this.search.toLocaleLowerCase().trim()
    return this.product
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
  mounted() {
    this.$store.dispatch('product/product', this.$route.params.id)
    this.getProducts()
  },
  methods: {
    minus(pro) {
      if (pro.addqty <= 1) return;
      pro.addqty--;
    },
    isNumber: function ($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    CheckNumber(pro) {
      if (
        (typeof pro.quantity == "string" && pro.quantity == "") ||
        pro.quantity == null ||
        pro.quantity < 1
      ) {
        pro.quantity = 1;
      }
      pro.quantity = parseInt(pro.quantity, 10);
    },
    DecrementQty(pro) {
      if (pro.quantity <= 1) return;
      pro.quantity--;
    },
    IncrementQty(pro) {
      pro.quantity++;
    },
    SelectedMenu(title) {
      // alert(JSON.stringify(title));
      if (title == "ສິນຄ້າເກົ່າ-ໃໝ່") {
        this.$store.dispatch("ProductOldNew");
      } else if (title == "ສິນຄ້າໃໝ່-ເກົ່າ") {
        this.$store.dispatch("GetProductList");
      } else if (title == "ສິນຄ້າຍອດນິຍົມ") {
        this.$store.dispatch("GetPopular_Products");
      }
    },
    async getProducts(){
    const res=await this.$axios.$get('/product/getAllLimit')
    this.product=res.product
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
#name {
  font-size: 20px;
  font-family: "Noto Sans Lao";
  text-align: left;
  margin-left: 7px;
  margin-top: 7px;
  color: black;
}
#txtsearch {
  font-size: 20px;
  font-family: "Noto Sans Lao";
  text-align: left;
  margin-left: 7px;
  color: black;
}
#btnAdd {
  font-size: 18px;
  font-family: "Noto Sans Lao";
  font-weight: normal;
  color: black;
}
</style>
<style scoped>
.tcenter >>> input {
  text-align: center;
}
</style>