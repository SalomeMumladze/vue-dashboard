<template>
  <div
    class="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-gray-700 font-semibold">{{ title }}</h3>
      <span class="text-xl font-bold text-blue-600">{{ value }}</span>
    </div>
    <p v-if="description" class="text-gray-500 br-red-500 text-sm mt-2">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  value: number;
  description?: string;
}

const props = defineProps<Props>();
</script>
