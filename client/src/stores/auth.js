import { defineStore } from "pinia";
import { http } from "../api/http.js";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        accessToken: localStorage.getItem("accessToken") || null,
        refreshToken: localStorage.getItem("refreshToken") || null,
    }),
    getters: {
        isAuth: (state) => !!state.accessToken,
    },
    actions: {
        setTokens(accessToken, refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        },
        clear() {
            this.user = null;
            this.accessToken = null;
            this.refreshToken = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
        async register(payload) {
            const { data } = await http.post("/auth/register", payload);
            this.setTokens(data.accessToken, data.refreshToken);
            this.user = data.user;
        },
        async login(payload) {
            const { data } = await http.post("/auth/login", payload);
            this.setTokens(data.accessToken, data.refreshToken);
            this.user = data.user;
        },
        async fetchMe() {
            const { data } = await http.get("/me");
            this.user = data;
            return data;
        },
        async updateProfile(payload) {
            const { data } = await http.patch("/me", payload);
            this.user = data;
            return data;
        },
        async changePassword(payload) {
            await http.patch("/me/password", payload);
        },
        async logout() {
            try {
                await http.post("/auth/logout");
            } finally {
                this.clear();
            }
        },
    },
})