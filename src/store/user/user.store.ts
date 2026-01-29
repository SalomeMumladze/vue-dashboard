import { defineStore } from "pinia";
import { userApi } from "./user.api";
import type { User } from "./user.types";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    async fetchUser() {
      const { data } = await userApi.me();
      this.user = data;
    },

    async updateUser(id: number, name: string, avatarFile?: File) {
      const formData = new FormData();
      formData.append("name", name);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const { data } = await userApi.update(id, formData);
      this.user = data.user;
    },

    async changePassword(id: number, payload: any) {
      await userApi.changePassword(id, payload);
    },

    async deleteAccount(id: number) {
      await userApi.deleteAccount(id);
      this.user = null;
    },

    async deleteAvatar(id: number) {
      const { data } = await userApi.deleteAvatar(id);
      this.user = data.user;
    },
  },
});
