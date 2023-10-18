import { ref } from "vue";
import { defineStore } from "pinia";
import { Delta } from "@vueup/vue-quill";

export const selfEvaluationDefault = {
  get editorContent() {
    return new Delta();
  },
};

export const useSelfEvaluationStore = defineStore(
  "self-evaluation",
  () => {
    const editorContent = ref(selfEvaluationDefault.editorContent);
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
