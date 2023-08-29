import { shallowRef } from "vue";
import { defineStore } from "pinia";
import { Delta } from "@vueup/vue-quill";

export const useCustomModuleStore = defineStore("custom-module", () => {
  const editorContent = shallowRef(new Delta());
  return {
    editorContent,
  };
});
