import { ref } from "vue";
import { defineStore } from "pinia";
import { Delta } from "@vueup/vue-quill";

export const customModuleDefault = {
  get editorContent() {
    return new Delta();
  },
};

export const useCustomModuleStore = defineStore(
  "custom-module",
  () => {
    const editorContent = ref(customModuleDefault.editorContent);
    return {
      editorContent,
    };
  },
  {
    persistedState: {
      deserialize(jsonData) {
        const state = JSON.parse(jsonData);
        state.editorContent = new Delta(state.editorContent);
        return state;
      },
    },
  },
);
