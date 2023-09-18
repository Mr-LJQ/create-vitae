export const firstItem = {
  label: "学校名称",
  placeholder: "请输入学校名称",
} as const;
export const secondItem = {
  label: "所学专业",
  placeholder: "请输入所学专业",
} as const;

export const thirdItem = {
  label: "就读时间",
  placeholder: "入学年月",
  placeholder2: "毕业年月",
} as const;

export const degrees = [
  "",
  "初中",
  "高中",
  "中专",
  "大专",
  "本科",
  "学士",
  "硕士",
  "MBA",
  "EMBA",
  "博士",
];

export const placeholder =
  "所修课程、成绩排名、在校的职务、参赛获奖情况等有利于突出个人优势的信息。尽量简洁，突出重点。";
export const propsType = {
  moduleName: {
    type: String,
    required: true,
  },
} as const;

/**
 * 该项是教育背景，填写该项的大概率已毕业，因此开始时间是四年前到今年
 */
const startTime = new Date();
startTime.setFullYear(startTime.getFullYear() - 4);
const endTime = new Date();
export const defaultTimeValue: [Date, Date] = [startTime, endTime];
