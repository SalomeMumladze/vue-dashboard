<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from "vue";
import ApexCharts from "vue3-apexcharts";
import getShortFormattedNumber from "@/components/getShortFormattedNumber";
import {
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  FilterOutlined,
} from "@ant-design/icons-vue";
import getFormattedNumber from "@/components/getFormattedNumber";
import { formatDate } from "@/components/formatDate";
import { useResponsive } from "@/components/useResponsive";
import DateRange from "@/components/DateRange.vue";

const { isMobile } = useResponsive();
type MetricType = "weekly" | "daily";
const selectedMetric = ref<MetricType>("weekly");
const chartKey = ref(0);

const cashFlowData = {
  weekly: [
    { date: "2024-12-30", income: 8500, expense: -3200 },
    { date: "2025-01-06", income: 9200, expense: -4100 },
    { date: "2025-01-13", income: 10500, expense: -4800 },
    { date: "2025-01-20", income: 8900, expense: -3900 },
    { date: "2025-01-27", income: 11200, expense: -5200 },
    { date: "2025-02-03", income: 9800, expense: -4300 },
    { date: "2025-02-10", income: 10300, expense: -4600 },
    { date: "2025-02-17", income: 12100, expense: -5800 },
  ],
  daily: [
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
  totals: {
    income: 1410400,
    income_change: 98,
    expense_change: 12,
    expense: 110050,
  },
};

const currentData = computed(() => cashFlowData[selectedMetric.value]);

const series = computed(() => [
  {
    name: "Income (Negative Gap)",
    data: currentData.value.map(() => 80),
    color: "white",
  },
  {
    name: "Income",
    data: currentData.value.map((d) => (d.income > 0 ? d.income : 0)),
    color: "#1E40AF",
  },
  {
    name: "Expense",
    data: currentData.value.map((d) => (d.expense < 0 ? d.expense : 0)),
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
      borderRadiusApplication: "around",
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
    categories: currentData.value.map((d) =>
      formatDate(d.date, selectedMetric.value === "weekly" ? "MMM D" : "MMM D")
    ),
  },
  yaxis: {
    categories: currentData.value.map((d) => d.date),
    labels: {
      formatter: (val: number) => getShortFormattedNumber(val),
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    custom: ({ series, seriesIndex, dataPointIndex, w }) => {
      const item = currentData.value[dataPointIndex];

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

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      chartKey.value++;
    }, 100);
  });
});

watch(selectedMetric, () => {
  nextTick(() => {
    chartKey.value++;
  });
});
</script>

<template>
  <a-card :bordered="false">
    <template #title>
      <div class="flex items-center flex-wrap gap-2">
        <DollarOutlined class="text-lg" />
        <span class="text-sm sm:text-base">Cash Flow</span>
      </div>
    </template>

    <template #extra>
      <div
        class="sm:flex grid items-center justify-end sm:gap-2 gap-1 sm:p-0 p-2"
      >
        <a-radio-group
          size="middle"
          v-model:value="selectedMetric"
          class="sm:!text-base !flex !justify-end"
        >
          <a-radio-button value="weekly">Weekly</a-radio-button>
          <a-radio-button value="daily">Daily</a-radio-button>
        </a-radio-group>

        <DateRange size="middle" :allowClear="false" />
      </div>
    </template>

    <div class="flex flex-col md:flex-row items-stretch">
      <div class="w-full md:flex-1 order-2 md:order-1">
        <ApexCharts
          :key="chartKey"
          :options="chartOptions"
          :series="series"
          height="270"
        />
      </div>

      <!-- Stats Container -->
      <div
        class="order-1 md:order-2 md:w-64 lg:w-72 md:pl-4 flex items-center justify-center p-4"
      >
        <div class="grid gap-4 grid-cols-1 w-full">
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="rounded-md bg-[#1E40AF] p-2.5 sm:p-3 flex-shrink-0">
              <ArrowDownOutlined
                style="color: #fff"
                class="text-base sm:text-[20px] rotate-45"
              />
            </div>
            <div class="grid gap-1 sm:gap-2 min-w-0">
              <p class="text-xs sm:text-sm font-normal text-gray-500">Income</p>
              <div class="flex items-end gap-2 flex-wrap">
                <span
                  class="text-base lg:text-2xl xl:text-3xl font-semibold truncate"
                >
                  {{ getFormattedNumber(cashFlowData?.totals.income, "USD") }}
                </span>
                <a-tag
                  :color="
                    cashFlowData?.totals.income_change >= 0 ? 'green' : 'red'
                  "
                  type="ghost"
                  class="!flex !items-center !border-none !font-medium !rounded-xl !px-2 !py-0.5"
                >
                  <span class="text-xs sm:text-sm">
                    {{
                      getFormattedNumber(cashFlowData?.totals.income_change)
                    }}%
                  </span>
                  <component
                    :is="
                      cashFlowData?.totals.income_change >= 0
                        ? ArrowUpOutlined
                        : ArrowDownOutlined
                    "
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
              <div class="flex items-end gap-2 flex-wrap">
                <span
                  class="text-base lg:text-2xl xl:text-3xl font-semibold truncate"
                >
                  {{ getFormattedNumber(cashFlowData?.totals.expense, "USD") }}
                </span>
                <a-tag
                  :color="
                    cashFlowData?.totals.expense_change >= 0 ? 'red' : 'green'
                  "
                  type="ghost"
                  class="!flex !items-center !border-none !font-medium !rounded-xl !px-2 !py-0.5"
                >
                  <span class="text-xs sm:text-sm">
                    {{
                      getFormattedNumber(cashFlowData?.totals.expense_change)
                    }}%
                  </span>
                  <component
                    :is="
                      cashFlowData?.totals.expense_change >= 0
                        ? ArrowUpOutlined
                        : ArrowDownOutlined
                    "
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
