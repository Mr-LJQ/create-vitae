import { setBEMClass } from "@/utils";

const { bem, be } = setBEMClass("transition");

export const TRANSITION_BUTTONS_SLIDE = bem("buttons", "slide");
export const TRANSITION_LIST_SLIDE = bem("list", "slide");
export const TRANSITION_DELETE = be("delete");
