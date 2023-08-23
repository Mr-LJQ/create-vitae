import { isString, isBoolean } from "@/utils";

export const MAJOR_EVENT_NAME = "update:major";
export const DEGREE_EVENT_NAME = "update:degree";
export const IS_HITHERTO_EVENT_NAME = "update:isHitherto";
export const SCHOOL_NAME_EVENT_NAME = "update:schoolName";
export const START_SCHOOL_EVENT_NAME = "update:startSchool";
export const FINISH_SCHOOL_EVENT_NAME = "update:finishSchool";
export const DELETE_EVENT_NAME = "delete_event";
export const MOVE_UP_EVENT_NAME = "move_up_event";
export const MOVE_DOWN_EVENT_NAME = "move_down_event";

export const propsType = {
  showDeleteButton: Boolean,
  showMoveUpButton: Boolean,
  showMoveDownButton: Boolean,
  major: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  isHitherto: {
    type: Boolean,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  startSchool: {
    type: String,
    required: true,
  },
  finishSchool: {
    type: String,
    required: true,
  },
} as const;

export const emitsType = {
  [MAJOR_EVENT_NAME]: (payload: string) => isString(payload),
  [DEGREE_EVENT_NAME]: (payload: string) => isString(payload),
  [IS_HITHERTO_EVENT_NAME]: (payload: boolean) => isBoolean(payload),
  [SCHOOL_NAME_EVENT_NAME]: (payload: string) => isString(payload),
  [START_SCHOOL_EVENT_NAME]: (payload: string) => isString(payload),
  [FINISH_SCHOOL_EVENT_NAME]: (payload: string) => isString(payload),
  [DELETE_EVENT_NAME]: null,
  [MOVE_UP_EVENT_NAME]: (payload: boolean) => isBoolean(payload),
  [MOVE_DOWN_EVENT_NAME]: (payload: boolean) => isBoolean(payload),
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
