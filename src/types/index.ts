import type { Delta } from "@vueup/vue-quill";
export type AModuleData = {
  id: number;
  first: string;
  second: string;
  third?: string;
  isHitherto: boolean;
  editorContent: Delta;
  timeRange: [Date, Date] | null;
};

export type AnyFunction = (...args: unknown[]) => unknown;

export type Proficiency = ["一般", "良好", "熟练", "擅长", "精通"];

export type Presentation = ["文字", "百分比"];
