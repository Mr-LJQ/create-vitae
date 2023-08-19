<template>
  <el-tabs
    stretch
    class="edit-tabs"
    v-model="activeName"
    @tab-click="handleClick"
  >
    <el-tab-pane name="基本信息" key="基本信息">
      <template #label><Item> 基本信息 </Item> </template>
      <BasicInfo />
    </el-tab-pane>
    <el-tab-pane :name="title" :key="title" v-for="title of titles">
      <template #label
        ><Item
          >{{ title }}
          <el-switch class="absolute" />
        </Item>
      </template>
      <JobIntention />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Item from "@/components/edit-tab-label/index.vue";
import BasicInfo from '@/components/basic-info/index.vue'
import JobIntention from '@/components/job-intention/index.vue'
import { ElTabs, ElTabPane,ElSwitch } from "element-plus";

const activeName = ref("");
function handleClick() {

}
const titles = ref([
  "求职意向",
  /* "教育背景",
  "工作经验",
  "项目经验",
  "实习经历",
  "校园经历",
  "技能特长",
  "荣誉证书",
  "自我评价",
  "兴趣爱好", */
]);
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
