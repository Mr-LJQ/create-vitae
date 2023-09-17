import { Delta } from "@vueup/vue-quill";
import { isEqual } from "lodash";
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isEmptyDelta(delta: Delta) {
  const length = delta.length();
  return (
    //该情况是，用户从未进行输入
    length === 0 ||
    //该情况是，用户曾经进行过输入，但是后面全部删除了
    (length === 1 && isEqual(delta.ops, [{ insert: "\n" }]))
  );
}
