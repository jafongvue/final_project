<template>
  <div>
    <v-row no-gutters class="justify-center">
      <p style="font-size: 2rem">ລາຍງານຂໍ້ມູນການຮັບສັ່ງຊື້ສິນຄ້າ</p>
    </v-row>
    <v-row class="justify-center">
      <!-- <v-col cols="12" md="4">
        <v-card height="300">
          <h3 style="margin-left: 100px">ຍອດການສັ່ງຊື້ລວມທັງໝົດ</h3>
          <h3 style="margin-left: 100px">{{ SumMoneyAll }} ກີບ</h3>
          
        </v-card>
      </v-col> -->

      <v-col cols="12" md="8">
        <v-card height="300">
          <v-card-title>
            <v-row class="justify-center">
              <p style="font-weight: bold">
                ລາຍງານການຮັບສັ່ງຊື້ສິນຄ້າລະຫວ່າງວັນທີຫາວັນທີ
              </p>
            </v-row>
          </v-card-title>
          <v-row class="justify-center ma-5">
            <v-col cols="6">
              <v-toolbar dense flat class="mt-5">
                <v-menu offset-y>
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      class="mr-1"
                      v-model="picker"
                      clearable
                      label="YYYY-MM-DD"
                    ></v-text-field>
                    <v-btn
                      class="mr-8"
                      icon
                      v-bind="attrs"
                      v-on="on"
                      color="black"
                    >
                      <v-icon color large>mdi-alarm</v-icon>
                    </v-btn>
                  </template>
                  <v-date-picker v-model="picker"></v-date-picker>
                </v-menu>
                <h3>ຫາ</h3>
              </v-toolbar>
            </v-col>
            <v-col cols="6">
              <v-toolbar dense flat class="mt-5">
                <v-menu offset-y>
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      label="YYYY-MM-DD"
                      v-model="picker2"
                      clearable
                    ></v-text-field>
                    <v-btn color="primary" icon v-bind="attrs" v-on="on">
                      <v-icon color="#4A148C" large>mdi-alarm</v-icon>
                    </v-btn>
                  </template>
                  <v-date-picker
                    v-model="picker2"
                    color="#000000"
                  ></v-date-picker>
                </v-menu>
              </v-toolbar>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-btn class="mx-2 ml-2" @click="getOrderByCustomer" color="primary" style="font-size: 20px">
              <v-icon color="white" left>mdi-air-filter</v-icon>ລາຍງານ
            </v-btn>
            <!-- <v-btn
              class="mx-2 ml-2"
              color="green"
              style="font-size: 20px; color: white"
            >
              <v-icon color="white" left>mdi-printer</v-icon>Print
            </v-btn> -->
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center my-3">
      <v-card width="100%" class="mx-3 mb-5 pt-2">
        <v-data-table :headers="header" :items="newOrders" >
          <template #[`item.idx`]="{ index }">
            <div>{{ index + 1 }}</div>
          </template>
          <template #[`item.profile`]="{ item }">
            <v-img :src="item.profile" height="100" width="100" contain></v-img>
          </template>
          <template #[`item.priceSaleAll`]="{ item }">
            <div>
              {{ parseInt(item.order_qty)*parseInt(item.priceSale) }}
            </div>
          </template>
          <template #[`item.income`]="{ item }">
            <div>
              {{ parseInt(item.order_qty)*[parseInt(item.priceSale)- parseInt(item.priceIn)] }}
            </div>
            </template>
        </v-data-table>
        <v-row class="justify-center my-3">
          <h3 style="color: hsl(270, 100%, 50%)">ຕົ້ນທືນທັງໝົດ: <span class="red--text">{{ SumPriceInAll }}</span> ກີບ</h3>
          <v-divider vertical inset class="ml-3 black"></v-divider>
          <h3 style="color: rgb(128, 0, 255);" class="ml-5">ລວມມູນຄ່າຂາຍ: {{ SumPriceSaleAll }} ກີບ</h3>
          <v-divider vertical inset class="ml-3 black"></v-divider>
          <h3 style="color: rgb(128, 0, 255);" class="ml-5">ກຳໄລທັງໝົດ: <span :class="SumIncomeAll<=0?'red--text':'rgb(128, 0, 255)--text'">{{ SumIncomeAll }}</span> ກີບ</h3>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "shop",
  data() {
    return {
      picker: "",
      picker2: "",
      header: [
      { text: "ລໍາດັບ",class:"text-subtitle-1 font-weight-bold black--text", value: "idx" },
        {
          text: "ຮູບ",class:"text-subtitle-1 font-weight-bold black--text",
          sortable: false,
          value: "profile",
        },
        { text: "ຊື່ສິນຄ້າ",class:"text-subtitle-1 font-weight-bold black--text", value: "proName" },
        { text: "ປະເພດ",class:"text-subtitle-1 font-weight-bold black--text", value: "typeName" },
        { text: "ຫົວໜ່ວຍ",class:"text-subtitle-1 font-weight-bold black--text", value: "unitName" },
        { text: "ຈໍານວນ",class:"text-subtitle-1 font-weight-bold black--text", value: "order_qty" },
        { text: "ລາຄານຳເຂົ້າ(ກິບ)",class:"text-subtitle-1 font-weight-bold black--text", value: "priceIn" },
        { text: "ລາຄາຂາຍ(ກິບ)",class:"text-subtitle-1 font-weight-bold black--text", value: "priceSale" },
        { text: "ລາຄາລວມ(ກິບ)",class:"text-subtitle-1 font-weight-bold black--text", value: "priceSaleAll" },
        { text: "ກຳໄລ(ກິບ)",class:"text-subtitle-1 font-weight-bold black--text", value: "income" },
      ],
      orderAll:[],
      newOrders:[]
    };
  },
  computed:{
    SumMoneyAll(){
    var sum=0;
    for(let i in this.orderAll){
      let el=this.orderAll[i]
      sum=sum+parseInt(el.priceSale)*parseInt(el.order_qty)
    }
    return sum;
  },
  SumPriceSaleAll(){
    var sum=0;
    for(let i in this.newOrders){
      let el=this.newOrders[i]
      sum=sum+parseInt(el.priceSale)*parseInt(el.order_qty)
    }
    return sum;
  },
  SumPriceInAll(){
    var sum=0;
    for(let i in this.newOrders){
      let el=this.newOrders[i]
      sum=sum+parseInt(el.priceIn)*parseInt(el.order_qty)
    }
    return sum;
  },
  SumIncomeAll(){
    var sum=0;
    for(let i in this.newOrders){
      let el=this.newOrders[i]
      sum=sum+parseInt(el.order_qty)*[parseInt(el.priceSale)- parseInt(el.priceIn)]
    }
    return sum;
  },
  },
  mounted(){
  this.getOrderByCustomer()
  this.getAllOrderByCustomer()
  },
  methods: {
    async getOrderByCustomer(){
      const res=await this.$axios.$get(`/order/reportOrderByShop/${this.$cookies.get('user_id')}`,{
        params:{
          first_date:this.picker,
      end_date:this.picker2
        }
      })
      this.newOrders=res.result
    },
    async getAllOrderByCustomer(){
      const res=await this.$axios.$get(`/order/reportOrderByShop/${this.$cookies.get('user_id')}`)
      this.orderAll=res.result
    },
  }
};
</script>