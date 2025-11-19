<script setup lang="ts">
import Layout from "../components/Layout.vue";

interface Widget {
  title: string;
  value: string;
  color?: string;
}

const widgets: Widget[] = [
  { title: "Total Revenue", value: "$24,560", color: "#1890ff" },
  { title: "ROI", value: "163%", color: "#52c41a" },
  { title: "Active Users", value: "1,247", color: "#faad14" },
  { title: "New Leads", value: "24", color: "#eb2f96" },
];
</script>

<template>
  <Layout>
    <h1>Dashboard</h1>
    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="6" v-for="widget in widgets" :key="widget.title">
        <a-card :style="{ borderTop: `3px solid ${widget.color}` }">
          <h3>{{ widget.title }}</h3>
          <p style="font-size: 24px; font-weight: bold">{{ widget.value }}</p>
        </a-card>
      </a-col>
    </a-row>
  </Layout>
</template>
