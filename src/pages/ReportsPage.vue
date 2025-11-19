<script setup lang="ts">
import Layout from "../components/Layout.vue";
import { ref } from "vue";

interface Report {
  date: string;
  source: string;
  roi: string;
  revenue: string;
}

const reports = ref<Report[]>([
  { date: "2025-11-19", source: "Google Ads", roi: "154%", revenue: "$340" },
  { date: "2025-11-18", source: "Facebook", roi: "120%", revenue: "$280" },
  { date: "2025-11-17", source: "Instagram", roi: "130%", revenue: "$300" },
]);
</script>

<template>
  <Layout>
    <h1>Reports</h1>
    <a-table
      :columns="[
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Source', dataIndex: 'source', key: 'source' },
        { title: 'ROI', dataIndex: 'roi', key: 'roi' },
        { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
      ]"
      :dataSource="reports"
      rowKey="date"
    />
  </Layout>
</template>
