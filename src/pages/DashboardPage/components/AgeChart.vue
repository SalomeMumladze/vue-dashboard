<script setup lang="ts">
import { computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";

interface AgeGroupData {
  ageGroup: string;
  male: number;
  female: number;
}

interface Gender {
  color: string;
}

const audienceData: AgeGroupData[] = [
  { ageGroup: "18-24", male: 8.5, female: 9.2 },
  { ageGroup: "25-34", male: 12.3, female: 11.8 },
  { ageGroup: "35-44", male: 10.7, female: 9.5 },
  { ageGroup: "45-54", male: 7.4, female: 6.8 },
  { ageGroup: "55-64", male: 5.2, female: 4.9 },
  { ageGroup: "+65", male: 3.8, female: 3.6 },
];

interface TooltipContext {
  series: number[][];
  seriesIndex: number;
  dataPointIndex: number;
  w: any;
}

const GENDER_CONFIG: Record<string, Gender> = {
  male: {
    color: "#0ea5e9",
  },
  female: {
    color: "#06b6d4",
  },
};

const categories = computed(() => audienceData.map((item) => item.ageGroup));

const series = computed(() => [
  {
    name: "Male",
    data: audienceData.map((item) => -item.male),
  },
  {
    name: "Female",
    data: audienceData.map((item) => item.female),
  },
]);

function createTooltipFormatter({
  series,
  seriesIndex,
  dataPointIndex,
  w,
}: TooltipContext): string {
  const ageLabel = w.globals.labels[dataPointIndex];
  const rawValue = series[seriesIndex][dataPointIndex];
  const value = Math.abs(rawValue).toFixed(1) + "%";
  const gender = w.globals.seriesNames[seriesIndex];
  const color = w.config.colors[seriesIndex];

  return `
    <div>

      <div class='text-white font-sm font-normal flex items-center gap-2' >
       <span
          class="w-1 h-4 inline-block rounded-xl"
          style="background:${color}"
        ></span><span>Age: ${ageLabel}</span>
      </div>
      <div class='text-white font-sm font-normal' >
        ${gender}: <span>${value}</span>
      </div>
    </div>
  `;
}

const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: "bar",
    height: 350,
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  colors: ["#3b82f6", "#10b981"],
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "80%",
      borderRadius: 2,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 0,
  },
  grid: {
    borderColor: "#E5E7EB",
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  xaxis: {
    categories: categories.value,
    labels: {
      formatter: (value: string) => {
        return Math.abs(Number(value)).toFixed(1) + "%";
      },
      style: {
        colors: "#9ca3af",
        fontSize: "11px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#4b5563",
        fontSize: "12px",
        fontWeight: 500,
      },
    },
  },
  tooltip: {
    custom: createTooltipFormatter,
    shared: false,
    y: {
      formatter: (val: number) => {
        return Math.abs(val).toFixed(1) + "%";
      },
    },
    style: {
      fontSize: "12px",
      color: "#fff",
    },
  },
  legend: {
    show: false,
  },
}));

const totalMale = computed(() =>
  audienceData.reduce((sum, item) => sum + item.male, 0)
);

const totalFemale = computed(() =>
  audienceData.reduce((sum, item) => sum + item.female, 0)
);
</script>

<template>
  <a-card
    :bordered="false"
    class="h-full"
    :body-style="{ height: 'fit-contents' }"
  >
    <div class="grid grid-cols-2 items-center gap-2 w-full">
      <VueApexCharts
        type="bar"
        :options="chartOptions"
        :series="series"
        height="230px"
      />

      <div class="p-4 grid gap-6">
        <p class="text-base font-medium">Audience Age & Gender</p>
        <div class="grid sm:grid-cols-2 grid-cols-1 items-start gap-4">
          <div class="grid items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1.5">
                <svg width="16" height="16" class="text-blue-500">
                  <circle cx="8" cy="8" r="4" fill="currentColor" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Male</span>
              </div>
              <span
                class="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded"
              >
                {{ totalMale.toFixed(1) }}%
              </span>
            </div>
            <div class="text-center p-4 bg-blue-50 rounded-lg">
              <p class="text-xs text-gray-600 mb-1">Male Audience</p>
              <p class="text-2xl font-bold text-blue-600">
                {{ totalMale.toFixed(1) }}%
              </p>
            </div>
          </div>

          <div class="grid items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1.5">
                <svg width="16" height="16" class="text-emerald-500">
                  <circle cx="8" cy="8" r="4" fill="currentColor" />
                </svg>
                <span class="text-sm font-medium text-gray-700">Female</span>
              </div>
              <span
                class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded"
              >
                {{ totalFemale.toFixed(1) }}%
              </span>
            </div>
            <div class="text-center p-4 bg-emerald-50 rounded-lg">
              <p class="text-xs text-gray-600 mb-1">Female Audience</p>
              <p class="text-2xl font-bold text-emerald-600">
                {{ totalFemale.toFixed(1) }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>
