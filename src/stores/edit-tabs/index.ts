import { defineStore } from "pinia";
import { ref, reactive } from "vue";
export const useEditTabsStore = defineStore("edit-tabs", () => {
  const tabNames = reactive([
    "求职意向",
    "教育背景",
    "工作经验",
    "项目经验",
    "实习经历",
    "校园经历",
    "技能特长",
    "荣誉证书",
    "自我评价",
    "兴趣爱好",
    "自定义模块",
  ] as const);
  const activeTabName = ref<(typeof tabNames)[number] | "基本信息">("基本信息");

  return {
    tabNames,
    activeTabName,
  };
});
