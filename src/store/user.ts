import { defineStore } from "pinia";
import api, { setToken } from "@/services/axios";
import router from "@/router";

interface User {
  id: number;
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(email: string, password: string) {
      const res = await api.post("/login", { email, password });
      this.user = res.data.user;
      this.token = res.data.token;
      localStorage.setItem("token", this.token);
      setToken(this.token);
      router.push("/dashboard");
    },

    async fetchUser() {
      if (!this.token) return;
      setToken(this.token);
      const res = await api.get("/me");
      this.user = res.data.user;
    },

    async logout() {
      if (this.token) {
        await api.post("/logout").catch(() => {});
      }
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      setToken(null);
      router.push("/login");
    },
  },
});
