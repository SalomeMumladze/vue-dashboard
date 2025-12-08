<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import getShortFormattedNumber from "@/components/getShortFormattedNumber";
import { renderTooltip } from "@/components/charts/CustomTooltip";
import { formatDate } from "@/components/formatDate";

const salesData = [
  { date: "2025-11-01", totalRevenue: 120000, totalOrders: 1100 },
  { date: "2025-11-02", totalRevenue: 145680, totalOrders: 1247 },
  { date: "2025-11-03", totalRevenue: 138500, totalOrders: 1190 },
  { date: "2025-11-04", totalRevenue: 152000, totalOrders: 1300 },
  { date: "2025-11-05", totalRevenue: 149200, totalOrders: 1285 },
  { date: "2025-11-06", totalRevenue: 158300, totalOrders: 1340 },
  { date: "2025-11-07", totalRevenue: 161500, totalOrders: 1380 },
  { date: "2025-11-08", totalRevenue: 161500, totalOrders: 1380 },
  { date: "2025-11-09", totalRevenue: 161500, totalOrders: 1380 },
  { date: "2025-11-10", totalRevenue: 161500, totalOrders: 1380 },
  { date: "2025-11-11", totalRevenue: 161500, totalOrders: 1380 },
  { date: "2025-11-12", totalRevenue: 161500, totalOrders: 1380 },
  { date: "2025-11-13", totalRevenue: 161500, totalOrders: 1380 },
];

const series = [
  {
    name: "Revenue",
    data: salesData.map((item) => item.totalRevenue),
    color: "#1E40AF",
  },
  {
    name: "Orders",
    data: salesData.map((item) => item.totalOrders),
    color: "#F59E0B",
  },
];

const chartOptions = {
  chart: {
    type: "area",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    width: 1.5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 0.5,
      opacityFrom: 0.6,
      opacityTo: 0.05,
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "#E5E7EB",
    strokeDashArray: 5,
  },
  xaxis: {
    categories: salesData.map((d) => formatDate(d.date, "MMM DD yyyy")),
    tickAmount: 3,
    axisBorder: {
      show: false,
      color: "#E5E7EB",
    },
    axisTicks: {
      show: true,
      color: "#E5E7EB",
    },
    labels: {
      rotate: 0,
    },
  },
  yaxis: [
    {
      labels: {
        formatter: (val: number) => "$" + getShortFormattedNumber(val),
        style: {
          fontSize: "11px",
          fontWeight: 500,
        },
      },
    },
    {
      opposite: true,
      labels: {
        style: {
          fontSize: "11px",
          fontWeight: 500,
        },
        formatter: (val: number) => getShortFormattedNumber(val),
      },
    },
  ],
  tooltip: {
    active: {
      allowMultipleDataPointsSelection: true,
    },
    custom: ({ series, dataPointIndex, w }) => {
      return renderTooltip({
        date: w.globals.categoryLabels[dataPointIndex],
        rows: [
          {
            label: "Revenue",
            value: series[0][dataPointIndex],
            color: w.globals.colors[0],
            prefix: "$",
          },
          {
            label: "Orders",
            value: series[1][dataPointIndex],
            color: w.globals.colors[1],
          },
        ],
      });
    },
  },
  legend: {
    position: "top",
  },
};
</script>

<template>
  <a-card
    title="Revenue & Orders"
    :bordered="false"
    class="h-full"
    :body-style="{ height: 'fit-contents' }"
  >
    <template #extra>
      <a-range-picker size="middle" />
    </template>

    <VueApexCharts
      type="area"
      height="370"
      :options="chartOptions"
      :series="series"
    />
  </a-card>
</template>
