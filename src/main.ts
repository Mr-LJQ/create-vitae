import { createApp, toRefs } from "vue";
import { createPinia } from "pinia";
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";
import localforage from "localforage";
import App from "./App.vue";
import "normalize.css";
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
/**
 * 将 store 与 store.$state 关联起来，
 * 这是因为用 store.$patch() 更新状态时，更新的是 store.$state，
 * 此时如果用户在创建 state 的时候使用的是 reactive 而非 ref,
 * 则会导致 store 不能够同步到 store.$state 的更新，进而导致相关UI没发生改变
 * 相关文章：https://juejin.cn/post/7278931167519801381
 */
pinia.use(({ store }) => {
  Object.entries(toRefs(store.$state)).forEach(([key, ref]) => {
    store[key] = ref;
  });
});
console.log(pinia)
pinia.use(persist);
const app = createApp(App);
app.use(pinia);
app.mount("#app");
