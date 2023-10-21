import type { BasicInfoState } from "@/stores";

/**
 * 通过 key 值映射到相应的图标类名上
 */

export type KeysType = Record<
  | keyof Omit<
      BasicInfoState,
      | "name"
      | "additionalInfos"
      | "convertToAge"
      | "showPhoto"
      | "height"
      | "weight"
    >
  | "heightWeight",
  string
>;

/**
 * 其顺序决定显示时顺序
 */
export const order: Array<keyof KeysType> = [
  "gender",
  "birth",
  "politicsStatus",
  "nation",
  "yearsOfWorking",
  "phone",
  "email",
  "nativePlace",
  "heightWeight",
  "maritalStatus",
];

export const iconMap: KeysType = {
  birth: "age",
  phone: "phone",
  email: "email",
  yearsOfWorking: "working-years",
  maritalStatus: "matrimony",
  gender: "gender",
  nation: "nation",
  nativePlace: "native-place",
  politicsStatus: "politics",
  heightWeight: "measurements",
};

export const customIcon = "custom";

export const nameMap: KeysType = {
  birth: "年龄",
  phone: "电话",
  email: "邮箱",
  yearsOfWorking: "工作年限",
  maritalStatus: "婚姻状况",
  gender: "性别",
  nation: "民族",
  nativePlace: "籍贯",
  politicsStatus: "政治面貌",
  heightWeight: "身高体重",
};
