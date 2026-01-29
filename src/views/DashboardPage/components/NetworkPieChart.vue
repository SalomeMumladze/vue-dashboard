<script setup lang="ts">
import { ref, computed, h } from "vue";
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import getFormattedNumber from "@/components/getFormattedNumber";

import facebookImg from "@/assets/img/networks/facebook.png";
import googleImg from "@/assets/img/networks/google.png";
import tiktokImg from "@/assets/img/networks/tiktok.png";
import snapchatImg from "@/assets/img/networks/snapchat.png";
import twitterImg from "@/assets/img/networks/twitter.png";

interface NetworkData {
  network: string;
  income: number;
  sales: number;
}

interface NetworkConfig {
  color: string;
  icon: string;
}

type MetricType = "income" | "sales";

interface TooltipContext {
  series: number[];
  seriesIndex: number;
  w: any;
}

const NETWORK_CONFIG: Record<string, NetworkConfig> = {
  Facebook: {
    color: "#0ea5e9",
    icon: facebookImg,
  },
  Google: {
    color: "#06b6d4",
    icon: googleImg,
  },
  TikTok: {
    color: "#14b8a6",
    icon: tiktokImg,
  },
  Snapchat: {
    color: "#10b981",
    icon: snapchatImg,
  },
  Twitter: {
    color: "#22c55e",
    icon: twitterImg,
  },
};

const NETWORK_DATA: NetworkData[] = [
  {
    network: "Facebook",
    income: 12500,
    sales: 430,
  },
  {
    network: "Google",
    income: 9800,
    sales: 390,
  },
  {
    network: "TikTok",
    income: 7400,
    sales: 310,
  },
  {
    network: "Snapchat",
    income: 5400,
    sales: 220,
  },
  {
    network: "Twitter",
    income: 2600,
    sales: 120,
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

const chartColors = computed(() =>
  NETWORK_DATA.map((item) => NETWORK_CONFIG[item.network]?.color || "#000")
);

const chartOptions = computed<ApexOptions>(() => ({
  labels: chartLabels.value,
  colors: chartColors.value,

  legend: {
    show: true,
    fontSize: "10px",
    position: "bottom",
    markers: {
      size: 5,
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
          value: {
            show: true,
            formatter: (val: string) => getFormattedNumber(Number(val), "USD"),
          },
          total: {
            show: true,
            label: METRIC_LABELS[selectedMetric.value],
            formatter: (w: any) => {
              const total = w.globals.seriesTotals.reduce(
                (a: number, b: number) => a + b,
                0
              );
              return getFormattedNumber(total, "USD");
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

function createTooltipFormatter({
  series,
  seriesIndex,
  w,
}: TooltipContext): string {
  const label = w.globals.labels[seriesIndex];
  const value = series[seriesIndex];
  const total = series.reduce((a: number, b: number) => a + b, 0);
  const percent = ((value / total) * 100).toFixed(1);

  const config = NETWORK_CONFIG[label];
  const color = config?.color || "#000";
  const imgSrc = config?.icon || "";

  return `
    <div>
      <div class="flex items-center gap-2 font-semibold text-sm mb-2">
        <span
          class="w-1 h-4 inline-block rounded-xl"
          style="background:${color}"
        ></span>
        <img
          src="${imgSrc}"
          alt="${label} icon"
          width="16"
          height="16"
          class="object-contain"
        />
        <span class="text-white">${label}</span>
      </div>

      <div class="text-sm text-white">
        <strong>${getFormattedNumber(value, "USD")}</strong>
        <span class="text-gray-400 ml-1">(${percent}%)</span>
      </div>
    </div>
  `;
}

const columns = [
  {
    title: "Network",
    dataIndex: "network",
    key: "network",
    ellipsis: true,
    customRender: ({ record }: { record: NetworkData }) => {
      const config = NETWORK_CONFIG[record.network];
      return h("div", { class: "flex items-center gap-2 text-xs" }, [
        h("img", {
          src: config?.icon,
          width: 18,
          height: 18,
          class: "object-contain",
          alt: `${record.network} logo`,
        }),
        h("span", record.network),
      ]);
    },
  },
  {
    title: "Income",
    dataIndex: "income",
    key: "income",
    customRender: ({ value }: { value: number }) =>
      getFormattedNumber(value, "USD"),
  },
  {
    title: "Sales",
    dataIndex: "sales",
    key: "sales",
    customRender: ({ value }: { value: number }) =>
      getFormattedNumber(value, "USD"),
  },
];
</script>

<template>
  <a-card title="Network Performance" :bordered="false" class="h-full">
    <template #extra>
      <a-radio-group
        v-model:value="selectedMetric"
        size="middle"
        aria-label="Select metric to display"
      >
        <a-radio-button value="income">Income</a-radio-button>
        <a-radio-button value="sales">Sales</a-radio-button>
      </a-radio-group>
    </template>

    <VueApexCharts
      type="donut"
      height="350"
      :options="chartOptions"
      :series="series"
    />
    <a-table
      class="mt-6"
      :columns="columns"
      :data-source="NETWORK_DATA"
      row-key="network"
      size="middle"
      :pagination="false"
    />
  </a-card>
</template>
