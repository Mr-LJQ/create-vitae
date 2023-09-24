import { createApp } from "vue";
import { createPinia } from "pinia";
import localforage from "localforage";
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";

import App from "./App.vue";

import "./index.css";
import "@/styles/index.scss";

const pinia = createPinia();
const persist = createPersistedStatePlugin({
  storage: {
    getItem: localforage.getItem.bind(localforage),
    setItem: localforage.setItem.bind(localforage),
    removeItem: localforage.removeItem.bind(localforage),
  },
});
pinia.use(persist);
const app = createApp(App);
app.use(pinia);
app.mount("#app");
