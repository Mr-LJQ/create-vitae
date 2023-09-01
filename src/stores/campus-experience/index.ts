import { reactive } from "vue";
import { defineStore } from "pinia";
import { Delta } from "@vueup/vue-quill";
import { moveOneStep } from "@/utils";
import type { AModuleData } from "@/types";
let uniqueId = 0;

function createItem(): AModuleData {
  return {
    id: uniqueId++,
    first: "",
    second: "",
    isHitherto: false,
    timeRange: ["", ""],
    editorContent: new Delta(),
  };
}

export const useCampusExperienceStore = defineStore("campus-experience", () => {
  const dataList = reactive([createItem()]);

  function moveUpItem(index: number) {
    moveOneStep(index, -1, dataList);
  }
  function moveDownItem(index: number) {
    moveOneStep(index, 1, dataList);
  }
  function deleteItem(index: number) {
    dataList.splice(index, 1);
  }
  function addNewItem() {
    dataList.push(createItem());
  }
  return {
    dataList,
    deleteItem,
    addNewItem,
    moveUpItem,
    moveDownItem,
  };
});
