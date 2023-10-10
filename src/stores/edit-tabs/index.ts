import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

type UnRef<T extends Ref<unknown>> = T extends Ref<infer R> ? R : T;
export const useEditTabsStore = defineStore("edit-tabs", () => {
  const tabNames = ref([
    "求职意向",
    "教育背景",
    "工作经验",
    "项目经验",
    "实习经历",
    "校园经历",
    "技能特长",
    "荣誉证书",
    "兴趣爱好",
    "自我评价",
    "自定义",
  ] as const);
  const activeTabName = ref<UnRef<typeof tabNames>[number] | "基本信息">(
    "基本信息",
  );

  return {
    tabNames,
    activeTabName,
  };
});
