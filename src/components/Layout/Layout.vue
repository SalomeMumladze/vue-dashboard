<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { MenuOutlined } from "@ant-design/icons-vue";
import SidebarMenu from "./components/SidebarMenu.vue";
import { useAuthStore } from "@/store/user";

const auth = useAuthStore();
const user = ref<any>(null);

const collapsed = ref(false);
const mobileMenuOpen = ref(false);
const isMobile = ref(false);

const logout = async () => {
  await auth.logout();
  window.location.href = "/login";
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 800;
  if (!isMobile.value) mobileMenuOpen.value = false;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

async function loadUsers() {
  await auth.fetchUsers();
}

onMounted(async () => {
  user.value = await auth.fetchUserById(1);
});
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
        <a-button type="primary" @click="logout">Logout</a-button>
      </a-layout-header>

      <a-layout-content class="p-4 sm:p-8 h-full overflow-auto">
        <div v-if="user">
          <p>ID: {{ user.id }}</p>
          <p>Name: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
        </div>
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
