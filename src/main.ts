import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "normalize.css";
import "@/styles/index.scss";
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.mount("#app");


/* import { createApp } from "vue";
import RichTextEditor from "@/components/rich-text-editor/RichTextEditor.vue";
import "normalize.css";
import "@/styles/index.scss";
const app = createApp(RichTextEditor);
app.mount("#app"); */
