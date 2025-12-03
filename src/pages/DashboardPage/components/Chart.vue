<script setup lang="ts">
import { cardDataByDate, type CardData } from "./data";
import ApexCharts from "vue3-apexcharts";
import { ref, computed, watch } from "vue";
import getFormattedNumber from "@/components/getFormattedNumber";
import getShortFormattedNumber from "@/components/getShortFormattedNumber";
import { formatDate } from "@/components/formatDate";
import type { ApexOptions } from "apexcharts";

type MetricKey = keyof CardData;

interface MetricOption {
  value: MetricKey;
  label: string;
  color: string;
}

interface TooltipContext {
  series: number[][];
  seriesIndex: number;
  dataPointIndex: number;
  w: any;
}

const selectedMetric = ref<MetricKey>("totalRevenue");

const METRIC_OPTIONS: MetricOption[] = [
  { value: "totalRevenue", label: "Total Revenue", color: "#1f77b4" },
  { value: "totalOrders", label: "Total Orders", color: "#ff7f0e" },
  { value: "activeUsers", label: "Active Users", color: "#2ca02c" },
  { value: "conversionRate", label: "Conversion Rate", color: "#d62728" },
];

const currentMetricOption = computed(
  () => METRIC_OPTIONS.find((opt) => opt.value === selectedMetric.value)!
);

const series = computed(() => [
  {
    name: currentMetricOption.value.label,
    data: cardDataByDate.map((d) => d.metrics[selectedMetric.value].current),
  },
]);

const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  grid: {
    borderColor: "#E5E7EB",
    strokeDashArray: 5,
  },
  xaxis: {
    categories: cardDataByDate.map((d) => formatDate(d.date, "MMM D")),
    tickAmount: 5,
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
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    labels: {
      formatter: (val: number) => getShortFormattedNumber(val),
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 3,
      borderRadiusApplication: "end",
      columnWidth: "50%",
    },
  },
  colors: [currentMetricOption.value.color],
  tooltip: {
    custom: createTooltipFormatter,
  },
}));

function formatMetricValue(
  val: number | string,
  currency?: string,
  unit?: string
): string {
  if (val === "N/A") return val;

  const numVal = typeof val === "number" ? val : parseFloat(val);

  if (currency) {
    return getFormattedNumber(numVal, currency);
  }

  if (unit) {
    return `${getFormattedNumber(numVal)}${unit}`;
  }

  return getFormattedNumber(numVal);
}

function createTooltipFormatter({ dataPointIndex }: TooltipContext): string {
  const dateData = cardDataByDate[dataPointIndex];
  const metric = dateData.metrics[selectedMetric.value];
  const metricName = currentMetricOption.value.label;

  const currentValue = metric.current;
  const lastYearValue = metric.lastYear ?? "N/A";
  const lastMonth = metric.lastMonth ?? "N/A";
  const { unit = "", currency = "" } = metric;

  const formatValue = (val: number | string) =>
    formatMetricValue(val, currency, unit);

  return `
    <div class="grid bg-transparent p-3">
      <div class="font-semibold mb-2 text-white">
        ${formatDate(dateData.date, "MMM DD yyyy")}
      </div>

      <div class="gap-2 flex items-center mb-1">
        <span class="text-gray-400 text-xs">Metric:</span>
        <span class="font-medium text-white">${metricName}</span>
      </div>

      <div class="gap-2 flex items-center mb-1">
        <span class="text-gray-400 text-xs">Current:</span>
        <span class="font-medium text-white">${formatValue(currentValue)}</span>
      </div>

      <div class="gap-2 flex items-center mb-1">
        <span class="text-gray-400 text-xs">Last Year:</span>
        <span class="font-medium text-white">${formatValue(
          lastYearValue
        )}</span>
      </div>

      <div class="gap-2 flex items-center">
        <span class="text-gray-400 text-xs">Last Month:</span>
        <span class="font-medium text-white">${formatValue(lastMonth)}</span>
      </div>
    </div>
  `;
}

const handleMetricChange = (value: MetricKey) => {
  selectedMetric.value = value;
};
</script>

<template>
  <a-card
    title="Metrics Overview"
    :bordered="false"
    class="h-full"
    :body-style="{ height: '370px' }"
  >
    <template #extra>
      <a-select
        v-model:value="selectedMetric"
        :options="METRIC_OPTIONS"
        @change="handleMetricChange"
        class="max-w-40"
      />
    </template>

    <ApexCharts
      type="bar"
      :options="chartOptions"
      :series="series"
      height="370"
    />
  </a-card>
</template>
