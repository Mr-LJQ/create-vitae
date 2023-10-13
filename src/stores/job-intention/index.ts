import { ref } from "vue";
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
    hiredate: "",
  };
}

export const useJobIntentionStore = defineStore(
  "job-intention",
  () => {
    const jobIntentions = ref([createItem()]);
    const appendJobIntention = () => {
      jobIntentions.value.push(createItem());
    };
    const deleteJobIntention = (index: number) => {
      jobIntentions.value.splice(index, 1);
    };
    return {
      jobIntentions,
      appendJobIntention,
      deleteJobIntention,
    };
  },
  {
    persistedState: {
      serialize(state) {
        return JSON.stringify(state, (key, value) => {
          if (key === "id") return; //过滤掉id
          return value;
        });
      },
      deserialize(state) {
        const _state = JSON.parse(state);
        (_state.jobIntentions as S[]).forEach((data) => {
          data.id = uniqueId++; //添加上id
        });
        return _state;
      },
    },
  },
);

export type JobIntentionStoreState = StoreState<
  ReturnType<typeof useJobIntentionStore>
>;
