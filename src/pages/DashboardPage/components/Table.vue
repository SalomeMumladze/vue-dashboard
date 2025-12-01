<script setup lang="ts">
import { cardDataByDate } from "./data";
import getFormattedNumber from "@/components/getFormattedNumber";
import { currency_options } from "@/components/Currency";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Total Revenue",
    key: "totalRevenue",
    customRender: ({ record }) => {
      const value = record.metrics.totalRevenue.current;
      const currency = record.metrics.totalRevenue.currency || "USD";
      return `${currency_options[currency]?.symbol}${getFormattedNumber(
        value
      )}`;
    },
  },
  {
    title: "Total Orders",
    key: "totalOrders",
    customRender: ({ record }) => record.metrics.totalOrders.current,
  },
  {
    title: "Active Users",
    key: "activeUsers",
    customRender: ({ record }) => record.metrics.activeUsers.current,
  },
  {
    title: "Conversion Rate",
    key: "conversionRate",
    customRender: ({ record }) => `${record.metrics.conversionRate.current}%`,
  },
];
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="cardDataByDate"
    row-key="date"
    bordered
  >
  </a-table>
</template>
