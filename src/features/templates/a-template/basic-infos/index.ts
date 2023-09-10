import type { State as BasicInfoState } from "@/stores/basic-infos";

/**
 * 通过 key 值映射到相应的图标类名上
 */

export type IconMap = Record<
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
  | "heightOrWidth",
  string
>;

export const iconMap: IconMap = {
  birth: "nianling",
  phone: "dianhua",
  email: "youxiang",
  yearsOfWorking: "gongzuonianxian",
  maritalStatus: "keaide",
  gender: "xingbie",
  nation: "minzu",
  nativePlace: "nianling",
  politicsStatus: "zhengzhi",
  heightOrWidth: "celiang",
};

export const customIcon = "18";
