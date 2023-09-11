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
import { swap } from "@/utils";
import JobIntentionUnit from "./job-intention-unit/index.vue";
import {
  TRANSITION_LIST_SLIDE,
  TRANSITION_BUTTONS_SLIDE,
  TRANSITION_DELETE,
} from "@/styles";
import { propsType } from ".";

import type { AnyFunction } from "@/types";
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
let sign = 0;
let prevTime = 0;
function throttle(callback: AnyFunction, wait: number, i: number, j: number) {
  /**
   * 拖动的时候因为会触发过渡动画，而过渡动画会导致元素移动，而元素移动会导致 dragenter 被触发，
   *  进而导致一种“鬼畜”的动画效果，那是因为 dragenter 改变数据，数据改变UI,UI动画再次触发 dragenter，
   *  这形成了某种递归，所以动画效果频繁触发，形成“鬼畜”的动画效果。
   * 此处的解决方案是，通过 currentIndex 与 index 生成唯一的 sign,当两次dragenter间的 sign 相同时，
   *  这进行节流，节流的频率就是动画所需要的持续时间，这样就避免了动画过程中触发 dragenter 所导致的递归
   *  另一方面，当 sign 不同的时候，无需进行节流。节流的目的是阻止递归，避免“鬼畜”动画的出现。
   */

  //sign 的计算方法意味着 任意两个整数 i,j,无论他们的位置如何互换，它们计算出来的 sign 总是唯一的
  //这里实际上存在一个隐性BUG,当 i,j 大于 1 << 16 时，不能够继续保证唯一性，
  //  但是该BUG基本上是不可能触发的，因为触发该BUG意味着用户要在列表中生成 65536 项，
  //  而这么多项本身就是一种错误用法
  let _sign = Math.max(i, j) + (Math.min(i, j) << 16);
  if (_sign !== sign) {
    prevTime = 0;//使得 callback 能够马上被调用
    sign = _sign;
  }
  let currTime = Date.now();
  if (currTime - prevTime >= wait) {
    prevTime = currTime;
    callback();
  }
}
function dragstart(index: number) {
  currentIndex = index;
}
function dragenter(index: number) {
  throttle(
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
