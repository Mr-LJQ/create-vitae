import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "normalize.css";
import "@/styles/index.scss";
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.mount("#app");
