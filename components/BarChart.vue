<template>
  <div >
    <v-row>
      <v-col cols="12" md="4">
        <v-select label="ເລືອກປີ" v-model="year" :items="[2024,2023, 2022, 2021, 2020]" dense hide-details="auto"></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn color="success" small rounded @click="init"> ຄົ້ນຫາ </v-btn>
      </v-col>
    </v-row>
    <Bar id="my-chart-id" :height="120" :width="350" :options="chartOptions" :chartData="chartData" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy/index";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      datasets: [],
      year: 2023,
      chartData: {
        labels: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        datasets: [
          {
            data: [40, 20, 12, 40, 20, 12, 40, 20, 12],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios.$get("/admin/report-chart?year=" + this.year).then((data) => {
        const months = data;
        const values = [];

        for (let i = 1; i <= 12; i++) {
          let value = 0;
          const find = months.find((el) => ~~el.month === i);
          if (find) {
            value = find.count;
          }
          values.push(value);
        }
        this.chartData.datasets = [{ data: values }];
      });
    },
  },
};
</script>
