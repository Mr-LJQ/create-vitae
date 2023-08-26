import { defineStore } from "pinia";
import { ref } from "vue";

export const useSelfEvaluationStore = defineStore("self-evaluation", () => {
  const selfEvaluation = ref("");
  return {
    selfEvaluation,
  };
});
