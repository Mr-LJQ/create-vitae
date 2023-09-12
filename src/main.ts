import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";
import localforage from "localforage";
import App from "./App.vue";
import "normalize.css";
import "./index.css";
import "@/styles/index.scss";
const pinia = createPinia();
pinia.use(
  createPersistedStatePlugin({
    storage: {
      getItem: localforage.getItem.bind(localforage),
      setItem: localforage.setItem.bind(localforage),
      removeItem: localforage.removeItem.bind(localforage),
    },
  })
);
const app = createApp(App);
app.use(pinia);
app.mount("#app");
