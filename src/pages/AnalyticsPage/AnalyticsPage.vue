<script setup lang="ts">
import Layout from "@/components/Layout";
import Grid from "./components/Grid.vue";
import CashFlow from "./components/CashFlow.vue";
import AnalyticsWidgets from "./components/AnalyticsWidgets.vue";
import TopUsers from "./components/TopUsers.vue";
</script>

<template>
  <Layout>
    <div class="grid gap-4">
      <CashFlow />
      <AnalyticsWidgets />
      <div class="grid sm:grid-cols-2">
        <TopUsers />
        test
      </div>

      <!-- <Grid /> -->
    </div>
  </Layout>
</template>
