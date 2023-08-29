import { shallowRef } from "vue";
import { defineStore } from "pinia";
import { Delta } from "@vueup/vue-quill";
export const useSelfEvaluationStore = defineStore("self-evaluation", () => {
  const editorContent = shallowRef(new Delta());
  return {
    editorContent,
  };
});
