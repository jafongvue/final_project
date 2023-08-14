<template>
  <div>
    <v-row no-gutters class="justify-center">
      <p style="font-size: 2rem">ລາຍງານຂໍ້ມູນຮັບສັ່ງຊື້ສິນຄ້າ</p>
    </v-row>
    <v-row class="justify-center">
      <!-- <v-col cols="12" md="4">
        <v-card height="300">
          <h3 style="margin-left: 150px">ຍອດຮັບສັ່ງຊື້ລວມທັງໝົດ: {{ currency(SumMoneyAll) }} ກີບ</h3>
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
        <v-data-table :headers="headers" :items="newOrders">
          <template v-slot:item="{ item,index }">
              <tr v-ripple="{ class: `white--text` }">
                <td>{{ index+1 }}</td>
                <td>
                <v-img :src="item.profile" width="100" height="100" contain></v-img>
                </td>
                <td>{{ item.shop_name }}</td>
                <td>{{ item.proName }}</td>
                <td>{{ item.typeName }}</td>
                <td>{{ item.unitName }}</td>
                <td>{{ item.order_qty }}</td>
                <td>
                  {{ currency(item.priceSale) }}
                </td>
                <td>
                  {{
                    currency(item.order_qty * item.priceSale)
                  }}
                </td>
              </tr>
            </template>
        </v-data-table>
        <v-row class="justify-center my-3">
          <h3 style="color: rgb(128, 0, 255)">ລວມເປັນມູນຄ່າ:{{ currency(SumMoney) }} ກີບ</h3>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "admin",
  data() {
    return {
      headers: [
        { text: "ລໍາດັບ",class:"text-subtitle-1 font-weight-bold black--text", value: "idx" },
        {
          text: "ຮູບ",class:"text-subtitle-1 font-weight-bold black--text",
          sortable: false,
          value: "profile",
        },
        { text: "ຊື່ຮ້ານ",class:"text-subtitle-1 font-weight-bold black--text", value: "shop_name" },
        { text: "ຊື່ສິນຄ້າ",class:"text-subtitle-1 font-weight-bold black--text", value: "proName" },
        { text: "ປະເພດ",class:"text-subtitle-1 font-weight-bold black--text", value: "typeName" },
        { text: "ຫົວໜ່ວຍ",class:"text-subtitle-1 font-weight-bold black--text", value: "unitName" },
        { text: "ຈໍານວນ",class:"text-subtitle-1 font-weight-bold black--text", value: "qty" },
        { text: "ລາຄາ(ກິບ)",class:"text-subtitle-1 font-weight-bold black--text", value: "price" },
        { text: "ລາຄາລວມ(ກິບ)",class:"text-subtitle-1 font-weight-bold black--text", value: "price*qty" },
      ],
      picker: "",
      picker2: "",
      newOrders: [],
      orderAll:[]
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
  SumMoney(){
    var sum=0;
    for(let i in this.newOrders){
      let el=this.newOrders[i]
      sum=sum+parseInt(el.priceSale)*parseInt(el.order_qty)
    }
    return sum;
  }
  },
  mounted(){
  this.getOrderByCustomer()
  this.getAllOrderByCustomer()
  },
  methods: {
    async getOrderByCustomer(){
      const res=await this.$axios.$get('/order/get-reportOrder',{
        params:{
          first_date:this.picker,
      end_date:this.picker2
        }
      })
      this.newOrders=res.result
    },
    async getAllOrderByCustomer(){
      const res=await this.$axios.$get('/order/get-reportOrder')
      this.orderAll=res.result
    },
  }
};
</script>
