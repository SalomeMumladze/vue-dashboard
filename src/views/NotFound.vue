<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/dashboard");
};
</script>

<template>
  <div style="text-align: center; margin-top: 100px">
    <h1 style="font-size: 72px; color: #ff4d4f">404</h1>
    <h2>Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <a-button type="primary" @click="goHome">Go to Dashboard</a-button>
  </div>
</template>
