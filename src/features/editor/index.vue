<template>
  <div
    class="fixed left-0 bottom-0 z-10 w-full transition-all duration-300"
    :class="[$style.shadow, isSpread ? $style.spread : $style.shrink]"
  >
    <button
      class="absolute left-1/2 -top-9 z-[1] hover:-top-10 w-20 h-20 pb-8 -ml-10 border-none rounded-full bg-white cursor-pointer transition-[transform,top] duration-300"
      :class="[$style.shadow, $style.button]"
      @click="toggleShrinkOrSpread"
    >
      <ElIcon v-if="!isSpread" color="#13ce66" size="35px"><ArrowUp /></ElIcon>
      <ElIcon v-else color="#13ce66" size="35px"><ArrowDown /></ElIcon>
    </button>
    <TabGroup as="div" class="relative z-[2] bg-white">
      <TabList class="flex relative overflow-hidden max-w-[1200px] mx-auto">
        <span
          :style="`transform:translateX(${translationXRef}rem)`"
          :class="$style.selectedLine"
        ></span>
        <Tab as="template" v-slot="{ selected }"
          ><div
            class="shrink-0"
            :class="[
              $style.tabLabel,
              selected ? 'selected' : '',
              selected && computeTranslationX(),
            ]"
          >
            <b :class="$style.tabLabelText">{{
              moduleNameMap[ModuleEnum.BasicInfos]
            }}</b>
          </div></Tab
        >
        <Tab
          as="template"
          :key="name"
          v-slot="{ selected }"
          :disabled="!openedModules[name]"
          v-for="(name, index) of modulesOrder"
        >
          <div
            class="group shrink-0"
            :class="[
              $style.tabLabel,
              selected ? 'selected' : '',
              selected && computeTranslationX(index),
            ]"
          >
            <b :class="$style.tabLabelText">{{ moduleNameMap[name] }}</b>
            <EditSwitch
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
              ><Edit
            /></ElIcon>
            <ElIcon
              title="左移模块"
              v-if="index !== 0"
              class="group-hover:flex hidden absolute left-1 top-2 p-0.5 rounded-full hover:opacity-100 opacity-50 bg-[#13ce66]"
              color="white"
              size="1rem"
              @click="moveLeft(index)"
              ><ArrowLeft
            /></ElIcon>
            <ElIcon
              title="右移模块"
              v-if="index !== modulesOrder.length - 1"
              class="group-hover:flex hidden absolute right-1 top-2 p-0.5 rounded-full hover:opacity-100 opacity-50 bg-[#13ce66]"
              color="white"
              size="1rem"
              @click="moveRight(index)"
              ><ArrowRight
            /></ElIcon>
          </div>
        </Tab>
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
import {
  Edit,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "@element-plus/icons-vue";
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
import { moveOneStep } from "@/utils";
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
 * 实现拖拽逻辑
 */
function moveLeft(index: number) {
  moveOneStep(index, -1, modulesOrder.value);
}
function moveRight(index: number) {
  moveOneStep(index, 1, modulesOrder.value);
}

/**
 * 实现 tab 切换的动画效果
 */
const translationXRef = ref(0);
function computeTranslationX(index?: number) {
  if (index == null) return (translationXRef.value = 0);
  //因为 "基本信息" 项是独立，且在设计上位于首位，因此此处需要 + 1
  translationXRef.value = (index + 1) * 6; //此处的 6 指的是 tab 的宽度为 6rem
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
  transform: translateY(calc(100% - 55px)); /* 55px 是 TabsLabel的高度 */
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
  @apply z-[1] w-24 left-0 top-[3.375rem] transition-transform translate-x-0 duration-300;
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

.switch {
  position: absolute;
  left: 50%;
  top: 6px;
  height: 14px;
  line-height: 14px;
  opacity: 0.6;
  transition: all 0.2s ease-out 0s;
  transform: translateX(-50%);
}
.editTabs {
  position: relative;
  z-index: 2;
  background-color: #fff;
}
.editTabs :global(.el-tabs__item) {
  padding: 0;
  --el-tabs-header-height: 55px;
}
</style>
