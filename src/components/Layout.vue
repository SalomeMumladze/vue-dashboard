<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  PieChartOutlined,
  BarChartOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";

const collapsed = ref(false);
const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<template>
  <a-layout style="height: 100vh; overflow-y: hidden">
    <a-layout-sider
      collapsible
      v-model:collapsed="collapsed"
      width="200"
      class="fixed left-0 overflow-y-auto"
    >
      <div class="px-6 pt-6 pb-2 text-white flex items-center">
        <span v-if="!collapsed">logo</span>
      </div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item
          @click="router.push('/dashboard')"
          class="!flex !items-center"
        >
          <PieChartOutlined />
          <span v-if="!collapsed">MyDashboard</span>
        </a-menu-item>
        <a-menu-item @click="router.push('/analytics')">
          <BarChartOutlined /><span>Analytics</span>
        </a-menu-item>
        <a-menu-item @click="router.push('/reports')">
          <ProfileOutlined /><span>Reports</span>
        </a-menu-item>
        <a-menu-item @click="router.push('/settings')">
          <SettingOutlined /><span>Settings</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout
      :style="{
        height: 'calc(100vh)',
        overflow: 'hidden',
      }"
    >
      <a-layout-header
        :style="{
          height: '64px',
        }"
        class="bg-white flex items-center justify-between top-0 left-0 w-full h-16 z-50 px-4"
      >
        <a-button type="primary" @click="logout">Logout</a-button>
      </a-layout-header>

      <a-layout-content
        class="rounded-md sm:p-4 p-2"
        style="height: 100%; overflow-y: auto"
      >
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
