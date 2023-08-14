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
              ສິນຄ້າທີ່ທ່ານອາດຈະສົນໃຈ
            </v-btn>
          </template>
          <v-list-item v-for="(itm, index) in Category" :key="index" link>
            <v-row>
              <v-list-item-title id="css"> </v-list-item-title>
            </v-row>
          </v-list-item>
        </v-menu>

        <!-- <v-spacer></v-spacer>
        <v-row align="center" justify="space-around">
          <v-text-field
            class="mt-9 ml-15 mr-15"
            dense
            outlined
            clearable
            hide-details
            placeholder="ຄົ້ນຫາຂໍ້ມູນສິນຄ້າ"
            id="txtsearch"
          >
            <template slot="append">
              <v-btn style="margin-top: -7px; margin-right: -12px" text>
                <v-icon large>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-row> -->
      </v-row>

       <!-- use Components -->
      <v-row class="mr-1 ml-1">
        <v-col
          cols="6"
          sm="6"
          md="4"
          lg="3"
          v-for="(pro, i) in product"
          :key="i"
        >
          <ProductCustomer :pro="pro" />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  layout:'customer',
  data() {
    return {
      snackbar: false,
      Category: [],
      product:[],
    }
  },
  computed: {

  },
  mounted() {
    this.getProducts()
  },
  methods: {
    async getProducts(){
    const res=await this.$axios.$get(`/recommend/${this.$cookies.get('cus_id')}`)
    this.product=res
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
