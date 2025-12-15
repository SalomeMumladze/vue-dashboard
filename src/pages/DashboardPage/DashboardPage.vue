<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  PercentageOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons-vue";
import { currency_options } from "@/components/Currency";
import getFormattedNumber from "@/components/getFormattedNumber";
import Table from "./components/Table.vue";
import Chart from "./components/Chart.vue";
import NetworkPieChart from "./components/NetworkPieChart.vue";
import AgeChart from "./components/AgeChart.vue";
import TotalSalesArea from "./components/TotalSalesArea.vue";

interface Widget {
  title: string;
  change: number;
  unit?: string;
  current: number;
  lastMonth?: number;
  lastYear?: number;
  percentChangeMonth?: number;
  percentChangeYear?: number;
  currency?: string;
}

const widgets: Widget[] = [
  {
    title: "Total Revenue",
    change: 10.2,
    current: 145680,
    lastMonth: 132450,
    lastYear: 98320,
    percentChangeMonth: 10.0,
    percentChangeYear: 48.2,
    currency: "USD",
  },
  {
    title: "Total Orders",
    change: 5.5,
    current: 1247,
    lastMonth: 1156,
    lastYear: 892,
    percentChangeMonth: 7.9,
    percentChangeYear: 39.8,
  },
  {
    title: "Active Users",
    change: -2.1,
    lastYear: 98320,
    current: 3842,
    lastMonth: 3654,
    percentChangeMonth: 5.1,
    percentChangeYear: 41.4,
  },
  {
    current: 3.24,
    lastMonth: 2.98,
    lastYear: 2.45,
    percentChangeMonth: 8.7,
    percentChangeYear: 32.2,
    unit: "%",
    title: "Conversion Rate",
    change: 12.8,
  },
];

const widgetIcons: Record<string, any> = {
  "Total Revenue": DollarOutlined,
  "Total Orders": ShoppingCartOutlined,
  "Active Users": UserOutlined,
  "Conversion Rate": PercentageOutlined,
};

const loading = false;
</script>

<template>
  <Layout>
    <a-row :gutter="16">
      <a-col
        v-for="widget in widgets"
        :key="widget.title"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        class="mb-4"
      >
        <a-card
          class="border !border-gray-200 border-solid h-full"
          :body-style="{ padding: '10px 20px' }"
        >
          <a-skeleton :loading="loading" active :paragraph="{ rows: 1 }">
            <div class="flex items-center gap-1 text-gray-400">
              <component :is="widgetIcons[widget.title]" />
              <h3>{{ widget.title }}</h3>
            </div>
            <div class="flex items-center justify-between gap-2 mt-1 flex-wrap">
              <p class="text-2xl font-bold m-0">
                {{ getFormattedNumber(widget.current) }}
                {{ currency_options[widget?.currency]?.symbol }}
                {{ widget.unit || "" }}
              </p>

              <a-tag
                :color="widget.change >= 0 ? 'green' : 'red'"
                type="ghost"
                class="!flex !items-center !border-none !font-medium !rounded-xl"
              >
                <component
                  :is="widget.change >= 0 ? ArrowUpOutlined : ArrowDownOutlined"
                  class="text-sm"
                />
                <span>
                  {{ getFormattedNumber(widget.change) }}
                  {{ currency_options[widget?.currency]?.symbol }}
                  {{ widget.unit || "" }}
                </span>
              </a-tag>
            </div>
          </a-skeleton>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16" class="mb-6">
      <a-col :xs="24" :sm="24" :md="12" :lg="12" class="h-[430px] mb-4 md:mb-0">
        <Table />
      </a-col>

      <a-col :xs="24" :sm="24" :md="12" :lg="12" class="h-[430px]">
        <Chart />
      </a-col>
    </a-row>

    <a-row :gutter="16" class="mb-6">
      <a-col :xs="24" :sm="24" :md="12" :lg="16">
        <div class="mb-4 md:mb-0 h-fit flex flex-col gap-6">
          <TotalSalesArea class="h-[430px]" />
          <AgeChart />
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="8"><NetworkPieChart /></a-col>
    </a-row>
  </Layout>
</template>
