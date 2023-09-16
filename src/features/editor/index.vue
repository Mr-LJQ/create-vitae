<template>
  <div
    class="fixed left-0 bottom-0 w-full transition-all duration-300"
    :class="[$style.shadow, isSpread ? $style.spread : $style.shrink]"
  >
    <button
      class="absolute left-1/2 -top-9 z-[1] hover:-top-10 w-20 h-20 pb-8 -ml-10 border-none rounded-full bg-white cursor-pointer transition-[transform,top] duration-300"
      :class="[$style.shadow, $style.button]"
      @click="toggleShrinkOrSpread"
    >
      <ElIcon v-if="!isSpread" color="#13d8a7" size="35px"><ArrowUp /></ElIcon>
      <ElIcon v-else color="#13d8a7" size="35px"><ArrowDown /></ElIcon>
    </button>
    <ElTabs stretch :class="$style.editTabs" v-model="store.activeModuleName">
      <ElTabPane :name="ModuleEnum.BasicInfos" :key="ModuleEnum.BasicInfos">
        <template #label>
          <div :class="$style.tabLabel">
            <b :class="$style.tabLabelText">{{
              moduleNameMap[ModuleEnum.BasicInfos]
            }}</b>
          </div>
        </template>
        <BasicInfo />
      </ElTabPane>
      <!-- 
        下面的写法之所以是 :key="`${name},${index}`"
          是因为当前版本的 ElTabs 还不能够随着 modulesOrder 顺序的更新
          而相应的更新视图，经过源码阅读发现想要同步更新，需要将 key与 index关联才会触发重新更新，
          因此才有下面的写法，该写法实际上是一种 hack 写法
       -->
      <ElTabPane
        lazy
        :key="`${name},${index}`"
        :name="name"
        v-for="(name, index) of modulesOrder"
      >
        <template #label>
          <div
            :class="$style.tabLabel"
            draggable="true"
            @dragstart="dragstart(index)"
            @dragenter="dragenter(index)"
          >
            <b :class="$style.tabLabelText">{{ moduleNameMap[name] }}</b>
            <ElSwitch :class="$style.switch" v-model="openedModules[name]" />
          </div>
        </template>
        <component
          :is="componentMap[name]"
          :module-name="moduleNameMap[name]"
        />
      </ElTabPane>
    </ElTabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { ArrowUp, ArrowDown } from "@element-plus/icons-vue";
import { ElTabs, ElTabPane, ElSwitch, ElIcon } from "element-plus";

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
import { createDragThrottle, swap } from "@/utils";

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
let currentIndex: number = null!;
const dragThrottle = createDragThrottle();
function dragstart(index: number) {
  currentIndex = index;
}

function dragenter(index: number) {
  if (currentIndex === index) return;
  dragThrottle(
    () => {
      swap(currentIndex, index, modulesOrder.value);
      currentIndex = index;
    },
    300,
    index,
    currentIndex
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
  transform: translateY(calc(100% - 55px)); /* 55px 是 TabsLabel的高度 */
}

.tabLabel {
  box-sizing: border-box;
  float: left;
  padding: 23px 11px 0 9px;
  height: 55px;
  width: 100px;
  border-bottom: 2px solid #ddd;
  cursor: pointer;
  position: relative;
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
