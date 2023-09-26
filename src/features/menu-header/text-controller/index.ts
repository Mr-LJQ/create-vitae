import type { TextControllerType } from "@/stores";

interface OptionType {
  title: string;
  name: keyof TextControllerType;
  options: (string | number)[];
}

export const options: OptionType[] = [
  {
    title: "字体",
    name: "fontFamily",
    options: ["微软雅黑", "宋体", "楷体", "黑体", "平方", "Arial"],
  },
  {
    title: "语言",
    name: "language",
    options: ["中文（简）"],
  },
  {
    title: "字体大小",
    name: "fontSize",
    options: [12, 13, 14, 15, 16],
  },
];
