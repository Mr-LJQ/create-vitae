import { type PropType } from "vue";
export const UPDATE_MODEL_VALUE = "update:modelValue";
export const propsType = {
  modelValue: {
    type: Boolean,
    required: true,
  },
  openPrintPage: {
    type: Function as PropType<() => void>,
    required: true,
  },
} as const;

export const emitsType = {
  [UPDATE_MODEL_VALUE]: (isOpen: boolean) => typeof isOpen === "boolean",
  whetherShowPDFExplain: (value: boolean) => typeof value === "boolean",
};
