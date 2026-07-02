<script setup>
    import { onMounted, reactive, ref } from "vue";
    import { useAuthStore } from "../stores/auth.js";

    const auth = useAuthStore();

    const profile = reactive({name: "", birthDate: ""});

    function toInputDate(value) {
        if (!value) return "";
        return new Date(value).toISOString().slice(0, 10);
    }

    onMounted(async () => {
        const me = auth.user ?? (await auth.fetchMe());
        profile.name = me.name ?? "";
        profile.birthDate = toInputDate(me.birthDate);
    });

    const profileMsg = ref("");
    const profileErr = ref("");
    const savingProfile = ref(false);

    async function saveProfile() {
        profileMsg.value = "";
        profileErr.value = "";
        saveProfile.value = true;

        try {
            const payload = {};
            if (profile.name) payload.name = profile.name;
            if (profile.birthDate) payload.birthDate = profile.birthDate;
            await auth.updateProfile(payload);
            profileMsg.value = "Профиль обновлен";
        } catch (e) {
            profileErr.value = e.response?.data?.error ?? "Не удалось сохранить";
        } finally {
            savingProfile.value = false;
        }
    }

    const pwd = reactive({ currentPassword: "", newPassword: "" });
    const pwdMsg = ref("");
    const pwdErr = ref("");
    const savingPwd = ref(false);

    async function savePassword() {
        pwdMsg.value = "";
        pwdErr.value = "";
        savingPwd.value = false;
        try {
            await auth.changePassword({ ...pwd });
            pwdMsg.value = "Пароль изменен";
            pwd.currentPassword = "";
            pwd.newPassword = "";
        } catch (e) {
            pwdErr.value = e.response?.data?.error ?? "Не удалось изменить пароль";
        } finally {
            savingPwd.value = false;
        }
    }

</script>

<template>
    <section class="mx-auto max-w-2xl space-y-6 px-4 py-14">
        <div class="card animate-fade-up">
            <h1 class="text-3xl font-bold">Ваш профиль</h1>
            <p class="text-sm text-slate-400">{{ auth.user?.email }}</p>
        </div>

        <div class="card animate-fade-up">
            <h2 class="mb-4 text-lg font-semibold">Данные</h2>
            <form class="space-y-4" @submit.prevent="saveProfile">
                <div>
                    <label class="label">Имя</label>
                    <input type="text" class="input" v-model="profile.name">
                </div>
                <div>
                    <label class="label">Дата рождения</label>
                    <input type="date" class="input" v-model="profile.birthDate">
                </div>
                <p v-if="profileMsg" class="text-sm text-emerald-400"> {{ profileMsg }} </p>
                <p v-if="profileErr" class="text-sm text-red-400"> {{ profileErr }} </p>
                <button class="btn-primary w-full" :disabled="savingProfile">
                    {{ savingProfile? "Сохраняем" : "Сохранить изменения" }}
                </button>
            </form>
        </div>

        <div class="card animate-fade-up">
            <h2 class="mb-4 text-lg font-semibold">Смена пароля</h2>
            <form class="space-y-4" @submit.prevent="savePassword">
                <div>
                    <label class="label">Текущий пароль</label>
                    <input type="password" class="input" required v-model="pwd.currentPassword">
                </div>
                <div>
                    <label class="label">Новый пароль</label>
                    <input type="password" class="input" required v-model="pwd.newPassword">
                </div>
                <button class="btn-primary w-full" :disabled="savingPwd">
                    {{ savingPwd ? "Обновляем" : "Обновить пароль" }}
                </button>
            </form>
        </div>
    </section>
</template>