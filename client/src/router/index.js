import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import Landing from "../views/Landing.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";

const routes = [
    { path: "/", name: "landing", component: Landing },
    { path: "/login", name: "login", component: Login, meta: { guestOnly: true } },
    { path: "/register", name: "register", component: Register, meta: { guestOnly: true } },
    { path: "/profile", name: "profile", component: Profile, meta: { requiresAuth: true } },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) return { el: to.hash, behavior: "smooth", top: 80 };
        return { top: 0 };
    },
});

router.beforeEach((to) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.isAuth) return { name: "login" };
    if (to.meta.guestOnly && auth.isAuth) return { name: "profile" };
    return true;
});