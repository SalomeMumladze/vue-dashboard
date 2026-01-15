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
    users: [] as User[],
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
    async register(
      name: string,
      email: string,
      password: string,
      password_confirmation: string
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
    async fetchUsers() {
      if (!this.token) return;
      setToken(this.token);

      const res = await api.get("/users");
      this.users = res.data.users;
    },
    async fetchUserById(id: number) {
      if (!this.token) return;
      setToken(this.token);

      const res = await api.get(`/users/${id}`);

      console.log("Fetched user:", res.data.user);
      return res.data.user;
    },
  },
});
