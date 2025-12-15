<script setup lang="ts">
import { ref, computed } from "vue";
import ApexCharts from "vue3-apexcharts";
import getShortFormattedNumber from "@/components/getShortFormattedNumber";
import {
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons-vue";
import getFormattedNumber from "@/components/getFormattedNumber";
import { formatDate } from "@/components/formatDate";

type MetricType = "weekly" | "daily";
const selectedMetric = ref<MetricType>("weekly");

const cashFlowData = {
  data: [
    { date: "2025-01-01", income: 1200, expense: -450 },
    { date: "2025-01-02", income: 980, expense: -300 },
    { date: "2025-01-03", income: 1500, expense: -920 },
    { date: "2025-01-04", income: 800, expense: -200 },
    { date: "2025-01-05", income: 2100, expense: -900 },
    { date: "2025-01-06", income: 1700, expense: -700 },
    { date: "2025-01-07", income: 1400, expense: -1050 },
    { date: "2025-01-08", income: 1400, expense: -1050 },
    { date: "2025-01-09", income: 1400, expense: -1050 },
    { date: "2025-01-10", income: 1400, expense: -1050 },
    { date: "2025-01-11", income: 1400, expense: -1050 },
    { date: "2025-01-12", income: 1400, expense: -1050 },
    { date: "2025-01-14", income: 1400, expense: -1050 },
    { date: "2025-01-15", income: 1400, expense: -1050 },
    { date: "2025-01-17", income: 1400, expense: -1050 },
    { date: "2025-01-18", income: 1400, expense: -1050 },
    { date: "2025-01-19", income: 1400, expense: -1050 },
    { date: "2025-01-20", income: 1400, expense: -1050 },
    { date: "2025-01-23", income: 1400, expense: -1050 },
    { date: "2025-01-25", income: 1400, expense: -1050 },
    { date: "2025-01-24", income: 1400, expense: -1050 },
    { date: "2025-01-25", income: 1400, expense: -1050 },
    { date: "2025-01-26", income: 1400, expense: -1050 },
    { date: "2025-01-27", income: 1400, expense: -1050 },
    { date: "2025-01-28", income: 1400, expense: -1050 },
    { date: "2025-01-31", income: 1400, expense: -1050 },
    { date: "2025-02-02", income: 1400, expense: -1050 },
  ],
};

const series = computed(() => [
  {
    name: "Income (Negative Gap)",
    data: cashFlowData.data.map(() => 80),
    color: "white",
  },
  {
    name: "Income",
    data: cashFlowData.data.map((d) => (d.income > 0 ? d.income : 0)),
    color: "#1E40AF",
  },
  {
    name: "Expense",
    data: cashFlowData.data.map((d) => (d.expense < 0 ? d.expense : 0)),
    color: "#F59E0B",
  },
]);

const chartOptions = computed(() => ({
  chart: {
    type: "bar",
    stacked: true,
    grouped: true,
    toolbar: { show: false },
  },
  grid: {
    borderColor: "#E5E7EB",
    strokeDashArray: 5,
  },
  plotOptions: {
    bar: {
      horizontal: false,

      borderRadius: 3,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    labels: {
      rotate: 0,
      style: {
        fontSize: 10,
      },
    },
    axisBorder: {
      show: false,
      color: "#E5E7EB",
    },
    axisTicks: {
      show: true,
      color: "#E5E7EB",
    },
    tickAmount: 10,
    categories: cashFlowData?.data?.map((d) => formatDate(d.date, "MMM D")),
  },
  yaxis: {
    categories: cashFlowData.data.map((d) => d.date),
    labels: {
      formatter: (val: number) => getShortFormattedNumber(val),
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
      const item = cashFlowData.data[dataPointIndex];

      if (!item) return "";

      const income = item.income ?? 0;
      const expense = Math.abs(item.expense ?? 0);
      const incomeColor = w.globals.colors[1];
      const expenseColor = w.globals.colors[2];

      return `
      <div class='text-white'>
         <div class="font-semibold mb-1 text-white">
          ${formatDate(item.date, "MMM DD yyyy")}
        </div>
         <div class="gap-2 flex items-center">
          <span class="w-1 h-3 inline-block rounded-xl"style="background:${incomeColor}"></span>
          <span class='text-gray-400 font-normal'>Income:</span>
          <span class="font-medium text-white">${getFormattedNumber(
            income,
            "USD"
          )}</span>
        </div>

          <div class="gap-2 flex items-center">
          <span class="w-1 h-3 inline-block rounded-xl" style="background:${expenseColor}"></span>
          <span class='text-gray-400 font-normal'>Expense:</span>
          <span class="font-medium text-white">${getFormattedNumber(
            expense,
            "USD"
          )}</span>
        </div>
      </div>
    `;
    },
  },

  legend: { show: false },
}));
</script>

<template>
  <a-card :bordered="false">
    <template #title>
      <div class="flex items-center gap-2">
        <DollarOutlined class="text-lg" />
        <span class="text-sm sm:text-base">Cash Flow</span>
      </div>
    </template>

    <template #extra>
      <div class="flex items-center flex-wrap gap-2">
        <a-radio-group
          size="small"
          v-model:value="selectedMetric"
          class="sm:!text-base"
        >
          <a-radio-button value="weekly">Weekly</a-radio-button>
          <a-radio-button value="daily">Daily</a-radio-button>
        </a-radio-group>
        <a-range-picker size="small" class="sm:!size-middle" />
      </div>
    </template>

    <div class="lg:gap-4 md:flex grid items-center">
      <div class="md:col-span-2 order-2 md:order-1 w-full">
        <ApexCharts :options="chartOptions" :series="series" height="270" />
      </div>
      <div
        class="md:col-span-1 order-1 md:order-2 md:pl-4 flex items-center justify-center p-4 md:w-fit w-full"
      >
        <div class="grid sm:gap-8 gap-4 grid-cols-1 md:w-fit w-full">
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="rounded-md bg-[#1E40AF] p-2.5 sm:p-3 flex-shrink-0">
              <ArrowDownOutlined
                style="color: #fff"
                class="text-base sm:text-[20px] rotate-45"
              />
            </div>
            <div class="grid gap-1 sm:gap-2 min-w-0">
              <p class="text-xs sm:text-sm font-normal text-gray-500">Income</p>
              <div class="flex items-end gap-2 sm:gap-4 flex-wrap">
                <span class="sm:text-base lg:text-3xl font-semibold truncate">
                  {{ getFormattedNumber(298378233, "USD") }}
                </span>
                <a-tag
                  :color="232 >= 0 ? 'green' : 'red'"
                  type="ghost"
                  class="!flex !items-center !border-none !font-medium !rounded-xl !px-2 !py-0.5"
                >
                  <span class="text-xs sm:text-sm">
                    {{ getFormattedNumber(1223, "USD") }}
                  </span>
                  <component
                    :is="123 >= 0 ? ArrowUpOutlined : ArrowDownOutlined"
                    class="text-[10px] sm:text-xs ml-1"
                  />
                </a-tag>
              </div>
            </div>
          </div>

          <a-divider class="hidden sm:block !my-0" />

          <div class="flex items-center gap-3 sm:gap-4">
            <div class="rounded-md bg-[#F59E0B] p-2.5 sm:p-3 flex-shrink-0">
              <ArrowUpOutlined
                style="color: #fff"
                class="text-base sm:text-[20px] rotate-45"
              />
            </div>
            <div class="grid gap-1 sm:gap-2 min-w-0">
              <p class="text-xs sm:text-sm font-normal text-gray-500">
                Expense
              </p>
              <div class="flex items-end gap-2 sm:gap-4 flex-wrap">
                <span class="sm:text-base lg:text-3xl font-semibold truncate">
                  {{ getFormattedNumber(298378233, "USD") }}
                </span>
                <a-tag
                  :color="232 >= 0 ? 'green' : 'red'"
                  type="ghost"
                  class="!flex !items-center !border-none !font-medium !rounded-xl !px-2 !py-0.5"
                >
                  <span class="text-xs sm:text-sm">
                    {{ getFormattedNumber(1223, "USD") }}
                  </span>
                  <component
                    :is="123 >= 0 ? ArrowUpOutlined : ArrowDownOutlined"
                    class="text-[10px] sm:text-xs ml-1"
                  />
                </a-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>
