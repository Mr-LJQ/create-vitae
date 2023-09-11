<template>
  <TransitionGroup
    tag="ul"
    :move-class="moveClassRef ? TRANSITION_DELETE : ''"
    :name="TRANSITION_LIST_SLIDE"
    class="max-w-[1200px] mx-auto"
  >
    <li
      draggable="true"
      @dragstart="dragstart(index)"
      @dragenter="dragenter(index)"
      :key="item.id"
      class="w-full"
      :class="$style.a"
      v-for="(item, index) of jobIntentions"
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
          :class="$style.b"
          v-if="jobIntentions.length > 1"
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

import AddButton from "@/components/buttons/AddButton.vue";
import { useJobIntentionStore } from "@/stores/job-intention";
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
const { jobIntentions, appendJobIntention, deleteJobIntention } =
  useJobIntentionStore();

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
  dragThrottle(
    () => {
      swap(index, currentIndex, jobIntentions);
      currentIndex = index;
    },
    300,
    index,
    currentIndex
  );
}
</script>

<style module>
.a {
  position: relative;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
  cursor: grab;
}
.b {
  position: absolute;
  top: 0;
  right: 10px;
}
</style>
