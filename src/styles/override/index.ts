import { setBEMClass } from "@/utils";

const { bem } = setBEMClass("override");

export const OVERRIDE_ELEMENT_PLUS = bem("element", "plus");

export const OVERRIDE_QUILL_SNOW = bem("quill", "snow");
export const OVERRIDE_QUILL_READ_ONLY = bem("quill", "read-only");
