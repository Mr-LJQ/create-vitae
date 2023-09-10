export const firstItem = {
  label: "项目名称",
  placeholder: "请输入项目名称",
} as const;
export const secondItem = {
  label: "参与角色",
  placeholder: "请输入角色名称",
} as const;

export const thirdItem = {
  label: "项目时间",
  placeholder: "开始时间",
  placeholder2: "结束时间",
} as const;

export const placeholder = "请输入项目内容、成果和感悟，简洁突出重点。";
export const propsType = {
  moduleName: {
    type: String,
    required: true,
  },
} as const;

/**
 * 该项是项目经历，先填写的应该是最近的项目，因此开始时间是最近一年
 */
 const startTime = new Date()
 startTime.setFullYear(startTime.getFullYear() - 1)
 const endTime = new Date()
 export const defaultTimeValue:[Date,Date] = [startTime, endTime];
 