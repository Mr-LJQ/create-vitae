import { reactive, markRaw } from "vue";
import { defineStore } from "pinia";
import { moveOneStep } from "@/utils";
import { Delta } from "@vueup/vue-quill";
import type { AModuleData } from "@/types";

let uniqueId = 0;
function createItem(): AModuleData {
  return {
    id: uniqueId++,
    first: "",
    second: "",
    timeRange: null,
    isHitherto: false,
    editorContent: new Delta(),
  };
}

export const useWorkExperienceStore = defineStore(
  "work-experience",
  () => {
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
  },
  {
    persistedState: {
      serialize(state) {
        console.log("serialize", state);
        return JSON.stringify(state);
      },
      deserialize(state) {
        const _state = JSON.parse(state);
        _state.dataList.forEach((data) => {
          data.editorContent = new Delta(data.editorContent);
        });
        console.log("deserialize", _state);
        _state.dataList = reactive(_state.dataList);
        return _state;
      },
    },
  }
);
