import { defineStore } from "pinia";
import { ref } from "vue";

export const useCustomModuleStore = defineStore("custom-module", () => {
  const editorContent = ref("");
  return {
    editorContent,
  };
});
