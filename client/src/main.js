import { createApp } from 'vue'
import { createPinia } from "pinia";
import { router } from "./router/index.js";
import './style.css'
import App from './App.vue'
import { http } from "./api/http.js";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");

// createApp(App).mount('#app')

// console.log("API URL:", http.defaults.baseURL);