<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";

const range = ref<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

const formatDateLabel = (date: dayjs.Dayjs) => {
  return date.format("MMM DD, YYYY");
};
</script>

<template>
  <a-range-picker
    v-model:value="range"
    :format="formatDateLabel"
    size="middle"
    separator="-"
  />
</template>
