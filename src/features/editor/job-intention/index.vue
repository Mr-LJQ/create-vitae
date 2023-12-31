<template>
  <TransitionGroup
    tag="ul"
    :move-class="moveClassRef ? TRANSITION_DELETE : ''"
    :name="TRANSITION_LIST_SLIDE"
    class="max-w-[75rem] mx-auto"
  >
    <li
      draggable="true"
      @dragstart="dragstart(index)"
      @dragenter="dragenter(index)"
      :key="item.id"
      class="relative w-full mb-3 cursor-grab"
      :class="$style.bottomLine"
      v-for="(item, index) of store.jobIntentions"
    >
      <JobIntentionUnit
        v-model:pay="item.pay"
        v-model:city="item.city"
        v-model:post="item.post"
        v-model:hiredate="item.hiredate"
      />
      <Transition :name="TRANSITION_BUTTONS_SLIDE">
        <el-button
          circle
          type="danger"
          :icon="Delete"
          class="absolute top-0 right-2"
          v-if="store.jobIntentions.length > 1"
          @click="handleDelete(index)"
        />
      </Transition>
    </li>
    <li key="addButton">
      <AddButton @click="handleAdd">求职意向</AddButton>
    </li>
  </TransitionGroup>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElButton } from "element-plus";
import { Delete } from "@element-plus/icons-vue";

import { AddButton } from "@/components";
import { useJobIntentionStore } from "@/stores";
import { swap, createDragThrottle } from "@/utils";
import JobIntentionUnit from "./job-intention-unit/index.vue";
import {
  TRANSITION_LIST_SLIDE,
  TRANSITION_BUTTONS_SLIDE,
  TRANSITION_DELETE,
} from "@/styles";
import { propsType } from ".";

defineProps(propsType);
defineOptions({
  name: "JobIntention",
});
const store = useJobIntentionStore();
const { appendJobIntention, deleteJobIntention } = store;

/**
 * 删除与添加应用不同的动画
 */
const moveClassRef = ref(false);
function handleDelete(index: number) {
  moveClassRef.value = true;
  deleteJobIntention(index);
}
function handleAdd() {
  moveClassRef.value = false;
  appendJobIntention();
}

/**
 * 拖动逻辑
 */
let currentIndex: number = null!;
const dragThrottle = createDragThrottle();
function dragstart(index: number) {
  currentIndex = index;
}
function dragenter(index: number) {
  if (currentIndex === index) return;
  dragThrottle(
    () => {
      swap(index, currentIndex, store.jobIntentions);
      currentIndex = index;
    },
    300,
    index,
    currentIndex,
  );
}
</script>

<style module>
.bottomLine {
  border-bottom: 1px dashed #ddd;
}
</style>
