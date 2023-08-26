<template>
  <ul>
    <li :key="item.id" v-for="(item, index) of store.experiences">
      <MoveModule
        :firstItem="firstItem"
        :secondItem="secondItem"
        :thirdItem="thirdItem"
        :placeholder="placeholder"
        v-model:content="item.editorContent"
        v-model:firstInput="item.first"
        v-model:secondInput="item.second"
        v-model:startTime="item.startTime"
        v-model:finishTime="item.finishTime"
        v-model:isHitherto="item.isHitherto"
        :showDeleteButton="isMultiple"
        :showMoveDownButton="isShowMoveDownButton(index)"
        :showMoveUpButton="isShowMoveUpButton(index)"
        @handle_delete="deleteItem(index)"
        @handle_move_up="moveUpItem(index)"
        @handle_move_down="moveDownItem(index)"
      />
    </li>
  </ul>
  <AddButton @click="addNewItem">{{ moduleName }}</AddButton>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import MoveModule from "@/components/share-modules/move-module/index.vue";
import { useCampusExperienceStore } from "@/stores/campus-experience";
import AddButton from "@/components/buttons/AddButton.vue";
import { firstItem, secondItem, thirdItem, placeholder, propsType } from ".";
defineProps(propsType);
defineOptions({
  name: "campusExperience",
});
const store = useCampusExperienceStore();
const { deleteItem, addNewItem, moveUpItem, moveDownItem } = store;

const isMultiple = computed(() => {
  return store.experiences.length > 1;
});
function isShowMoveUpButton(index: number) {
  return index > 0;
}
function isShowMoveDownButton(index: number) {
  return index < store.experiences.length - 1;
}
</script>
