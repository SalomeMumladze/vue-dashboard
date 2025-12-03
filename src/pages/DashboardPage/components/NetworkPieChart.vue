<script setup lang="ts">
import { ref, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import getFormattedNumber from "@/components/getFormattedNumber";

interface NetworkData {
  network: string;
  income: number;
  sales: number;
  color: string;
  icon: string;
}

type MetricType = "income" | "sales";

interface TooltipContext {
  series: number[];
  seriesIndex: number;
  w: any;
}

const NETWORK_DATA: NetworkData[] = [
  {
    network: "Facebook",
    income: 12500,
    sales: 430,
    color: "#1877F2",
    icon: "facebook",
  },
  {
    network: "Google",
    income: 9800,
    sales: 390,
    color: "#34A853",
    icon: "google",
  },
  {
    network: "TikTok",
    income: 7400,
    sales: 310,
    color: "#69C9D0",
    icon: "tiktok",
  },
  {
    network: "Snapchat",
    income: 5400,
    sales: 220,
    color: "#FFAC00",
    icon: "snapchat",
  },
  {
    network: "Twitter",
    income: 2600,
    sales: 120,
    color: "#1DA1F2",
    icon: "twitter",
  },
];

const METRIC_LABELS: Record<MetricType, string> = {
  income: "Income",
  sales: "Sales",
};

const selectedMetric = ref<MetricType>("income");

const series = computed(() =>
  NETWORK_DATA.map((item) => item[selectedMetric.value])
);

const chartLabels = computed(() => NETWORK_DATA.map((item) => item.network));

const chartColors = computed(() => NETWORK_DATA.map((item) => item.color));

const chartOptions = computed<ApexOptions>(() => ({
  labels: chartLabels.value,
  colors: chartColors.value,

  legend: {
    position: "left",
    fontSize: "14px",
    markers: {
      width: 12,
      height: 12,
      radius: 12,
    },
    formatter: createLegendFormatter,
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
          value: {
            show: true,
            formatter: (val: number) => getFormattedNumber(val),
          },
          total: {
            show: true,
            label: METRIC_LABELS[selectedMetric.value],
            formatter: (w: any) => {
              const total = w.globals.seriesTotals.reduce(
                (a: number, b: number) => a + b,
                0
              );
              return getFormattedNumber(total);
            },
          },
        },
      },
    },
  },

  dataLabels: {
    enabled: true,
    background: {
      enabled: true,
      foreColor: "#000",
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
    custom: createTooltipFormatter,
  },
}));

function getNetworkIconPath(networkName: string): string {
  const network = NETWORK_DATA.find(
    (n) => n.network.toLowerCase() === networkName.toLowerCase()
  );
  return `/src/assets/img/networks/${
    network?.icon || networkName.toLowerCase()
  }.png`;
}

function createLegendFormatter(label: string, opts: any): string {
  const index = opts.seriesIndex;
  const value = opts.w.globals.series[index];
  const imgSrc = getNetworkIconPath(label);

  return `
    <div class="grid items-center justify-between w-full grid-cols-[auto_1fr_auto] gap-2">
      <img
        src="${imgSrc}"
        alt="${label}"
        width="18"
        height="18"
        class="object-contain"
      />
      <span>${label}</span>
      <span class="font-medium text-base">${getFormattedNumber(value)}$</span>
    </div>
  `;
}

function createTooltipFormatter({
  series,
  seriesIndex,
  w,
}: TooltipContext): string {
  const label = w.globals.labels[seriesIndex];
  const value = series[seriesIndex];
  const total = series.reduce((a: number, b: number) => a + b, 0);
  const percent = ((value / total) * 100).toFixed(1);

  const color = w.config.colors?.[seriesIndex] ?? "#000";
  const imgSrc = getNetworkIconPath(label);

  return `
    <div class="p-3">
      <div class="flex items-center gap-2 font-semibold text-sm mb-2">
        <span
          class="w-1 h-4 inline-block rounded-xl"
          style="background:${color}"
        ></span>
        <img
          src="${imgSrc}"
          alt="${label}"
          width="16"
          height="16"
          class="object-contain"
        />
        <span class="text-white">${label}</span>
      </div>

      <div class="text-sm text-white">
        <strong>${value.toLocaleString()}</strong>
        <span class="text-gray-400 ml-1">(${percent}%)</span>
      </div>
    </div>
  `;
}
</script>

<template>
  <a-card
    title="Network Performance"
    :bordered="false"
    class="h-full"
    :body-style="{ height: '370px' }"
  >
    <template #extra>
      <a-radio-group
        v-model:value="selectedMetric"
        size="small"
        button-style="solid"
      >
        <a-radio-button value="income">Income</a-radio-button>
        <a-radio-button value="sales">Sales</a-radio-button>
      </a-radio-group>
    </template>

    <VueApexCharts
      type="donut"
      height="370"
      :options="chartOptions"
      :series="series"
    />
  </a-card>
</template>
