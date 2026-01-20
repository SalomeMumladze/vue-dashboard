<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/user";
import { message } from "ant-design-vue";
import {
  UserAddOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";

const auth = useAuthStore();
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const error = ref("");
const loading = ref(false);
const agreeToTerms = ref(false);

const submit = async () => {
  try {
    loading.value = true;
    error.value = "";
    await auth.register(
      name.value,
      email.value,
      password.value,
      password_confirmation.value
    );
    message.success("Registration successful!");
  } catch (e: any) {
    error.value = e.response?.data?.message || "Registration failed";
    message.error("Registration failed");
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
            <UserAddOutlined class="text-3xl !text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-800">Create Account</h1>
          <p class="text-gray-500 text-sm">
            Sign up to get started with your account
          </p>
        </div>

        <form @submit.prevent="submit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Full Name</label
            >
            <a-input
              v-model:value="name"
              size="large"
              placeholder="Full Name"
              required
              class="rounded-lg"
            >
              <template #prefix>
                <UserOutlined class="!text-gray-400" />
              </template>
            </a-input>
          </div>

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
              >Password</label
            >
            <a-input-password
              v-model:value="password"
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
              >Confirm Password</label
            >
            <a-input-password
              v-model:value="password_confirmation"
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

          <div class="flex items-start">
            <a-checkbox v-model:checked="agreeToTerms" class="mt-1">
              <span class="text-sm text-gray-600">
                I agree to the
                <a href="#" class="text-indigo-600 hover:text-indigo-500"
                  >Terms of Service</a
                >
                and
                <a href="#" class="text-indigo-600 hover:text-indigo-500"
                  >Privacy Policy</a
                >
              </span>
            </a-checkbox>
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

          <a-button
            type="primary"
            html-type="submit"
            size="large"
            :loading="loading"
            class="w-full h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:from-blue-600 hover:to-indigo-700 font-medium text-base shadow-lg hover:shadow-xl transition-all"
          >
            {{ loading ? "Creating Account..." : "Create Account" }}
          </a-button>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Or sign up with</span>
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
          Already have an account?
          <router-link
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Sign in
          </router-link>
        </p>
      </div>

      <p class="text-center text-xs text-gray-500 mt-6">
        By signing up, you agree to our
        <a href="#" class="underline hover:text-gray-700">Terms of Service</a>
        and
        <a href="#" class="underline hover:text-gray-700">Privacy Policy</a>
      </p>
    </div>
  </div>
</template>
