<script setup lang="ts">
import Layout from "@/components/Layout";
import Grid from "./components/Grid.vue";
import CashFlow from "./components/CashFlow.vue";
import AnalyticsWidgets from "./components/AnalyticsWidgets.vue";
</script>

<template>
  <Layout>
    <div class="grid gap-4">
      <CashFlow />
      <AnalyticsWidgets />
      <!-- <Grid /> -->
    </div>
  </Layout>
</template>
