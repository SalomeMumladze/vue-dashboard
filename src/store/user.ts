import { defineStore } from "pinia";
import api, { setToken } from "@/services/axios";
import router from "@/router";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: [] as User[],
    user: null as any,
    avatar: null as any,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post("/login", { email, password });
      this.user = data.user;
      this.token = data.token;
      localStorage.setItem("token", this.token);
      setToken(this.token);

      router.push("/dashboard");
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      setToken(null);
      router.push("/login");
    },

    async register(
      name: string,
      email: string,
      password: string,
      password_confirmation: string,
    ) {
      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      this.user = res.data.user;
      this.token = res.data.token;
      localStorage.setItem("token", this.token);
      setToken(this.token);

      router.push("/dashboard");
    },

    async fetchUser() {
      if (!this.token) return;
      setToken(this.token);
      try {
        const { data } = await api.get("/me");
        this.user = data;
      } catch (error) {
        this.user = null;
      }
    },
    async updateUser(id: number, name: string, avatarFile?: File) {
      setToken(this.token);

      const formData = new FormData();
      formData.append("name", name);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await api.put(`/users/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      this.user = res.data.user;
      if (res.data.avatar_url) this.user.avatar_url = res.data.avatar_url;
    },

    async changePassword(
      id: number,
      old_password: string,
      password: string,
      password_confirmation: string,
    ) {
      setToken(this.token);

      await api.put(`/users/${id}/password`, {
        old_password,
        password,
        password_confirmation,
      });
    },

    async deleteAccount(id: number) {
      await api.delete(`/users/${id}/delete`);

      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      setToken(null);

      router.push("/login");
    },

    async resetPassword(
      email: string,
      password: string,
      password_confirmation: string,
    ) {
      await api.post("/reset-password", {
        email,
        password,
        password_confirmation,
      });
    },

    async deleteAvatar(id: number) {
      setToken(this.token);

      const res = await api.delete(`/users/${id}/avatar/delete`);

      this.user = res.data.user;
    },

    async loginWithGoogle() {
      const popup = window.open(
        "http://localhost:8000/auth/google",
        "Google Login",
        "width=500,height=600",
      );

      return new Promise<void>((resolve) => {
        const listener = (event: MessageEvent) => {
          if (event.origin !== "http://localhost:8000") return;

          if (event.data?.token) {
            this.token = event.data.token;
            localStorage.setItem("token", this.token);
            setToken(this.token);

            this.fetchUser().then(() => {
              router.push("/dashboard");
              console.log("Login successful!", this.user.name);
              resolve();
            });

            window.removeEventListener("message", listener);
            popup?.close();
          }
        };

        window.addEventListener("message", listener);
      });
    },
  },
});
