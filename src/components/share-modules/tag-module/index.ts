import type { PropType } from "vue";
import type { Delta } from "@vueup/vue-quill";

export const UPDATE_CONTENT = "update:content";
export const propsType = {
  placeholder: String,
  content: {
    type: Object as PropType<Delta>,
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
  hasTag: {
    type: Function as PropType<(tag: string) => boolean>,
    required: true,
  },
  addTag: {
    type: Function as PropType<(tag: string) => void>,
    required: true,
  },
  deleteTag: {
    type: Function as PropType<(tag: string) => boolean>,
    required: true,
  },
} as const;

export const emitsType = [UPDATE_CONTENT];
