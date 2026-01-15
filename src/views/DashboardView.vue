<script setup lang="ts">
import { onMounted, ref } from "vue";
import MetricsCard from "../components/MetricsCard.vue";

interface Metric {
  title: string;
  value: number;
  description?: string;
}

const metrics = ref<Metric[]>([]);

onMounted(async () => {
  try {
    metrics.value = [
      { title: "Users", value: 1232, description: "Total users" },
      { title: "Revenue", value: 5400, description: "Monthly revenue" },
      { title: "Orders", value: 320, description: "Completed orders" },
    ];
  } catch (error) {
    console.error("API Error:", error);
  }
});
</script>

<template>
  <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <MetricsCard
      v-for="(metric, index) in metrics"
      :key="index"
      :title="metric.title"
      :value="metric.value"
      :description="metric.description"
    />
  </div>
</template>
