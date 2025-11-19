import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import AnalyticsPage from "../pages/AnalyticsPage.vue";
import ReportsPage from "../pages/ReportsPage.vue";
// import SettingsPage from "../pages/SettingsPage.vue";
// import NotFound from "../pages/NotFound.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
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
  //   { path: "/settings", component: SettingsPage, meta: { requiresAuth: true } },
  //   { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
