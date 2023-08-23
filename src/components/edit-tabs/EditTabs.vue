<template>
  <el-tabs
    stretch
    class="edit-tabs"
    v-model="store.activeTabName"
    @tab-click="handleClick"
  >
    <el-tab-pane name="基本信息" key="基本信息">
      <template #label><EditTabLabel> 基本信息 </EditTabLabel> </template>
      <BasicInfo />
    </el-tab-pane>
    <el-tab-pane :name="name" :key="name" v-for="name of store.tabNames">
      <template #label
        ><EditTabLabel
          >{{ name }}
          <el-switch class="absolute" />
        </EditTabLabel>
      </template>
      <component :is="componentMap[name]" />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import type { Component } from "vue";
import BasicInfo from "@/components/basic-info/index";
import EditTabLabel from "./edit-tab-label/EditTabLabel.vue";
import JobIntention from "@/components/job-intention/index.vue";
import EducationalBackground from "@/components/educational-background/index.vue";
import { ElTabs, ElTabPane, ElSwitch } from "element-plus";
import { useEditTabsStore } from "@/stores/edit-tabs";

const store = useEditTabsStore();
const componentMap: Record<(typeof store.tabNames)[number], Component> = {
  求职意向: JobIntention,
  教育背景: EducationalBackground,
};

function handleClick() {}
</script>
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
