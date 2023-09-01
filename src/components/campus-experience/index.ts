export const firstItem = {
  label: "经历名称",
  placeholder: "请输入经历名称",
} as const;
export const secondItem = {
  label: "角色",
  placeholder: "请输入角色名称",
} as const;

export const thirdItem = {
  label: "时间",
  placeholder: "开始时间",
  placeholder2: "结束时间",
} as const;

/**
 * 该项是校园经历，填写该项大抵是毕业生，因此开始时间是四年前到今年
 */
const startTime = new Date()
startTime.setFullYear(startTime.getFullYear() - 4)
const endTime = new Date()
export const defaultTimeValue:[Date,Date] = [startTime, endTime];

export const placeholder = "描述校园经历的具体行动，内容，成果。";

export const propsType = {
  moduleName: {
    type: String,
    required: true,
  },
} as const;
