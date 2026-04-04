import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

const routes = [
    {
        path: "/",
        name: "contactbook",
        component: ContactBook,
        meta: { requiresAuth: true },
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: () => import("@/views/ContactEdit.vue"),
        props: true,
        meta: { requiresAuth: true },
    },
    {
        path: "/contacts/",
        name: "contact.add",
        component: () => import("@/views/ContactAdd.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// ✅ FIX FULL GUARD
router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem("user"));

    // ❌ chưa login mà vào trang cần auth
    if (to.meta.requiresAuth && !user) {
        return next({ name: "login" });
    }

    // ❌ đã login mà vẫn vào login/register
    if ((to.name === "login" || to.name === "register") && user) {
        return next({ name: "contactbook" });
    }

    // ✅ bình thường
    next();
});

export default router;