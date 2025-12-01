<script setup lang="ts">
import { ref, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";

const networkData = [
  { network: "Facebook", income: 12500, sales: 430 },
  { network: "Google", income: 9800, sales: 390 },
  { network: "TikTok", income: 7400, sales: 310 },
  { network: "Snapchat", income: 5400, sales: 220 },
  { network: "Twitter", income: 2600, sales: 120 },
];
function getPieChartData(
  data: typeof networkData,
  key: "income" | "sales"
) {
  return {
    labels: data.map((item) => item.network),
    series: data.map((item) => item[key]),
  };
}


const selectedMetric = ref<"income" | "sales">("income");

const pieData = computed(() =>
  getPieChartData(networkData, selectedMetric.value)
);

const chartOptions = computed(() => ({
  labels: pieData.value.labels,
  legend: {
    position: "bottom",
  },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => `${val.toFixed(1)}%`,
  },
}));

const series = computed(() => pieData.value.series);
</script>

<template>
  <div class="p-4 bg-white rounded-xl shadow">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Network Performance</h2>

      <div class="flex gap-2">
        <a-button
          size="small"
          type="primary"
          :ghost="selectedMetric !== 'income'"
          @click="selectedMetric = 'income'"
        >
          Income
        </a-button>

        <a-button
          size="small"
          type="primary"
          :ghost="selectedMetric !== 'sales'"
          @click="selectedMetric = 'sales'"
        >
          Sales
        </a-button>
      </div>
    </div>

    <VueApexCharts
      type="pie"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<style scoped>
</style>
