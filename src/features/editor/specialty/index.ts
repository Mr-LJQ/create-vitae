import type { Proficiency, Presentation } from "@/types";

export const placeholder = "技能特长文字描述，非必填。";

export const propsType = {
  moduleName: {
    type: String,
    required: true,
  },
} as const;

export const presetTags = [
  "HTML",
  "Javascript",
  "CSS",
  "React",
  "Vue",
  "Node.js",
  "Rust",
  "Python",
  "英语",
  "Office软件",
];

export const proficiency: Proficiency = [
  "一般",
  "良好",
  "熟练",
  "擅长",
  "精通",
];

export const presentation: Presentation = ["文字", "百分比"];
