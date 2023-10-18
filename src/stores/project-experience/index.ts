import { ref } from "vue";
import { defineStore } from "pinia";
import { moveOneStep, AModuleStoreHandler } from "@/utils";

const { createAModuleData, persistedState } = new AModuleStoreHandler();

export const projectExperienceDefault = {
  get dataList() {
    return [createAModuleData()];
  },
};

export const useProjectExperienceStore = defineStore(
  "project-experience",
  () => {
    const dataList = ref(projectExperienceDefault.dataList);

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
  { persistedState },
);
