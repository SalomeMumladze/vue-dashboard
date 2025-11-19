<script setup lang="ts">
import Layout from "../components/Layout.vue";
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

const revenueData = ref([100, 200, 150, 300, 250, 400, 350]);
const chartOptions = ref({
  chart: { id: "revenue-chart", toolbar: { show: false } },
  xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
});
</script>

<template>
  <Layout>
    <h1>Analytics</h1>
    <vue-apex-charts
      type="line"
      height="350"
      :options="chartOptions"
      :series="[{ name: 'Revenue', data: revenueData }]"
    />
  </Layout>
</template>

<script lang="ts">
import VueApexCharts from "vue3-apexcharts";
export default { components: { VueApexCharts } };
</script>
