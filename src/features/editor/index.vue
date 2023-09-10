<template>
  <div :class="[$style.a, isSpread ? $style.c : '']">
    <SpreadButton
      :class="$style.b"
      @click="handleClick"
      :is-spread="isSpread"
    />
    <el-tabs
      stretch
      class="edit-tabs"
      v-model="store.activeModuleName"
      @tab-click="handleClick"
    >
      <el-tab-pane :name="ModuleEnum.BasicInfos" :key="ModuleEnum.BasicInfos">
        <template #label>
          <div :class="$style.d">
            <b :class="$style.e">{{ moduleNameMap[ModuleEnum.BasicInfos] }}</b>
          </div>
        </template>
        <BasicInfo />
      </el-tab-pane>
      <el-tab-pane lazy :key="name" :name="name" v-for="name of modulesOrder">
        <template #label>
          <div :class="$style.d">
            <b :class="$style.e">{{ moduleNameMap[name] }}</b>
            <el-switch class="absolute" v-model="openedModules[name]" />
          </div>
        </template>
        <component
          :is="componentMap[name]"
          :module-name="moduleNameMap[name]"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElTabs, ElTabPane, ElSwitch } from "element-plus";

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

import SpreadButton from "@/components/buttons/SpreadButton.vue";
import { useModulesInfosStore, ModuleEnum } from "@/stores/modules-infos";

const store = useModulesInfosStore();
const { moduleNameMap, modulesOrder, openedModules } = store;

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

const isSpread = ref(false);
function handleClick() {
  isSpread.value = !isSpread.value;
}
</script>
<style module>
.a {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 0 0 20px rgb(0, 0, 0, 0.2);
  transform: translateY(calc(100% - 55px)); /* 55px 是 TabsLabel的高度 */
  transition: all 0.3s ease-out 0s;
}
.b {
  position: absolute;
  left: 50%;
  top: -35px;
  z-index: 1;
  margin-left: -40px;
  transition: all 0.2s ease-out 0s;
}
.b:hover {
  top: -40px;
}

.a.c {
  transform: translateY(0);
}
.d {
  box-sizing: border-box;
  float: left;
  padding: 23px 11px 0 9px;
  height: 55px;
  width: 100px;
  border-bottom: 2px solid #ddd;
  cursor: pointer;
  position: relative;
}
.e {
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
</style>
<style lang="scss">
.edit-tabs {
  position: relative;
  z-index: 2;
  background-color: #fff;
  .el-tabs__item {
    padding: 0;
    --el-tabs-header-height: 55px;
  }
}
.absolute {
  position: absolute;
  left: 50%;
  top: 6px;
  height: 14px;
  line-height: 14px;
  opacity: 0.6;
  transition: all 0.2s ease-out 0s;
  transform: translateX(-50%);
}
</style>
