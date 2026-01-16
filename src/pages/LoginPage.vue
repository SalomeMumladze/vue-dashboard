<script lang="ts" setup>
import { ref, reactive } from "vue";
import { message } from "ant-design-vue";
import { LockOutlined, MailOutlined } from "@ant-design/icons-vue";

import { useAuthStore } from "@/store/user";

const auth = useAuthStore();

const formState = reactive({
  email: "test@example.com",
  password: "password123",
  remember: false,
});

const loading = ref(false);
const error = ref("");

const handleSubmit = async () => {
  try {
    loading.value = true;
    error.value = "";

    await auth.login(formState.email, formState.password);
    message.success("Login successful!");
  } catch (e: any) {
    error.value = e.response?.data?.message || "Login failed";
    message.error("Login failed");
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
        <div class="text-center space-y-2">
          <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-2"
          >
            <LockOutlined class="text-3xl !text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p class="text-gray-500 text-sm">
            Sign in to continue to your account
          </p>
        </div>

        <a-form
          :model="formState"
          @finish="handleSubmit"
          layout="vertical"
          class="space-y-4"
        >
          <a-form-item
            name="email"
            :rules="[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]"
          >
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Email Address</label
            >

            <a-input
              v-model:value="formState.email"
              size="large"
              placeholder="you@example.com"
              class="rounded-lg"
            >
              <template #prefix>
                <MailOutlined class="!text-gray-400" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Password</label
            >
            <a-input-password
              v-model:value="formState.password"
              size="large"
              placeholder="••••••••"
              class="rounded-lg"
            >
              <template #prefix>
                <LockOutlined class="!text-gray-400" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="flex items-center justify-between">
            <a-checkbox v-model:checked="formState.remember">
              <span class="text-sm text-gray-600">Remember me</span>
            </a-checkbox>
            <a
              href="#"
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <a-alert
            v-if="error"
            :message="error"
            type="error"
            show-icon
            closable
            @close="error = ''"
            class="rounded-lg !mb-2"
          />

          <a-form-item class="mb-0">
            <a-button
              type="primary"
              html-type="submit"
              size="large"
              :loading="loading"
              class="w-full h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:from-blue-600 hover:to-indigo-700 font-medium text-base shadow-lg hover:shadow-xl transition-all"
            >
              {{ loading ? "Signing in..." : "Sign In" }}
            </a-button>
          </a-form-item>
        </a-form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
          >
            <img
              src="@/assets/img/networks/google.png"
              alt="google"
              class="w-4 h-4"
            />

            <span class="ml-2 text-sm font-medium text-gray-700">Google</span>
          </button>
          <button
            type="button"
            class="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
          >
            <img
              src="@/assets/img/networks/facebook.png"
              alt="facebook"
              class="w-4 h-4"
            />
            <span class="ml-2 text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>

        <p class="text-center text-sm text-gray-600">
          Don't have an account?
          <router-link
            to="/register"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </router-link>
        </p>
      </div>

      <p class="text-center text-xs text-gray-500 mt-6">
        By continuing, you agree to our
        <a href="#" class="underline hover:text-gray-700">Terms of Service</a>
        and
        <a href="#" class="underline hover:text-gray-700">Privacy Policy</a>
      </p>
    </div>
  </div>
</template>
