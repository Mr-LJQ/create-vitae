import { isBoolean } from "lodash";

export const UPDATE_MODEL_VALUE = "update:modelValue";
export const propsType = {
  modelValue: {
    type: Boolean,
    required: true,
  },
  alt: String,
  selected: Boolean,
  tabindex: Number,
} as const;

export const emitsType = {
  [UPDATE_MODEL_VALUE]: (val: boolean) => isBoolean(val),
};
