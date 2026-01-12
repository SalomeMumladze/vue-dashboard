<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  PieChartOutlined,
  BarChartOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";

const router = useRouter();
const route = useRoute();

const menuItems = [
  { key: "/dashboard", label: "MyDashboard", icon: PieChartOutlined },
  { key: "/analytics", label: "Analytics", icon: BarChartOutlined },
  { key: "/reports", label: "Reports", icon: ProfileOutlined },
  { key: "/settings", label: "Settings", icon: SettingOutlined },
];

const selectedKey = computed(() => {
  return menuItems.find((item) => route.path.startsWith(item.key))?.key || "";
});

</script>

<template>
  <a-menu
    theme="dark"
    mode="inline"
    class="h-fit"
    :selected-keys="[selectedKey]"
  >
    <a-menu-item
      v-for="item in menuItems"
      :key="item.key"
      @click="router.push(item.key)"
    >
      <component :is="item.icon" />
      <span>{{ item.label }}</span>
    </a-menu-item>
  </a-menu>
</template>
