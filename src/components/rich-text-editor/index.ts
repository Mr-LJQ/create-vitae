export const UPDATE_MODEL_VALUE = "update:modelValue";
export const propsType = {
  modelValue: {
    required: true,
  },
  placeholder: String,
} as const;

export const emitsType = [UPDATE_MODEL_VALUE];

export const toolbar = [
  [{ size: ["small", false, "large", "huge"] }],
  [{ color: [] }, "bold", "italic", "underline", "link"],
  [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
  ["image"],
  ["clean"],
];

export const titleConfig = {
  "ql-bold": "加粗",
  "ql-color": "字体颜色",
  "ql-italic": "斜体",
  "ql-link": "添加链接",
  "ql-size": "字体大小",
  "ql-underline": "下划线",
  "ql-list[value=ordered]": "有序列表",
  "ql-list[value=bullet]": "无序列表",
  "ql-align": "文本对齐",
  "ql-image": "图片",
  "ql-clean": "清除字体样式",
};
