<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const collapsed = ref(false);
const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<template>
  <a-layout style="height: 100vh">
    <a-layout-sider
      collapsible
      v-model:collapsed="collapsed"
      width="200"
      style="min-height: 100vh"
    >
      <div class="logo" style="color: white; text-align: center; padding: 16px">
        MyDashboard
      </div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item @click="router.push('/dashboard')">Dashboard</a-menu-item>
        <a-menu-item @click="router.push('/analytics')">Analytics</a-menu-item>
        <a-menu-item @click="router.push('/reports')">Reports</a-menu-item>
        <a-menu-item @click="router.push('/settings')">Settings</a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header
        style="
          background: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <a-button type="primary" @click="logout">Logout</a-button>
      </a-layout-header>

      <a-layout-content style="margin: 16px; padding: 24px; background: #fff">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
