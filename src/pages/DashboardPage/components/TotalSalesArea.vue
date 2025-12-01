<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";

/* ----------------------------------------------------
   1. SAMPLE DAILY DATA (Revenue + Orders)
---------------------------------------------------- */
const salesData = [
  { date: "2025-11-01", totalRevenue: 120000, totalOrders: 1100 },
  { date: "2025-11-02", totalRevenue: 145680, totalOrders: 1247 },
  { date: "2025-11-03", totalRevenue: 138500, totalOrders: 1190 },
  { date: "2025-11-04", totalRevenue: 152000, totalOrders: 1300 },
  { date: "2025-11-05", totalRevenue: 149200, totalOrders: 1285 },
  { date: "2025-11-06", totalRevenue: 158300, totalOrders: 1340 },
  { date: "2025-11-07", totalRevenue: 161500, totalOrders: 1380 },
];

/* ----------------------------------------------------
   2. SERIES FOR TWO LINES
---------------------------------------------------- */
const series = [
  {
    name: "Total Revenue",
    data: salesData.map((item) => item.totalRevenue),
  },
  {
    name: "Total Orders",
    data: salesData.map((item) => item.totalOrders),
  },
];

/* ----------------------------------------------------
   3. CHART OPTIONS
---------------------------------------------------- */
const chartOptions = {
  chart: {
    type: "area",
    toolbar: { show: false },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 0.5,
      opacityFrom: 0.35,
      opacityTo: 0.05,
    },
  },
  xaxis: {
    categories: salesData.map((item) => item.date),
  },
  yaxis: [
    {
      title: { text: "Revenue ($)" },
      labels: {
        formatter: (val: number) => "$" + val.toLocaleString(),
      },
    },
    {
      opposite: true,
      title: { text: "Orders" },
      labels: {
        formatter: (val: number) => val.toLocaleString(),
      },
    },
  ],
  tooltip: {
    shared: true,
    intersect: false,
    y: [
      {
        formatter: (val: number) => "$" + val.toLocaleString(),
      },
      {
        formatter: (val: number) => val.toLocaleString(),
      },
    ],
  },
  legend: {
    position: "top",
  },
};
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow">
    <h2 class="text-lg font-semibold mb-3">Revenue & Orders (Area Chart)</h2>

    <VueApexCharts
      type="area"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
