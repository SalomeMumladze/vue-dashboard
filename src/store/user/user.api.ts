import api from "@/services/axios";

export const userApi = {
  me() {
    return api.get("/me");
  },

  update(id: number, formData: FormData) {
    return api.put(`/users/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  changePassword(id: number, payload: any) {
    return api.put(`/users/${id}/password`, payload);
  },

  deleteAccount(id: number) {
    return api.delete(`/users/${id}/delete`);
  },

  deleteAvatar(id: number) {
    return api.delete(`/users/${id}/avatar/delete`);
  },
};
