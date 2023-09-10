import { reactive } from "vue";
import { defineStore } from "pinia";
import type { StoreState } from "pinia";

interface S {
  id: number;
  post: string;
  city: string;
  hiredate: string;
  pay: string;
}

let uniqueId = 0;
function createItem(): S {
  return {
    id: uniqueId++,
    pay: "",
    city: "",
    post: "",
    hiredate: "不填",
  };
}

export const useJobIntentionStore = defineStore("job-intention", () => {
  const jobIntentions: S[] = reactive([createItem()]);
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

export type State = StoreState<ReturnType<typeof useJobIntentionStore>>;
