<template>
  <v-app class="font">
    <v-card class="ma-2 elevation-0">
      <v-row>
        <div class="d-flex mt-9">
          <v-avatar size="100" color="#fafafafa" class="pa-2">
            <!-- <v-img src="@/assets/images/DaDa_LoGo.png" /> -->
          </v-avatar>
        </div>
        <v-col cols="9">
          <!-- <v-row no-gutters class="justify-center mt-5">
            <p style="font-size: 1.2rem">ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</p>
          </v-row>
          <v-row no-gutters class="justify-center">
            <p style="font-size: 1.2rem">
              ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດຖະນາຖາວອນ
            </p>
          </v-row> -->
          <v-row no-gutters class="justify-center mt-3">
            <p style="font-size: 2rem; text-decoration: bold">
              ໃບສັ່ງຊື້ສິນຄ້າ
            </p>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters class>
        <v-col cols="6">
        </v-col>
        <v-col cols="6" class="align-end align-content-end">
          <v-row class="justify-end">
            <v-card class="mr-5 elevation-0">
              <!-- <p>ບິນເລກທີ່:{{ $route.params.id }}</p> -->
              <p class="mt-5">ວັນທີ່: {{ $moment(date.date).format('DD-MM-YYYY') }}</p>
              <!-- <p>ເວລາ:{{date.time }}</p> -->
              <!-- <p>ຜູ້ສັ່ງຊື້:{{ billOrder[0].full_name }}</p> -->
            </v-card>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters class>
        <v-progress-linear value="100" height="1"></v-progress-linear>
      </v-row>
      <v-row no-gutters class>
        <v-card width="100%" class="mt-2 elevation-0">
          <v-data-table
            :headers="headers"
            :items="billOrder"
            item-key="No"
            sort-by="No"
            class="elevation-0"
            hide-default-footer
          >
          <template #[`item.idx`]="{index}">
         <div>{{ index+1 }}</div>
        </template>
          <template #[`item.priceAll`]="{item}">
         <div>{{ currency(parseInt(item.qty)*parseInt(item.price)) }}</div>
        </template>
          <template #[`item.price`]="{item}">
         <div>{{ currency(item.price) }}</div>
        </template>
          <template #[`item.profile`]="{item}">
         <v-img :src="item.profile" height="100" width="100" contain></v-img>
        </template>
        </v-data-table>
          <v-divider class></v-divider>
        </v-card>
      </v-row>
      <v-progress-linear value="100" height="1"></v-progress-linear>
      <v-row no-gutters class="mt-2 justify-end">
        <v-col cols="8">
          <v-row no-gutters class="mr-5 justify-end">
            <div>
              <v-row no-gutters class="-end">
                <v-row no-gutters class="justify-end">
                  <p style="margin-top: 10px; margin-right: 10px">
                    ລວມທັງໝົດເປັນ:
                  </p>
                </v-row>
                <v-row no-gutters class="justify-end">
                  <p style="margin-top: 10px">
                    {{ currency(Sum) }}
                    ກິບ
                  </p>
                </v-row>
              </v-row>

              <!-- <v-row no-gutters class="justify-end">
                <v-row no-gutters class="justify-end">
                  <p style="margin-right: 10px">ຊໍາລະເປັນມູນຄ່າ:</p>
                </v-row>

                <v-row no-gutters class="justify-end">
                  <p>
                    {{ currency(Sum) }}
                    ກິບ
                  </p>
                </v-row>
              </v-row> -->
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-app>
</template>
<script>
export default {
  name: 'bills_customer_buy',
  layout: 'bill',
  data() {
    return {
        headers: [
        { text: "ລໍາດັບ", value: "idx" },
        {
          text: "ຮູບ",
          sortable: false,
          value: "profile",
        },
        { text: "ຊື່ສິນຄ້າ", value: "proName" },
        { text: "ປະເພດ", value: "typeName" },
        { text: "ຫົວໜ່ວຍ", value: "unitName" },
        { text: "ຈໍານວນ", value: "qty" },
        { text: "ລາຄາ(ກິບ)", value: "price" },
        { text: "ລາຄາລວມ(ກິບ)", value: "priceAll" },
      ],
      date:{},
      billOrder:[],
      // time:'',

    }
  },
  computed:{
    Sum() {
      var sum = 0;
      // if (this.billOrder.length <= 0) return sum;
      for (const key in this.billOrder) {
        const el = this.billOrder[key];
        sum += parseInt(el.qty) * parseFloat(el.price);
      }
      return sum;
    },
  },
  mounted(){
    this.getdate()
    this.getdateById()
  },
  methods:{
    async getdate(){
      const res=await this.$axios.$get(`/order/${this.$route.params.id}`)
      this.date=res.order
    },
    async getdateById(){
      const res=await this.$axios.$get(`/order/detail/${this.$route.params.id}`)
      this.billOrder=res.order
    },
  }
}
</script>
