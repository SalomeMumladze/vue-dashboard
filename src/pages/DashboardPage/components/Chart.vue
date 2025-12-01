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
  chart: { type: "bar" },
  xaxis: { categories: cardDataByDate.map((d) => d.date) },
  dataLabels: { enabled: true },
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
        <div style="padding: 12px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="font-weight: 600; margin-bottom: 8px; color: #1f2937;">${formatDate(
            dateData.date,
            "MMM DD yyyy"
          )}</div>
          <div style="margin-bottom: 4px;">
            <span style="color: #6b7280; font-size: 13px;">Metric:</span>
            <span style="font-weight: 500; margin-left: 4px; color: #1f2937;">${metricName}</span>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="color: #6b7280; font-size: 13px;">Current:</span>
            <span style="font-weight: 600; margin-left: 4px; color: ${
              metricColors[selectedMetric.value]
            };">${formatValue(currentValue)}</span>
          </div>
          <div>
            <span style="color: #6b7280; font-size: 13px;">Last Year:</span>
            <span style="font-weight: 500; margin-left: 4px; color: #1f2937;">${
              typeof lastYearValue === "number"
                ? formatValue(lastYearValue)
                : lastYearValue
            }</span>
          </div>
          <div>
            <span style="color: #6b7280; font-size: 13px;">Last Month:</span>
            <span style="font-weight: 500; margin-left: 4px; color: #1f2937;">${
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
  <a-card>
    <ApexCharts
      type="bar"
      :options="chartOptions"
      :series="series"
      height="350"
    />
  </a-card>
</template>
