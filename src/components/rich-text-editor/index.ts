import type { PropType } from "vue";
import { Delta } from "@vueup/vue-quill";

export const UPDATE_MODEL_VALUE = "update:modelValue";
export const READY = "ready";
export const propsType = {
  modelValue: {
    type: Object as PropType<Delta>,
    required: true,
  },
  placeholder: String,
} as const;

export const emitsType = {
  [READY]: (payload: {
    blur: () => void;
    getLength: () => number;
    setSelection: (a: number) => void;
  }) => Object(payload) === payload,
  [UPDATE_MODEL_VALUE]: null,
};

export const toolbar = [
  [{ size: ["small", false, "large", "huge"] }],
  [{ color: [] }, "bold", "italic", "underline", "link"],
  [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
  ["image"],
  ["clean"],
];

//为 quill的 toolbar 上的按钮设置 title（quill原生没有提供相应的方法去设置）
export const titleConfig = {
  "ql-bold": "加粗",
  "ql-color": "字体颜色",
  "ql-italic": "斜体",
  "ql-link": "添加链接",
  "ql-underline": "下划线",
  "ql-list[value=ordered]": "有序列表",
  "ql-list[value=bullet]": "无序列表",
  "ql-align": "文本对齐",
  "ql-image": "图片",
  "ql-clean": "清除字体样式",
};
