<template>
  <form @submit.prevent="submit">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/user";

const auth = useAuthStore();
const email = ref("test@example.com");
const password = ref("password123");
const error = ref("");

const submit = async () => {
  try {
    error.value = "";
    await auth.login(email.value, password.value);
  } catch (e: any) {
    error.value = e.response?.data?.message || "Login failed";
  }
};
</script>
