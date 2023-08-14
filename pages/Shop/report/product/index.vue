<template>
  <div>
    <v-row no-gutters class="justify-center">
      <p style="font-size: 2rem">ລາຍງານຂໍ້ມູນສິນຄ້າທີ່ຂາຍດີ</p>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="12" md="4">
        <v-card height="300">
          <h3 style="margin-left: 100px">ສະແດງສິນຄ້າທີ່ໄດ້ຂາຍດີ</h3>
          <pie
              :chart-options="chartOptions"
              :chart-data="chartData"
              :chart-id="chartId"
              :dataset-id-key="datasetIdKey"
              :plugins="plugins"
              :css-classes="cssClasses"
              :styles="styles"
              :width="width"
              :height="height"
            />
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card height="300">
          <v-card-title>
            <v-row class="justify-center">
              <p style="font-weight: bold">
                ລາຍງານສິນຄ້າທີ່ຂາຍດີລະຫວ່າງວັນທີຫາວັນທີ
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
                      readonly
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
                      readonly
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
            <v-btn
              class="mx-2 ml-2"
              @click="getData"
              color="primary"
              style="font-size: 20px"
            >
              <v-icon color="white" left>mdi-air-filter</v-icon>ລາຍງານ
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center my-3">
      <v-card width="100%" class="mx-3 mb-5 pt-2">
        <v-data-table :headers="headers" :items="order">
          <template #[`item.idx`]="{ index }">
            <div>{{ index + 1 }}</div>
          </template>
          <template #[`item.profile`]="{ item }">
            <v-img :src="item.profile" height="100" width="100" contain>
            </v-img>
            </template>
        </v-data-table>
        <v-row class="justify-center my-3">
          <h3 style="color: rgb(128, 0, 255)">
            ລວມເປັນມູນຄ່າ: {{ SumMoney }} ກີບ
          </h3>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "shop",
  props: {
    chartId: {
      type: String,
      default: 'pie-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 250,
    },
    cssClasses: {
      default: '',
      type: String,
    },

    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      picker: "",
      picker2: "",
      headers: [
        {
          text: "ລໍາດັບ",
          class: "font-weight-bold black--text text-subtitle-1",
          value: "idx",
        },
        {
          text: "ຮູບ",
          class: "font-weight-bold black--text text-subtitle-1",
          sortable: false,
          value: "profile",
        },
        {
          text: "ຊື່ສິນຄ້າ",
          class: "font-weight-bold black--text text-subtitle-1",
          value: "proName",
        },
        {
          text: "ປະເພດ",
          class: "font-weight-bold black--text text-subtitle-1",
          value: "typeName",
        },
        {
          text: "ຫົວໜ່ວຍ",
          class: "font-weight-bold black--text text-subtitle-1",
          value: "unitName",
        },
        {
          text: "ຈໍານວນ",
          class: "font-weight-bold black--text text-subtitle-1",
          value: "qty",
        },
        {
          text: "ລາຄາ(ກິບ)",
          class: "font-weight-bold black--text text-subtitle-1",
          value: "price",
        },
      ],
      order: [],
      orderAll: [],
      chartData: {
        labels: [],//'VueJs', 'EmberJs', 'ReactJs', 'AngularJs', 'nodejs'
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16',
              '#00D855',
            ],
            data: [40, 20, 80, 10, 5],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      center: { lat: 17.974855, lng: 102.630867 },
      markers: [],
      currentPlace: null,
      cardImcome: false,
      cardExpenses: false,
      cardProfit: false,
    };
  },
  computed: {
    SumQtyAll() {
      var sum = 0;
      for (let i in this.orderAll) {
        let el = this.orderAll[i];
        sum = sum + parseInt(el.qty);
      }
      return sum;
    },
    SumMoneyAll() {
      var sum = 0;
      for (let i in this.orderAll) {
        let el = this.orderAll[i];
        sum = sum + parseInt(el.price);
      }
      return sum;
    },
    SumMoney() {
      var sum = 0;
      for (let i in this.order) {
        let el = this.order[i];
        sum = sum + parseInt(el.price);
      }
      return sum;
    },
  },
  mounted() {
    this.getData();
    this.getDataAll();
  },
  methods: {
     // +++++++++++++++++++++++++++++ card
     Income() {
      this.cardImcome = !this.cardImcome
    },
    Expenses() {
      this.cardExpenses = !this.cardExpenses
    },
    Profit() {
      this.cardProfit = !this.cardProfit
    },
    Stock() {
      this.cardStock = !this.cardStock
    },
    async getData() {
      const res = await this.$axios.$get(
        `/order/reportTopOrderByShop/${this.$cookies.get("user_id")}`,
        {
          params: {
            first_date: this.picker,
            end_date: this.picker2,
          },
        }
      );
      this.order = res;
    },
    async getDataAll(){
      await this.$axios.$get(`/order/reportTopOrderByShop/${this.$cookies.get('user_id')}`) .then((response) => {
         // const { data } = response
        // alert(JSON.stringify(response.data))
          //  const total = response.data.reduce((acc, item) => acc + item.qty, 0)
        //   alert(total)
          const labels = response.map((item) => item.proName)
          const backgroundColor = [
            '#41B883',
            '#E46651',
            '#00D8FF',
            '#DD1B16',
            '#00D855',
          ]
          const chartData = {
            labels,
            datasets: [
              {
                backgroundColor,
                data: response.map((item) => (item.qty) ),
              },
            ],
          }
          this.chartData = chartData
          console.log(this.chartData);
        })
        .catch((error) => {
          console.error('Error fetching chart data:', error)
        })
          // this.orderAll=res
    }
  }
};
</script>
