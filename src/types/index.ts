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

export type AnyFunction = (...args: any[]) => any;
