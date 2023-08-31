import type { PropType } from "vue";
import { Delta } from "@vueup/vue-quill";
import { isString, isBoolean } from "@/utils";

export const UPDATE_CONTENT = "update:content";
export const UPDATE_FIRST_INPUT = "update:firstInput";
export const UPDATE_SECOND_INPUT = "update:secondInput";
export const UPDATE_START_TIME = "update:startTime";
export const UPDATE_FINISH_TIME = "update:finishTime";
export const UPDATE_IS_HITHERTO = "update:isHitherto";
export const HANDLE_MOVE_UP = "handle_move_up";
export const HANDLE_MOVE_DOWN = "handle_move_down";
export const HANDLE_DELETE = "handle_delete";
type ItemProps = {
  label: string;
  placeholder: string;
};

export const propsType = {
  firstItem: {
    type: Object as PropType<ItemProps>,
    required: true,
  },
  secondItem: {
    type: Object as PropType<ItemProps>,
    required: true,
  },
  thirdItem: {
    type: Object as PropType<ItemProps & { placeholder2: string }>,
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
  startTime: {
    type: String,
    required: true,
  },
  finishTime: {
    type: String,
    required: true,
  },
} as const;

export const emitsType = {
  [UPDATE_CONTENT]: null,
  [UPDATE_FIRST_INPUT]: (payload: string) => isString(payload),
  [UPDATE_SECOND_INPUT]: (payload: string) => isString(payload),
  [UPDATE_START_TIME]: (payload: string) => isString(payload),
  [UPDATE_FINISH_TIME]: (payload: string) => isString(payload),
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
