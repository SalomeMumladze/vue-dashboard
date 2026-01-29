<script lang="ts" setup>
import { useAuthStore } from "@/store/auth/auth.store";

const auth = useAuthStore();

const loginWithGoogle = async () => {
  try {
    await auth.loginWithGoogle();
  } catch (e) {
    console.error("Google login failed", e);
  }
};

const loginWithFacebook = async () => {
  window.location.href = "http://localhost:8000/auth/facebook";
};
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <button
      @click="loginWithGoogle"
      type="button"
      class="flex items-center cursor-pointer justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
    >
      <img
        src="@/assets/img/networks/google.png"
        alt="google"
        class="w-4 h-4"
      />

      <span class="ml-2 text-sm font-medium text-gray-700">Google</span>
    </button>
    <button
      @click="loginWithFacebook"
      type="button"
      class="flex items-center cursor-pointer justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
    >
      <img
        src="@/assets/img/networks/facebook.png"
        alt="facebook"
        class="w-4 h-4"
      />
      <span class="ml-2 text-sm font-medium text-gray-700">Facebook</span>
    </button>
  </div>
</template>
