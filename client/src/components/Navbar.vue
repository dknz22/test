<script setup>
    import { useRoute, useRouter } from "vue-router";
    import { useAuthStore } from "../stores/auth.js";

    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const sections = [
        { label: "Главная", "id": "hero" },
        { label: "Обо мне", "id": "about" },
        { label: "Проекты", "id": "projects" },    
    ]

    function goSection(id) {
        if (route.name !== "landing") router.push({ name: "landing", hash: `#${id}`});
        else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    async function handleLogout() {
        await auth.logout();
        router.push({ name: "landing" });
    }
</script>

<template>
    <header class="sticky top-0 z-20 border-b border-white/5 bg-ink-900/80 backdrop-blur-xl">
        <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <RouterLink to="/" class="text-lg font-bold tracking-tight">
                Test <span class="accent-dot">.</span>
            </RouterLink>

            <div class="hidden items-center gap-7 text-sm text-slate-400 md:flex">
                <button v-for="s in sections" :key="s.id" class="transition hover:text-white" @click="goSection(s.id)">
                    {{ s.label }}
                </button>
            </div>

            <div>
                <template v-if="auth.isAuth">
                    <RouterLink to="/profile" class="btn-ghost">Профиль</RouterLink>
                    <button class="btn-primary" @click="handleLogout">Выход</button>
                </template>

                <template v-else>
                    <RouterLink to="/login" class="btn-ghost">Войти</RouterLink>
                    <RouterLink to="/register" class="btn-primary">Регистрация</RouterLink>
                </template>                
            </div>
        </nav>
    </header>
</template>