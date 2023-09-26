import { ref } from "vue";
import { defineStore } from "pinia";
import type { StoreState } from "pinia";

export const useConfigurationStore = defineStore("configuration", () => {
  //---间距---
  const moduleGap = ref(20);
  const lineGap = ref(0.7);
  const templateEdgeGap = ref(30);
  //---字体/语言---
  const fontSize = ref<number>(14);
  const language = ref<string>("中文（简）");
  const fontFamily = ref<string>("微软雅黑");
  return {
    lineGap,
    moduleGap,
    templateEdgeGap,
    fontSize,
    language,
    fontFamily,
  };
});

type ConfigurationStateType = StoreState<
  ReturnType<typeof useConfigurationStore>
>;
export type GapControllerType = Pick<
  ConfigurationStateType,
  "lineGap" | "moduleGap" | "templateEdgeGap"
>;
export type TextControllerType = Pick<
  ConfigurationStateType,
  "fontSize" | "fontFamily" | "language"
>;
