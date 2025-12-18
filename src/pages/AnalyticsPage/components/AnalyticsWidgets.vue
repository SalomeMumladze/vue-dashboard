<script setup lang="ts">
import Layout from "@/components/Layout/Layout.vue";
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
  <a-row :gutter="16">
    <a-col
      v-for="widget in widgets"
      :key="widget.title"
      :xs="24"
      :sm="12"
      :md="8"
      :lg="6"
      class="grid w-full p-2"
    >
      <a-card
        class="border !border-gray-200 border-solid h-full !px-5 !py-3 grid items-center !w-full"
      >
        <a-skeleton :loading="loading" active :paragraph="{ rows: 1 }">
          <div class="grid gap-2 w-full">
            <div
              class="flex items-center gap-1 font-normal justify-between flex-wrap"
            >
              <div class="flex items-center gap-1 font-normal">
                <component :is="widgetIcons[widget.title]" />
                <h3>{{ widget.title }}</h3>
              </div>
              <span class="text-xs text-gray-400">last 30 days</span>
            </div>
            <div class="flex items-center gap-2 flex-wrap justify-between">
              <p class="text-2xl font-medium m-0">
                {{ getFormattedNumber(widget.current) }}
                %
              </p>

              <a-tag
                :color="widget.change >= 0 ? 'green' : 'red'"
                type="ghost"
                :bordered="false"
                class="!flex !items-center !border-none !font-medium !rounded-xl !m-0"
              >
                <span>
                  {{ getFormattedNumber(widget.change) }}
                  %
                </span>
                <component
                  :is="widget.change >= 0 ? ArrowUpOutlined : ArrowDownOutlined"
                  class="text-xs"
                />
              </a-tag>
            </div>
            <span class="text-xs text-gray-400 font-normal">
              vs 12323 last peirod</span
            >
          </div>
        </a-skeleton>
      </a-card>
    </a-col>
  </a-row>
</template>
