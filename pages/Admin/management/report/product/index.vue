<template>
  <div>
    <v-row no-gutters class="justify-center">
      <p style="font-size: 2rem">ລາຍງານຂໍ້ມູນສິນຄ້າທີ່ນິຍົມສັ່ງຊື້</p>
    </v-row>
    <v-toolbar flat>
      <v-spacer></v-spacer>
      <h3 style="color: rgb(251, 1, 205); font-weight: bold">
        ລວມຍອດຂາຍຂອງສິນຄ້າທີ່ນິຍົມທັງໝົດ: {{ currency(SumMoneyAll) }} ກີບ
      </h3>
      <v-spacer></v-spacer>
      <h3>ສິນຄ້າທີ່ນິຍົມ {{ orderAll.length }} ລາຍການ</h3>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-row class="justify-center my-3">
      <v-col cols="4">
        <v-card height="250">
          <v-card-title>
            <v-row class="justify-center">
              <h4>ລວມຍອດສິນຄ້າທີ່ນິຍົມສັ່ງຊື້ລະຫວ່າງວັນທີ</h4>
            </v-row>
          </v-card-title>
          <v-row class="justify-center ma-5">
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
              <p class="mr-16">ຫາ</p>
            </v-toolbar>
            <v-toolbar dense flat>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="YYYY-MM-DD"
                    v-model="picker2"
                    clearable
                  ></v-text-field>
                  <v-btn color="black" icon v-bind="attrs" v-on="on">
                    <v-icon color large>mdi-alarm</v-icon>
                  </v-btn>
                </template>
                <v-date-picker v-model="picker2"></v-date-picker>
              </v-menu>
            </v-toolbar>
          </v-row>
          <v-row justify="center">
            <v-btn color="primary" @click="getData" style="font-size: 18px">
              <v-icon color="white" left>mdi-air-filter</v-icon>ລາຍງານ
            </v-btn>
            <!-- <v-btn color="green" style="font-size: 18px" class="ml-4">
              <v-icon color="white" left>mdi-printer</v-icon>print
            </v-btn> -->
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="8" md="4">
        <v-card height="250">
          <v-card-title style="font-weight: bold">
            ສິນຄ້າທີ່ນິຍົມສັ່ງຊື້
          </v-card-title>
          <Pie width="100" height="180" />
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center my-3">
      <v-card width="100%" class="mx-3 mb-5 pt-2">
        <v-data-table :headers="headers" :items="order" >
          <template #[`item.idx`]="{ index }">
            <div>
              {{ index + 1 }}
            </div>
          </template>
          <template #[`item.price`]="{ item }">
            <div>
              {{ currency(item.price) }}
            </div>
          </template>
          <template #[`item.profile`]="{ item }">
            <v-img :src="item.profile" height="100" width="100" contain>

            </v-img>
          </template>
        </v-data-table>
        <v-row class="justify-center my-3">
          <h3 style="color: rgb(226, 43, 198); font-weight: bold">
            ລວມຍອດສິນຄ້າທີ່ນິຍົມສັ່ງຊື້: {{ currency(SumMoney) }} ກີບ
          </h3>
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
      picker: "",
      picker2: "",
      headers: [
        { text: "ລໍາດັບ",class:"font-weight-bold black--text text-subtitle-1", value: "idx" },
        {
          text: "ຮູບ",class:"font-weight-bold black--text text-subtitle-1",
          sortable: false,
          value: "profile",
        },
        { text: "ຊື່ຮ້ານ",class:"font-weight-bold black--text text-subtitle-1", value: "shop_name" },
        { text: "ຊື່ສິນຄ້າ",class:"font-weight-bold black--text text-subtitle-1", value: "proName" },
        { text: "ປະເພດ",class:"font-weight-bold black--text text-subtitle-1", value: "typeName" },
        { text: "ຫົວໜ່ວຍ",class:"font-weight-bold black--text text-subtitle-1", value: "unitName" },
        { text: "ຈໍານວນ",class:"font-weight-bold black--text text-subtitle-1", value: "qty" },
        { text: "ລາຄາ(ກິບ)",class:"font-weight-bold black--text text-subtitle-1", value: "price" },
      ],
      order:[],
      orderAll:[]
    };
  },
computed:{
  SumQtyAll(){
    var sum=0;
    for(let i in this.orderAll){
      let el=this.orderAll[i]
      sum=sum+parseInt(el.qty)
    }
    return sum;
  },
  SumMoneyAll(){
    var sum=0;
    for(let i in this.orderAll){
      let el=this.orderAll[i]
      sum=sum+parseInt(el.price)
    }
    return sum;
  },
  SumMoney(){
    var sum=0;
    for(let i in this.order){
      let el=this.order[i]
      sum=sum+parseInt(el.price)
    }
    return sum;
  }
},
mounted(){
  this.getData()
  this.getDataAll()
},
methods:{
 async getData(){
  const res=await this.$axios.$get(`/order/get/ProductOrderBuy`,{
    params:{
      first_date:this.picker,
      end_date:this.picker2
    }
  })
  this.order=res
 },
 async getDataAll(){
  const res=await this.$axios.$get(`/order/get/ProductOrderBuy`,{
    params:{
      first_date:this.picker,
      end_date:this.picker2
    }
  })
  this.orderAll=res
 }
}
};
</script>
