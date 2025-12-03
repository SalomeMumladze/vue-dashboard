<script setup lang="ts">
import { cardDataByDate, CardData } from "./data";
import ApexCharts from "vue3-apexcharts";
import { ref } from "vue";
import getFormattedNumber from "@/components/getFormattedNumber";
import getShortFormattedNumber from "@/components/getShortFormattedNumber";
import { formatDate } from "@/components/formatDate";

const selectedMetric = ref<keyof CardData>("conversionRate");

const metricColors: Record<keyof CardData, string> = {
  totalRevenue: "#1f77b4",
  totalOrders: "#ff7f0e",
  activeUsers: "#2ca02c",
  conversionRate: "#d62728",
};

const chartOptions = ref({
  chart: {
    type: "bar",
    zoom: {
      enabled: true,
      type: "x",
      autoScaleYaxis: false,
      allowMouseWheelZoom: true,
      zoomedArea: {
        fill: {
          color: "#90CAF9",
          opacity: 0.4,
        },
        stroke: {
          color: "#0D47A1",
          opacity: 0.4,
          width: 1,
        },
      },
    },
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
    categories: cardDataByDate.map((d) => formatDate(d.date, "MMM DD yyyy")),
  },
  dataLabels: { enabled: false },
  yaxis: {
    labels: {
      formatter: (val: number, opts: any) => {
        return getShortFormattedNumber(val);
      },
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 12,
      borderRadiusApplication: "start",
      columnWidth: "50%",
    },
  },
  colors: [metricColors[selectedMetric.value]],
  tooltip: {
    custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
      const dateData = cardDataByDate[dataPointIndex];
      const metric = dateData.metrics[selectedMetric.value];
      const metricName = selectedMetric.value
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      const currentValue = metric.current;
      const lastYearValue = metric.lastYear || "N/A";
      const lastMonth = metric.lastMonth || "N/A";
      const unit = metric.unit || "";
      const currency = metric.currency || "";

      const formatValue = (val: number | string) => {
        if (val === "N/A") return val;
        const numVal = typeof val === "number" ? val : parseFloat(val);
        if (currency) return `${currency} ${getFormattedNumber(numVal)}`;
        if (unit) return `${getFormattedNumber(numVal)}${unit}`;
        return getFormattedNumber(numVal);
      };

      return `
  <div class='grid bg-transparent'>
    <div class="font-semibold mb-2 text-white">${formatDate(
      dateData.date,
      "MMM DD yyyy"
    )}</div>

    <div class="gap-2 flex items-center">
      <span class="text-gray-400 text-xs">Metric:</span>
      <span class="font-medium text-white">${metricName}</span>
    </div>

    <div class="gap-2 flex items-center">
      <span class="text-gray-400 text-xs">Current:</span>
      <span class="font-medium text-white" >${formatValue(currentValue)}</span>
    </div>

    <div class="gap-2 flex items-center">
      <span class="text-gray-400 text-xs">Last Year:</span>
      <span class="font-medium text-white">${
        typeof lastYearValue === "number"
          ? formatValue(lastYearValue)
          : lastYearValue
      }</span>
    </div>

    <div class=" gap-2 flex items-center">
      <span class="text-gray-400 text-xs">Last Month:</span>
      <span class="font-medium text-white">${
        typeof lastMonth === "number" ? formatValue(lastMonth) : lastMonth
      }</span>
    </div>
  </div>
`;
    },
  },
});
const series = ref([
  {
    name: selectedMetric.value,
    data: cardDataByDate.map((d) => d.metrics[selectedMetric.value].current),
  },
]);
</script>

<template>
  <a-card
    title="Card title"
    :bordered="false"
    class="h-full"
    :body-style="{ height: '370px' }"
  >
    <ApexCharts
      type="bar"
      :options="chartOptions"
      :series="series"
      height="370"
    />
  </a-card>
</template>
