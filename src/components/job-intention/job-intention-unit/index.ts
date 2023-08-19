export const POST_EVENT = "update:post";
export const CITY_EVENT = "update:city";
export const HIREDATE_EVENT = "update:hiredate";
export const PAY_EVENT = "update:pay";

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

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export const unitEmits = {
  [PAY_EVENT]: (payload: string) => isString(payload),
  [CITY_EVENT]: (payload: string) => isString(payload),
  [POST_EVENT]: (payload: string) => isString(payload),
  [HIREDATE_EVENT]: (payload: string) => isString(payload),
} as const;
