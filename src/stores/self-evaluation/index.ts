import { ref } from "vue";
import { defineStore } from "pinia";
import { Delta } from "@vueup/vue-quill";
export const useSelfEvaluationStore = defineStore(
  "self-evaluation",
  () => {
    const editorContent = ref(new Delta());
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
