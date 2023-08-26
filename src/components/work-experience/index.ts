export const firstItem = {
  label: "公司名称",
  placeholder: "请输入公司名称",
} as const;
export const secondItem = {
  label: "职位",
  placeholder: "请输入职位名称",
} as const;

export const thirdItem = {
  label: "在职时间",
  placeholder: "入职时间",
  placeholder2: "离职时间",
} as const;

export const placeholder =
  "详细描述你的职责范围、工作任务及取得的成绩，描述尽量具体简洁，工作经验的描述尽量与目标岗位的招聘要求匹配。";
export const propsType = {
  moduleName: {
    type: String,
    required: true,
  },
} as const;
