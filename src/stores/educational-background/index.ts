import { ref, unref } from "vue";
import { defineStore } from "pinia";
import { moveOneStep, AModuleStoreHandler } from "@/utils";
import type { StoreState } from "pinia";

const { createAModuleData, persistedState } = new AModuleStoreHandler("");

export const useEducationalBackgroundStore = defineStore(
  "educational-background",
  () => {
    const dataList = ref([createAModuleData()]);

    function moveUpItem(index: number) {
      moveOneStep(index, -1, unref(dataList));
    }
    function moveDownItem(index: number) {
      moveOneStep(index, 1, unref(dataList));
    }
    function deleteItem(index: number) {
      unref(dataList).splice(index, 1);
    }
    function addNewItem() {
      unref(dataList).push(createAModuleData());
    }
    return {
      deleteItem,
      addNewItem,
      moveUpItem,
      moveDownItem,
      dataList,
    };
  },
  { persistedState }
);

export type State = StoreState<
  ReturnType<typeof useEducationalBackgroundStore>
>;
