<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "@/store/user/user.store";
import { message } from "ant-design-vue";
import { CameraOutlined, DeleteOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
});

const userStore = useUserStore();
const loading = ref(false);
const previewUrl = ref<string | null>(null);

const avatarUrl = computed(() => {
  if (previewUrl.value) return previewUrl.value;
  if (userStore.user?.avatar_url) {
    return `${userStore.user.avatar_url}?t=${Date.now()}`;
  }
  return null;
});

const handleUpload = async (options: any) => {
  const { file, onSuccess, onError } = options;

  previewUrl.value = URL.createObjectURL(file);

  try {
    loading.value = true;

    const res = await userStore.updateUser(
      userStore.user.id,
      props.name || userStore.user.name,
      file,
    );

    message.success("Profile updated successfully!");
    onSuccess(res, file);
  } catch (err: any) {
    message.error(err.response?.data?.message || "Failed to update profile");
    onError(err);
  } finally {
    loading.value = false;
  }
};

const removeAvatar = async () => {
  try {
    previewUrl.value = null;
    await userStore.deleteAvatar(userStore.user.id);

    userStore.user.avatar_url = null;
    message.success("Avatar removed");
  } catch (err: any) {
    message.error("Failed to remove avatar");
  }
};
</script>

<template>
  <div class="flex justify-center">
    <div class="relative w-36 h-36 group">
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        class="w-36 h-36 rounded-full border border-gray-300 object-cover shadow-md transition-transform duration-200 group-hover:scale-105"
        alt="User Avatar"
      />
      <a-avatar
        v-else
        :size="144"
        class="text-white font-bold !bg-gray-400 w-36 h-36 flex items-center justify-center text-5xl shadow-md transition-transform duration-200 group-hover:scale-105"
      >
        {{
          userStore.user?.name
            ? userStore.user.name.charAt(0).toUpperCase()
            : "U"
        }}
      </a-avatar>

      <div
        class="absolute inset-0 rounded-full bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-200"
      >
        <a-upload
          :custom-request="handleUpload"
          :show-upload-list="false"
          accept="image/*"
        >
          <a-button
            size="large"
            shape="circle"
            :loading="loading"
            class="!bg-white !text-black hover:!bg-gray-100 shadow-md !flex items-center justify-center"
          >
            <CameraOutlined />
          </a-button>
        </a-upload>

        <a-popconfirm
          v-if="avatarUrl"
          title="Are you sure you want to delete your avatar?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="removeAvatar"
        >
          <a-button
            size="large"
            danger
            shape="circle"
            class="shadow-md !flex items-center justify-center"
          >
            <DeleteOutlined />
          </a-button>
        </a-popconfirm>
      </div>
    </div>
  </div>
</template>
