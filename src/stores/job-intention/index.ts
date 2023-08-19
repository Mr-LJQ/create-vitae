import { reactive } from "vue";
import { defineStore } from "pinia";

interface State {
  post: string;
  city: string;
  hiredate: string;
  pay: string;
}

export const useJobIntentionStore = defineStore("job-intention", () => {
  const jobIntentions: State[] = reactive([
    {
      city: "",
      post: "",
      hiredate: "",
      pay: "",
    },
  ]);
  const appendJobIntention = (options: State) => {
    jobIntentions.push(options);
  };
  const deleteJobIntention = (index: number) => {
    jobIntentions.splice(index, 1);
  };
  return {
    jobIntentions,
    appendJobIntention,
    deleteJobIntention,
  };
});
