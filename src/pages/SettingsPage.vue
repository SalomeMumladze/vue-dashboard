<script setup lang="ts">
import Layout from "@/components/Layout";
import { reactive, ref, onMounted, computed } from "vue";
import { message, Modal } from "ant-design-vue";
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  LockOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { useAuthStore } from "@/store/user";
import { setToken } from "@/services/axios";
import AvatarUpload from "./AuthPage/AvatarUpload.vue";

const auth = useAuthStore();
const user = computed(() => auth.user);
const loading = ref(false);

if (auth.token) {
  setToken(auth.token);
  auth.fetchUser();
}

const form = reactive({
  name: "",
  email: "",
});

const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

onMounted(async () => {
  try {
    user.value = await auth.fetchUser();

    if (user.value) {
      form.name = user.value.name || "";
      form.email = user.value.email || "";
    }
  } catch (error) {
    message.error("Failed to load user data");
  }
});

const saveSettings = async () => {
  try {
    loading.value = true;

    if (!user.value) return;

    await auth.updateUser(user.value.id, form.name);

    message.success("Settings saved successfully!");
  } catch (error: any) {
    message.error(error.response?.data?.message || "Failed to save settings");
  } finally {
    loading.value = false;
  }
};

const changePassword = async () => {
  if (!user.value) return;

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    message.error("Passwords do not match");
    return;
  }

  try {
    await auth.changePassword(
      user.value.id,
      passwordForm.currentPassword,
      passwordForm.newPassword,
      passwordForm.confirmPassword,
    );

    message.success("Password updated successfully!");

    passwordForm.currentPassword = "";
    passwordForm.newPassword = "";
    passwordForm.confirmPassword = "";
  } catch (error: any) {
    message.error(error.response?.data?.message || "Failed to update password");
  }
};

const resetForm = () => {
  if (user.value) {
    form.name = user.value.name || "";
    form.email = user.value.email || "";
  }
  message.info("Changes discarded");
};

const deleteAccount = () => {
  Modal.confirm({
    title: "Delete account?",
    content: "This action cannot be undone.",
    okType: "danger",
    onOk: async () => {
      await auth.deleteAccount(user.value.id);
      message.success("Account deleted");
    },
  });
};
</script>

<template>
  <Layout>
    <div class="max-w-4xl mx-auto p-6 space-y-6">
      <div class="bg-white rounded-xl shadow-sm p-6 gap-2 grid">
        <AvatarUpload :name="form.name" />

        <a-form :model="form" layout="vertical" @finish="saveSettings">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a-form-item
              label="Full Name"
              name="name"
              :rules="[{ required: true, message: 'Please enter your name' }]"
            >
              <a-input
                v-model:value="form.name"
                size="large"
                placeholder="Enter your full name"
                class="rounded-lg"
              >
                <template #prefix>
                  <UserOutlined class="!text-gray-400" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              label="Email Address"
              name="email"
              :rules="[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]"
            >
              <a-input
                v-model:value="form.email"
                size="large"
                placeholder="your@email.com"
                class="rounded-lg"
                disabled="true"
              >
                <template #prefix>
                  <MailOutlined class="!text-gray-400" />
                </template>
              </a-input>
            </a-form-item>
          </div>
        </a-form>

        <div class="flex justify-center items-center">
          <div class="flex gap-3">
            <a-button size="medium" class="rounded-lg" @click="resetForm">
              Reset
            </a-button>
            <a-button
              type="primary"
              size="medium"
              :loading="loading"
              class="rounded-lg"
              @click="saveSettings"
            >
              <SaveOutlined /> Save Changes
            </a-button>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm p-6">
        <h2
          class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
        >
          <LockOutlined />
          Change Password
        </h2>

        <a-form
          :model="passwordForm"
          layout="vertical"
          @finish="changePassword"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <a-form-item
              label="Current Password"
              name="currentPassword"
              :rules="[{ required: true, message: 'Enter current password' }]"
              class="md:col-span-2"
            >
              <a-input-password
                v-model:value="passwordForm.currentPassword"
                size="large"
                placeholder="Enter current password"
              >
                <template #prefix>
                  <LockOutlined class="!text-gray-400" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item
              label="New Password"
              name="newPassword"
              :rules="[{ required: true, message: 'Enter new password' }]"
            >
              <a-input-password
                v-model:value="passwordForm.newPassword"
                size="large"
                placeholder="Enter new password"
                class="rounded-lg"
              >
                <template #prefix>
                  <LockOutlined class="!text-gray-400" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item
              label="Confirm Password"
              name="confirmPassword"
              :rules="[{ required: true, message: 'Confirm password' }]"
            >
              <a-input-password
                v-model:value="passwordForm.confirmPassword"
                size="large"
                placeholder="Confirm new password"
                class="rounded-lg"
              >
                <template #prefix>
                  <LockOutlined class="!text-gray-400" />
                </template>
              </a-input-password>
            </a-form-item>
          </div>

          <a-button type="default" html-type="submit" class="rounded-lg">
            Update Password
          </a-button>
        </a-form>
      </div>
      <a-button danger class="rounded-lg" @click="deleteAccount">
        <DeleteOutlined /> Delete Account
      </a-button>
    </div>
  </Layout>
</template>
