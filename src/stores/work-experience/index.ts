import { reactive } from "vue";
import { defineStore } from "pinia";
import { moveOneStep } from "@/utils";

let uniqueId = 0;

function createItem() {
  return {
    id: uniqueId++,
    first: "",
    second: "",
    startTime: "",
    finishTime: "",
    isHitherto: false,
    editorContent: "",
  };
}

export const useWorkExperienceStore = defineStore("work-experience", () => {
  const experiences = reactive([createItem()]);

  function moveUpItem(index: number) {
    moveOneStep(index, -1, experiences);
  }
  function moveDownItem(index: number) {
    moveOneStep(index, 1, experiences);
  }
  function deleteItem(index: number) {
    experiences.splice(index, 1);
  }
  function addNewItem() {
    experiences.push(createItem());
  }
  return {
    deleteItem,
    addNewItem,
    moveUpItem,
    moveDownItem,
    experiences,
  };
});
