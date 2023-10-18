import { ref, unref } from "vue";
import { defineStore } from "pinia";
import { moveOneStep, AModuleStoreHandler } from "@/utils";
import type { StoreState } from "pinia";

const { createAModuleData, persistedState } = new AModuleStoreHandler("");

export const educationalBackgroundDefault = {
  get dataList() {
    return [createAModuleData()];
  },
};

export const useEducationalBackgroundStore = defineStore(
  "educational-background",
  () => {
    const dataList = ref(educationalBackgroundDefault.dataList);

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
      dataList,
      deleteItem,
      addNewItem,
      moveUpItem,
      moveDownItem,
    };
  },
  { persistedState },
);

export type EducationalBackgroundStoreState = StoreState<
  ReturnType<typeof useEducationalBackgroundStore>
>;
