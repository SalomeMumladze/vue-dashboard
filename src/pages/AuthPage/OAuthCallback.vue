<template>
  <div>Logging in...</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useUserStore } from "@/store/user/user.store";
import { useAuthStore } from "@/store/auth/auth.store";
import router from "@/router";

const userStore = useUserStore();
const auth = useAuthStore();

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    auth.token = token;
    localStorage.setItem("token", token);
    userStore.fetchUser().then(() => {
      router.push("/dashboard");
    });
  } else {
    router.push("/login");
  }
});
</script>
