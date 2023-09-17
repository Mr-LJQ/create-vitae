import type { PropType } from "vue";

export const propsType = {
  tags: {
    type: Set as PropType<Set<string>>,
    required: true,
  },
  deleteTag: {
    type: Function as PropType<(tag: string) => boolean>,
    required: true,
  },
} as const;
