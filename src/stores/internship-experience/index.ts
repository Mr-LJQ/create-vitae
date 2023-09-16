import { ref } from "vue";
import { defineStore } from "pinia";
import { moveOneStep, AModuleStoreHandler } from "@/utils";
const { createAModuleData, persistedState } = new AModuleStoreHandler();

export const useInternshipExperienceStore = defineStore(
  "internship-experience",
  () => {
    const dataList = ref([createAModuleData()]);

    function moveUpItem(index: number) {
      moveOneStep(index, -1, dataList.value);
    }
    function moveDownItem(index: number) {
      moveOneStep(index, 1, dataList.value);
    }
    function deleteItem(index: number) {
      dataList.value.splice(index, 1);
    }
    function addNewItem() {
      dataList.value.push(createAModuleData());
    }
    return {
      dataList,
      deleteItem,
      addNewItem,
      moveUpItem,
      moveDownItem,
    };
  },
  { persistedState }
);
