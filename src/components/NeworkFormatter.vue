<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  network: string;
  size?: number;
}>();

// Automatically load all images from folder
const icons = import.meta.glob("@/assets/img/networks/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const imageSrc = computed(() => {
  const key = props.network.trim().toLowerCase();

  // try to match file
  const match = Object.keys(icons).find((path) =>
    path.toLowerCase().includes(key)
  );

  // return match or default
  return match ? icons[match] : icons["/src/assets/networks/default.png"];
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
