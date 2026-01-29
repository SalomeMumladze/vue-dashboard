import { setToken } from "@/services/axios";
import router from "@/router";
import { useUserStore } from "../user/user.store";

export function loginWithGoogle(): Promise<void> {
  const userStore = useUserStore();

  const popup = window.open(
    "http://localhost:8000/auth/google",
    "Google Login",
    "width=500,height=600",
  );

  return new Promise((resolve) => {
    const listener = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:8000") return;

      if (event.data?.token) {
        localStorage.setItem("token", event.data.token);
        setToken(event.data.token);

        userStore.fetchUser().then(() => {
          router.push("/dashboard");
          resolve();
        });

        window.removeEventListener("message", listener);
        popup?.close();
      }
    };

    window.addEventListener("message", listener);
  });
}
