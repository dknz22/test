<script setup>

import { onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import { useAuthStore } from "./stores/auth.js";

const auth = useAuthStore();

onMounted(async () => {
    if (auth.isAuth) {
        try { await auth.fetchMe(); } catch { auth.clear(); }
    }
});
</script>

<template>

    <div class="min-h-screen bg-ink-900 text-slate-100">
        <Navbar />
        <main> <RouterView /> </main>
    </div>

</template>