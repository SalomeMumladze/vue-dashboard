import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import DashboardPage from "@/pages/DashboardPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import ReportsPage from "@/pages/ReportsPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import NotFound from "@/pages/NotFound.vue";

import { useAuthStore } from "@/store/user";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  { path: "/login", component: LoginPage },
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
