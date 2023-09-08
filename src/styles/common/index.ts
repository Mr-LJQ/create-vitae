import { setBEMClass } from "@/utils";

const { bem } = setBEMClass("border");

export const BORDER_B_DASHED = bem("b", "dashed");

export const GRID_AUTO_CENTER = setBEMClass("grid").bem("auto", "center");
