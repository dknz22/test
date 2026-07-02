<script setup>
    import { reactive, ref } from "vue";
    import { useRouter } from "vue-router";
    import { useAuthStore } from "../stores/auth.js";

    const auth = useAuthStore();
    const router = useRouter();

    const form = reactive({name: "", email: "", password: ""});
    const error = ref("");
    const loading = ref(false);

    async function submit() {
        error.value = "";
        if (form.password.length < 6) {
            error.value = "Пароль должен быть более 6 символов";
            return;
        }
        loading.value = true;
        try {
            await auth.register({ name: form.name || undefined, email: form.email, password: form.password });
            router.push({name: "profile"});
        } catch (e) {
            error.value = e.response?.data?.error ?? "Не удалось зарегистрироваться";
        } finally {
            loading.value = false;
        }
    }

</script>

<template>
    <section class="mx-auto max-w-md px-4 py-20">
        <div class="card animate-fade-up">
            <h1 class="mb-1 text-2xl font-bold">Создать аккаунт</h1>
            <p class="mb-6 text-sm text-slate-400">Регистрация займет час</p>

            <form class="space-y-4" @submit.prevent="submit">
                <div>
                    <label class="label">Имя</label>
                    <input type="text" class="input" placeholder="как хочешь" v-model="form.name">
                </div>

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
                    {{ loading ? "Создаем" : "Зарегистрироваться"}}
                </button>
            </form>

            <p class="mt-4 text-center text-sm text-slate-400">
                Уже есть аккаунт? <RouterLink to="/login" class="font-medium text-brand-400 hover:text-brand-300"> Войти </RouterLink>
            </p>
        </div>
    </section>
</template>