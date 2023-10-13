<template>
  <TransitionGroup
    :moveClass="moveClassRef ? TRANSITION_DELETE : ''"
    tag="ul"
    :name="TRANSITION_LIST_SLIDE"
    class="max-w-[75rem] mx-auto"
  >
    <li
      :key="item.id"
      :class="[BORDER_B_DASHED, 'mb-3']"
      v-for="(item, index) of dataList"
    >
      <MoveModule
        :firstItem="firstItem"
        :secondItem="secondItem"
        :thirdItem="thirdItem"
        :placeholder="placeholder"
        :defaultTimeValue="defaultTimeValue"
        v-model:content="item.editorContent"
        v-model:firstInput="item.first"
        v-model:secondInput="item.second"
        v-model:time-range="item.timeRange"
        v-model:isHitherto="item.isHitherto"
        :showDeleteButton="isMultiple"
        :showMoveDownButton="isShowMoveDownButton(index)"
        :showMoveUpButton="isShowMoveUpButton(index)"
        @handle_delete="handleDelete(index)"
        @handle_move_up="handleMoveUp(index)"
        @handle_move_down="handleMoveDown(index)"
      >
        <slot :index="index" />
      </MoveModule>
    </li>
    <li key="addButton">
      <AddButton @click="handleAdd">{{ moduleName }}</AddButton>
    </li>
  </TransitionGroup>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  BORDER_B_DASHED,
  TRANSITION_DELETE,
  TRANSITION_LIST_SLIDE,
} from "@/styles";
import { MoveModule, AddButton } from "@/components";
import { propsType } from ".";
const props = defineProps(propsType);
defineOptions({
  name: "AModule",
});
const { deleteItem, moveDownItem, moveUpItem } = props;
/*
 * 用于判断相关按钮是否显示
 */
const isMultiple = computed(() => {
  return props.dataList.length > 1;
});
function isShowMoveUpButton(index: number) {
  return index > 0;
}
function isShowMoveDownButton(index: number) {
  return index < props.dataList.length - 1;
}

/*
 * 为了实现 删除 操作与 上下移动 操纵之间过渡动画的区别，因此需要在不同的操作时，使用不同的 moveClass
 */
const moveClassRef = ref(false);
function handleDelete(index: number) {
  moveClassRef.value = true;
  deleteItem(index);
}
function handleMoveUp(index: number) {
  moveClassRef.value = false;
  moveUpItem(index);
}
function handleMoveDown(index: number) {
  moveClassRef.value = false;
  moveDownItem(index);
}
function handleAdd() {
  moveClassRef.value = false;
  props.addNewItem();
}
</script>
