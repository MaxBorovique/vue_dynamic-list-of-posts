import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Dashboard",
      path: "/dashboard",
      component: HomePage,
    },
    {
      name: "Login",
      path: "/login",
      component: LoginPage,
    },
  ],
});
