<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/store/user";
import { LogoutOutlined } from "@ant-design/icons-vue";

const auth = useAuthStore();
const user = ref<any>(null);

const logout = async () => {
  await auth.logout();
  window.location.href = "/login";
};

onMounted(async () => {
  user.value = await auth.fetchUserById(1);
});
</script>

<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent v-if="user">
      {{ user.name }}
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item class="flex items-center gap-2" key="logout">
          <a-button type="primary" @click="logout"
            ><LogoutOutlined /><span>Logout</span>
          </a-button>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
