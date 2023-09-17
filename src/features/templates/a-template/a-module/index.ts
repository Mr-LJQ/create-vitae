import type { PropType } from "vue";
import type { AModuleData } from "@/types";

export const propsType = {
  moduleName: {
    type: String,
    required: true,
  },
  dataList: {
    type: Array as PropType<AModuleData[]>,
    required: true,
  },
} as const;
