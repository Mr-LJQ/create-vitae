import type { GapControllerType } from "@/stores";

interface OptionType {
  title: string;
  name: keyof GapControllerType;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export const options: OptionType[] = [
  {
    title: "文本行间距",
    name: "lineGap",
    min: 0.3,
    max: 1.2,
    step: 0.1,
    defaultValue: 0.7,
  },
  {
    title: "模块上下间距",
    name: "moduleGap",
    min: 5,
    max: 50,
    step: 1,
    defaultValue: 20,
  },
  {
    title: "简历模版边距",
    name: "templateEdgeGap",
    min: 10,
    max: 50,
    step: 1,
    defaultValue: 30,
  },
];
