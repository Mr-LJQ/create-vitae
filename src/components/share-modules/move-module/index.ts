import type { PropType } from "vue";
import { Delta } from "@vueup/vue-quill";
import { isString, isBoolean, isDate } from "@/utils";

export const UPDATE_CONTENT = "update:content";
export const UPDATE_FIRST_INPUT = "update:firstInput";
export const UPDATE_SECOND_INPUT = "update:secondInput";
export const UPDATE_TIME_RANGE = "update:timeRange";
export const UPDATE_IS_HITHERTO = "update:isHitherto";
export const HANDLE_MOVE_UP = "handle_move_up";
export const HANDLE_MOVE_DOWN = "handle_move_down";
export const HANDLE_DELETE = "handle_delete";
type O = {
  label: string;
  placeholder: string;
  placeholder2?: string;
};

export const propsType = {
  firstItem: {
    type: Object as PropType<O>,
    required: true,
  },
  secondItem: {
    type: Object as PropType<O>,
    required: true,
  },
  thirdItem: {
    type: Object as PropType<Required<O>>,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  content: {
    type: Object as PropType<Delta>,
    required: true,
  },
  showDeleteButton: {
    type: Boolean,
    required: true,
  },
  showMoveUpButton: {
    type: Boolean,
    required: true,
  },
  showMoveDownButton: {
    type: Boolean,
    required: true,
  },
  secondInput: {
    type: String,
    required: true,
  },
  isHitherto: {
    type: Boolean,
    required: true,
  },
  firstInput: {
    type: String,
    required: true,
  },
  timeRange: {
    type: [Object, null] as PropType<[Date, Date] | null>,
    required: true,
  },
  defaultTimeValue: Object as PropType<[Date, Date]>,
} as const;

export const emitsType = {
  [UPDATE_CONTENT]: null,
  [UPDATE_FIRST_INPUT]: (payload: string) => isString(payload),
  [UPDATE_SECOND_INPUT]: (payload: string) => isString(payload),
  [UPDATE_TIME_RANGE]: (payload: [Date, Date] | null) => {
    if (payload === null) return true;
    return payload.length === 2 && payload.every(isDate);
  },
  [UPDATE_IS_HITHERTO]: (payload: boolean) => isBoolean(payload),
  [HANDLE_DELETE]: null,
  [HANDLE_MOVE_UP]: null,
  [HANDLE_MOVE_DOWN]: null,
};

export const degrees = [
  "不填",
  "初中",
  "高中",
  "中专",
  "大专",
  "本科",
  "学士",
  "硕士",
  "MBA",
  "EMBA",
  "博士",
];
