export const UPDATE_MODEL_VALUE = "update:modelValue";
export const propsType = {
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: String,
} as const;

export const emitsType = [UPDATE_MODEL_VALUE];
