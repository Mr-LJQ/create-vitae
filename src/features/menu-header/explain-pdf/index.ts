export const UPDATE_MODEL_VALUE = "update:modelValue";

export const propsType = {
  modelValue: {
    type: Boolean,
    required: true,
  },
} as const;

export const emitsType = {
  [UPDATE_MODEL_VALUE]: (isOpen: boolean) => typeof isOpen === "boolean",
};
