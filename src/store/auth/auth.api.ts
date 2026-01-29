import api from "@/services/axios";

export const authApi = {
  login(email: string, password: string) {
    return api.post("/login", { email, password });
  },

  register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) {
    return api.post("/register", {
      name,
      email,
      password,
      password_confirmation,
    });
  },
  resetPassword(payload: {
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    return api.post("/reset-password", payload);
  },
};
