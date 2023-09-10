import type { PropType } from "vue";
import type { State } from "@/stores/job-intention";

export const propsType = {
  moduleName: {
    type: String,
    required: true,
  },
  jobIntentions: {
    type: Array as PropType<State["jobIntentions"]>,
    required: true,
  },
} as const;
