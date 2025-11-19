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
  <a-layout style="height: 100vh">
    <a-layout-sider
      collapsible
      v-model:collapsed="collapsed"
      width="200"
      style="min-height: 100vh"
    >
      <div class="px-9 pt-6 pb-2 text-white flex items-center">
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
          <ProfileOutlined /><span>Reports</span></a-menu-item
        >
        <a-menu-item @click="router.push('/settings')">
          <SettingOutlined />
          <span>Settings</span>
        </a-menu-item>
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
