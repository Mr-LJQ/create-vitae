import { isString } from "@/utils";

export const UPDATE_POST = "update:post";
export const UPDATE_CITY = "update:city";
export const UPDATE_HIREDATE = "update:hiredate";
export const UPDATE_PAY = "update:pay";

export const unitProps = {
  post: {
    type: String,
    required: true,
  },
  pay: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  hiredate: {
    type: String,
    required: true,
  },
} as const;

export const unitEmits = {
  [UPDATE_PAY]: (payload: string) => isString(payload),
  [UPDATE_CITY]: (payload: string) => isString(payload),
  [UPDATE_POST]: (payload: string) => isString(payload),
  [UPDATE_HIREDATE]: (payload: string) => isString(payload),
} as const;
