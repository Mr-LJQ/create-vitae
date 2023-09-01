import type { Delta } from "@vueup/vue-quill";
export type AModuleData = {
  id: number;
  first: string;
  second: string;
  third?: string;
  startTime: string;
  finishTime: string;
  isHitherto: boolean;
  editorContent: Delta;
};
