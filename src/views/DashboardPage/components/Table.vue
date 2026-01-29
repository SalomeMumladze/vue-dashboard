<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { cardDataByDate } from "./data";
import getFormattedNumber from "@/components/getFormattedNumber";
import { currency_options } from "@/components/Currency";
import { formatDate } from "@/components/formatDate";

const total = cardDataByDate.length;

const current = ref(1);
const pageSize = ref(10);

watch(pageSize, () => {
  current.value = 1;
});

const pagedData = computed(() => {
  const start = (current.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return cardDataByDate.slice(start, end);
});

function handleTableChange(page: number) {
  current.value = page;
}

function handleShowSizeChange(currentPage: number, newSize: number) {
  pageSize.value = newSize;
  current.value = 1;
}

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    ellipsis: true,
    sorter: {
      compare: (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      multiple: 3,
    },
    customRender: ({ record }: any) => {
      return formatDate(record.date, "MMM DD yyyy");
    },
    filters: [
      {
        text: "This Year",
        value: "this_year",
      },
      {
        text: "Last Year",
        value: "last_year",
      },
    ],
  },
  {
    title: "Total Revenue",
    key: "totalRevenue",
    dataIndex: "totalRevenue",
    ellipsis: true,
    sorter: {
      compare: (a, b) =>
        a.metrics.totalRevenue.current - b.metrics.totalRevenue.current,
    },
    customRender: ({ record }: any) => {
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
    dataIndex: "totalOrders",
    ellipsis: true,
    sorter: {
      compare: (a, b) =>
        a.metrics.totalOrders.current - b.metrics.totalOrders.current,
    },
    customRender: ({ record }: any) =>
      getFormattedNumber(record.metrics.totalOrders.current),
  },
  {
    title: "Active Users",
    key: "activeUsers",
    ellipsis: true,
    dataIndex: "activeUsers",
    sorter: {
      compare: (a, b) =>
        a.metrics.activeUsers.current - b.metrics.activeUsers.current,
    },
    customRender: ({ record }: any) =>
      getFormattedNumber(record.metrics.activeUsers.current),
  },
  {
    title: "Conversion Rate",
    key: "conversionRate",
    dataIndex: "conversionRate",
    ellipsis: true,
    sorter: {
      compare: (a, b) =>
        a.metrics.conversionRate.current - b.metrics.conversionRate.current,
    },
    customRender: ({ record }: any) =>
      `${getFormattedNumber(record.metrics.conversionRate.current)}%`,
  },
];
</script>

<template>
  <a-card
    title="Card title"
    :bordered="false"
    class="h-full"
    :body-style="{ height: '370px' }"
  >
    <a-table
      :columns="columns"
      :data-source="pagedData"
      row-key="date"
      :scroll="{ y: 280, x: 700 }"
      size="middle"
      :footer="false"
      :pagination="{
        current: current,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        onChange: (page) => handleTableChange(page),
        onShowSizeChange: (currentPage, size) =>
          handleShowSizeChange(currentPage, size),
      }"
    />
  </a-card>
</template>
