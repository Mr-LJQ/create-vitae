import { type PropType } from "vue";
export const UPDATE_MODEL_VALUE = "update:modelValue";
export const UPDATE_PROMPT_PDF_INFO = "update:promptPDFInfo";
export const propsType = {
  modelValue: {
    type: Boolean,
    required: true,
  },
  promptPDFInfo: {
    type: Boolean,
    required: true,
  },
  handlePrinter: {
    type: Function as PropType<(payload: MouseEvent) => void>,
    required: true,
  },
} as const;

export const emitsType = {
  [UPDATE_MODEL_VALUE]: (isOpen: boolean) => typeof isOpen === "boolean",
  [UPDATE_PROMPT_PDF_INFO]: (isOpen: boolean) => typeof isOpen === "boolean",
};
