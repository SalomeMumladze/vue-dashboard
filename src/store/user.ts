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
    user: null as any,
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
      const { data } = await api.get("/me");
      this.user = data;
    },
    async fetchUserById(id: number) {
      if (!this.token) return;
      setToken(this.token);

      const res = await api.get(`/users/${id}`);

      return res.data.user;
    },
    async updateUser(id: number, name: string) {
      setToken(this.token);

      const res = await api.put(`/users/${id}`, {
        name,
      });

      this.user = res.data.user;
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
  },
});
