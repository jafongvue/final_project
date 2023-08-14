<template>
    <div>
        <v-col cols="12" md="12" class="px-2 py-1 mb-3">
          <v-card elevation="0">
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
    </div>
</template>

<script>
export default {
  name: 'PieCharts',
  components: {},
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
      type: String,
      default: '400',
    },
    height: {
      type: String,
      default: '400',
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
    }
  },
  computed: {
    
  },
  mounted(){
    this.fetchChartData()
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
    async fetchChartData() {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth() + 1
      const apiUrl = `/order/get/ProductOrderBuy`
      await this.$axios
        .get(apiUrl)
        .then((response) => {
         // const { data } = response
        // alert(JSON.stringify(response.data))
          //  const total = response.data.reduce((acc, item) => acc + item.qty, 0)
        //   alert(total)
          const labels = response.data.map((item) => item.proName)
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
                data: response.data.map((item) => (item.qty) ),
              },
            ],
          }
          this.chartData = chartData
          console.log(this.chartData);
        })
        .catch((error) => {
          console.error('Error fetching chart data:', error)
        })
    },
  },
}
</script>