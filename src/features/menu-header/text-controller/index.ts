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
    /**
     * 下面注释掉的字体是应用在简历上不太适宜的字体
     */
    options: [
      "楷体",
      "宋体",
      "黑体",
      /*  "隶书", */ "仿宋",
      "幼圆",
      /* "方正姚体", */ /* "方正舒体", */ /* "华文行楷", */ "华文新魏",
      /* "华文彩云", */ "华文中宋",
      "微软雅黑",
      "Arial",
    ],
  },
  {
    title: "字体大小",
    name: "fontSize",
    options: [12, 13, 14, 15, 16],
  },
];
