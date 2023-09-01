import { reactive } from "vue";
import { defineStore } from "pinia";

interface State {
  id: number;
  post: string;
  city: string;
  hiredate: string;
  pay: string;
}

let uniqueId = 0;
function createItem(): State {
  return {
    id: uniqueId++,
    city: "",
    post: "",
    hiredate: "",
    pay: "",
  };
}

export const useJobIntentionStore = defineStore("job-intention", () => {
  const jobIntentions: State[] = reactive([createItem()]);
  const appendJobIntention = () => {
    jobIntentions.push(createItem());
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
