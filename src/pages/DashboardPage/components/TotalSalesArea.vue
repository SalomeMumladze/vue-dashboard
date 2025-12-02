<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import getShortFormattedNumber from "@/components/getShortFormattedNumber";
import { renderTooltip } from "@/components/charts/CustomTooltip";

const salesData = [
  { date: "2025-11-01", totalRevenue: 120000, totalOrders: 1100 },
  { date: "2025-11-02", totalRevenue: 145680, totalOrders: 1247 },
  { date: "2025-11-03", totalRevenue: 138500, totalOrders: 1190 },
  { date: "2025-11-04", totalRevenue: 152000, totalOrders: 1300 },
  { date: "2025-11-05", totalRevenue: 149200, totalOrders: 1285 },
  { date: "2025-11-06", totalRevenue: 158300, totalOrders: 1340 },
  { date: "2025-11-07", totalRevenue: 161500, totalOrders: 1380 },
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
    axisBorder: {
      show: false,
      color: "#E5E7EB",
    },
    axisTicks: {
      show: true,
      color: "#E5E7EB",
    },
    categories: salesData.map((item) => item.date),
    labels: {
      formatter: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "2-digit",
        });
      },
      style: {
        fontSize: "11px",
        fontWeight: 500,
      },
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
    x: {
      show: true,
      style: {
        fontSize: "12px",
        fontWeight: 500,
      },
      custom: (d) => {
        console.log(d);
      },

      formatter: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      },
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
  <div class="bg-white rounded-xl shadow">
    <div class="flex items-center justify-between gap-2 mb-3 px-4 pt-4">
      <h2 class="text-lg font-semibold">Revenue & Orders</h2>
      <a-range-picker size="middle" />
    </div>

    <VueApexCharts
      type="area"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
