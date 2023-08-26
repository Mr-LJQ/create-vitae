import { ref } from "vue";
import { defineStore } from "pinia";
import type { Delta } from "@vueup/vue-quill";

export const useCustomModuleStore = defineStore("custom-module", () => {
  const editorContent = ref<Delta>("");
  return {
    editorContent,
  };
});
