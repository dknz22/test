<script setup>
    import { reactive, ref } from "vue";
    import { useRouter } from "vue-router";
    import { useAuthStore } from "../stores/auth.js";

    const auth = useAuthStore();
    const router = useRouter();

    const form = reactive({email: "", password: ""});
    const error = ref("");
    const loading = ref(false);

    async function submit() {
        error.value = "";
        loading.value = true;
        try {
            await auth.login({ email: form.email, password: form.password });
            router.push({name: "profile"});
        } catch (e) {
            error.value = e.response?.data?.error ?? "Не удалось войти";
        } finally {
            loading.value = false;
        }
    }

</script>

<template>
    <section class="mx-auto max-w-md px-4 py-20">
        <div class="card animate-fade-up">
            <h1 class="mb-1 text-2xl font-bold">С возвращением</h1>
            <p class="mb-6 text-sm text-slate-400">Войдите в свой аккаунт</p>

            <form class="space-y-4" @submit.prevent="submit">
                <div>
                    <label class="label">Email</label>
                    <input type="email" class="input" required v-model="form.email">
                </div>

                <div>
                    <label class="label">Пароль</label>
                    <input type="password" class="input" required v-model="form.password">
                </div>
                <p v-if="error" class="text-sm text-red-400">{{ error }}</p>
                <button class="btn-primary w-full" :disabled="loading">
                    {{ loading ? "Входим..." : "Войти"}}
                </button>
            </form>

            <p class="mt-4 text-center text-sm text-slate-400">
                Нет аккаунта? <RouterLink to="/register" class="font-medium text-brand-400 hover:text-brand-300"> Зарегистрироваться </RouterLink>
            </p>
        </div>
    </section>
</template>