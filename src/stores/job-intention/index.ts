import { reactive } from "vue";
import { defineStore } from "pinia";

interface State {
  post: string;
  city: string;
  hiredate: string;
  pay: string;
}

export const useJobIntentionStore = defineStore("job-intention", () => {
  const jobIntentions: State[] = reactive([]);
  const appendJobIntention = (options: State) => {
    jobIntentions.push(options);
  };
  return {
    jobIntentions,
    appendJobIntention,
  };
});
