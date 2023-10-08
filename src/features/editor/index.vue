<template>
  <div
    class="text-sm fixed left-0 bottom-0 z-10 w-full transition-all duration-300"
    :class="[$style.shadow, isSpread ? $style.spread : $style.shrink]"
  >
    <button
      class="absolute left-1/2 -top-9 z-[1] hover:-top-10 focus-visible:outline-[#13ce66] outline-none w-20 h-20 pb-8 -ml-10 border-none rounded-full bg-white cursor-pointer transition-[transform,top] duration-300"
      :class="$style.shadow"
      @click="toggleShrinkOrSpread"
    >
      <ElIcon v-if="!isSpread" color="#13ce66" size="2.25rem"
        ><ArrowUp
      /></ElIcon>
      <ElIcon v-else color="#13ce66" size="2.25rem"><ArrowDown /></ElIcon>
    </button>
    <TabGroup
      as="div"
      v-model="selectedIndex"
      @change="selectedIndexChange"
      class="relative z-[2] bg-white"
    >
      <TabList
        ref="tabListRef"
        class="relative box-border pl-6 max-w-[75rem] mx-auto"
      >
        <div class="flex relative" ref="tabListNavRef" :style="tabListNavStyle">
          <TransitionGroup
            :move-class="stopTransition ? void 0 : $style.transition"
          >
            <Tab
              :key="ModuleEnum.BasicInfos"
              class="shrink-0"
              :class="[
                $style.tabLabel,
                selectedIndex === 0 && !transitionRunning ? 'active' : '',
              ]"
            >
              <b :class="$style.tabLabelText">{{
                moduleNameMap[ModuleEnum.BasicInfos]
              }}</b>
            </Tab>
            <Tab
              :key="name"
              v-slot="{ selected }"
              title="可通过拖拽调整位置"
              @mousemove="swapPosition(index)"
              @mouseenter="swapPosition(index)"
              @mousedown="mousedown($event, index)"
              :disabled="!openedModules[name]"
              class="group shrink-0"
              :class="[
                $style.tabLabel,
                selectedIndex - 1 === index && !transitionRunning
                  ? 'active'
                  : '',
              ]"
              v-for="(name, index) of modulesOrder"
            >
              <b :class="$style.tabLabelText">{{ moduleNameMap[name] }}</b>
              <EditSwitch
                :tabindex="selected ? 0 : -1"
                :title="
                  openedModules[name] ? '点击后隐藏模块' : '点击后显示模块'
                "
                :selected="selected"
                v-model="openedModules[name]"
                :alt="`${moduleNameMap[name]}开关`"
                class="absolute left-1/2 top-1 -translate-x-1/2"
              />
              <ElIcon
                title="修改模块名称"
                class="group-hover:flex hidden absolute right-0 bottom-1 p-0.5"
                color="#13ce66"
                size="1.25rem"
                @click.prevent=""
                ><Edit
              /></ElIcon>
            </Tab>
          </TransitionGroup>
          <!-- 这是表示 tab 选中状态的底部条状样式 -->
          <span
            ref="bottomLineRef"
            @transitionend="transitionEnd"
            :class="[
              $style.selectedLine,
              transitionRunning ? 'visible' : 'invisible',
            ]"
          ></span>
        </div>
        <!-- 空间不够时，用于左右移动 TabList -->
        <span
          @click="moveLeft"
          @mouseleave="smoothLeftEnd"
          @mouseenter="smoothLeftStart"
          ref="leftButtonRef"
          v-if="visibleMoveButton"
          class="flex items-center absolute inset-y-0 left-0 bg-white cursor-pointer"
        >
          <ElIcon size="1.5rem"><ArrowLeft /></ElIcon>
        </span>
        <span
          @click="moveRight"
          @mouseleave="smoothRightEnd"
          @mouseenter="smoothRightStart"
          ref="rightButtonRef"
          v-if="visibleMoveButton"
          class="flex items-center absolute inset-y-0 right-0 bg-white cursor-pointer"
        >
          <ElIcon size="1.5rem"><ArrowRight /></ElIcon>
        </span>
      </TabList>
      <TabPanels lazy :as="ElScrollbar" class="h-[21rem] pt-2">
        <TabPanel as="template"><BasicInfo /></TabPanel>
        <TabPanel :key="name" v-for="name of modulesOrder"
          ><component
            :is="componentMap[name]"
            :module-name="moduleNameMap[name]"
        /></TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
<script lang="ts" setup>
import {
  ref,
  onMounted,
  computed,
  nextTick,
  type ComponentPublicInstance,
  watch,
} from "vue";
import { useResizeObserver } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { ElIcon, ElScrollbar } from "element-plus";
import {
  Edit,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "@element-plus/icons-vue";

import BasicInfo from "./basic-infos/index.vue";
import Interests from "./interests/index.vue";
import Specialty from "./specialty/index.vue";
import Certificate from "./certificate/index.vue";
import JobIntention from "./job-intention/index.vue";
import CustomModule from "./custom-module/index.vue";
import SelfEvaluation from "./self-evaluation/index.vue";
import WorkExperience from "./work-experience/index.vue";
import CampusExperience from "./campus-experience/index.vue";
import ProjectExperience from "./project-experience/index.vue";
import InternshipExperience from "./internship-experience/index.vue";
import EducationalBackground from "./educational-background/index.vue";

import {
  Tab,
  TabList,
  TabPanel,
  TabGroup,
  TabPanels,
  EditSwitch,
} from "@/components";
import { dom } from "@/utils";
import { swap, createDragThrottle } from "@/utils";
import { useModulesInfosStore, ModuleEnum } from "@/stores";

defineOptions({
  name: "EditorSection",
});
const store = useModulesInfosStore();
const { moduleNameMap, modulesOrder, openedModules } = storeToRefs(store);

const componentMap = {
  [ModuleEnum.JobIntention]: JobIntention,
  [ModuleEnum.EducationalBackground]: EducationalBackground,
  [ModuleEnum.WorkExperience]: WorkExperience,
  [ModuleEnum.ProjectExperience]: ProjectExperience,
  [ModuleEnum.InternshipExperience]: InternshipExperience,
  [ModuleEnum.CampusExperience]: CampusExperience,
  [ModuleEnum.Specialty]: Specialty,
  [ModuleEnum.Certificate]: Certificate,
  [ModuleEnum.Interests]: Interests,
  [ModuleEnum.SelfEvaluation]: SelfEvaluation,
  [ModuleEnum.CustomModule]: CustomModule,
};

/**
 * 实现 Editor 的 展开与收缩的逻辑
 */
const isSpread = ref(false);
function toggleShrinkOrSpread() {
  isSpread.value = !isSpread.value;
}

/**
 * 可控 Tabs
 */
const selectedIndex = ref(0);

/**
 * 实现拖拽逻辑
 * 由于在实现 Tab 组件的时候，对 tab 的 mousedown 进行了监听，并调用了 preventDefault()
 *  因此 drag 相关事件无法生效，因此此处使用 mouse 相关事件去实现拖拽
 */
let dragging = false;
let currentIndex: number = null!;
function mousedown(event: MouseEvent, index: number) {
  const currentTarget = event.currentTarget as HTMLElement;
  if (currentTarget == null) return;
  let moveElement: HTMLElement | null = null;
  const { left, top } = currentTarget.getBoundingClientRect();
  const { clientX, clientY } = event;
  const offsetX = clientX - left;
  const offsetY = clientY - top;

  function mousemove(event: MouseEvent) {
    if (!moveElement) {
      moveElement = currentTarget.cloneNode(true) as HTMLElement;
      document.body.appendChild(moveElement);
      currentIndex = index;
      dragging = true;
      /**
       * pointer-events: none; 是必须的，否则元素会遮挡鼠标，导致mouseenter 无法触发
       *  不要使用 cssText 语法，避免意外的覆盖
       */
      moveElement.style.position = "fixed";
      moveElement.style.zIndex = "100";
      moveElement.style.opacity = ".5";
      moveElement.style.pointerEvents = "none";
    }
    const { clientX, clientY } = event;
    moveElement.style.left = `${clientX - offsetX}px`;
    moveElement.style.top = `${clientY - offsetY}px`;
  }
  function cleanup() {
    document.removeEventListener("mousemove", mousemove, { capture: true });
    document.removeEventListener("mouseup", cleanup, { capture: true });
    moveElement?.remove();
    dragging = false;
  }
  document.addEventListener("mousemove", mousemove, { capture: true });
  document.addEventListener("mouseup", cleanup, { capture: true });
}
const dragThrottle = createDragThrottle();

function swapPosition(index: number) {
  if (currentIndex === index || !dragging) return;
  dragThrottle(
    () => {
      swap(index, currentIndex, modulesOrder.value);
      currentIndex = index;
    },
    500, //与拖拽动画的时常相同
    index,
    currentIndex,
  );
}

/**
 * 当 TabList 空间不足以展示全部 Tab 时，需要提供左右移动的能力
 */

const tabListNavRef = ref<HTMLElement | null>(null);
const leftButtonRef = ref<HTMLElement | null>(null);
const rightButtonRef = ref<HTMLElement | null>(null);
const tabListRef = ref<ComponentPublicInstance | null>(null);
const offsetX = ref(0);
const stopTransition = ref(false);
const visibleMoveButton = ref(false);
const tabListNavStyle = computed(
  () => `transform:translateX(${offsetX.value}px)`,
);
const leftButtonWidth = computed(() => leftButtonRef.value?.offsetWidth || 0);
const rightButtonWidth = computed(() => rightButtonRef.value?.offsetWidth || 0);
const tabListNavWidth = computed(() => tabListNavRef.value?.scrollWidth || 0);
let tabListWidth = Number.MAX_SAFE_INTEGER;
onMounted(() => {
  tabListWidth = dom(tabListRef)?.scrollWidth || tabListWidth;
});
useResizeObserver(tabListRef, (entries) => {
  const entry = entries[0];
  let width =
    entry.borderBoxSize && entry.borderBoxSize.length > 0
      ? entry.borderBoxSize[0].inlineSize
      : dom(tabListRef)!.getBoundingClientRect().width;

  /**
   * 保证如果 TabList 的宽度发生变化，且 TabList 已经移动到最右边，
   *  此时继续拓展 TabList 的宽度的话，最右边依然能够紧贴浏览器，
   *    否则会由于 translateX 而导致出现空白
   */
  const limitWidth =
    width -
    (tabListNavWidth.value +
      leftButtonWidth.value +
      rightButtonWidth.value +
      offsetX.value);
  if (limitWidth > 0) {
    /**
     * 这次 offsetX调整无需动画，因此停止相关过渡
     */
    stopTransition.value = true;
    offsetX.value = Math.min(limitWidth + offsetX.value, 0);
    nextTick(() => {
      stopTransition.value = false;
    });
  }
  //实现当宽度不够时，显现左右移动按钮
  if (width < tabListWidth) {
    visibleMoveButton.value = true;
  } else {
    visibleMoveButton.value = false;
  }
});

//实现点击展示更多Tab
// 点击触发的移动是：尽可能的展现更多不可见的 Tab
function moveRight() {
  if (!tabListNavRef.value || !tabListRef.value) return;
  const contentWidth =
    (dom(tabListRef) as HTMLElement).clientWidth -
    leftButtonWidth.value -
    rightButtonWidth.value;

  offsetX.value += -Math.min(
    tabListNavWidth.value + offsetX.value - contentWidth,
    contentWidth,
  );
}
function moveLeft() {
  if (!tabListNavRef.value || !tabListRef.value) return;
  const contentWidth =
    (dom(tabListRef) as HTMLElement).clientWidth -
    leftButtonWidth.value -
    rightButtonWidth.value;

  offsetX.value = Math.min(0, contentWidth + offsetX.value);
}

//使用户在拖拽的过程中，将鼠标放置到相关按钮上，可以移动 TabList
const smoothSpeed = 5;
let startLeftSmooth = false;
let startRightSmooth = false;
let rightButtonTimerId: number | null = null;
let leftButtonTimerId: number | null = null;
function smoothRightStart() {
  if (!dragging) return;
  startRightSmooth = true;
  //此时应该禁止过渡动画
  stopTransition.value = true;
  const contentWidth =
    (dom(tabListRef) as HTMLElement).clientWidth -
    leftButtonWidth.value -
    rightButtonWidth.value;
  const frameCallback = () => {
    offsetX.value = Math.max(
      offsetX.value - smoothSpeed,
      contentWidth - tabListNavWidth.value,
    );
    rightButtonTimerId = requestAnimationFrame(frameCallback);
  };
  rightButtonTimerId = requestAnimationFrame(frameCallback);
}
function smoothRightEnd() {
  if (!startRightSmooth) return;
  startRightSmooth = false;
  stopTransition.value = false;
  typeof rightButtonTimerId == "number" &&
    cancelAnimationFrame(rightButtonTimerId);
}
function smoothLeftStart() {
  if (!dragging) return;
  startLeftSmooth = true;
  //此时应该禁止过渡动画
  stopTransition.value = true;
  const frameCallback = () => {
    offsetX.value = Math.min(0, offsetX.value + smoothSpeed);
    leftButtonTimerId = requestAnimationFrame(frameCallback);
  };
  leftButtonTimerId = requestAnimationFrame(frameCallback);
}
function smoothLeftEnd() {
  if (!startLeftSmooth) return;
  startLeftSmooth = false;
  stopTransition.value = false;
  typeof leftButtonTimerId == "number" &&
    cancelAnimationFrame(leftButtonTimerId);
}

/**
 * 底部选中条的动画效果，需要特别定制
 */
const transitionRunning = ref(false);
const bottomLineRef = ref<HTMLElement | null>(null);
/**
 * 在 Tabs 的实现中 v-model 与 @change 是有区别的，
 *  @change 会在用户单击 Tab /通过键盘操作切换 Tab 的时候,被触发
 *  而 v-model 除了会在用户单击 Tab /通过键盘操作切换 Tab 的时候触发，也会在用户调整Tab顺序的时候触发
 *  因此，通过下面的写法可以实现在让底部选中条只在在 用户单击 Tab /通过键盘操作切换 Tab 时呈现动画效果
 */
function selectedIndexChange() {
  transitionRunning.value = true;
}

watch(selectedIndex, (index) => {
  if (transitionRunning.value) return;
  //translateX 的值与 tab width关联
  bottomLineRef.value!.style.transform = `translateX(${index * 6}rem)`;
});

watch(selectedIndex, (index) => {
  if (!transitionRunning.value) return;
  //translateX 的值与 tab width关联
  bottomLineRef.value!.style.transform = `translateX(${index * 6}rem)`;
});
function transitionEnd() {
  transitionRunning.value = false;
}
</script>

<style module>
.shadow {
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.2);
}
.spread {
  transform: translateY(0);
}
.shrink {
  /* panel 的高度可能会发生变化,因此使用该计算方法 是 3.5rem 是 tab 的高度 */
  transform: translateY(100%);
  transform: translateY(calc(100% - 3.5rem)); /* h-14 === 3.5rem */
}

.tabLabel {
  position: relative;
  box-sizing: border-box;
  border-bottom: 2px solid #ddd;
  outline: none;
  cursor: pointer;
  /* 
    该宽度如果修改，需要同步修改其它几处与其关联的样式的宽度（tab width关联）
  */
  @apply w-24 h-14 pt-6 pr-3 pl-2;
}

.tabLabel:global(.active) {
  z-index: 1;
  border-bottom-color: #f60;
}
.selectedLine {
  position: absolute;
  border-bottom: 2px #f60 solid;
  transition: transform 0.3s ease;
  /* tab width关联 */
  @apply z-[1] w-24 left-0 bottom-0;
}
.tabLabelText {
  display: block;
  max-width: 80px;
  color: #222;
  text-align: center;
  line-height: 32px;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.transition {
  transition: all 0.5s ease;
}
</style>
