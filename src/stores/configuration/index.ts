import { ref } from "vue";
import { defineStore } from "pinia";
import type { StoreState } from "pinia";

export const useConfigurationStore = defineStore("configuration", () => {
  const moduleGap = ref(20);
  const lineGap = ref(0.7);
  const templateEdgeGap = ref(30);

  return {
    lineGap,
    moduleGap,
    templateEdgeGap,
  };
});

type ConfigurationStateType = StoreState<
  ReturnType<typeof useConfigurationStore>
>;
export type GapControllerType = Pick<
  ConfigurationStateType,
  "lineGap" | "moduleGap" | "templateEdgeGap"
>;
