<template>
  <div ref="containerRef" class="pt-5 text-[#333]">
    <BasicInfos />
    <component
      :key="name"
      :is="componentMap[name]"
      :module-name="moduleNameMap[name]"
      v-for="name of activeModulesOrder"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import "@/assets/icon-font-template-a/iconfont.css";

import BasicInfos from "./basic-infos/index.vue";
import JobIntention from "./job-intention/index.vue";
import EducationalBackground from "./educational-background/index.vue";
import WorkExperience from "./work-experience/index.vue";
import CampusExperience from "./campus-experience/index.vue";
import InternshipExperience from "./internship-experience/index.vue";
import ProjectExperience from "./project-experience/index.vue";
import SelfEvaluation from "./self-evaluation/index.vue";
import CustomModule from "./custom-module/index.vue";
import Certificate from "./certificate/index.vue";
import Interests from "./interests/index.vue";
import Specialty from "./specialty/index.vue";

import { ModuleEnum, useModulesInfosStore } from "@/stores";
defineOptions({
  name: "ATemplate",
});

const store = useModulesInfosStore();
const { moduleNameMap, modulesOrder, openedModules } = storeToRefs(store);

/**
 * 过滤掉无需显示的 module
 */
const activeModulesOrder = computed(() => {
  return modulesOrder.value.filter((key) => {
    return openedModules.value[key];
  });
});

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
</script>
