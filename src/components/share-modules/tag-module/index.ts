import { PropType } from "vue";
import { isString } from "@/utils";

export const UPDATE_CUSTOM = "update:custom";
export const UPDATE_CONTENT = "update:content";
export const HANDLE_TOGGLE_TAG = "handle_toggle_tag";
export const HANDLE_ADD_CUSTOM = "handle_add_custom";
export const propsType = {
  placeholder: String,
  content: {
    type: String,
    required: true,
  },
  custom: {
    type: String,
    required: true,
  },
  presetTags: {
    type: Array as PropType<string[]>,
    required: true,
  },
  moduleName: {
    type: String,
    required: true,
  },
} as const;

export const emitsType = {
  [UPDATE_CUSTOM]: (payload: unknown) => isString(payload),
  [UPDATE_CONTENT]: (payload: unknown) => isString(payload),
  [HANDLE_TOGGLE_TAG]: (payload: string) => isString(payload),
  [HANDLE_ADD_CUSTOM]: null,
};
