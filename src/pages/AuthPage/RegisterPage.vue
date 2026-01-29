<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "@/store/auth/auth.store";
import { message } from "ant-design-vue";
import {
  UserAddOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
import SocialAuth from "./SocialAuth.vue";

const auth = useAuthStore();

const formState = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  remember: false,
  agreeToTerms: false,
});

const error = ref("");
const loading = ref(false);

const submit = async () => {
  if (!formState.agreeToTerms) {
    message.error("You must agree to the Terms of Service and Privacy Policy");
    return;
  }

  try {
    loading.value = true;
    error.value = "";
    await auth.register(
      formState.name,
      formState.email,
      formState.password,
      formState.password_confirmation,
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

        <a-form :model="formState" layout="vertical" @finish="submit">
          <a-form-item
            name="name"
            :rules="[{ required: true, message: 'Please input your name!' }]"
          >
            <a-input
              size="large"
              placeholder="Full Name"
              v-model:value="formState.name"
              ><template #prefix>
                <UserOutlined class="!text-gray-400" /> </template
            ></a-input>
          </a-form-item>

          <a-form-item
            name="email"
            :rules="[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]"
          >
            <a-input
              size="large"
              placeholder="Email Address"
              v-model:value="formState.email"
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
            <a-input-password
              size="large"
              placeholder="Enter Password"
              v-model:value="formState.password"
            >
              <template #prefix>
                <LockOutlined class="!text-gray-400" /> </template
            ></a-input-password>
          </a-form-item>

          <a-form-item
            name="password_confirmation"
            :rules="[
              { required: true, message: 'Please confirm your password!' },
              {
                validator: async (_: any, value: string) => {
                  if (value !== formState.password) {
                    throw new Error('Passwords do not match');
                  }
                },
              },
            ]"
          >
            <a-input-password
              size="large"
              placeholder="Confirm Password"
              v-model:value="formState.password_confirmation"
            >
              <template #prefix>
                <LockOutlined class="!text-gray-400" /> </template
            ></a-input-password>
          </a-form-item>

          <div class="flex items-start">
            <a-checkbox
              v-model:checked="formState.agreeToTerms"
              :class="!formState.agreeToTerms ? 'border-red-500' : ''"
            >
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
            class="w-full my-4 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:from-blue-600 hover:to-indigo-700 font-medium text-base shadow-lg hover:shadow-xl transition-all"
          >
            {{ loading ? "Creating Account..." : "Create Account" }}
          </a-button>
        </a-form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        <SocialAuth />

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
