<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const login = () => {
  if (form.email === "test@test.com" && form.password === "123456") {
    localStorage.setItem("token", "mock-token");
    router.push("/dashboard");
  } else {
    alert("Incorrect credentials");
  }
};
</script>

<template>
  <a-row justify="center" align="middle" style="height: 100vh">
    <a-col :span="6">
      <a-card title="Login">
        <a-form layout="vertical" @submit.prevent="login">
          <a-form-item label="Email">
            <a-input v-model:value="form.email" />
          </a-form-item>
          <a-form-item label="Password">
            <a-input-password v-model:value="form.password" />
          </a-form-item>
          <a-button type="primary" block @click="login">Log in</a-button>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>
