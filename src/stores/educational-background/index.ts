import { reactive } from "vue";
import { defineStore } from "pinia";

let uniqueId = 0;

function createState() {
  return {
    id: uniqueId++,
    major: "",
    degree: "不填",
    isHitherto: false,
    schoolName: "",
    startSchool: "",
    finishSchool: "",
  };
}

export const useEducationalBackgroundStore = defineStore(
  "educational-background",
  () => {
    const educationalBackgrounds = reactive([createState()]);
    function addNewState() {
      educationalBackgrounds.push(createState());
    }
    function deleteState(index: number) {
      educationalBackgrounds.splice(index, 1);
    }
    function moveState(index: number, to: -1 | 1) {
      let targetIndex = index + to;
      if (targetIndex < 0) return;
      if (targetIndex >= educationalBackgrounds.length) return;
      let temp = educationalBackgrounds[targetIndex];
      educationalBackgrounds[targetIndex] = educationalBackgrounds[index];
      educationalBackgrounds[index] = temp;
    }
    function moveUpState(index: number) {
      moveState(index, -1);
    }
    function moveDownState(index: number) {
      moveState(index, 1);
    }
    return {
      addNewState,
      deleteState,
      moveUpState,
      moveDownState,
      educationalBackgrounds,
    };
  }
);
