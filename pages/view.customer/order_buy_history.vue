<template>
  <v-card class="mt-5 mb-5 ml-5 mr-5"  >
    <v-row justify="center" class="mt-3 mb-3">
      <h1 id="myfont">ປະຫວັດການສັ່ງຊື້ສິນຄ້າຂອງລູກຄ້າ</h1>
    </v-row>
    <!-- _____________DataTable Order_History_______________ -->
    <v-data-table
      :search="search"
      :headers="headers"
      :items="order"
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="OrderID"
      show-expand
      class="elevation-3"
      id="head"
    >
    <template #[`item.idx`]="{index}">
      <div>
        {{ index+1 }}
      </div>
    </template>
    <template #[`item.date`]="{item}">
      <div>
        {{ $moment(item.date).format("DD-MM-YYYY") }}
      </div>
    </template>
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>ປະຫວັດການສັ່ງຊື້</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider
          ><v-spacer></v-spacer>
          <v-text-field
            id="textfield"
            v-model="search"
            dense
            outlined
            append-icon="mdi-magnify"
            label="ຄົ້ນຫາ"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>

      <template #[`item.actions`]="{item}">
         <v-btn icon @click="getDataDetail(item)">
          <v-icon color="primary">mdi-eye</v-icon>
         </v-btn>
      </template>

    </v-data-table>
  </v-card>
  <!-- _______________No Data_____________ -->
  <!-- <v-card v-else height="500" class="elevation-0">
    <v-row justify="center">
      <h1 id="myfont" class="mt-16">ບໍ່ມີຂໍ້ມູນ</h1></v-row
    >
  </v-card> -->
</template>
<script>
export default {
  name: 'orderBuy_history',
  layout: 'customer',
  data() {
    return {
      dialog: false,
      search: '',
      expanded: [],
      singleExpand: false,
      order:[],
      orderDetail:[],
      headers: [
        {
          text: 'ລໍາດັບ',
          align: 'start',
          sortable: false,
          value: 'idx',
        },
        {
          text: 'ເລກບິນສັ່ງຊື້',
          align: 'start',
          value: 'order_id',
        },
        { text: 'ວັນທີ່ສັ່ງຊື້', value: 'date' },
        { text: 'ສະຖານະ', value: 'status' },
        // { text: 'ຄອມເມັ້ນ', value: 'cus_content', sortable: false },
        { text: 'ລາຍລະອຽດ', value: 'actions' },
      ],
    }
  },
mounted(){
   this.getData()
},
methods:{
  async getData(){
    const res= await this.$axios.$get(`/order/getOrderShowToCus/${this.$cookies.get('cus_id')}`)
    this.order = res.order
  },
   getDataDetail(item){
    // const res= await this.$axios.$get(`/order/getAllOldOrderShowToCus/${item.order_id}`)
    // this.orderDetail = res.orderDetail
    const routeData = this.$router.resolve(
        `/Admin/report/bills.customer_order_buy/${item.order_id}`
      )
      window.open(routeData.href, '_blank')
  }
}
}
</script>

<style>
#bgColor {
  font-size: 60px;
  font-family: 'Noto Sans Lao';
  text-align: left;
  margin-right: 30px;
  margin-top: 7px;
  color: black;
  background: #edfbff;
  font-weight: normal;
}
#head {
  font-size: 60px;
  font-family: 'Noto Sans Lao';
  text-align: left;
  margin-right: 30px;
  margin-top: 7px;
  color: black;
  font-weight: normal;
}
</style>
