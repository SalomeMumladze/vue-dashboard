<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/user";
import { message } from "ant-design-vue";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
});

const auth = useAuthStore();
const loading = ref(false);
const previewUrl = ref<string | null>(null);

function getAvatarUrl() {
  if (previewUrl.value) return previewUrl.value;
  if (auth.user?.avatar) {
    return `http://127.0.0.1:8000/storage/${auth.user.avatar}?t=${Date.now()}`;
  }
  return null;
}

const handleUpload = async (options: any) => {
  const { file, onSuccess, onError } = options;

  previewUrl.value = URL.createObjectURL(file);

  const formData = new FormData();
  formData.append("name", props.name || auth.user.name);
  formData.append("avatar", file);

  try {
    loading.value = true;

    const res = await auth.updateUser(
      auth.user.id,
      props.name || auth.user.name,
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
    await auth.deleteAvatar(auth.user.id);

    auth.user.avatar = null;
    message.success("Avatar removed");
  } catch (err: any) {
    message.error("Failed to remove avatar");
  }
};
</script>

<template>
  <div class="flex items-center gap-6 w-full">
    <div class="gap-6 flex w-full items-center flex-wrap">
      <div class="mt-4">
        <img
          v-if="getAvatarUrl()"
          :src="getAvatarUrl()"
          class="w-32 h-32 rounded-full border border-gray-300"
          alt="User Avatar"
        />
        <a-avatar
          v-else
          :size="128"
          class="text-white font-bold sm:!text-5xl text-base !bg-gray-400"
        >
          {{ auth.user?.name ? auth.user.name.charAt(0).toUpperCase() : "U" }}
        </a-avatar>
      </div>

      <div class="space-y-2">
        <div class="flex gap-3 flex-wrap">
          <a-upload
            :custom-request="handleUpload"
            :show-upload-list="false"
            accept="image/*"
          >
            <a-button :loading="loading" type="primary">
              <UploadOutlined /> Upload Photo
            </a-button>
          </a-upload>
          <a-button @click="removeAvatar" type="default">
            <DeleteOutlined /> Remove
          </a-button>
        </div>
        <p class="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB</p>
      </div>
    </div>
  </div>
</template>
