<script setup lang="ts">
import { ref, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import getFormattedNumber from "@/components/getFormattedNumber";
import NeworkFormatter from "@/components/NeworkFormatter.vue";

const networkData = [
  { network: "Facebook", income: 12500, sales: 430 },
  { network: "Google", income: 9800, sales: 390 },
  { network: "TikTok", income: 7400, sales: 310 },
  { network: "Snapchat", income: 5400, sales: 220 },
  { network: "Twitter", income: 2600, sales: 120 },
];
function getPieChartData(data: typeof networkData, key: "income" | "sales") {
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

  colors: ["#1877F2", "#34A853", "#69C9D0", "#FFAC00", "#1DA1F2"],

  legend: {
    position: "left",
    fontSize: "14px",
    markers: { width: 12, height: "100%", radius: 12 },
    formatter: function (label: string, opts: any) {
      const index = opts.seriesIndex;
      const value = opts.w.globals.series[index];
      const imgSrc = `/src/assets/img/networks/${label.toLowerCase()}.png`;
      return `
      <div class="grid items-center justify-between w-full grid-cols-[auto_1fr_auto] gap-2">
        <img src="${imgSrc}" alt="${label}" width="18" height="18" class="object-contain" />
       -
        <span class="font-medium text-base">${getFormattedNumber(value)}$</span>
      </div>
    `;
    },
  },

  stroke: {
    width: 6,
    colors: ["#ffffff"],
  },

  plotOptions: {
    pie: {
      donut: {
        size: "50%",
        labels: {
          show: true,
          total: {
            show: true,
            label: selectedMetric.value === "income" ? "Income" : "Sales",
            fontSize: "16px",
            fontWeight: 600,
            color: "#333",
          },
        },
      },
    },
  },

  dataLabels: {
    enabled: true,

    background: {
      enabled: true,
      backgroundColor: "#ffffff",
      borderRadius: 12,
      padding: 6,
      opacity: 0.1,
      dropShadow: { enabled: false },
    },
    dropShadow: { enabled: false },
    style: {
      fontSize: "12px",
      fontWeight: "600",
      colors: ["#000"],
    },
  },

  tooltip: {
    enabled: true,
    custom: function ({ series, seriesIndex, w }) {
      const label = w.globals.labels[seriesIndex];
      const value = series[seriesIndex];
      const total = series.reduce((a, b) => a + b, 0);
      const percent = ((value / total) * 100).toFixed(1);

      const color = w.config.colors?.[seriesIndex] ?? "#000";
      const imgSrc = `/src/assets/img/networks/${label.toLowerCase()}.png`;

      return `
        <div>
        <div class="flex items-center gap-1 font-semibold text-sm gap-2">
          <span class="w-1 h-4 inline-block rounded-xl" style="background:${color}"></span>
            <img src="${imgSrc}" alt="${label}" width="16" height="16" class="object-contain" />
        
        </div>

        <div class="mt-1.5 text-sm text-white">
          <strong>${value.toLocaleString()}</strong>
          <span class="text-gray-400">(${percent}%)</span>
        </div>
      </div>
      `;
    },
    y: {
      formatter: (val: number) => val.toLocaleString(),
    },
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
      type="donut"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<style scoped></style>
