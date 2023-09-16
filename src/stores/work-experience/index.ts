import { ref, unref } from "vue";
import { defineStore } from "pinia";
import { moveOneStep, AModuleStoreHandler } from "@/utils";

const { createAModuleData, persistedState } = new AModuleStoreHandler();

export const useWorkExperienceStore = defineStore(
  "work-experience",
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
      dataList,
      deleteItem,
      addNewItem,
      moveUpItem,
      moveDownItem,
    };
  },
  {
    persistedState,
  }
);
