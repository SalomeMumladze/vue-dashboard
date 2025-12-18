import { ref, onMounted, onBeforeUnmount } from "vue";

const isMobile = ref(false);

export function useResponsive() {
  const checkMobile = () => (isMobile.value = window.innerWidth < 768);

  onMounted(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", checkMobile);
  });

  return { isMobile };
}
