<template>
  <div
    class="fixed left-0 bottom-0 z-10 w-full transition-all duration-300"
    :class="[$style.shadow, isSpread ? $style.spread : $style.shrink]"
  >
    <button
      class="absolute left-1/2 -top-9 z-[1] hover:-top-10 focus-visible:outline-[#13ce66] outline-none w-20 h-20 pb-8 -ml-10 border-none rounded-full bg-white cursor-pointer transition-[transform,top] duration-300"
      :class="$style.shadow"
      @click="toggleShrinkOrSpread"
    >
      <ElIcon v-if="!isSpread" color="#13ce66" size="35px"><ArrowUp /></ElIcon>
      <ElIcon v-else color="#13ce66" size="35px"><ArrowDown /></ElIcon>
    </button>
    <TabGroup
      as="div"
      :selectedIndex="selectedIndex"
      @change="tabChange"
      class="relative z-[2] bg-white"
    >
      <TabList class="flex relative overflow-hidden max-w-[1200px] mx-auto">
        <!-- 这是表示 tab 选中状态的底部条状样式 -->
        <span
          :style="`transform:translateX(${selectedIndex * 6}rem)`"
          :class="$style.selectedLine"
        ></span>
        <Tab class="shrink-0" :class="$style.tabLabel">
          <b :class="$style.tabLabelText">{{
            moduleNameMap[ModuleEnum.BasicInfos]
          }}</b>
        </Tab>
        <TransitionGroup :move-class="$style.transition">
          <Tab
            :key="name"
            v-slot="{ selected }"
            @mousemove="swapPosition(index)"
            @mouseenter="swapPosition(index)"
            @mousedown="mousedown($event, index)"
            :disabled="!openedModules[name]"
            class="group shrink-0"
            :class="$style.tabLabel"
            v-for="(name, index) of modulesOrder"
          >
            <b :class="$style.tabLabelText">{{ moduleNameMap[name] }}</b>
            <EditSwitch
              :tabindex="selected ? 0 : -1"
              :title="openedModules[name] ? '点击后隐藏模块' : '点击后显示模块'"
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
      </TabList>
      <TabPanels class="h-[21rem]">
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
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { Edit, ArrowUp, ArrowDown } from "@element-plus/icons-vue";
import { ElIcon } from "element-plus";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { EditSwitch } from "@/components";

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

import { useModulesInfosStore, ModuleEnum } from "@/stores/modules-infos";
import { swap, createDragThrottle } from "@/utils";
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
function tabChange(index: number) {
  selectedIndex.value = index;
}

/**
 * 实现拖拽逻辑
 * 由于 @headlessui/vue 在实现 Tab 组件的时候，对 tab 的 mousedown 进行了监听，并调用了 preventDefault()
 *  因此 drag 相关事件无法生效，因此此处使用 mouse 相关事件去实现拖拽
 */
let dragging = false;
let currentIndex: number = null!;
function mousedown(event: MouseEvent, index: number) {
  const currentTarget = event.currentTarget as HTMLElement;
  if (currentTarget == null) return;
  currentIndex = index;
  dragging = true;
  const { left, top } = currentTarget.getBoundingClientRect();
  const { clientX, clientY } = event;
  const offsetX = clientX - left;
  const offsetY = clientY - top;
  const moveElement = currentTarget.cloneNode(true) as HTMLElement;
  document.body.appendChild(moveElement);
  /**
   * pointer-events: none; 是必须的，否则元素会遮挡鼠标，导致mouseenter 无法触发
   *  不要使用 cssText 语法，避免意外的覆盖
   */
  moveElement.style.position = "fixed";
  moveElement.style.zIndex = "100";
  moveElement.style.opacity = ".8";
  moveElement.style.pointerEvents = "none";

  function mousemove(event: MouseEvent) {
    const { clientX, clientY } = event;
    moveElement.style.left = `${clientX - offsetX}px`;
    moveElement.style.top = `${clientY - offsetY}px`;
  }
  function cleanup() {
    document.removeEventListener("mousemove", mousemove, { capture: true });
    document.removeEventListener("mouseup", cleanup, { capture: true });
    moveElement.remove();
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
      //与当前焦点元素互换位置
      if (index === selectedIndex.value - 1) {
        selectedIndex.value = currentIndex + 1;
      } else if (currentIndex === selectedIndex.value - 1) {
        selectedIndex.value = index + 1;
      }
      currentIndex = index;
    },
    300,
    index,
    currentIndex,
  );
}
</script>

<style module>
.shadow {
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.2);
}

.button {
  outline: none;
}
.button:focus-visible {
  outline: 2px solid #13d8a7;
  outline-offset: 1px;
}
.spread {
  transform: translateY(0);
}
.shrink {
  /* panel 的高度可能会发生变化,因此使用该计算方法 是 3.5rem 是 tab 的高度 */
  transform: translateY(calc(100% - 3.5rem));
}
.tabLabel {
  position: relative;
  box-sizing: border-box;
  border-bottom: 2px solid #ddd;
  outline: none;
  cursor: pointer;
  /* 
    w-24 如需改变，则 computeTranslationX 函数亦要改变
  */
  @apply w-24 h-14 pt-6 pr-3 pl-2;
}
.selectedLine {
  position: absolute;
  border-bottom: 2px #f60 solid;
  @apply z-[1] w-24 left-0 top-[3.375rem] transition-transform duration-300;
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
