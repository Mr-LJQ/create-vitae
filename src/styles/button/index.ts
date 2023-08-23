import { setBEMClass } from "@/utils";

const { b, bm } = setBEMClass("button");

export const BUTTON_CORE_CLASS = b();
export const BUTTON_MOVE_CLASS = bm("move");
export const BUTTON_DELETE_CLASS = bm("delete");
