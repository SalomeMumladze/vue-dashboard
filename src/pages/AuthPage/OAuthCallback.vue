<template>
  <div>Logging in...</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/store/user";
import router from "@/router";

const auth = useAuthStore();

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    auth.token = token;
    localStorage.setItem("token", token);
    auth.fetchUser().then(() => {
      router.push("/dashboard");
    });
  } else {
    router.push("/login");
  }
});
</script>
