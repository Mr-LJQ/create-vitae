import { ref } from "vue";
import { defineStore } from "pinia";

export const configurationDefault = {
  lineGap: 0.7,
  moduleGap: 20,
  templateEdgeGap: 30,
  showPDFExplain: true,
  fontSize: 14,
  fontFamily: "楷书",
  templateColor: "#284967",
};

export const useConfigurationStore = defineStore("configuration", () => {
  //---间距---
  const moduleGap = ref(configurationDefault.moduleGap);
  const lineGap = ref(configurationDefault.lineGap);
  const templateEdgeGap = ref(configurationDefault.templateEdgeGap);
  //---字体语言---
  const fontSize = ref<number>(configurationDefault.fontSize);
  const fontFamily = ref<string>(configurationDefault.fontFamily);
  //---模版颜色---
  const templateColor = ref<string>(configurationDefault.templateColor);
  //---PDF相关说明---
  const showPDFExplain = ref(true);
  return {
    lineGap,
    moduleGap,
    templateEdgeGap,
    showPDFExplain,
    fontSize,
    fontFamily,
    templateColor,
  };
});

type ConfigurationStateType = ReturnType<
  typeof useConfigurationStore
>["$state"];

export type GapControllerType = Pick<
  ConfigurationStateType,
  "lineGap" | "moduleGap" | "templateEdgeGap"
>;
export type TextControllerType = Pick<
  ConfigurationStateType,
  "fontSize" | "fontFamily"
>;
