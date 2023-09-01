<template>
  <div :class="$style.wrapper">
    <TransitionGroup
      :moveClass="moveClassRef ? 'list-move-delete' : ''"
      tag="ul"
      name="list"
      class="max-w-[1200px] mx-auto"
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
    </TransitionGroup>
    <AddButton @click="addNewItem">{{ moduleName }}</AddButton>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { BORDER_B_DASHED } from "@/styles";
import MoveModule from "@/components/share-modules/move-module/index.vue";
import AddButton from "@/components/buttons/AddButton.vue";
import { propsType } from ".";
const props = defineProps(propsType);
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
</script>

<style module>
.wrapper {
  @apply h-[21rem] overflow-y-scroll px-5 overflow-x-hidden;
}
</style>

<style>
/*
  在执行删除操纵时，在删除动画结束后，再执行移动动画
*/
.list-move-delete {
  transition: all 0.5s 0.5s ease;
}

.list-move,/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
