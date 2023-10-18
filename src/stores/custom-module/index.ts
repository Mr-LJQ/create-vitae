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
      deserialize(state) {
        const _state = JSON.parse(state);
        _state.editorContent = new Delta(_state.editorContent);
        return _state;
      },
    },
  },
);
