import { type PropType } from "vue";
export const UPDATE_MODEL_VALUE = "update:modelValue";
export const propsType = {
  modelValue: {
    type: Boolean,
    required: true,
  },
  handlePrinter: {
    type: Function as PropType<(payload: MouseEvent) => void>,
    required: true,
  },
  togglePromptPdfInfo: {
    type: Function as PropType<(payload: boolean) => void>,
    required: true,
  },
} as const;

export const emitsType = {
  [UPDATE_MODEL_VALUE]: (isOpen: boolean) => typeof isOpen === "boolean",
};
