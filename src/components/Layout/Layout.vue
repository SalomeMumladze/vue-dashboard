<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";
import SidebarMenu from "./components/SidebarMenu.vue";
import User from "./components/User.vue";

const collapsed = ref(false);
const mobileMenuOpen = ref(false);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 800;
  if (!isMobile.value) mobileMenuOpen.value = false;
};

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<template>
  <a-layout class="h-screen overflow-hidden">
    <a-layout-sider
      v-if="!isMobile"
      collapsible
      v-model:collapsed="collapsed"
      width="200"
      class="fixed left-0 overflow-y-auto"
    >
      <div class="px-6 pt-6 pb-2 text-white flex items-center">
        <span v-if="!collapsed">Logo</span>
      </div>

      <SidebarMenu />
    </a-layout-sider>

    <a-drawer
      v-model:open="mobileMenuOpen"
      placement="left"
      width="220"
      :closable="false"
      bodyStyle="padding: 0"
    >
      <div class="px-6 py-4 text-white bg-[#001529]">Logo</div>
      <SidebarMenu @click.native="mobileMenuOpen = false" />
    </a-drawer>

    <a-layout>
      <a-layout-header
        class="bg-white flex items-center justify-between px-4"
        style="height: 64px"
      >
        <MenuOutlined
          v-if="isMobile"
          class="text-xl cursor-pointer"
          @click="mobileMenuOpen = true"
        />
        <User />
      </a-layout-header>
      <a-layout-content class="p-4 sm:p-6 h-full overflow-auto">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
