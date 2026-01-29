import { defineStore } from "pinia";
import { authApi } from "./auth.api";
import { setToken } from "@/services/axios";
import router from "@/router";
import { loginWithGoogle as googleLoginHelper } from "./auth.oauth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") as string | null,
  }),

  actions: {
    async login(email: string, password: string) {
      const { data } = await authApi.login(email, password);

      this.token = data.token;
      localStorage.setItem("token", data.token);
      setToken(data.token);

      router.push("/dashboard");
    },

    async register(
      name: string,
      email: string,
      password: string,
      password_confirmation: string,
    ) {
      const { data } = await authApi.register(
        name,
        email,
        password,
        password_confirmation,
      );

      this.user = data.data.user;
      this.token = data.data.token;
      localStorage.setItem("token", this.token);
      setToken(this.token);

      router.push("/dashboard");
    },
    async resetPassword(
      email: string,
      password: string,
      password_confirmation: string,
    ) {
      const { data } = await authApi.resetPassword({
        email,
        password,
        password_confirmation,
      });
      return data;
    },

    logout() {
      this.token = null;
      localStorage.removeItem("token");
      setToken(null);
      router.push("/login");
    },

    async loginWithGoogle() {
      return googleLoginHelper().then(() => {
        this.token = localStorage.getItem("token");
      });
    },
  },
});
