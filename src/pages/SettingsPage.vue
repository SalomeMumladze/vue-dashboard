<script setup lang="ts">
import Layout from "@/components/Layout";
import { reactive } from "vue";

const form = reactive({
  name: "Salome",
  email: "salome@example.com",
  theme: "light",
});

const saveSettings = () => {
  alert("Settings saved!");
};
</script>

<template>
  <Layout>
    <h1>Settings</h1>
    <a-form layout="vertical">
      <a-form-item label="Name">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="Email">
        <a-input v-model:value="form.email" />
      </a-form-item>
      <a-form-item label="Theme">
        <a-select v-model:value="form.theme">
          <a-select-option value="light">Light</a-select-option>
          <a-select-option value="dark">Dark</a-select-option>
        </a-select>
      </a-form-item>
      <a-button type="primary" @click="saveSettings">Save</a-button>
    </a-form>
  </Layout>
</template>
