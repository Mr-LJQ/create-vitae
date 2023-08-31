import { reactive } from "vue";
import { defineStore } from "pinia";
import { Delta } from "@vueup/vue-quill";
import { moveOneStep } from "@/utils";

let uniqueId = 0;

function createItem() {
  return {
    id: uniqueId++,
    experience: "",
    role: "",
    startTime: "",
    finishTime: "",
    isHitherto: false,
    editorContent: new Delta(),
  };
}

export const useCampusExperienceStore = defineStore("campus-experience", () => {
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
