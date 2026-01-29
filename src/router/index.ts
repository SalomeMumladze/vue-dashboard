import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginPage from "@/views/AuthPage/LoginPage.vue";
import DashboardPage from "@/views/DashboardPage";
import AnalyticsPage from "@/views/AnalyticsPage";
import ReportsPage from "@/views/ReportsPage.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import NotFound from "@/views/NotFound.vue";
import RegisterPage from "@/views/AuthPage/RegisterPage.vue";
import ResetPassword from "@/views/AuthPage/ResetPassword.vue";
import { useAuthStore } from "@/store/auth/auth.store";
import OAuthCallback from "@/views/AuthPage/OAuthCallback.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  { path: "/oauth-callback", component: OAuthCallback },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/reset", component: ResetPassword },
  {
    path: "/dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/analytics",
    component: AnalyticsPage,
    meta: { requiresAuth: true },
  },
  { path: "/reports", component: ReportsPage, meta: { requiresAuth: true } },
  { path: "/settings", component: SettingsPage, meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", redirect: "/dashboard" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.token) {
    next("/login");
  } else if (to.path === "/login" && auth.token) {
    next("/dashboard");
  } else {
    next();
  }
});
export default router;
