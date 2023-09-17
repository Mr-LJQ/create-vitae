import type { State as BasicInfoState } from "@/stores/basic-infos";

/**
 * 通过 key 值映射到相应的图标类名上
 */

export type KeysType = Record<
  | keyof Omit<
      BasicInfoState,
      | "name"
      | "additionalInfos"
      | "picture"
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
  "phone",
  "email",
  "gender",
  "nation",
  "birth",
  "heightWeight",
  "maritalStatus",
  "yearsOfWorking",
  "nativePlace",
  "politicsStatus",
];

export const iconMap: KeysType = {
  birth: "nianling",
  phone: "dianhua",
  email: "youxiang",
  yearsOfWorking: "gongzuonianxian",
  maritalStatus: "keaide",
  gender: "xingbie",
  nation: "minzu",
  nativePlace: "nianling",
  politicsStatus: "zhengzhi",
  heightWeight: "celiang",
};

export const customIcon = "18";

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
