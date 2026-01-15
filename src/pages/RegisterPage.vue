<template>
  <form @submit.prevent="submit">
    <input v-model="name" type="text" placeholder="Name" required />
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <input
      v-model="password_confirmation"
      type="password"
      placeholder="Confirm Password"
      required
    />
    <button type="submit">Register</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/user";

const auth = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const error = ref("");

const submit = async () => {
  try {
    error.value = "";
    await auth.register(
      name.value,
      email.value,
      password.value,
      password_confirmation.value
    );
  } catch (e: any) {
    error.value = e.response?.data?.message || "Registration failed";
  }
};
</script>
