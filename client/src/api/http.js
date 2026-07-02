import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export const http = axios.create({ baseURL });

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.request.use(
    (response) => response,
    async (error) => {
        const original = error.config;
        const refreshToken = localStorage.getItem("refreshToken");

        if (
            error.response?.status === 401 &&
            !original._retry &&
            refreshToken &&
            !original.url.includes("/auth/")
        ) {
            original._retry = true;
            try {
                refreshing = refreshing ?? axios.post(`${baseURL}/auth/refresh`, { refreshToken });
                const { data } = await refreshing;
                refreshing = null;
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                original.headers.Authorization = `Bearer ${data.accessToken}`;
                return http(original);
            } catch (refreshError) {
                refreshing = null;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);