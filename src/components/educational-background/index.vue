<template>
  <ul>
    <li :key="unit.id" v-for="(unit, index) of educationalBackgrounds">
      <EducationalBackgroundUnit
        v-model:degree="unit.degree"
        v-model:finish-school="unit.finishSchool"
        v-model:start-school="unit.startSchool"
        v-model:major="unit.major"
        v-model:isHitherto="unit.isHitherto"
        v-model:schoolName="unit.schoolName"
        :show-delete-button="isMultiple"
        :show-move-up-button="isShowMoveUpButton(index)"
        :show-move-down-button="isShowMoveDownButton(index)"
        @delete_event="deleteState(index)"
        @move_up_event="moveUpState(index)"
        @move_down_event="moveDownState(index)"
      />
    </li>
  </ul>
  <AddButton @click="addNewState">{{ editItemName }}</AddButton>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useEducationalBackgroundStore } from "@/stores/educational-background";
import EducationalBackgroundUnit from "./unit/index.vue";
import AddButton from "@/components/buttons/AddButton.vue";
import { propsType } from ".";
defineOptions({
  name: "EducationalBackground",
});
defineProps(propsType);
const {
  addNewState,
  deleteState,
  moveUpState,
  moveDownState,
  educationalBackgrounds,
} = useEducationalBackgroundStore();

const isMultiple = computed(() => {
  return educationalBackgrounds.length > 1;
});

function isShowMoveUpButton(index: number) {
  return index > 0;
}
function isShowMoveDownButton(index: number) {
  return index < educationalBackgrounds.length - 1;
}
</script>
