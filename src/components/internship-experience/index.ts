export const firstItem = {
  label: "公司名称",
  placeholder: "请输入公司名称",
} as const;
export const secondItem = {
  label: "职位",
  placeholder: "请输入职位名称",
} as const;

export const thirdItem = {
  label: "实习时间",
  placeholder: "开始时间",
  placeholder2: "结束时间",
} as const;

export const placeholder =
  "实习经验的描述与目标岗位的招聘要求尽量匹配，突出个人成果以及做出的贡献，尽量具体简洁。";

export const propsType = {
  moduleName: {
    type: String,
    required: true,
  },
} as const;
