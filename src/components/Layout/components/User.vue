<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/store/user";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons-vue";

const auth = useAuthStore();
const user = computed(() => auth.user);
const previewUrl = ref<string | null>(null);

const avatarUrl = computed(() => {
  if (previewUrl.value) return previewUrl.value;
  if (auth.user?.avatar_url) {
    return `${auth.user.avatar_url}?t=${Date.now()}`;
  }
  return null;
});

const logout = async () => {
  await auth.logout();
  window.location.href = "/login";
};

onMounted(() => {
  if (!auth.user && auth.token) {
    auth.fetchUser();
  }
});
</script>

<template>
  <a-dropdown :trigger="['click']" placement="bottomRight">
    <a
      class="ant-dropdown-link flex items-center justify-center gap-3 px-4 py-2 rounded-lg cursor-pointer ml-auto"
    >
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        class="w-10 h-10 rounded-full border border-gray-300"
        alt="Avatar"
      />

      <a-avatar
        v-else
        :size="40"
        class="text-white font-bold sm:!text-xl text-sm !bg-gray-400"
      >
        {{ auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : "U" }}
      </a-avatar>
    </a>

    <template #overlay>
      <a-menu
        class="user-dropdown-menu min-w-[240px] rounded-xl shadow-lg border border-gray-100"
      >
        <div class="px-2 py-3 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              class="w-10 h-10 rounded-full border border-gray-300"
              alt="Avatar"
            />

            <a-avatar
              v-else
              :size="48"
              class="text-white font-bold text-3xl bg-blue-500"
            >
              {{
                auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : "U"
              }}
            </a-avatar>
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-gray-800">{{
                user.name
              }}</span>
              <span class="text-xs text-gray-500">{{ user.email }}</span>
            </div>
          </div>
        </div>

        <a-menu-item key="settings" class="hover:bg-gray-50 px-4 py-3">
          <router-link
            to="/settings"
            class="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors"
          >
            <SettingOutlined class="text-lg" />
            <span class="text-sm font-medium">Settings</span>
          </router-link>
        </a-menu-item>

        <a-menu-divider class="my-2" />

        <a-menu-item key="logout" class="hover:bg-red-50 px-4 py-3">
          <a
            @click="logout"
            class="flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors cursor-pointer"
          >
            <LogoutOutlined class="text-lg" />
            <span class="text-sm font-medium">Logout</span>
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
