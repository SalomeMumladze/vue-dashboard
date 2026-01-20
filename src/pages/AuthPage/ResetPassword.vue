<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/user";
import { message } from "ant-design-vue";
import { LockOutlined, MailOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

const auth = useAuthStore();
const email = ref("");
const new_password = ref("");
const confirm_new_password = ref("");
const error = ref("");
const loading = ref(false);

const submitResetPassword = async () => {
  try {
    loading.value = true;
    error.value = "";
    await auth.resetPassword(
      email.value,
      new_password.value,
      confirm_new_password.value,
    );
    message.success("Password reset successful!");
    router.push("/login");
  } catch (e: any) {
    error.value = e.response?.data?.message || "Password reset failed";
    message.error("Password reset failed");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4"
  >
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 class="text-3xl font-extrabold text-gray-900 text-center">
          Reset Password
        </h2>
        <form @submit.prevent="submitResetPassword" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Email Address</label
            >
            <a-input
              v-model:value="email"
              type="email"
              size="large"
              placeholder="Email Address"
              required
              class="rounded-lg"
            >
              <template #prefix>
                <MailOutlined class="!text-gray-400" />
              </template>
            </a-input>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >New Password</label
            >
            <a-input-password
              v-model:value="new_password"
              size="large"
              placeholder="••••••••"
              required
              class="rounded-lg"
            >
              <template #prefix>
                <LockOutlined class="!text-gray-400" />
              </template>
            </a-input-password>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Confirm New Password</label
            >
            <a-input-password
              v-model:value="confirm_new_password"
              size="large"
              placeholder="••••••••"
              required
              class="rounded-lg"
            >
              <template #prefix>
                <LockOutlined class="!text-gray-400" />
              </template>
            </a-input-password>
          </div>

          <div>
            <a-button
              type="primary"
              html-type="submit"
              size="large"
              class="w-full rounded-lg"
            >
              Reset Password
            </a-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
