<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  network: string;
  size?: number;
}>();

const icons = import.meta.glob("@/assets/img/networks/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const imageSrc = computed(() => {
  const key = props.network.trim().toLowerCase();

  const match = Object.keys(icons).find((path) =>
    path.toLowerCase().includes(key)
  );

  return match ? icons[match] : "/src/assets/svg/other.svg";
});
</script>

<template>
  <img
    :src="imageSrc"
    :alt="props.network"
    :width="props.size ?? 22"
    :height="props.size ?? 22"
    class="object-contain"
  />
</template>
